// FieldSettings.tsx
import React from 'react';
import { Field } from '@/types/form';

interface FieldSettingsProps {
    field: Field;
    onUpdate: (field: Field) => void;
}

const FieldSettings: React.FC<FieldSettingsProps> = ({ field, onUpdate }) => {

    const handleOptionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // Update options by splitting the text by new lines
        onUpdate({ ...field, options: e.target.value.split('\n') });
    };

    return (
        <div className="bg-slate-50 p-4 mt-2 rounded-md border border-slate-200 w-full space-y-4">
            <div>
                <label className="text-xs font-semibold text-gray-600">Label Name</label>
                <input
                    type="text"
                    value={field.label}
                    onChange={(e) => onUpdate({ ...field, label: e.target.value })}
                    className="mt-1 w-full p-2 text-base border-gray-300 rounded-md shadow-sm"
                    autoFocus
                />
            </div>

            <div>
                <label className="text-xs font-semibold text-gray-600">Help Text</label>
                <input
                    type="text"
                    value={field.helpText || ''}
                    onChange={(e) => onUpdate({ ...field, helpText: e.target.value })}
                    placeholder="Provide additional instructions for this field"
                    className="mt-1 w-full p-2 text-base border-gray-300 rounded-md shadow-sm"
                />
            </div>

            {/* Conditional section for multiple choice / checkboxes */}
            {(field.fieldType === 'multichoice' || field.fieldType === 'checkbox') && (
                <div>
                    <label className="text-xs font-semibold text-gray-600">Enter List Items</label>
                    <p className="text-xs text-gray-500">Each option on a new line.</p>
                    <textarea
                        value={field.options?.join('\n') || ''}
                        onChange={handleOptionsChange}
                        rows={4}
                        className="mt-1 w-full p-2 text-base border-gray-300 rounded-md shadow-sm"
                    />
                </div>
            )}
        </div>
    );
};

export default FieldSettings;
