import React, { useState, useEffect } from 'react';
import {
  FiSearch,
  FiCheck,
  FiX,
  FiDownload,
  FiPrinter,
  FiUser,
  FiEye,
  FiRefreshCw, FiPhone
} from 'react-icons/fi';
import { Attendee } from '@/types';
import { useAttendees } from '@/lib/hooks/attendees/useAttendees';
import { useAttendeeActions } from '@/lib/hooks/attendees/useAttendeeActions';

interface AttendeesListProps {
  eventId: string;
  onViewAttendee: (attendee: Attendee) => void;
}

const AttendeesList: React.FC<AttendeesListProps> = ({ eventId, onViewAttendee }) => {
  const {
    attendees,
    filteredAttendees,
    setFilteredAttendees,
    loading,
    error,
    counts,
    refetch,
    refreshCounts
  } = useAttendees(eventId);

  const { sendBulkSMS, printBadges } = useAttendeeActions(eventId);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'checkedIn' | 'absent'>('all');
  const [selectedAttendees, setSelectedAttendees] = useState<number[]>([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [smsMessage] = useState('Hello! This is a reminder for our event.');

  useEffect(() => {
    let filtered = attendees;

    if (searchTerm) {
      filtered = filtered.filter(attendee =>
        attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendee.company?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(attendee => attendee.status === statusFilter);
    }

    setFilteredAttendees(filtered);
  }, [searchTerm, statusFilter, attendees, setFilteredAttendees]);

  const handleSelectAttendee = (id: number) => {
    setSelectedAttendees(prev =>
      prev.includes(id) ? prev.filter(attendeeId => attendeeId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedAttendees.length === filteredAttendees.length) {
      setSelectedAttendees([]);
    } else {
      // Filter out any undefined IDs
      const validIds = filteredAttendees
        .map(a => a.id)
        .filter((id): id is number => id !== undefined);
      setSelectedAttendees(validIds);
    }
  };

  const handlePrintBadges = async () => {
    try {
      setActionLoading(true);
      await printBadges(selectedAttendees);
      setSelectedAttendees([]);
      // Show success message
      alert('Badges printed successfully!');
    } catch (error) {
      console.error('Failed to print badges:', error);
      alert('Failed to print badges. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendBulkSMS = async () => {
    try {
      setActionLoading(true);
      await sendBulkSMS(selectedAttendees, smsMessage);
      setSelectedAttendees([]);
      // Show success message
      alert('SMS sent successfully!');
    } catch (error) {
      console.error('Failed to send SMS:', error);
      alert('Failed to send SMS. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRefresh = async () => {
    await refetch();
    await refreshCounts();
  };

  const handleExportCSV = () => {
    // Simple CSV export implementation
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Job Title', 'Status'];
    const csvData = filteredAttendees.map(attendee => [
      attendee.name,
      attendee.email,
      attendee.phone || '',
      attendee.company || '',
      attendee.job_title || '',
      attendee.status === 'checkedIn' ? 'Checked In' : 'Not Checked In'
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendees-${eventId}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="text-red-600 mb-4">Error: {error}</div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors mx-auto"
        >
          <FiRefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header with Stats */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Attendees</h2>
            <p className="text-sm text-gray-600 mt-1">
              {filteredAttendees.length} attendees • {counts.checkedIn} checked in
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiDownload size={16} />
              Export CSV
            </button>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <FiRefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search attendees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white text-sm"
            >
              <option value="all">All Status</option>
              <option value="checkedIn">Checked In</option>
              <option value="absent">Not Checked In</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attendees Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedAttendees.length === filteredAttendees.length && filteredAttendees.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                  />
                  <span className="ml-3">Attendee</span>
                </div>
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
                    <input
                      type="checkbox"
                      checked={attendee.id ? selectedAttendees.includes(Number(attendee.id)) : false}
                      onChange={() => Number(attendee.id) && handleSelectAttendee(Number(attendee.id))}
                      className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                    />
                    <div className="ml-4">
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
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      attendee.status === 'checkedIn'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
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
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewAttendee(attendee)}
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                    >
                      <FiEye className="text-gray-600" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
          </div>
        ) : filteredAttendees.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <FiUser size={48} className="mx-auto" />
            </div>
            <div className="text-gray-500 text-lg">No attendees found</div>
            <div className="text-gray-400 text-sm mt-1">
              {searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'No attendees registered yet'}
            </div>
          </div>
        ) : null}
      </div>

      {/* Bulk Actions Bar */}
      {selectedAttendees.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4">
          <span className="text-sm">{selectedAttendees.length} attendees selected</span>
          <div className="flex gap-2">
            <button
              onClick={handleSendBulkSMS}
              disabled={actionLoading}
              className="flex items-center gap-2 px-3 py-1.5 bg-white text-gray-900 text-sm rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <FiPhone size={14} />
              SMS
            </button>
            <button
              onClick={handlePrintBadges}
              disabled={actionLoading}
              className="flex items-center gap-2 px-3 py-1.5 bg-white text-gray-900 text-sm rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <FiPrinter size={14} />
              Print Badges
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendeesList;