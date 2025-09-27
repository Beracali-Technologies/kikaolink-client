import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventFormService } from '@/services/eventFormService';
import { useRegistration } from '../../../../lib/hooks/useRegistration';
import FieldRenderer from '../../../Dashboard/RegistrationFormEditor/components/FieldRenderer/FieldRenderer';
import { Field } from '@/types';


const AttendeeForm: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();
    const [fields, setFields] = useState<Field[]>([]);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [formLoading, setFormLoading] = useState(false);

    // Use the registration hook
    const { register, loading: submitting, error } = useRegistration();

    useEffect(() => {
        if (eventId) {
            loadFormConfig();
        }
    }, [eventId]);

    const loadFormConfig = async () => {
        try {
            setFormLoading(true);
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
            setFormLoading(false);
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

        // Extract required fields from form data
        // You need to map your form fields to the RegistrationData structure
        const registrationData = {
            event_id: parseInt(eventId!),
            first_name: formData.first_name || formData['First Name'] || '',
            last_name: formData.last_name || formData['Last Name'] || '',
            email: formData.email || formData['Email'] || '',
            phone: formData.phone || formData['Phone'] || '',
            custom_data: formData // Include all form data as custom data
        };

        console.log('📝 Prepared registration data:', registrationData);

        // Validate required fields
        if (!registrationData.first_name || !registrationData.last_name || !registrationData.email) {
            alert('Please fill in all required fields: First Name, Last Name, and Email');
            return;
        }

        try {
            // Use the registration hook
            const result = await register(registrationData);

            console.log('✅ Registration successful, navigating to success page');
            console.log('✅ Result data:', result);

            // Navigate to success page with the data
            navigate(`/registration-success/${eventId}`, {
                state: {
                    registrationData: result
                }
            });

        } catch (err) {
            console.error('❌ Registration error:', err);
            // Error is already handled by the hook, but you can show a specific message
            alert(error || 'Registration failed. Please try again.');
        }
    };

    if (formLoading) {
        return <div className="max-w-md mx-auto p-6">Loading form...</div>;
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Register for Event</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

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
