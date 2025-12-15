import React, { useState, useEffect } from 'react';
import { FiX, FiSave, FiMail, FiPhone, FiBriefcase, FiUser, FiFileText } from 'react-icons/fi';
import { Attendee } from '@/types';
import { useAttendeeActions } from '@/lib/hooks/attendees/useAttendeeActions';

interface EditAttendeeModalProps {
  attendee: Attendee | null;
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  onSuccess: () => void;
}

const EditAttendeeModal: React.FC<EditAttendeeModalProps> = ({ 
  attendee, 
  isOpen, 
  onClose, 
  eventId, 
  onSuccess 
}) => {
  const { updateAttendee, loading } = useAttendeeActions(eventId);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile_phone: '',
    company_name: '',
    job_title: '',
    custom_fields: {} as Record<string, any>
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [customFieldKey, setCustomFieldKey] = useState('');
  const [customFieldValue, setCustomFieldValue] = useState('');

  // Initialize form data when attendee changes
  useEffect(() => {
    if (attendee) {
      setFormData({
        first_name: attendee.first_name || '',
        last_name: attendee.last_name || '',
        email: attendee.email || '',
        mobile_phone: attendee.phone || '',
        company_name: attendee.company || '',
        job_title: attendee.job_title || '',
        custom_fields: attendee.custom_fields || {}
      });
      setErrors({});
    }
  }, [attendee]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !attendee?.id) return;

    try {
      // Prepare data for API
      const updateData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        mobile_phone: formData.mobile_phone,
        company_name: formData.company_name,
        job_title: formData.job_title,
        custom_fields: Object.keys(formData.custom_fields).length > 0 
          ? formData.custom_fields 
          : null
      };

      await updateAttendee(Number(attendee.id), updateData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to update attendee:', error);
      setErrors({ submit: 'Failed to update attendee. Please try again.' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddCustomField = () => {
    if (!customFieldKey.trim() || !customFieldValue.trim()) return;
    
    const key = customFieldKey.trim().toLowerCase().replace(/\s+/g, '_');
    setFormData(prev => ({
      ...prev,
      custom_fields: {
        ...prev.custom_fields,
        [key]: customFieldValue.trim()
      }
    }));
    
    setCustomFieldKey('');
    setCustomFieldValue('');
  };

  const handleRemoveCustomField = (key: string) => {
    const newCustomFields = { ...formData.custom_fields };
    delete newCustomFields[key];
    setFormData(prev => ({ ...prev, custom_fields: newCustomFields }));
  };

  const handleCustomFieldKeyChange = (oldKey: string, newKey: string) => {
    if (!newKey.trim()) return;
    
    const normalizedKey = newKey.trim().toLowerCase().replace(/\s+/g, '_');
    const newCustomFields = { ...formData.custom_fields };
    const value = newCustomFields[oldKey];
    
    delete newCustomFields[oldKey];
    newCustomFields[normalizedKey] = value;
    
    setFormData(prev => ({ ...prev, custom_fields: newCustomFields }));
  };

  const handleCustomFieldValueChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      custom_fields: {
        ...prev.custom_fields,
        [key]: value
      }
    }));
  };

  if (!isOpen || !attendee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiUser className="text-blue-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Edit Attendee</h2>
              <p className="text-gray-600 text-sm mt-1">
                Update attendee information for {attendee.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <FiUser size={18} />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.first_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John"
                />
                {errors.first_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.last_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Doe"
                />
                {errors.last_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <FiMail size={18} />
              Contact Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="flex items-center gap-2">
                  <FiPhone className="text-gray-400" size={18} />
                  <input
                    type="tel"
                    name="mobile_phone"
                    value={formData.mobile_phone}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+255123456789"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <FiBriefcase size={18} />
              Professional Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Example Corp"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Software Engineer"
                />
              </div>
            </div>
          </div>

          {/* Custom Fields */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <FiFileText size={18} />
              Additional Information (Custom Fields)
            </h3>
            
            {/* Add new custom field */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Add Custom Field</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={customFieldKey}
                  onChange={(e) => setCustomFieldKey(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Field name (e.g., dietary_restrictions)"
                />
                <input
                  type="text"
                  value={customFieldValue}
                  onChange={(e) => setCustomFieldValue(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Field value"
                />
                <button
                  type="button"
                  onClick={handleAddCustomField}
                  disabled={!customFieldKey.trim() || !customFieldValue.trim()}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Field
                </button>
              </div>
            </div>

            {/* Existing custom fields */}
            {Object.keys(formData.custom_fields).length > 0 && (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-700">Current Custom Fields</p>
                </div>
                <div className="divide-y divide-gray-200">
                  {Object.entries(formData.custom_fields).map(([key, value]) => (
                    <div key={key} className="px-4 py-3 flex items-center justify-between group">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={key}
                          onChange={(e) => handleCustomFieldKeyChange(key, e.target.value)}
                          className="px-2 py-1 border border-transparent rounded focus:border-gray-300 focus:bg-white"
                          placeholder="Field key"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleCustomFieldValueChange(key, e.target.value)}
                          className="px-2 py-1 border border-transparent rounded focus:border-gray-300 focus:bg-white"
                          placeholder="Field value"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomField(key)}
                        className="ml-4 p-1.5 text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Error Display */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{errors.submit}</p>
            </div>
          )}
        </form>

        {/* Actions */}
        <div className="p-6 border-t border-gray-200 flex justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Discard Changes
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <FiSave size={16} />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAttendeeModal;