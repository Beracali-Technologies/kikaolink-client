import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { eventFormService } from '../../../../services/eventFormService';
import { attendeeRegistrationService } from '@/services/attendeeRegistrationService';
import FieldRenderer from '../../../Dashboard/RegistrationFormEditor/components/FieldRenderer/FieldRenderer';
import { Field } from '@/types';
import { useNavigate } from 'react-router-dom';



const AttendeeRegistrationPage: React.FC = () => {
    const { eventSlug, eventId } = useParams<{ eventSlug: string; eventId: string }>();
    const [fields, setFields] = useState<Field[]>([]);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        loadFormConfig();
    }, [eventSlug, eventId]);



const loadFormConfig = async () => {
    try {
        setLoading(true);

        // Use eventId from URL params instead of slug
        if (eventId) {
            const response = await eventFormService.getPublicFormConfig(parseInt(eventId));
            setFields(response.fields);

            // Initialize form data
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

        // Validate required fields
        const missingFields = fields
            .filter(field => field.required && !formData[field.label])
            .map(field => field.label);

        if (missingFields.length > 0) {
            alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
        }

        setSubmitting(true);
        try {
            // Use eventId if available, otherwise try to extract from fields
            const targetEventId = eventId ? parseInt(eventId) : null;

                if(targetEventId === null) {      //ensure the event_Id is present before making an api call
                      console.error('Event ID is missing.');
                      setSubmitting(false);
                      return;
                }

                const response = await attendeeRegistrationService.register({
                event_id: targetEventId,
                form_data: formData,
            });
            console.log(response);

            navigate(`/registration-success/${eventSlug || 'event'}`, {
                  state: { attendee: response.attendee } // pass the returned attendee data from API
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
        </div>
    );
};

export default AttendeeRegistrationPage;
