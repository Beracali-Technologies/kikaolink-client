import React, { useMemo, useState } from 'react';
import { Attendee } from '../SmsTypes';

interface Props {
  attendees: Attendee[];               // all attendees list from API
  selected: string[];                  // currently selected IDs
  onChange: (selectedIds: string[]) => void; // update selected
  quickFilter?: 'all' | 'checkedIn' | 'absent' | null; // optional external filter
}

const RecipientSelector: React.FC<Props> = ({ attendees, selected, onChange, quickFilter = null }) => {
  const [query, setQuery] = useState('');
  const [onlyCheckedVisible, setOnlyCheckedVisible] = useState(false);

  // Filter attendees by search + quickFilter
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return attendees.filter(a => {
      if (quickFilter === 'checkedIn' && a.status !== 'checkedIn') return false;
      if (quickFilter === 'absent' && a.status !== 'absent') return false;
      if (!q) return true;
      return (a.name + ' ' + (a.phone || '')).toLowerCase().includes(q);
    });
  }, [attendees, query, quickFilter]);

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

  return (
    <div className="flex flex-col h-full">
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSelectAll}
            className={`text-sm px-3 py-1 rounded-md border ${isAllSelected ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-200'}`}
            title={isAllSelected ? 'Deselect all visible' : 'Select all visible'}
          >
            {isAllSelected ? 'Unselect all' : 'Select all'}
          </button>
          <div className="text-xs text-gray-500 ml-auto">Visible: {filtered.length}</div>
        </div>
        <input
          placeholder="Search attendees..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="mt-3 w-full p-2 border rounded-md text-sm focus:ring-red-400 focus:border-red-400"
        />
      </div>

      <div className="flex-1 overflow-auto border rounded-md bg-white">
        {/* list header */}
        <div className="sticky top-0 bg-white z-10 px-3 py-2 border-b flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-700">Attendees</div>
          <div className="text-xs text-gray-500">{selected.length} selected</div>
        </div>

        {/* list */}
        <ul className="divide-y">
          {filtered.length === 0 && (
            <li className="p-4 text-sm text-gray-500">No attendees match your search.</li>
          )}

          {filtered.map(a => {
            const checked = selected.includes(a.id);
            return (
              <li key={a.id} className="p-3 hover:bg-gray-50 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleOne(a.id)}
                  className="h-4 w-4 text-red-600 border-gray-300 rounded"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="truncate text-sm font-medium text-gray-800">{a.name}</div>
                    <div className="text-xs text-gray-400">{a.status === 'checkedIn' ? 'Checked-in' : 'Absent'}</div>
                  </div>
                  <div className="text-xs text-gray-500 truncate">{a.phone || '—'}</div>
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
