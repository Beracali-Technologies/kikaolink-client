import React from 'react';

// Icons for the form builder
const EditIcon = () => <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;
const GripIcon = () => <svg className="w-5 h-5 text-gray-400 cursor-grab" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;

const mockFields = [
    { id: 1, label: 'First Name', required: true, editable: false },
    { id: 2, label: 'Last Name', required: true, editable: false },
    { id: 3, label: 'Full Name', required: false, editable: true },
    { id: 4, label: 'Email', required: true, editable: false },
    { id: 5, label: 'Company Name', required: false, editable: true },
    { id: 6, label: 'Job Title', required: false, editable: true },
    { id: 7, label: 'Guest Category', required: false, editable: true },
];

const standardFields = [
    { id: 'sf1', label: 'Salutation' },
    { id: 'sf2', label: 'First Name', enabled: true },
    { id: 'sf3', label: 'Last Name', enabled: true },
    { id: 'sf4', label: 'Full Name', enabled: true },
    { id: 'sf5', label: 'Company Name', enabled: true },
    { id: 'sf6', label: 'Job Title', enabled: true },
    // more fields
];


const RegistrationFormEditor: React.FC = () => {
    return (
        <div className="flex gap-8">
            {/* Left Side: Form Fields */}
            <div className="flex-grow">
                 <h3 className="font-semibold text-lg mb-4">Customize Registration Form Fields</h3>
                 <div className="space-y-3">
                     {mockFields.map(field => (
                         <div key={field.id} className="bg-gray-50 p-3 rounded-md flex items-center justify-between border">
                            <div className="flex items-center gap-3">
                                 <GripIcon />
                                 <span className="font-medium text-dark-text">{field.label}{field.required && <span className="text-red-500">*</span>}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                 {field.editable && (
                                     <button className="p-1 hover:bg-gray-200 rounded-full"><EditIcon /></button>
                                 )}
                                <label className="inline-flex items-center cursor-pointer">
                                  <input type="checkbox" defaultChecked className="sr-only peer" />
                                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                         </div>
                     ))}
                 </div>
                  <button className="mt-6 text-sm font-semibold text-primary-blue hover:underline">+ Add Custom Field</button>
            </div>
            {/* Right Side: Standard Fields */}
            <aside className="w-64 flex-shrink-0 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-dark-text">Standard Fields</h4>
                 <div className="mt-4 space-y-3">
                    {standardFields.map(sf => (
                         <div key={sf.id} className="flex items-center">
                           <input type="checkbox" defaultChecked={sf.enabled} className="h-4 w-4 rounded border-gray-300 text-primary-blue focus:ring-primary-blue" />
                           <label className="ms-2 block text-sm text-gray-900">{sf.label}</label>
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
};

export default RegistrationFormEditor;
