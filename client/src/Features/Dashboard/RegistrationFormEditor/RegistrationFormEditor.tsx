import React, { useState } from 'react';
import { Field, FieldType } from '../types';
import FormFieldItem from './Components/FormFieldItem/FormFieldItem';
import AddCustomField from './Components/AddCustomField/AddCustomField';
import StandardFieldsPanel from './Components/StandardFieldsPanel/StandardFieldsPanel';

// Master list of all possible standard fields
const ALL_STANDARD_FIELDS: Field[] = [
    { id: -1, systemName: 'salutation', label: 'Salutation', fieldType: 'text', required: false, editable: true, deletable: true },
    { id: -2, systemName: 'firstName', label: 'First Name', fieldType: 'text', required: true, editable: true, deletable: true },
    { id: -3, systemName: 'lastName', label: 'Last Name', fieldType: 'text', required: true, editable: true, deletable: true },
    { id: -4, systemName: 'fullName', label: 'Full Name', fieldType: 'text', required: false, editable: true, deletable: true },
    { id: -5, systemName: 'companyName', label: 'Company Name', fieldType: 'text', required: false, editable: true, deletable: true },
    { id: -6, systemName: 'jobTitle', label: 'Job Title', fieldType: 'text', required: false, editable: true, deletable: true },
    { id: -7, systemName: 'mobilePhone', label: 'Mobile Phone', fieldType: 'text', required: false, editable: true, deletable: true },
    { id: -8, systemName: 'email', label: 'Email Address', fieldType: 'text', required: true, editable: false, deletable: false, isFixed: true },
];

const RegistrationFormEditor: React.FC = () => {
    // Initial state setup
    const [fields, setFields] = useState<Field[]>(() =>
        ALL_STANDARD_FIELDS.filter(f => ['firstName', 'lastName', 'email'].includes(f.systemName!))
    );
    const [editingFieldId, setEditingFieldId] = useState<number | null>(null);
    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);


    const handleToggleStandardField = (systemName: string, isChecked: boolean) => {
        if (isChecked) {
            const fieldToAdd = ALL_STANDARD_FIELDS.find(f => f.systemName === systemName);
            if (fieldToAdd) { setFields(prev => [...prev, { ...fieldToAdd, id: Date.now() }]); }
        } else {
            setFields(prev => prev.filter(f => f.systemName !== systemName));
        }
    };

    const handleAddCustomField = (fieldType: FieldType) => {
        const newId = Date.now();
        let newField: Field;
        switch (fieldType) {
            case 'multichoice': case 'checkbox':
                newField = { id: newId, label: 'New Multiple Choice', fieldType, required: false, editable: true, deletable: true, options: ['Option 1', 'Option 2'] };
                break;
            case 'paragraph':
                newField = { id: newId, label: 'This is some descriptive text.', fieldType, required: false, editable: true, deletable: true };
                break;
            default:
                newField = { id: newId, label: `New ${fieldType} Field`, fieldType, required: false, editable: true, deletable: true };
                break;
        }
        setFields(prev => [...prev, newField]);
        setEditingFieldId(newId);
    };

    const handleUpdateField = (updatedField: Field) => {
        setFields(prev => prev.map(f => (f.id === updatedField.id ? updatedField : f)));
    };

    const handleDeleteField = (id: number) => {
        const fieldToDelete = fields.find(f => f.id === id);
        if (fieldToDelete && !fieldToDelete.deletable) return;
        setFields(prev => prev.filter(f => f.id !== id));
    };

    const handleMoveField = (index: number, direction: 'up' | 'down') => {
        const newFields = [...fields];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newFields.length) return;
        [newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]];
        setFields(newFields);
    };

    // --- Drag and Drop Logic ---
    const handleDragStart = (index: number) => { setDraggedItemIndex(index); };
    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };
    const handleDragEnd = () => { setDraggedItemIndex(null); };
    const handleDrop = (targetIndex: number) => {
        if (draggedItemIndex === null || fields[targetIndex].isFixed) {
            handleDragEnd();
            return;
        }
        const newFields = [...fields];
        const draggedItem = newFields.splice(draggedItemIndex, 1)[0];
        newFields.splice(targetIndex, 0, draggedItem);
        setFields(newFields);
        handleDragEnd();
    };

    // Combining drag handlers into one object for cleaner props
    const dragAndDropHandlers = {
      onDragStart: handleDragStart,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
      onDragEnd: handleDragEnd,
    };




    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow">
                <h3 className="font-semibold text-lg mb-4">Customize Registration Form Fields</h3>
                <div className="space-y-2 p-4 bg-slate-100 rounded-lg">
                    {fields.map((field, index) => (
                        <FormFieldItem
                            key={field.id}
                            field={field}
                            index={index}
                            isEditing={editingFieldId === field.id}
                            isFirst={index === 0}
                            isLast={index === fields.length - 1}
                            onUpdate={handleUpdateField}
                            onDelete={handleDeleteField}
                            onEdit={setEditingFieldId}
                            onSave={() => setEditingFieldId(null)}
                            onMove={handleMoveField}
                            {...dragAndDropHandlers}
                        />
                    ))}
                </div>
            </div>

            <aside className="w-full lg:w-72 flex-shrink-0">
                <div className="bg-white p-4 rounded-lg shadow-sm border sticky top-24 space-y-6">
                    <StandardFieldsPanel
                        allStandardFields={ALL_STANDARD_FIELDS.filter(f => !f.isFixed)}
                        activeFields={fields}
                        onToggle={handleToggleStandardField}
                    />
                     <AddCustomField onAddField={handleAddCustomField} />
                </div>
            </aside>
        </div>
    );
};

export default RegistrationFormEditor;
