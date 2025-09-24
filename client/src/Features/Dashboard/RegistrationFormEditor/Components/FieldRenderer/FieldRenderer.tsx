import React from 'react';
import { Field } from '@/types';

interface FieldRendererProps {
    field: Field;
    value?: any;
    onChange?: (value: any) => void;
    disabled?: boolean;
    isEditing?: boolean;
    onUpdate?: (field: Field) => void;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange, disabled = false }) => {
    const commonProps = {
        disabled,
        required: field.required,
        className: `w-full p-3 border rounded-md ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    switch (field.fieldType) {
        case 'textarea':
            return (
                <textarea
                    {...commonProps}
                    value={value || ''}
                    onChange={handleChange}
                    rows={4}
                    placeholder={field.label}
                />
            );

        case 'multichoice':
            return (
                <div className="space-y-2">
                    {field.options?.map((option, index) => (
                        <label key={index} className="flex items-center">
                            <input
                                type="radio"
                                name={field.label}
                                value={option}
                                checked={value === option}
                                onChange={handleChange}
                                disabled={disabled}
                                className="mr-2"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            );

        case 'checkbox':
            return (
                <div className="space-y-2">
                    {field.options?.map((option, index) => (
                        <label key={index} className="flex items-center">
                            <input
                                type="checkbox"
                                name={field.label}
                                value={option}
                                checked={Array.isArray(value) && value.includes(option)}
                                onChange={(e) => {
                                    if (!onChange) return;

                                    const newValue = Array.isArray(value) ? [...value] : [];
                                    if (e.target.checked) {
                                        newValue.push(option);
                                    } else {
                                        const index = newValue.indexOf(option);
                                        if (index > -1) {
                                            newValue.splice(index, 1);
                                        }
                                    }
                                    onChange(newValue);
                                }}
                                disabled={disabled}
                                className="mr-2"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            );

        case 'date':
            return (
                <input
                    type="date"
                    {...commonProps}
                    value={value || ''}
                    onChange={handleChange}
                />
            );

        case 'country':
            // Simplified country list - you might want to use a more comprehensive one
            const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Other'];
            return (
                <select
                    {...commonProps}
                    value={value || ''}
                    onChange={handleChange}
                >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            );

        case 'paragraph':
            return (
                <p className="text-gray-700 py-2">{field.label}</p>
            );

        case 'header':
            return (
                <h3 className="text-xl font-semibold py-3 border-b">{field.label}</h3>
            );

        case 'email':
            return (
                <input
                    type="email"
                    {...commonProps}
                    value={value || ''}
                    onChange={handleChange}
                    placeholder={field.label}
                />
            );

        case 'text':
        default:
            return (
                <input
                    type="text"
                    {...commonProps}
                    value={value || ''}
                    onChange={handleChange}
                    placeholder={field.label}
                />
            );
    }
};

export default FieldRenderer;
