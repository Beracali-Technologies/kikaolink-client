import React from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';
import { useAttendeeActions } from '@/lib/hooks/attendees/useAttendeeActions';

interface DeleteConfirmationModalProps {
  attendeeId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  eventId: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  attendeeId,
  isOpen,
  onClose,
  onSuccess,
  eventId
}) => {
  const { deleteAttendee, loading } = useAttendeeActions(eventId);

  const handleDelete = async () => {
    if (!attendeeId) return;

    try {
      await deleteAttendee(attendeeId);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to delete attendee:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <FiAlertTriangle className="text-red-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Delete Attendee</h2>
              <p className="text-gray-600 text-sm mt-1">This action cannot be undone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700">
            Are you sure you want to delete this attendee? All associated data will be permanently removed.
          </p>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Delete Attendee'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;