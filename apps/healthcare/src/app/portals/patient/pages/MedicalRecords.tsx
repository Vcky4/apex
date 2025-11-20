import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

interface MedicalRecord {
  id: number;
  type: 'Visit Summary' | 'Lab Result' | 'Imaging' | 'Immunization';
  date: string;
  provider: string;
  title: string;
  description: string;
}

export default function MedicalRecords() {
  const { toasts, showToast, removeToast } = useToast();
  const [selectedType, setSelectedType] = useState<string>('All');

  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: 1,
      type: 'Visit Summary',
      date: '2025-01-18',
      provider: 'Dr. Sarah Johnson',
      title: 'Annual Check-up',
      description: 'Routine physical examination. All vitals normal.',
    },
    {
      id: 2,
      type: 'Lab Result',
      date: '2025-01-15',
      provider: 'Lab',
      title: 'Complete Blood Count',
      description: 'All values within normal range.',
    },
    {
      id: 3,
      type: 'Immunization',
      date: '2024-12-01',
      provider: 'Dr. Michael Chen',
      title: 'Flu Vaccine',
      description: 'Influenza vaccine administered.',
    },
  ]);

  const filteredRecords = selectedType === 'All' 
    ? records 
    : records.filter(r => r.type === selectedType);

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Medical Records</h1>
        <p className="text-gray-600 mt-2">Personal health history, lab and test results, immunization records, visit summaries</p>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Medical Records</h2>
          <div className="flex space-x-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="All">All Records</option>
              <option value="Visit Summary">Visit Summaries</option>
              <option value="Lab Result">Lab Results</option>
              <option value="Imaging">Imaging</option>
              <option value="Immunization">Immunizations</option>
            </select>
            <Button onClick={() => showToast('Downloading medical records...', 'info')}>Download All</Button>
          </div>
        </div>
        <div className="space-y-4">
          {filteredRecords.map((record) => (
            <div key={record.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-900">{record.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{record.type} • {record.provider}</div>
                  <div className="text-sm text-gray-700 mt-2">{record.description}</div>
                  <div className="text-xs text-gray-500 mt-2">Date: {record.date}</div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => showToast(`Viewing ${record.title}...`, 'info')}>View</Button>
                  <Button size="sm" variant="outline" onClick={() => showToast(`Downloading ${record.title}...`, 'info')}>Download</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        <Card>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-blue-600">{records.filter(r => r.type === 'Visit Summary').length}</div>
            <p className="text-sm text-gray-600 mt-1">Visit Summaries</p>
          </div>
        </Card>
        <Card>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-green-600">{records.filter(r => r.type === 'Lab Result').length}</div>
            <p className="text-sm text-gray-600 mt-1">Lab Results</p>
          </div>
        </Card>
        <Card>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-purple-600">{records.filter(r => r.type === 'Immunization').length}</div>
            <p className="text-sm text-gray-600 mt-1">Immunizations</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
