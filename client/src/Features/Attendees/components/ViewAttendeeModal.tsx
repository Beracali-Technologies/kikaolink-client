import React, { useState } from 'react';
import { FiX, FiMail, FiPhone, FiBriefcase, FiCalendar, FiCheck, FiClock, FiRefreshCw } from 'react-icons/fi';
import { Attendee } from '@/types';
import { useAttendeeActions } from '@/lib/hooks/attendees/useAttendeeActions';

interface ViewAttendeeModalProps {
  attendee: Attendee | null;
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
}

const ViewAttendeeModal: React.FC<ViewAttendeeModalProps> = ({ attendee, isOpen, onClose, eventId }) => {
  const { resendQR, loading } = useAttendeeActions(eventId);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleResendEmail = async () => {
    if (!attendee?.id) return;

    setResendLoading(true);
    setResendMessage(null);

    try {
          //converting attendee.id to no
          const attendeeId = Number(attendee.id);
          await resendQR(attendeeId);
          setResendMessage({
                type: 'success',
                text: 'QR code email has been sent successfully!'
          });
    } catch (error) {
      console.error('Failed to resend email:', error);
      setResendMessage({
        type: 'error',
        text: 'Failed to send email. Please try again.'
      });
    } finally {
      setResendLoading(false);
    }
  };

  if (!isOpen || !attendee) return null;

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

        <div className="p-6 space-y-6">
          {/* Status */}
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
          </div>

          {/* Resend Message */}
          {resendMessage && (
            <div className={`p-3 rounded-lg ${resendMessage.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <p className="text-sm">{resendMessage.text}</p>
            </div>
          )}

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
                  <div className="w-5"></div>
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

          {/* Check-in Date */}
          {attendee.checked_in_at && (
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <FiCheck className="text-green-500" size={18} />
              <div>
                <div className="text-sm text-gray-600">Checked In At</div>
                <div className="text-gray-900">
                  {new Date(attendee.checked_in_at).toLocaleDateString()} at{' '}
                  {new Date(attendee.checked_in_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 space-y-3">
          {/* Resend Email Button */}
          <button
            onClick={handleResendEmail}
            disabled={resendLoading || loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {resendLoading ? (
              <>
                <FiRefreshCw className="animate-spin" size={16} />
                Sending...
              </>
            ) : (
              <>
                <FiMail size={16} />
                Resend QR Code Email
              </>
            )}
          </button>

          {/* Check In Button */}
          <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            {attendee.status === 'checkedIn' ? 'Check Out' : 'Check In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAttendeeModal;