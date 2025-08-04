// src/features/dashboard/components/FormFieldItem.tsx
import React from 'react';
import { Field } from '../../types';
import FieldSettings from '../FieldSettings/FieldSettings';

// --- Icons (kept here for component self-containment) ---
const GripIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const ArrowUpIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>;
const ArrowDownIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const EditIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;
const SaveIcon = () => <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const TrashIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

// --- THE PROP DEFINITION FIX: This must match what the parent sends ---
interface FormFieldItemProps {
    field: Field;
    index: number;
    isEditing: boolean;
    isFirst: boolean;
    isLast: boolean;
    onUpdate: (field: Field) => void;
    onDelete: (id: number) => void; // This was the crucial part
    onEdit: (id: number) => void;
    onSave: () => void;
    onMove: (index: number, direction: 'up' | 'down') => void;
    // Explicitly defining drag-and-drop props
    onDragStart: (index: number) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (targetIndex: number) => void;
    onDragEnd: () => void;
}

const FormFieldItem: React.FC<FormFieldItemProps> = (props) => {
    // Destructure all the props to use them below
    const { field, index, isEditing, isFirst, isLast, onUpdate, onDelete, onEdit, onSave, onMove, ...dragProps } = props;

    return (
        <div
            draggable={!field.isFixed}
            onDragStart={() => dragProps.onDragStart(index)}
            onDragOver={dragProps.onDragOver}
            onDrop={() => dragProps.onDrop(index)}
            onDragEnd={dragProps.onDragEnd}
            className={`p-3 rounded-lg flex flex-col items-start justify-between transition-all duration-200 ${isEditing ? 'bg-blue-50 border-2 border-primary-blue' : 'bg-white border-2 border-transparent'}`}
        >
            <div className="flex w-full items-start">
                <div className={`cursor-grab pt-2 ${field.isFixed ? 'text-gray-300' : 'text-gray-500'}`}>
                    <GripIcon />
                </div>
                <div className="flex-grow ml-4">
                    <span className="font-medium text-dark-text">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                    </span>
                    <p className="text-sm text-gray-500">{field.helpText}</p>
                </div>

                {/* Right Side Controls */}
                <div className="flex items-center gap-1 md:gap-2 ml-auto">
                    <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={field.required} onChange={() => onUpdate({ ...field, required: !field.required })} disabled={field.isFixed} className="sr-only peer" />
                            <div className="relative w-9 h-5 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                    </div>
                    <button onClick={() => onMove(index, 'up')} disabled={isFirst || field.isFixed} className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30"><ArrowUpIcon /></button>
                    <button onClick={() => onMove(index, 'down')} disabled={isLast || field.isFixed} className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30"><ArrowDownIcon /></button>
                    {isEditing ?
                        (<button onClick={onSave} className="p-2 rounded-full hover:bg-green-100" title="Done Editing"><SaveIcon /></button>) :
                        (<button onClick={() => onEdit(field.id)} className="p-2 rounded-full hover:bg-blue-100" title="Edit Field"><EditIcon /></button>)
                    }
                    {/* *** THE FIX IS HERE: The onDelete function is now correctly called *** */}
                    {field.deletable && <button onClick={() => onDelete(field.id)} className="p-2 rounded-full hover:bg-red-100 text-red-500" title="Delete Field"><TrashIcon /></button>}
                </div>
            </div>

            {isEditing && <FieldSettings field={field} onUpdate={onUpdate} />}
        </div>
    );
};

export default FormFieldItem;
