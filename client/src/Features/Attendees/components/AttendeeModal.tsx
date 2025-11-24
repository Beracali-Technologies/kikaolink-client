import React from 'react';
import { FiX, FiMail, FiPhone, FiCalendar, FiMapPin, FiBriefcase, FiPrinter, FiCheck, FiClock } from 'react-icons/fi';
import { Attendee } from '@/types';
import { useAttendeeActions } from '@/lib/hooks/attendees/useAttendeeActions';

interface AttendeeModalProps {
  attendee: Attendee | null;
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
}

const AttendeeModal: React.FC<AttendeeModalProps> = ({ attendee, isOpen, onClose, eventId }) => {
  const { resendQR, printBadges, loading } = useAttendeeActions(eventId);

  if (!isOpen || !attendee) return null;

  const handleResendQR = async () => {
    try {
      // Add null check for attendee.id
      if (!attendee.id) {
        console.error('Attendee ID is undefined');
        return;
      }
      await resendQR(attendee.id);
      // Show success message
    } catch (error) {
      console.error('Failed to resend QR:', error);
    }
  };

  const handlePrintBadge = async () => {
    try {
      // Add null check for attendee.id
      if (!attendee.id) {
        console.error('Attendee ID is undefined');
        return;
      }
      await printBadges([attendee.id]);
    } catch (error) {
      console.error('Failed to print badge:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
          {/* Status and Actions */}
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                attendee.status === 'checkedIn'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {attendee.status === 'checkedIn' ? (
                <>
                  <FiCheck className="mr-1" size={16} />
                  Checked In
                </>
              ) : (
                <>
                  <FiClock className="mr-1" size={16} />
                  Not Checked In
                </>
              )}
            </span>

            <div className="flex gap-2">
              <button
                onClick={handleResendQR}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm disabled:opacity-50"
              >
                <FiMail size={14} />
                Resend QR
              </button>
              <button
                onClick={handlePrintBadge}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm disabled:opacity-50"
              >
                <FiPrinter size={14} />
                Print Badge
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          {/* Registration Details */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center gap-3">
              <FiCalendar className="text-gray-400" size={18} />
              <div>
                <div className="text-sm text-gray-600">Registered</div>
                <div className="text-gray-900">
                  {attendee.created_at ? new Date(attendee.created_at).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            </div>
            {attendee.checked_in_at && (
              <div className="flex items-center gap-3 mt-3">
                <FiCheck className="text-green-500" size={18} />
                <div>
                  <div className="text-sm text-gray-600">Checked In</div>
                  <div className="text-gray-900">
                    {new Date(attendee.checked_in_at).toLocaleDateString()} at{' '}
                    {new Date(attendee.checked_in_at).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Custom Fields */}
          {attendee.custom_fields && Object.keys(attendee.custom_fields).length > 0 && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium text-gray-900 mb-4">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(attendee.custom_fields).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-sm text-gray-600 capitalize">
                      {key.replace(/_/g, ' ')}
                    </div>
                    <div className="text-gray-900">{String(value)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendeeModal;