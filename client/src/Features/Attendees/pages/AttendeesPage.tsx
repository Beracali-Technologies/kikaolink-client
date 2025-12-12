import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiUsers, FiCheckCircle, FiClock, FiPhone, FiPlus, FiRefreshCw } from 'react-icons/fi';
import { useAttendees } from '@/lib/hooks/attendees/useAttendees';
import StatsGrid from '../components/StatsGrid';
import AttendeesTable from '../components/AttendeesTable';
import ActionBar from '../components/ActionBar';
import ImportModal from '../components/ImportModal';
import AddAttendeeModal from '../components/AddAttendeeModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const AttendeesPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [showImportModal, setShowImportModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [attendeeToDelete, setAttendeeToDelete] = useState<number | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // Key to force refresh

  const { 
    counts, 
    loading: countsLoading,
    refreshCounts,
    refetch: refetchAttendees
  } = useAttendees(eventId!, refreshKey); // Pass refreshKey to trigger refetch

  const handleRefresh = () => {
    // Increment refreshKey to force re-render of all components
    setRefreshKey(prev => prev + 1);
    refreshCounts();
    refetchAttendees();
  };

  const handleSuccess = () => {
    // Refresh after successful operation
    handleRefresh();
  };

  const stats = [
    {
      label: 'Total Attendees',
      value: countsLoading ? '...' : counts.all.toString(),
      icon: FiUsers,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    },
    {
      label: 'Checked In',
      value: countsLoading ? '...' : counts.checkedIn.toString(),
      icon: FiCheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Pending',
      value: countsLoading ? '...' : counts.absent.toString(),
      icon: FiClock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      label: 'With Phone',
      value: countsLoading ? '...' : counts.with_phone.toString(),
      icon: FiPhone,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendee Management</h1>
            <p className="text-gray-600 mt-2">
              Manage attendees, check-ins, and communications
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              disabled={countsLoading}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <FiRefreshCw size={16} className={countsLoading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Import Excel
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FiPlus size={16} />
              Add Attendee
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <StatsGrid stats={stats} />

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <ActionBar 
            eventId={eventId!} 
            onRefresh={handleRefresh}
            onImportClick={() => setShowImportModal(true)}
            onAddClick={() => setShowAddModal(true)}
          />
          
          <AttendeesTable 
            key={refreshKey} // Force re-render on refresh
            eventId={eventId!}
            onDeleteClick={setAttendeeToDelete}
            onRefresh={handleRefresh}
          />
        </div>
      </div>

      {/* Modals */}
      <ImportModal 
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        eventId={eventId!}
        onSuccess={handleSuccess}
      />

      <AddAttendeeModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        eventId={eventId!}
        onSuccess={handleSuccess}
      />

      <DeleteConfirmationModal 
        attendeeId={attendeeToDelete}
        isOpen={attendeeToDelete !== null}
        onClose={() => setAttendeeToDelete(null)}
        onSuccess={handleSuccess}
        eventId={eventId!}
      />
    </div>
  );
};

export default AttendeesPage;