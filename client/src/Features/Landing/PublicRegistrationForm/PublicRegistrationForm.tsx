
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Field } from '@/types';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Don't forget styles!

interface PublicRegistrationFormProps {
    fields: Field[]; // The form configuration array
    isPreview?: boolean; // Flag to change behavior for the preview modal
}

const PublicRegistrationForm: React.FC<PublicRegistrationFormProps> = ({ fields, isPreview = false }) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    // In a real app, this would send data to your API.
    const onSubmit = (data: any) => alert(`Registration Submitted!\n\n${JSON.stringify(data, null, 2)}`);

    const renderField = (field: Field) => {
        const fieldName = field.systemName || `field_${field.id}`;

        const renderInput = () => {
             const commonInputClass = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue";

             if(field.systemName === 'mobilePhone') {
                 return (
                     <div className={`${commonInputClass} flex items-center`}>
                        <Controller name={fieldName} control={control}
                            rules={{ required: field.required, validate: v => !v || isPossiblePhoneNumber(v) || 'Invalid phone number' }}
                            render={({ field: controllerField }) => <PhoneInput {...controllerField} defaultCountry="TZ" international className="w-full bg-transparent outline-none"/>} />
                     </div>
                 );
             }

             switch(field.fieldType) {
                case 'textarea': return <textarea {...register(fieldName, { required: field.required })} className={commonInputClass} rows={4} />;


                case 'multichoice':
                          return (
                            <div className="space-y-3 mt-2">
                              {field.options?.map((opt: string) => (
                                <label key={opt} className="flex items-center text-gray-800 font-medium">
                                  <input
                                    type="radio"
                                    value={opt}
                                    {...register(fieldName, { required: field.required })}
                                    className="h-4 w-4 mr-3 text-primary-blue focus:ring-primary-blue"
                                  />
                                  {opt}
                                </label>
                              ))}
                            </div>
                          );

                case 'checkbox':
                          return (
                            <div className="space-y-3 mt-2">
                              {field.options?.map((opt: string) => (
                                <label key={opt} className="flex items-center text-gray-800 font-medium">
                                  <input
                                    type="checkbox"
                                    {...register(`${fieldName}.${opt}`)}
                                    className="h-4 w-4 mr-3 rounded text-primary-blue focus:ring-primary-blue"
                                  />
                                  {opt}
                                </label>
                              ))}
                            </div>
                          );


                case 'text':
                default:
                    return <input type="text" {...register(fieldName, { required: field.required })} className={commonInputClass} />;
             }
        };

        return (
            <div key={field.id} className="mb-6">
                <label className="text-base font-semibold text-dark-text block mb-2">
                    {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {field.helpText && <p className="text-sm text-light-text mb-2">{field.helpText}</p>}
                {renderInput()}
                {errors[fieldName] && <p className="text-accent-red text-sm mt-1">{field.label} is required.</p>}
            </div>
        );
    };

    return (
        // The outer div changes appearance based on whether it's in a modal
        <div className={`py-12 px-4 ${isPreview ? 'bg-light-bg' : 'bg-slate-50 min-h-screen'}`}>
            <div className={`max-w-2xl mx-auto bg-white p-8 md:p-12 ${isPreview ? '' : 'rounded-xl shadow-lg'}`}>
                <h1 className="text-3xl font-bold text-center mb-2">Event Registration</h1>
                <p className="text-light-text text-center mb-10">Please fill out the form below to register.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {fields.map(renderField)}
                    {/* The submit button is only shown on the live page */}
                    {!isPreview && (
                        <button type="submit" className="w-full mt-8 py-3 bg-primary-blue text-white font-bold text-lg rounded-lg hover:bg-primary-blue-hover">
                            Register Now
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PublicRegistrationForm;
