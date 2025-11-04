import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventFormService } from '../../../../services/eventFormService';
import { attendeeRegistrationService } from '@/services/attendeeRegistration/attendeeRegistrationService';
import FieldRenderer from '../../../Dashboard/RegistrationFormEditor/components/FieldRenderer/FieldRenderer';
import { Field, RegistrationData } from '@/types';
import toast from 'react-hot-toast';

const AttendeeRegistrationPage: React.FC = () => {
  const { customSlug } = useParams<{ customSlug: string }>();
  const [fields, setFields] = useState<Field[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [eventInfo, setEventInfo] = useState<{ id: number; title: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadEventAndFormConfig();
  }, [customSlug]);

  const loadEventAndFormConfig = async () => {
    try {
      setLoading(true);

      if (!customSlug) {
        throw new Error('No event URL provided');
      }

      // First, get event info by custom slug
      const eventResponse = await eventFormService.getEventByCustomSlug(customSlug);
      setEventInfo({
        id: eventResponse.id,
        title: eventResponse.title
      });

      // Then load form config using the event ID
      const formResponse = await eventFormService.getPublicFormConfig(eventResponse.id);
      setFields(formResponse.fields || []);

      // Initialize form data
      const initialData: Record<string, any> = {};
      formResponse.fields?.forEach((field: Field) => {
        if (field.fieldType === 'checkbox') {
          initialData[field.label] = [];
        } else {
          initialData[field.label] = '';
        }
      });
      setFormData(initialData);

    } catch (error) {
      console.error('Error loading registration form:', error);
      toast.error('Failed to load registration form. Please check the event URL.');
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

    // Validate required fields
    const missingFields = fields
      .filter(field => field.required && !formData[field.label])
      .map(field => field.label);

    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setSubmitting(true);
    try {
      if (!eventInfo) {
        throw new Error('Event information not available');
      }

      // Map form data to registration structure
      const registrationData: RegistrationData = {
        event_id: eventInfo.id,
        first_name: formData['First Name'] || formData['firstName'] || '',
        last_name: formData['Last Name'] || formData['lastName'] || '',
        email: formData['Email Address'] || formData['email'] || '',
        phone: formData['Mobile Phone'] || formData['mobilePhone'] || undefined,
        job_title: formData['Job Title'] || formData['jobTitle'] || undefined,
        company_name: formData['Company Name'] || formData['companyName'] || undefined,
        custom_data: {}
      };

      // Add custom fields (excluding standard fields)
      Object.entries(formData).forEach(([key, value]) => {
        if (!['First Name', 'Last Name', 'Email Address', 'Mobile Phone', 'Job Title', 'Company Name',
              'firstName', 'lastName', 'email', 'mobilePhone', 'jobTitle', 'companyName'].includes(key)) {
          registrationData.custom_data[key] = value;
        }
      });

      const response = await attendeeRegistrationService.register(registrationData);

      toast.success('Registration successful!');

      // Navigate to success page
      navigate(`/registration-success/${customSlug}`, {
        state: {
          attendee: response.attendee,
          eventTitle: eventInfo.title
        }
      });

    } catch (error: any) {
      console.error('Registration failed:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading registration form...</p>
        </div>
      </div>
    );
  }

  if (!eventInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h1>
          <p className="text-gray-600">The event you're looking for doesn't exist or is not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          {/* Event Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Register for {eventInfo.title}
            </h1>
            <p className="text-gray-600">
              Complete the form below to register for this event
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {submitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Registering...
                </div>
              ) : (
                'Register Now'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AttendeeRegistrationPage;
