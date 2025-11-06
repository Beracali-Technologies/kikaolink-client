import React from 'react';
import { FormFieldItemProps } from './FormFieldItem.types';
import FieldRenderer from '../FieldRenderer/FieldRenderer';

// --- Icons ---
const GripIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const ArrowUpIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);
const ArrowDownIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);
const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);
const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const FormFieldItem: React.FC<FormFieldItemProps> = ({
  field, index, isEditing, isFirst, isLast, onUpdate, onDelete, onEdit, onMove, onDragStart, onDragOver, onDrop, onDragEnd,
}) => {
  return (
    <div
      draggable={!field.isFixed}
      onDragStart={() => onDragStart(index)}
      onDragOver={onDragOver}
      onDrop={() => onDrop(index)}
      onDragEnd={onDragEnd}
      className={`group bg-white p-5 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
        isEditing
          ? 'border-blue-400 ring-4 ring-blue-100 shadow-md'
          : 'border-gray-100 hover:border-blue-200'
      } ${field.isFixed ? 'bg-blue-50 border-blue-100' : ''}`}
    >
      <div className="flex items-start gap-4">
        {/* Drag Handle */}
        <div className={`flex-shrink-0 pt-1 ${field.isFixed ? 'text-blue-300 cursor-not-allowed' : 'text-gray-400 cursor-grab hover:text-gray-600 transition-colors'}`}>
          <GripIcon />
        </div>

        {/* Field Content */}
        <div className="flex-grow min-w-0">
          {/* Field Header */}
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {field.label}
            </h3>
            {field.required && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                Required
              </span>
            )}
            {field.isFixed && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                System Field
              </span>
            )}
          </div>

          {/* Field Type & Description */}
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700">
              {field.fieldType.charAt(0).toUpperCase() + field.fieldType.slice(1)} Field
            </span>
            <span className="text-sm text-gray-500">
              Attendees will {field.fieldType === 'paragraph' ? 'read text' : 'enter information'} here
            </span>
          </div>

          {/* Field Preview */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <FieldRenderer field={field} isEditing={isEditing} onUpdate={onUpdate} />
          </div>
        </div>

        {/* Controls - Right Side */}
        <div className="flex flex-col items-center gap-3 flex-shrink-0 pt-1">
          {/* Required Toggle */}

          {/* Required Toggle Switch */}
              <div className="flex flex-col items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={() => onUpdate({ ...field, required: !field.required })}
                        disabled={field.isFixed}
                        className="sr-only peer"
                      />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                  <span className="text-xs font-medium text-gray-600">
                      {field.required ? 'Required' : 'Optional'}
                  </span>
              </div>


          {/* Action Buttons */}
          <div className="flex flex-col gap-2 p-2 bg-gray-100 rounded-xl">
            {/* Move Up */}
            <button
              onClick={() => onMove(index, 'up')}
              disabled={isFirst || field.isFixed}
              className="p-2 text-gray-600 hover:bg-white hover:text-gray-800 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
              title="Move up"
            >
              <ArrowUpIcon />
            </button>

            {/* Move Down */}
            <button
              onClick={() => onMove(index, 'down')}
              disabled={isLast || field.isFixed}
              className="p-2 text-gray-600 hover:bg-white hover:text-gray-800 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
              title="Move down"
            >
              <ArrowDownIcon />
            </button>

            {/* Edit - Blue */}
            {field.editable && (
              <button
                onClick={() => onEdit(isEditing ? null : Number(field.id))}
                className="p-2 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all duration-200 hover:shadow-sm"
                title={isEditing ? "Save changes" : "Edit field"}
              >
                <EditIcon />
              </button>
            )}

            {/* Delete - Red */}
            {field.deletable && (
              <button
                onClick={() => onDelete(Number(field.id))}
                className="p-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200 hover:shadow-sm"
                title="Delete field"
              >
                <TrashIcon />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Field Status Bar */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Field ID: {field.id}
        </span>
        {field.systemName && (
          <span className="text-sm text-gray-500">
            System: {field.systemName}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormFieldItem;
