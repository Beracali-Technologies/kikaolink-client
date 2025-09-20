import React from 'react';
import { Field } from '@/types';
import FieldRenderer from '../FieldRenderer/FieldRenderer';

// --- Icons ---
const GripIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const ArrowUpIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>;
const ArrowDownIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const EditIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;
const TrashIcon = () => <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

// THE PROP DEFINITION MUST BE COMPLETE
interface FormFieldItemProps {
    field: Field;
    index: number;
    isEditing: boolean;
    isFirst: boolean;
    isLast: boolean;
    onUpdate: (field: Field) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number | null) => void;
    onMove: (index: number, direction: 'up' | 'down') => void;
    onDragStart: (index: number) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (targetIndex: number) => void;
    onDragEnd: () => void;
}

const FormFieldItem: React.FC<FormFieldItemProps> = (props) => {
    const { field, index, isEditing, isFirst, isLast, onUpdate, onDelete, onEdit, onMove, ...dragProps } = props;

    return (
        <div
            draggable={!field.isFixed}
            onDragStart={() => dragProps.onDragStart(index)}
            onDragOver={dragProps.onDragOver}
            onDrop={() => dragProps.onDrop(index)}
            onDragEnd={dragProps.onDragEnd}
            className={`bg-white p-3 rounded-xl shadow-sm border-2 ${isEditing ? 'border-primary-blue ring-2 ring-blue-200' : 'border-white'}`}
        >
            <div className="flex w-full items-start">
                 {/* Drag Handle */}
                 <div className={`cursor-grab pt-1 ${field.isFixed ? 'text-gray-300' : 'text-gray-600'}`}>
                    <GripIcon />
                </div>

                 {/* The main content area now delegates to the FieldRenderer */}
                <div className="flex-grow ml-4">
                    <FieldRenderer field={field} isEditing={isEditing} onUpdate={onUpdate} />
                </div>

                {/* --- CONTROLS: ALWAYS VISIBLE --- */}
                <div className="flex items-center gap-1.5 md:gap-2 ml-4">
                     <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={field.required} onChange={() => onUpdate({ ...field, required: !field.required })} disabled={field.isFixed} className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                    <button onClick={() => onMove(index, 'up')} disabled={isFirst || field.isFixed} className="p-2 text-gray-500 hover:bg-gray-100 rounded-md disabled:opacity-30 disabled:cursor-not-allowed"><ArrowUpIcon /></button>
                    <button onClick={() => onMove(index, 'down')} disabled={isLast || field.isFixed} className="p-2 text-gray-500 hover:bg-gray-100 rounded-md disabled:opacity-30 disabled:cursor-not-allowed"><ArrowDownIcon /></button>
                    {field.editable && <button onClick={() => onEdit(isEditing ? null : field.id)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-md"><EditIcon /></button>}
                    {field.deletable && <button onClick={() => onDelete(field.id)} className="p-2 hover:bg-red-50 rounded-md"><TrashIcon /></button>}
                </div>
            </div>
        </div>
    );
};

export default FormFieldItem;
