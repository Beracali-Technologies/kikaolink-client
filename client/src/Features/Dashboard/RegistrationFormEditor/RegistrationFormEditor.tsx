import React, { useState } from 'react';
import { Field, FieldType } from '../types';
import FormFieldItem from './Components/FormFieldItem/FormFieldItem';
import AddCustomField from './Components/AddCustomField/AddCustomField';
import StandardFieldsPanel from './Components/StandardFieldsPanel/StandardFieldsPanel';
import PreviewFormModal from '../Components/PreviewFormModal/PreviewFormModal';
import { useParams } from 'react-router-dom';

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
    const { eventId } = useParams<{ eventId: string }>();
    const [fields, setFields] = useState<Field[]>(() =>
        ALL_STANDARD_FIELDS.filter(f => ['firstName', 'lastName', 'email'].includes(f.systemName!))
    );
    const [editingFieldId, setEditingFieldId] = useState<number | null>(null);
    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    // --- FULLY IMPLEMENTED HANDLER FUNCTIONS ---

    const handleToggleStandardField = (systemName: string, isChecked: boolean) => {
        if (isChecked) {
            const fieldToAdd = ALL_STANDARD_FIELDS.find(f => f.systemName === systemName);
            if (fieldToAdd) {
                setFields(prev => [...prev, { ...fieldToAdd, id: Date.now() }]);
            }
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
        setFields(prev => prev.filter(f => f.id !== id));
    };

    const handleMoveField = (index: number, direction: 'up' | 'down') => {
        const newFields = [...fields];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newFields.length) return;
        [newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]];
        setFields(newFields);
    };

    const handleSaveChanges = () => {
        setIsSaving(true);
        console.log("Saving Form Configuration:", fields);
        setTimeout(() => {
            setIsSaving(false);
            alert('Changes Saved');
        }, 1000);
    };

    const dragAndDropHandlers = {
      onDragStart: (index: number) => setDraggedItemIndex(index),
      onDragOver: (e: React.DragEvent) => e.preventDefault(),
      onDrop: (targetIndex: number) => {
          if (draggedItemIndex === null || fields[targetIndex].isFixed) {
              setDraggedItemIndex(null);
              return;
          }
          const newFields = [...fields];
          const draggedItem = newFields.splice(draggedItemIndex, 1)[0];
          newFields.splice(targetIndex, 0, draggedItem);
          setFields(newFields);
          setDraggedItemIndex(null);
      },
      onDragEnd: () => setDraggedItemIndex(null),
    };

    return (
          <>
                <PreviewFormModal isOpen={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)} fields={fields} />


                  <div className="space-y-6">
                     <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-dark-text">Customize Registration Form</h2>

                        <button onClick={() => setIsPreviewModalOpen(true)} className="font-semibold text-primary-blue text-sm hover:underline">
                              Preview
                        </button>


                    </div>
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-grow space-y-3">
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
                                    onMove={handleMoveField}
                                    {...dragAndDropHandlers}
                                />
                            ))}
                        </div>
                        <aside className="w-full lg:w-72 flex-shrink-0">
                            <div className="bg-white p-6 rounded-xl shadow-md border sticky top-24 space-y-6">
                                <StandardFieldsPanel
                                    allStandardFields={ALL_STANDARD_FIELDS.filter(f => !f.isFixed)}
                                    activeFields={fields}
                                    onToggle={handleToggleStandardField}
                                />
                                 <AddCustomField onAddField={handleAddCustomField} />
                            </div>
                        </aside>
                    </div>

                    {/* --- SAVE BUTTON AT THE BOTTOM --- */}
                      <div className="mt-8 pt-6 border-t flex justify-center">
                           <button onClick={handleSaveChanges} className="bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400" disabled={isSaving}>
                              {isSaving ? 'Saving...' : 'Save Changes'}
                          </button>
                      </div>

                </div>
      </>
    );
};

export default RegistrationFormEditor;
