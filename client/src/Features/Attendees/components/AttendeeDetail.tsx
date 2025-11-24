import React from 'react';
import { FiX, FiMail, FiPhone, FiCalendar, FiMapPin, FiBriefcase } from 'react-icons/fi';
import { Attendee } from '@/types';

interface AttendeeDetailProps {
  attendee: Attendee;
  isOpen: boolean;
  onClose: () => void;
}

const AttendeeDetail: React.FC<AttendeeDetailProps> = ({ attendee, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{attendee.name}</h2>
            <p className="text-gray-600 text-sm mt-1">{attendee.job_title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                attendee.isCheckedIn
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {attendee.isCheckedIn ? 'Checked In' : 'Not Checked In'}
            </span>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Contact Information</h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FiMail className="text-gray-400" size={18} />
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="text-gray-900">{attendee.email}</div>
                </div>
              </div>

              {attendee.phone && (
                <div className="flex items-center gap-3">
                  <FiPhone className="text-gray-400" size={18} />
                  <div>
                    <div className="text-sm text-gray-600">Phone</div>
                    <div className="text-gray-900">{attendee.phone}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Professional Information</h3>

            <div className="space-y-3">
              {attendee.company && (
                <div className="flex items-center gap-3">
                  <FiBriefcase className="text-gray-400" size={18} />
                  <div>
                    <div className="text-sm text-gray-600">Company</div>
                    <div className="text-gray-900">{attendee.company}</div>
                  </div>
                </div>
              )}

              {attendee.job_title && (
                <div className="flex items-center gap-3">
                  <FiMapPin className="text-gray-400" size={18} />
                  <div>
                    <div className="text-sm text-gray-600">Job Title</div>
                    <div className="text-gray-900">{attendee.job_title}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Registration Date */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <FiCalendar className="text-gray-400" size={18} />
            <div>
              <div className="text-sm text-gray-600">Registered</div>
              <div className="text-gray-900">
                {new Date(attendee.created_at!).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <FiMail size={16} />
              Email
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <FiPhone size={16} />
              SMS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeDetail;
