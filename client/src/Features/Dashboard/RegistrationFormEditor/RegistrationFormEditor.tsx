import React, { useState, useEffect } from 'react';
import { Field, FieldType } from '@/types';
import FormFieldItem from './components/FormFieldItem/FormFieldItem';
import AddCustomField from './components/AddCustomField/AddCustomField';
import StandardFieldsPanel from './components/StandardFieldsPanel/StandardFieldsPanel';
import PreviewFormModal from '../components/PreviewFormModal/PreviewFormModal';
import { useParams } from 'react-router-dom';
import { eventFormService } from '../../../services/eventFormService';


const ALL_STANDARD_FIELDS: Field[] = [
    { id: -1, systemName: 'salutation', label: 'Salutation', fieldType: 'text', required: false, editable: true, deletable: true },
    { id: -2, systemName: 'firstName', label: 'First Name', fieldType: 'text', required: true, editable: true, deletable: true },
    { id: -3, systemName: 'lastName', label: 'Last Name', fieldType: 'text', required: true, editable: true, deletable: true },
    { id: -4, systemName: 'fullName', label: 'Full Name', fieldType: 'text', required: false, editable: true, deletable: true },
    { id: -5, systemName: 'companyName', label: 'Company Name', fieldType: 'text', required: false, editable: true, deletable: true },
    { id: -6, systemName: 'jobTitle', label: 'Job Title', fieldType: 'text', required: false, editable: true, deletable: true },
    { id: -7, systemName: 'mobilePhone', label: 'Mobile Phone', fieldType: 'text', required: false, editable: true, deletable: true },
    { id: -8, systemName: 'email', label: 'Email Address', fieldType: 'email', required: true, editable: false, deletable: false, isFixed: true },
];

const RegistrationFormEditor: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const [fields, setFields] = useState<Field[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingFieldId, setEditingFieldId] = useState<number | null>(null);
    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    // Load form configuration on component mount
    useEffect(() => {
        if (eventId) {
            loadFormConfig();
        }
    }, [eventId]);

    const loadFormConfig = async () => {
        if (!eventId) return;

        try {
            setIsLoading(true);
            const response = await eventFormService.getFormConfig(parseInt(eventId));

            // Combine standard fields and custom fields
            const standardFieldsInUse = response.standard_fields.filter((f: any) =>
                ['firstName', 'lastName', 'email'].includes(f.systemName)
            );

            const allFields = [
                ...standardFieldsInUse,
                ...response.custom_fields
            ];

            setFields(allFields);
        } catch (error) {
            console.error('Error loading form config:', error);
            // Fallback to default fields
            setFields(ALL_STANDARD_FIELDS.filter(f => ['firstName', 'lastName', 'email'].includes(f.systemName!)));
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleStandardField = (systemName: string, isChecked: boolean) => {
        if (isChecked) {
            const fieldToAdd = ALL_STANDARD_FIELDS.find(f => f.systemName === systemName);
            if (fieldToAdd) {
                setFields(prev => [...prev, { ...fieldToAdd }]);
            }
        } else {
            // Don't allow removing required fields
            if (systemName === 'firstName' || systemName === 'lastName' || systemName === 'email') {
                return;
            }
            setFields(prev => prev.filter(f => f.systemName !== systemName));
        }
    };

    const handleAddCustomField = (fieldType: FieldType) => {
        const newId = Date.now();
        let newField: Field;

        switch (fieldType) {
            case 'multichoice':
            case 'checkbox':
                newField = {
                    id: newId,
                    label: 'New Multiple Choice',
                    fieldType,
                    required: false,
                    editable: true,
                    deletable: true,
                    options: ['Option 1', 'Option 2']
                };
                break;
            case 'paragraph':
                newField = {
                    id: newId,
                    label: 'This is some descriptive text.',
                    fieldType,
                    required: false,
                    editable: true,
                    deletable: true
                };
                break;
            case 'header':
                newField = {
                    id: newId,
                    label: 'Section Header',
                    fieldType,
                    required: false,
                    editable: true,
                    deletable: true
                };
                break;
            default:
                newField = {
                    id: newId,
                    label: `New ${fieldType} Field`,
                    fieldType,
                    required: false,
                    editable: true,
                    deletable: true
                };
                break;
        }
        setFields(prev => [...prev, newField]);
        setEditingFieldId(newId);
    };

    const handleUpdateField = (updatedField: Field) => {
        setFields(prev => prev.map(f => (f.id === updatedField.id ? updatedField : f)));
    };

    const handleDeleteField = (id: number) => {
        // Don't allow deleting required fields
        const fieldToDelete = fields.find(f => f.id === id);
        if (fieldToDelete?.systemName && ['firstName', 'lastName', 'email'].includes(fieldToDelete.systemName)) {
            return;
        }
        setFields(prev => prev.filter(f => f.id !== id));
    };

    const handleMoveField = (index: number, direction: 'up' | 'down') => {
        const newFields = [...fields];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newFields.length) return;

        // Don't allow moving fixed fields
        if (newFields[index].isFixed || newFields[targetIndex].isFixed) return;

        [newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]];
        setFields(newFields);
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

    const handleSaveChanges = async () => {
        if (!eventId) return;

        setIsSaving(true);
        try {
            await eventFormService.saveFormConfig(parseInt(eventId), fields);
            alert('Form configuration saved successfully!');
        } catch (error) {
            console.error('Error saving form config:', error);
            alert('Failed to save form configuration. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading form configuration...</div>;
    }

    return (
        <>
            <PreviewFormModal
                isOpen={isPreviewModalOpen}
                onClose={() => setIsPreviewModalOpen(false)}
                fields={fields}
            />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-dark-text">Customize Registration Form</h2>

                    {eventId && (
                        <span className="text-sm text-gray-500">
                            (For Event ID: <span className="font-mono bg-gray-100 p-1 rounded">{eventId}</span>)
                        </span>
                    )}

                    <button
                        onClick={() => setIsPreviewModalOpen(true)}
                        className="font-semibold text-primary-blue text-sm hover:underline"
                    >
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

                <div className="mt-8 pt-6 border-t flex justify-center">
                    <button
                        onClick={handleSaveChanges}
                        className="bg-green-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                        disabled={isSaving}
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default RegistrationFormEditor;
