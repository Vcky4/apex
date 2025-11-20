import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

interface QCResult {
  id: number;
  test: string;
  date: string;
  result: string;
  status: 'Pass' | 'Fail' | 'Pending';
  action?: string;
}

export default function QualityAssurance() {
  const { toasts, showToast, removeToast } = useToast();
  const [showQCModal, setShowQCModal] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const [qcResults, setQcResults] = useState<QCResult[]>([
    { id: 1, test: 'Hematology Control', date: '2025-01-20', result: 'Within Range', status: 'Pass' },
    { id: 2, test: 'Chemistry Control', date: '2025-01-20', result: 'Out of Range', status: 'Fail', action: 'Calibration required' },
    { id: 3, test: 'Microbiology QC', date: '2025-01-19', result: 'Pending', status: 'Pending' },
  ]);

  const handleRunQC = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      test: '',
      result: '',
    });
    setShowQCModal(true);
  };

  const handleSaveQC = (e: React.FormEvent) => {
    e.preventDefault();
    const { test, date, result, status } = formData;
    
    if (!test || !result) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const newQC: QCResult = {
      id: Date.now(),
      test,
      date: date || new Date().toISOString().split('T')[0],
      result,
      status: status || 'Pass',
    };

    setQcResults([...qcResults, newQC]);
    
    if (status === 'Fail') {
      showToast(`⚠️ QC Failed for ${test}. Action required.`, 'warning');
    } else {
      showToast(`QC result recorded for ${test}`, 'success');
    }
    
    setShowQCModal(false);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Quality Assurance</h1>
        <p className="text-gray-600 mt-2">Daily QC performance, equipment calibration records, proficiency testing, compliance documentation</p>
      </div>

      <DashboardGrid columns={4}>
        <StatCard title="QC Pass Rate" value="95%" color="green" icon={<span className="text-2xl">✅</span>} />
        <StatCard title="Calibrations Due" value="2" color="orange" icon={<span className="text-2xl">🔧</span>} />
        <StatCard title="Proficiency Tests" value="4" color="blue" icon={<span className="text-2xl">📋</span>} />
        <StatCard title="Compliance Score" value="98%" color="purple" icon={<span className="text-2xl">📊</span>} />
      </DashboardGrid>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Quality Control Results</h2>
          <Button onClick={handleRunQC}>Run QC</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Result</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {qcResults.map((qc) => (
                <tr key={qc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{qc.test}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{qc.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{qc.result}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      qc.status === 'Pass' ? 'bg-green-100 text-green-800' :
                      qc.status === 'Fail' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {qc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{qc.action || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Equipment Calibration</h3>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="font-medium text-yellow-900">Centrifuge - Due</div>
              <div className="text-sm text-yellow-800 mt-1">Calibration due: January 25, 2025</div>
              <Button size="sm" className="mt-2" onClick={() => showToast('Scheduling calibration...', 'info')}>Schedule</Button>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-green-900">Analyzer - Current</div>
              <div className="text-sm text-green-800 mt-1">Last calibrated: January 15, 2025</div>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-4">Proficiency Testing</h3>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="font-medium text-blue-900">Next PT Event</div>
            <div className="text-sm text-blue-800 mt-2">Chemistry Panel - February 1, 2025</div>
            <Button size="sm" className="mt-3" onClick={() => showToast('Preparing proficiency test materials...', 'info')}>Prepare</Button>
          </div>
        </Card>
      </div>

      {/* Run QC Modal */}
      <Modal
        isOpen={showQCModal}
        onClose={() => {
          setShowQCModal(false);
          setFormData({});
        }}
        title="Run Quality Control"
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowQCModal(false);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Record QC</Button>
          </div>
        }
      >
        <form onSubmit={handleSaveQC} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">QC Test *</label>
            <select
              required
              value={formData.test || ''}
              onChange={(e) => setFormData({ ...formData, test: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="">Select Test</option>
              <option value="Hematology Control">Hematology Control</option>
              <option value="Chemistry Control">Chemistry Control</option>
              <option value="Microbiology QC">Microbiology QC</option>
              <option value="Coagulation Control">Coagulation Control</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={formData.date || ''}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Result *</label>
            <input
              type="text"
              required
              value={formData.result || ''}
              onChange={(e) => setFormData({ ...formData, result: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Within Range, Out of Range, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
            <select
              required
              value={formData.status || ''}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="">Select Status</option>
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}
