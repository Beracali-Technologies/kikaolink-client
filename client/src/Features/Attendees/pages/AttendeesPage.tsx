import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FiUsers, FiCheckCircle, FiClock, FiPhone } from 'react-icons/fi';
import AttendeesList from '../components/AttendeesList';
import AttendeeModal from '../components/AttendeeModal';
import { Attendee } from '@/types';
import { useAttendees } from '@/lib/hooks/attendees/useAttendees';

const AttendeesPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const location = useLocation();
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debug to see what eventId we're getting
  useEffect(() => {
    console.log('Current eventId:', eventId);
    console.log('Current pathname:', location.pathname);
  }, [eventId, location.pathname]);

  const { counts, loading: countsLoading } = useAttendees(eventId!);

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

  const handleViewAttendee = (attendee: Attendee) => {
    setSelectedAttendee(attendee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAttendee(null);
  };

  // Show loading if eventId is not available yet
  if (!eventId) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto mb-4"></div>
              <div className="text-gray-600">Loading event data...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Attendee Management</h1>
          <p className="text-gray-600 mt-2">
            Manage attendees, check-ins, and communications for event: {eventId}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={stat.color} size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <AttendeesList
          eventId={eventId}
          onViewAttendee={handleViewAttendee}
        />

        {/* Attendee Modal */}
        <AttendeeModal
          attendee={selectedAttendee}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          eventId={eventId}
        />
      </div>
    </div>
  );
};

export default AttendeesPage;
