import React, { useState } from 'react';
import { FiUser, FiEye, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import { Attendee } from '@/types';
import { useAttendees } from '@/lib/hooks/attendees/useAttendees';
import { useAttendeeActions } from '@/lib/hooks/attendees/useAttendeeActions';
import ViewAttendeeModal from './ViewAttendeeModal';
import EditAttendeeModal from './EditAttendeeModal';

interface AttendeesTableProps {
  eventId: string;
  onDeleteClick: (id: number) => void;
}

const AttendeesTable: React.FC<AttendeesTableProps> = ({ eventId, onDeleteClick }) => {
  const { attendees, filteredAttendees, loading } = useAttendees(eventId);
  const { updateAttendee } = useAttendeeActions(eventId);
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);
  const [editAttendee, setEditAttendee] = useState<Attendee | null>(null);

  const handleToggleCheckIn = async (attendee: Attendee) => {
    try {
      await updateAttendee(attendee.id!, {
        ...attendee,
        status: attendee.status === 'checkedIn' ? 'absent' : 'checkedIn'
      });
    } catch (error) {
      console.error('Failed to toggle check-in:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attendee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAttendees.map((attendee) => (
              <tr key={attendee.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <FiUser className="text-gray-600" size={18} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{attendee.name}</div>
                      {attendee.job_title && (
                        <div className="text-sm text-gray-500">{attendee.job_title}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{attendee.email}</div>
                  {attendee.phone && (
                    <div className="text-sm text-gray-500">{attendee.phone}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{attendee.company || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleCheckIn(attendee)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      attendee.status === 'checkedIn'
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {attendee.status === 'checkedIn' ? (
                      <>
                        <FiCheck className="mr-1" size={12} />
                        Checked In
                      </>
                    ) : (
                      <>
                        <FiX className="mr-1" size={12} />
                        Not Checked In
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedAttendee(attendee)}
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-600"
                      title="View"
                    >
                      <FiEye size={16} />
                    </button>
                    <button
                      onClick={() => setEditAttendee(attendee)}
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-600"
                      title="Edit"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteClick(attendee.id!)}
                      className="p-1.5 hover:bg-red-50 rounded transition-colors text-red-600"
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAttendees.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <FiUser size={48} className="mx-auto" />
            </div>
            <div className="text-gray-500 text-lg">No attendees found</div>
            <div className="text-gray-400 text-sm mt-1">
              Add attendees manually or import from Excel
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ViewAttendeeModal 
        attendee={selectedAttendee}
        isOpen={!!selectedAttendee}
        onClose={() => setSelectedAttendee(null)}
        eventId={eventId}
      />

      <EditAttendeeModal 
        attendee={editAttendee}
        isOpen={!!editAttendee}
        onClose={() => setEditAttendee(null)}
        eventId={eventId}
        onSuccess={() => {
          setEditAttendee(null);
          // Refresh data
        }}
      />
    </>
  );
};

export default AttendeesTable;