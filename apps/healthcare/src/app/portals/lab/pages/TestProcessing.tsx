import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../shared/Modal';
import { useToast, ToastContainer } from '../../shared/Toast';

interface TestRequest {
  id: number;
  patient: string;
  testType: string;
  orderedBy: string;
  orderDate: string;
  priority: 'Routine' | 'Stat' | 'Critical';
  status: 'Pending' | 'In Progress' | 'Completed';
  sampleReceived?: boolean;
}

export default function TestProcessing() {
  const { toasts, showToast, removeToast } = useToast();
  const [testRequests, setTestRequests] = useState<TestRequest[]>([
    { id: 1, patient: 'John Doe', testType: 'Complete Blood Count', orderedBy: 'Dr. Sarah Johnson', orderDate: '2025-01-20', priority: 'Routine', status: 'Pending', sampleReceived: false },
    { id: 2, patient: 'Jane Smith', testType: 'Lipid Panel', orderedBy: 'Dr. Michael Chen', orderDate: '2025-01-20', priority: 'Stat', status: 'In Progress', sampleReceived: true },
    { id: 3, patient: 'Bob Johnson', testType: 'Blood Culture', orderedBy: 'Dr. Emily Rodriguez', orderDate: '2025-01-19', priority: 'Critical', status: 'Pending', sampleReceived: false },
  ]);

  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState<TestRequest | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleReceiveSample = (test: TestRequest) => {
    setSelectedTest(test);
    setFormData({
      receivedTime: new Date().toTimeString().slice(0, 5),
      sampleCondition: 'Good',
    });
    setShowReceiveModal(true);
  };

  const handleSaveSampleReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTest) return;

    setTestRequests(testRequests.map(t => 
      t.id === selectedTest.id 
        ? { ...t, sampleReceived: true, status: 'In Progress' }
        : t
    ));

    showToast(`Sample received for ${selectedTest.testType}`, 'success');
    setShowReceiveModal(false);
    setSelectedTest(null);
    setFormData({});
  };

  const handleEnterResult = (test: TestRequest) => {
    setSelectedTest(test);
    setFormData({
      result: '',
      verifiedBy: '',
    });
    setShowResultModal(true);
  };

  const handleSaveResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTest) return;

    const { result, verifiedBy } = formData;
    if (!result) {
      showToast('Please enter test result', 'error');
      return;
    }

    setTestRequests(testRequests.map(t => 
      t.id === selectedTest.id 
        ? { ...t, status: 'Completed' }
        : t
    ));

    if (selectedTest.priority === 'Critical') {
      showToast(`⚠️ Critical result entered for ${selectedTest.patient}. Notifying ordering physician.`, 'warning');
    } else {
      showToast(`Test result entered for ${selectedTest.testType}`, 'success');
    }
    setShowResultModal(false);
    setSelectedTest(null);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Test Processing</h1>
        <p className="text-gray-600 mt-2">Sample reception and logging, test assignment and tracking, result entry and verification, turnaround time monitoring</p>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Test Requests</h2>
          <div className="text-sm text-gray-600">
            Pending: {testRequests.filter(t => t.status === 'Pending').length} | 
            In Progress: {testRequests.filter(t => t.status === 'In Progress').length}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ordered By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {testRequests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{test.patient}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{test.testType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{test.orderedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      test.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                      test.priority === 'Stat' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {test.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      test.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      test.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {!test.sampleReceived && (
                      <button onClick={() => handleReceiveSample(test)} className="text-blue-600 hover:text-blue-900 mr-3">Receive Sample</button>
                    )}
                    {test.status === 'In Progress' && (
                      <button onClick={() => handleEnterResult(test)} className="text-green-600 hover:text-green-900">Enter Result</button>
                    )}
                    {test.status === 'Completed' && (
                      <span className="text-gray-500">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Receive Sample Modal */}
      <Modal
        isOpen={showReceiveModal}
        onClose={() => {
          setShowReceiveModal(false);
          setSelectedTest(null);
          setFormData({});
        }}
        title={`Receive Sample: ${selectedTest?.testType}`}
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowReceiveModal(false);
              setSelectedTest(null);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Receive Sample</Button>
          </div>
        }
      >
        {selectedTest && (
          <form onSubmit={handleSaveSampleReceipt} className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900">Patient: {selectedTest.patient}</div>
              <div className="text-sm text-blue-800 mt-1">Test: {selectedTest.testType}</div>
              <div className="text-sm text-blue-800 mt-1">Priority: {selectedTest.priority}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sample Received Time *</label>
              <input
                type="time"
                required
                value={formData.receivedTime || ''}
                onChange={(e) => setFormData({ ...formData, receivedTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sample Condition *</label>
              <select
                required
                value={formData.sampleCondition || ''}
                onChange={(e) => setFormData({ ...formData, sampleCondition: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option value="">Select Condition</option>
                <option value="Good">Good</option>
                <option value="Hemolyzed">Hemolyzed</option>
                <option value="Clotted">Clotted</option>
                <option value="Insufficient">Insufficient</option>
              </select>
            </div>
          </form>
        )}
      </Modal>

      {/* Enter Result Modal */}
      <Modal
        isOpen={showResultModal}
        onClose={() => {
          setShowResultModal(false);
          setSelectedTest(null);
          setFormData({});
        }}
        title={`Enter Result: ${selectedTest?.testType}`}
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowResultModal(false);
              setSelectedTest(null);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Save Result</Button>
          </div>
        }
      >
        {selectedTest && (
          <form onSubmit={handleSaveResult} className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900">Patient: {selectedTest.patient}</div>
              <div className="text-sm text-blue-800 mt-1">Test: {selectedTest.testType}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Test Result *</label>
              <textarea
                required
                value={formData.result || ''}
                onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                rows={6}
                placeholder="Enter test results, values, and interpretation..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Verified By</label>
              <input
                type="text"
                value={formData.verifiedBy || ''}
                onChange={(e) => setFormData({ ...formData, verifiedBy: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Lab Tech Name"
              />
            </div>
            {selectedTest.priority === 'Critical' && (
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-sm text-red-800">
                  <strong>Critical Result:</strong> This result will automatically notify the ordering physician.
                </p>
              </div>
            )}
          </form>
        )}
      </Modal>
    </div>
  );
}
