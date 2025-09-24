import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { eventFormService } from '@/services/eventFormService';
import { attendeeRegistrationService } from '@/services/attendeeRegistrationService';
import FieldRenderer from '../../../Dashboard/RegistrationFormEditor/components/FieldRenderer/FieldRenderer';
import { Field } from '@/types';

const AttendeeForm: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const [fields, setFields] = useState<Field[]>([]);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (eventId) {
            loadFormConfig();
        }
    }, [eventId]);

    const loadFormConfig = async () => {
        try {
            setLoading(true);
            const response = await eventFormService.getPublicFormConfig(parseInt(eventId!));
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
        } catch (error) {
            console.error('Error loading form config:', error);
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
            await attendeeRegistrationService.register({
                event_id: parseInt(eventId!),
                form_data: formData
            });

            // Redirect to success page
            window.location.href = `/registration-success/${eventId}`;
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="max-w-md mx-auto p-6">Loading form...</div>;
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

export default AttendeeForm;
