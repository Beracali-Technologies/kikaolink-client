
import React from 'react';
import { Field } from '@/types';

interface FieldPreviewProps {
    field: Field;
}

//component's sole purpose is to render a disabled, visual preview of the final form field. This is the core of the WYSIWYG experience

const FieldPreview: React.FC<FieldPreviewProps> = ({ field }) => {
    const commonProps = {
        className: "w-full p-2.5 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed",
        disabled: true,
    };

    switch (field.fieldType) {
        case 'textarea':
            return <textarea {...commonProps} rows={3} placeholder="Attendees will enter multiple lines of text here" />;

        case 'multichoice':
        case 'checkbox':
            const InputType = field.fieldType === 'multichoice' ? 'radio' : 'checkbox';


            return (
                <div className="space-y-2 mt-1">
                    {(field.options && field.options.length > 0 ? field.options : ['Sample Option']).map((opt: string) => (
                        <label key={opt} className="flex items-center text-gray-500 cursor-not-allowed">
                            <input type={InputType} disabled className="h-4 w-4 mr-3" />{opt}
                        </label>
                    ))}
                </div>
            );

        case 'date':
            return <input type="date" {...commonProps} />;

        case 'country':
            return <select {...commonProps}><option>A list of countries will be shown here</option></select>;

        case 'text':
        default:
            return <input type="text" placeholder="Attendees will enter text here" {...commonProps} />;
    }
};

export default FieldPreview;
