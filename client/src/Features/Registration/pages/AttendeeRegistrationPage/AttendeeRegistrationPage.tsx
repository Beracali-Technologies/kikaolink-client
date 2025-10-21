import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { eventFormService } from '../../../../services/eventFormService';
import { attendeeRegistrationService } from '@/services/attendeeRegistration/attendeeRegistrationService';
import FieldRenderer from '../../../Dashboard/RegistrationFormEditor/components/FieldRenderer/FieldRenderer';
import { Field, RegistrationData } from '@/types';
import { useNavigate } from 'react-router-dom';
import ResendEmailButton from '../../components/QrCode/ResendEmailButton';


const AttendeeRegistrationPage: React.FC = () => {
  const { eventSlug, eventId } = useParams<{ eventSlug: string; eventId: string }>();
  const [fields, setFields] = useState<Field[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [attendeeId, setAttendeeId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadFormConfig();
  }, [eventSlug, eventId]);

  const loadFormConfig = async () => {
    try {
      setLoading(true);

      if (eventId) {
        const response = await eventFormService.getPublicFormConfig(parseInt(eventId));
        setFields(response.fields);

        const initialData: Record<string, any> = {};
        response.fields.forEach((field: Field) => {
          if (field.fieldType === 'checkbox') {
            initialData[field.label] = [];
          } else {
            initialData[field.label] = '';
          }
        });
        setFormData(initialData);
      } else {
        throw new Error('No event ID provided');
      }
    } catch (error) {
      console.error('Error loading form config:', error);
      alert('Failed to load registration form. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (fieldLabel: string) => (value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldLabel]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const missingFields = fields
      .filter(field => field.required && !formData[field.label])
      .map(field => field.label);

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setSubmitting(true);
    try {
      const targetEventId = eventId ? parseInt(eventId) : null;

      if (targetEventId === null) {
        console.error('Event ID is missing.');
        setSubmitting(false);
        return;
      }

      // Map formData to RegistrationData structure
      const registrationData: RegistrationData = {
        event_id: targetEventId,
        first_name: formData['First Name'] || '', // Adjust based on field labels
        last_name: formData['Last Name'] || '',
        email: formData['Email Address'] || '',
        phone: formData['Mobile Phone'] || undefined,
        job_title: formData['Job Title'] || undefined,
        company_name: formData['Company Name'] || undefined,
        custom_data: Object.fromEntries(
          Object.entries(formData).filter(([key]) => !['First Name', 'Last Name', 'Email Address', 'Mobile Phone'].includes(key))
        ),
      };

      const response = await attendeeRegistrationService.register(registrationData);
      console.log('Registration response:', response);

      if (response.attendee && response.attendee.id) {
        setAttendeeId(response.attendee.id); // Set attendeeId after successful registration
      } else {
        console.error('No attendee ID in response:', response);
      }

      navigate(`/registration-success/${eventSlug || 'event'}`, {
        state: { attendee: response.attendee }
      });
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Register for Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.id || field.systemName} className="space-y-2">
            {!['paragraph', 'header'].includes(field.fieldType) && (
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}

            <FieldRenderer
              field={field}
              value={formData[field.label]}
              onChange={handleFieldChange(field.label)}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {submitting ? 'Registering...' : 'Register'}
        </button>
      </form>
      {attendeeId && <ResendEmailButton attendeeId={attendeeId} />}
    </div>
  );
};

export default AttendeeRegistrationPage;
