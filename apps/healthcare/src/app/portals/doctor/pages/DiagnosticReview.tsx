import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

export default function DiagnosticReview() {
  const { toasts, showToast, removeToast } = useToast();
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const pendingResults = [
    { id: 1, patient: 'John Doe', test: 'Complete Blood Count', date: '2025-01-18', status: 'Pending Review', priority: 'Normal' },
    { id: 2, patient: 'Jane Smith', test: 'Lipid Panel', date: '2025-01-17', status: 'Pending Review', priority: 'High' },
    { id: 3, patient: 'Bob Johnson', test: 'Chest X-Ray', date: '2025-01-16', status: 'Pending Review', priority: 'Normal' },
  ];

  const handleReview = (test: any) => {
    setSelectedTest(test);
    setFormData({
      interpretation: '',
      signed: false,
    });
    setShowReviewModal(true);
  };

  const handleSignResult = () => {
    if (!formData.interpretation) {
      showToast('Please enter your interpretation', 'error');
      return;
    }
    showToast(`Result for ${selectedTest.test} signed successfully`, 'success');
    setShowReviewModal(false);
    setSelectedTest(null);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Diagnostic Review</h1>
        <p className="text-gray-600 mt-2">Lab result analysis and signing, imaging study review, pathology reports, result trend analysis</p>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Pending Lab Results</h2>
        <div className="space-y-3">
          {pendingResults.map((result) => (
            <div key={result.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-900">{result.patient}</div>
                  <div className="text-sm text-gray-600 mt-1">{result.test}</div>
                  <div className="text-xs text-gray-500 mt-1">Date: {result.date}</div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    result.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {result.priority}
                  </span>
                  <Button size="sm" className="mt-2" onClick={() => handleReview(result)}>Review</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Imaging Studies</h3>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="font-medium text-blue-900">3 studies pending review</div>
            <Button size="sm" className="mt-3" onClick={() => showToast('Opening imaging viewer...', 'info')}>View Studies</Button>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-4">Pathology Reports</h3>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="font-medium text-purple-900">1 report pending review</div>
            <Button size="sm" className="mt-3" onClick={() => showToast('Opening pathology reports...', 'info')}>View Reports</Button>
          </div>
        </Card>
      </div>

      {/* Review Result Modal */}
      <Modal
        isOpen={showReviewModal}
        onClose={() => {
          setShowReviewModal(false);
          setSelectedTest(null);
          setFormData({});
        }}
        title={`Review Result: ${selectedTest?.test}`}
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowReviewModal(false);
              setSelectedTest(null);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={handleSignResult}>Sign Result</Button>
          </div>
        }
      >
        {selectedTest && (
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900">Patient: {selectedTest.patient}</div>
              <div className="text-sm text-blue-800 mt-1">Test: {selectedTest.test}</div>
              <div className="text-sm text-blue-800 mt-1">Date: {selectedTest.date}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium mb-2">Test Results:</div>
              <div className="text-sm text-gray-700">
                {selectedTest.test === 'Complete Blood Count' && 'WBC: 6.5, RBC: 4.8, Hemoglobin: 14.2, Platelets: 250'}
                {selectedTest.test === 'Lipid Panel' && 'Total Cholesterol: 180, LDL: 110, HDL: 55, Triglycerides: 120'}
                {selectedTest.test === 'Chest X-Ray' && 'No acute findings. Heart size normal. Lungs clear.'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interpretation & Notes *</label>
              <textarea
                required
                value={formData.interpretation || ''}
                onChange={(e) => setFormData({ ...formData, interpretation: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows={6}
                placeholder="Enter your interpretation and clinical notes..."
              />
            </div>
          </div>
        )}
      </Modal>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

