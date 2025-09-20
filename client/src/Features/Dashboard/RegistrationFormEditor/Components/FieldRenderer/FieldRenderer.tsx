import React from 'react';
import { Field } from '@/types';
import FieldPreview from '../FieldPreview/FieldPreview';
import FieldSettings from '../FieldSettings/FieldSettings';

interface FieldRendererProps {
    field: Field;
    isEditing: boolean;
    onUpdate: (field: Field) => void;
}

//This component intelligently switches between the live preview and the detailed settings editor.

const FieldRenderer: React.FC<FieldRendererProps> = ({ field, isEditing, onUpdate }) => {
    // Show label for paragraph/header types in both views
    const mainLabel = (
         <p className="font-semibold text-dark-text">
            {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
         </p>
    );

    // If a field doesn't have a visible input, just show the label/settings.
    if (['header', 'paragraph'].includes(field.fieldType)) {
        return isEditing ? <FieldSettings field={field} onUpdate={onUpdate} /> : mainLabel;
    }

    // For all other types, render the full preview or settings editor.
    return (
        <div>
            {mainLabel}
            {isEditing ? <FieldSettings field={field} onUpdate={onUpdate} /> : <div className="mt-2 w-full"><FieldPreview field={field} /></div>}
        </div>
    );
};

export default FieldRenderer;
