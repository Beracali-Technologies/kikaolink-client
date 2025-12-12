import React, { useState, useCallback } from 'react';
import { FiX, FiUpload, FiDownload } from 'react-icons/fi';
import * as XLSX from 'xlsx';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  onSuccess: () => void;
}

interface ExcelRow {
  'First Name'?: string;
  'Last Name'?: string;
  'Email'?: string;
  'Phone'?: string;
  'Company'?: string;
  'Job Title'?: string;
}

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, eventId, onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFile(file);
    setError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Validate and preview data
        const validatedData = jsonData.slice(0, 5).map((row: any) => ({
          'First Name': row['First Name'] || row['first_name'] || '',
          'Last Name': row['Last Name'] || row['last_name'] || '',
          'Email': row['Email'] || row['email'] || '',
          'Phone': row['Phone'] || row['phone'] || '',
          'Company': row['Company'] || row['company'] || '',
          'Job Title': row['Job Title'] || row['job_title'] || '',
        }));
        
        setPreview(validatedData);
      } catch (err) {
        setError('Invalid Excel file format');
      }
    };
    reader.readAsBinaryString(file);
  }, []);

  const handleImport = async () => {
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Format data for API
        const attendees = jsonData.map((row: any) => ({
          first_name: row['First Name'] || row['first_name'] || '',
          last_name: row['Last Name'] || row['last_name'] || '',
          email: row['Email'] || row['email'] || '',
          mobile_phone: row['Phone'] || row['phone'] || '',
          company_name: row['Company'] || row['company'] || '',
          job_title: row['Job Title'] || row['job_title'] || '',
        }));

        // Send to API - you'll need to implement this
        // await attendeeService.importAttendees(eventId, attendees);

        onSuccess();
        onClose();
        setFile(null);
        setPreview([]);
      };
      reader.readAsBinaryString(file);
    } catch (err) {
      setError('Failed to import file: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    const templateData = [
      {
        'First Name': 'John',
        'Last Name': 'Doe',
        'Email': 'john@example.com',
        'Phone': '+255123456789',
        'Company': 'Example Corp',
        'Job Title': 'Software Engineer'
      }
    ];
    
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'attendee_template.xlsx');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Import Attendees from Excel</h2>
            <p className="text-gray-600 text-sm mt-1">Upload an Excel file with attendee information</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Template Download */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-900">Download Template</h3>
                <p className="text-blue-700 text-sm mt-1">
                  Use our template to ensure proper formatting
                </p>
              </div>
              <button
                onClick={downloadTemplate}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiDownload size={16} />
                Download Template
              </button>
            </div>
          </div>

          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FiUpload className="mx-auto text-gray-400" size={48} />
            <p className="mt-4 text-gray-600">Drag & drop your Excel file here, or</p>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload" className="mt-4 inline-block px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 cursor-pointer">
              Browse Files
            </label>
            {file && (
              <p className="mt-3 text-sm text-gray-600">
                Selected: <span className="font-medium">{file.name}</span>
              </p>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Data Preview */}
          {preview.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Preview (first 5 rows)</h3>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">First Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {preview.map((row, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm">{row['First Name']}</td>
                        <td className="px-4 py-3 text-sm">{row['Last Name']}</td>
                        <td className="px-4 py-3 text-sm">{row['Email']}</td>
                        <td className="px-4 py-3 text-sm">{row['Phone']}</td>
                        <td className="px-4 py-3 text-sm">{row['Company']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Required Fields Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Required Fields</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <span className="font-medium">First Name</span> and <span className="font-medium">Last Name</span> are required</li>
              <li>• <span className="font-medium">Email</span> must be unique for each attendee</li>
              <li>• Other fields are optional</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={!file || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Importing...' : 'Import Attendees'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;