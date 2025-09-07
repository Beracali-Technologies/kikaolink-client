
import React from 'react';
import { Field } from '@/types/form';

interface StandardFieldsPanelProps {
    allStandardFields: Field[];
    activeFields: Field[];
    onToggle: (systemName: string, isChecked: boolean) => void;
}

const StandardFieldsPanel: React.FC<StandardFieldsPanelProps> = ({ allStandardFields, activeFields, onToggle }) => {
    return (
        <div>
            <h4 className="font-semibold text-dark-text mb-3">Standard Fields</h4>
            <div className="space-y-3">
                {allStandardFields.map(standardField => {
                    const { systemName, label } = standardField;
                    if (!systemName) return null;

                    const isChecked = activeFields.some(af => af.systemName === systemName);

                    return (
                        <div key={systemName} className="flex items-center">
                            <input
                                id={`sf-${systemName}`}
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => onToggle(systemName, e.target.checked)}
                                className="h-5 w-5 rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
                            />
                            <label htmlFor={`sf-${systemName}`} className="ms-3 block text-sm font-medium text-gray-800">{label}</label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StandardFieldsPanel;
