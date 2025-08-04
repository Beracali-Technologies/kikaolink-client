// StandardFieldsPanel.tsx
import React from 'react';
import { Field } from '../types';

interface StandardFieldsPanelProps {
    allStandardFields: Field[];
    activeFields: Field[];
    onToggle: (systemName: string, isChecked: boolean) => void;
}

const StandardFieldsPanel: React.FC<StandardFieldsPanelProps> = ({ allStandardFields, activeFields, onToggle }) => {
    return (
        <div>
            <h4 className="font-semibold text-dark-text mb-2">Standard Fields</h4>
            <div className="space-y-3">
                {allStandardFields.map(standardField => {
                    if (!standardField.systemName) return null; // Should not happen

                    const isChecked = activeFields.some(af => af.systemName === standardField.systemName);

                    return (
                        <div key={standardField.systemName} className="flex items-center">
                            <input
                                id={`sf-${standardField.systemName}`}
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => onToggle(standardField.systemName!, e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
                            />
                            <label htmlFor={`sf-${standardField.systemName}`} className="ms-2 block text-sm text-gray-900">{standardField.label}</label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StandardFieldsPanel;
