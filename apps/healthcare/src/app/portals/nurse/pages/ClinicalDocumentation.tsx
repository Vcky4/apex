import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../shared/Modal';
import { useToast, ToastContainer } from '../../shared/Toast';

interface Documentation {
  id: number;
  patient: string;
  type: 'Nursing Note' | 'Incident Report' | 'Quality Indicator' | 'Compliance';
  date: string;
  content: string;
  status: 'Draft' | 'Submitted';
}

export default function ClinicalDocumentation() {
  const { toasts, showToast, removeToast } = useToast();
  const [showDocModal, setShowDocModal] = useState(false);
  const [docType, setDocType] = useState<string>('');
  const [formData, setFormData] = useState<any>({});

  const [documentations, setDocumentations] = useState<Documentation[]>([
    {
      id: 1,
      patient: 'John Doe',
      type: 'Nursing Note',
      date: '2025-01-20',
      content: 'Patient resting comfortably. Vital signs stable. No complaints.',
      status: 'Submitted',
    },
    {
      id: 2,
      patient: 'Jane Smith',
      type: 'Incident Report',
      date: '2025-01-19',
      content: 'Patient fall incident - minor, no injury. Safety measures reviewed.',
      status: 'Submitted',
    },
  ]);

  const handleCreateDocument = (type: string) => {
    setDocType(type);
    setFormData({
      type,
      date: new Date().toISOString().split('T')[0],
      patient: '',
      content: '',
    });
    setShowDocModal(true);
  };

  const handleSaveDocument = (e: React.FormEvent) => {
    e.preventDefault();
    const { patient, type, content, date } = formData;
    
    if (!patient || !content) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const newDoc: Documentation = {
      id: Date.now(),
      patient,
      type: type as Documentation['type'],
      date: date || new Date().toISOString().split('T')[0],
      content,
      status: 'Draft',
    };

    setDocumentations([...documentations, newDoc]);
    showToast(`${type} created successfully`, 'success');
    setShowDocModal(false);
    setFormData({});
    setDocType('');
  };

  const handleSubmitDocument = (doc: Documentation) => {
    setDocumentations(documentations.map(d => 
      d.id === doc.id ? { ...d, status: 'Submitted' } : d
    ));
    showToast(`${doc.type} submitted successfully`, 'success');
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Clinical Documentation</h1>
        <p className="text-gray-600 mt-2">Nursing notes and charts, incident report filing, quality indicator reporting, compliance documentation</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button onClick={() => handleCreateDocument('Nursing Note')} className="h-24 flex flex-col items-center justify-center">
          <span className="text-2xl mb-2">📝</span>
          <span>Nursing Note</span>
        </Button>
        <Button onClick={() => handleCreateDocument('Incident Report')} variant="secondary" className="h-24 flex flex-col items-center justify-center">
          <span className="text-2xl mb-2">⚠️</span>
          <span>Incident Report</span>
        </Button>
        <Button onClick={() => handleCreateDocument('Quality Indicator')} variant="outline" className="h-24 flex flex-col items-center justify-center">
          <span className="text-2xl mb-2">📊</span>
          <span>Quality Indicator</span>
        </Button>
        <Button onClick={() => handleCreateDocument('Compliance')} variant="outline" className="h-24 flex flex-col items-center justify-center">
          <span className="text-2xl mb-2">✅</span>
          <span>Compliance</span>
        </Button>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Recent Documentation</h2>
        <div className="space-y-4">
          {documentations.map((doc) => (
            <div key={doc.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-900">{doc.type}</div>
                  <div className="text-sm text-gray-600 mt-1">Patient: {doc.patient} | Date: {doc.date}</div>
                  <div className="text-sm text-gray-700 mt-2">{doc.content}</div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    doc.status === 'Submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {doc.status}
                  </span>
                  {doc.status === 'Draft' && (
                    <Button size="sm" onClick={() => handleSubmitDocument(doc)}>Submit</Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Documentation Modal */}
      <Modal
        isOpen={showDocModal}
        onClose={() => {
          setShowDocModal(false);
          setFormData({});
          setDocType('');
        }}
        title={`Create ${docType}`}
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowDocModal(false);
              setFormData({});
              setDocType('');
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Save {docType}</Button>
          </div>
        }
      >
        <form onSubmit={handleSaveDocument} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient *</label>
            <select
              required
              value={formData.patient || ''}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="">Select Patient</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Bob Johnson">Bob Johnson</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={formData.date || ''}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
            <textarea
              required
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              rows={6}
              placeholder="Enter documentation details..."
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
