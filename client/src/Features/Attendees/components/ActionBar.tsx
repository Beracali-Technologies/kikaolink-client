import React from 'react';
import { FiSearch, FiDownload, FiRefreshCw, FiPlus } from 'react-icons/fi';
import { useAttendees } from '@/lib/hooks/attendees/useAttendees';

interface ActionBarProps {
  eventId: string;
  onRefresh: () => void;
  onImportClick: () => void;
  onAddClick: () => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ 
  eventId, 
  onRefresh,
  onImportClick,
  onAddClick 
}) => {
  const { filteredAttendees, counts, loading } = useAttendees(eventId);

  const handleExportCSV = () => {
    // CSV export logic here
    console.log('Export CSV');
  };

  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-4">
          <div className="relative max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search attendees..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            {filteredAttendees.length} of {counts.all} attendees
          </span>
          
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FiDownload size={16} />
            Export
          </button>
          
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <FiRefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          
          <button
            onClick={onImportClick}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Import Excel
          </button>
          
          <button
            onClick={onAddClick}
            className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FiPlus size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;