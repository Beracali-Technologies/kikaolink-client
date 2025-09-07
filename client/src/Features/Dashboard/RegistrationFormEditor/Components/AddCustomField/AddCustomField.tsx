// AddCustomField.tsx
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FieldType } from '@/types/form';

// Icons for the dropdown menu for better UX
const PlusIcon = () => <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const ChevronDownIcon = () => <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;

const fieldOptions: { label: string; type: FieldType }[] = [
    { label: 'Single Line Text', type: 'text' },
    { label: 'Multi Line Text', type: 'textarea' },
    { label: 'Multiple Choice', type: 'multichoice' },
    { label: 'Checkboxes', type: 'checkbox' },
    { label: 'Country List', type: 'country' },
    { label: 'Date', type: 'date' },
    { label: 'Paragraph', type: 'paragraph' },
    { label: 'Section Header', type: 'header' },
];

interface AddCustomFieldProps {
    onAddField: (fieldType: FieldType) => void;
}

const AddCustomField: React.FC<AddCustomFieldProps> = ({ onAddField }) => {
    return (
        <Menu as="div" className="relative inline-block text-left w-full">
            <div>
                <Menu.Button className="inline-flex w-full justify-center items-center rounded-md bg-primary-blue px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-blue-hover">
                    <PlusIcon />
                    Add Custom Field
                    <ChevronDownIcon />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {fieldOptions.map((option) => (
                            <Menu.Item key={option.type}>
                                {({ active }) => (
                                    <button
                                        onClick={() => onAddField(option.type)}
                                        className={`${
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                                    >
                                        {option.label}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default AddCustomField;
