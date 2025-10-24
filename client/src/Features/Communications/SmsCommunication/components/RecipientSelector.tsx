import React, { useMemo, useState } from 'react';
import { Attendee } from '../SmsTypes';

interface Props {
  attendees: Attendee[];               // all attendees list from API
  selected: string[];                  // currently selected IDs
  onChange: (selectedIds: string[]) => void; // update selected
  quickFilter?: 'all' | 'checkedIn' | 'absent' | 'with_phone' | null; // optional external filter
}

const RecipientSelector: React.FC<Props> = ({ attendees, selected, onChange, quickFilter = null }) => {
  const [query, setQuery] = useState('');
  const [localFilter, setLocalFilter] = useState<'all' | 'checkedIn' | 'absent' | 'with_phone'>('all');

  // Use the prop filter if provided, otherwise use local filter
  const activeFilter = quickFilter || localFilter;

  // Filter attendees by search + active filter
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return attendees.filter(a => {
      // Apply status filter
      if (activeFilter === 'checkedIn' && a.status !== 'checkedIn') return false;
      if (activeFilter === 'absent' && a.status !== 'absent') return false;
      if (activeFilter === 'with_phone' && !a.has_phone) return false;

      // Apply search filter
      if (!q) return true;
      return (a.name + ' ' + (a.phone || '') + ' ' + (a.company || '')).toLowerCase().includes(q);
    });
  }, [attendees, query, activeFilter]);

  const isAllSelected = filtered.length > 0 && filtered.every(a => selected.includes(a.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      // deselect filtered
      onChange(selected.filter(id => !filtered.some(f => f.id === id)));
    } else {
      // add all filtered
      const toAdd = filtered.map(f => f.id).filter(id => !selected.includes(id));
      onChange([...selected, ...toAdd]);
    }
  };

  const toggleOne = (id: string) => {
    if (selected.includes(id)) onChange(selected.filter(s => s !== id));
    else onChange([...selected, id]);
  };

  // Filter counts for the local filter buttons
  const filterCounts = useMemo(() => ({
    all: attendees.length,
    checkedIn: attendees.filter(a => a.status === 'checkedIn').length,
    absent: attendees.filter(a => a.status === 'absent').length,
    with_phone: attendees.filter(a => a.has_phone).length,
  }), [attendees]);

  return (
    <div className="flex flex-col h-full">
      {/* Filter Buttons */}
      <div className="mb-3 space-y-2">
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setLocalFilter('all')}
            className={`text-xs px-2 py-1 rounded-md border ${
              activeFilter === 'all' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            All ({filterCounts.all})
          </button>
          <button
            onClick={() => setLocalFilter('checkedIn')}
            className={`text-xs px-2 py-1 rounded-md border ${
              activeFilter === 'checkedIn' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            Checked-in ({filterCounts.checkedIn})
          </button>
          <button
            onClick={() => setLocalFilter('absent')}
            className={`text-xs px-2 py-1 rounded-md border ${
              activeFilter === 'absent' ? 'bg-yellow-600 text-white border-yellow-600' : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            Absent ({filterCounts.absent})
          </button>
          <button
            onClick={() => setLocalFilter('with_phone')}
            className={`text-xs px-2 py-1 rounded-md border ${
              activeFilter === 'with_phone' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            With Phone ({filterCounts.with_phone})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSelectAll}
            className={`text-sm px-3 py-1 rounded-md border ${
              isAllSelected ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-200'
            }`}
            title={isAllSelected ? 'Deselect all visible' : 'Select all visible'}
          >
            {isAllSelected ? 'Unselect all' : 'Select all'}
          </button>
          <div className="text-xs text-gray-500 ml-auto">
            Showing: {filtered.length} / Selected: {selected.length}
          </div>
        </div>

        <input
          placeholder="Search by name, phone, or company..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full p-2 border rounded-md text-sm focus:ring-red-400 focus:border-red-400"
        />
      </div>

      {/* Attendees List */}
      <div className="flex-1 overflow-auto border rounded-md bg-white">
        {/* List header */}
        <div className="sticky top-0 bg-white z-10 px-3 py-2 border-b flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-700">
            {activeFilter === 'all' && 'All Attendees'}
            {activeFilter === 'checkedIn' && 'Checked-in Attendees'}
            {activeFilter === 'absent' && 'Absent Attendees'}
            {activeFilter === 'with_phone' && 'Attendees with Phone'}
          </div>
          <div className="text-xs text-gray-500">{selected.length} selected</div>
        </div>

        {/* List items */}
        <ul className="divide-y">
          {filtered.length === 0 && (
            <li className="p-4 text-sm text-gray-500 text-center">
              No attendees match your current filter and search.
            </li>
          )}

          {filtered.map(a => {
            const checked = selected.includes(a.id);
            return (
              <li key={a.id} className="p-3 hover:bg-gray-50 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleOne(a.id)}
                  className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="truncate text-sm font-medium text-gray-800">{a.name}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      a.status === 'checkedIn'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {a.status === 'checkedIn' ? 'Checked-in' : 'Absent'}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {a.phone || 'No phone'} • {a.company || 'No company'}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RecipientSelector;
