import { Card, Button, DashboardGrid } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

interface Incident {
  id: number;
  type: string;
  severity: 'High' | 'Moderate' | 'Low';
  date: string;
  status: 'Under Investigation' | 'Resolved' | 'Closed';
  assigned: string;
  description?: string;
  location?: string;
  patient?: string;
}

export default function RiskManagement() {
  const { toasts, showToast, removeToast } = useToast();
  
  const [incidents, setIncidents] = useState<Incident[]>([
    { id: 1, type: 'Patient Fall', severity: 'Moderate', date: '2025-01-18', status: 'Under Investigation', assigned: 'Risk Team A', description: 'Patient fell while getting out of bed', location: 'Room 201', patient: 'John Doe' },
    { id: 2, type: 'Medication Error', severity: 'Low', date: '2025-01-17', status: 'Resolved', assigned: 'Risk Team B', description: 'Wrong dosage administered', location: 'ICU', patient: 'Jane Smith' },
    { id: 3, type: 'Equipment Malfunction', severity: 'High', date: '2025-01-16', status: 'Under Investigation', assigned: 'Risk Team A', description: 'Ventilator malfunction during use', location: 'ICU-102', patient: 'Bob Johnson' },
  ]);

  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [formData, setFormData] = useState<any>({});

  const openIncidents = incidents.filter(i => i.status !== 'Resolved' && i.status !== 'Closed').length;
  const underInvestigation = incidents.filter(i => i.status === 'Under Investigation').length;
  const resolvedThisMonth = incidents.filter(i => i.status === 'Resolved').length;

  const handleReportIncident = () => {
    setSelectedIncident(null);
    setFormData({ date: new Date().toISOString().split('T')[0] });
    setShowIncidentModal(true);
  };

  const handleSaveIncident = (e: React.FormEvent) => {
    e.preventDefault();
    const { type, severity, description, location, patient } = formData;
    
    if (!type || !severity || !description) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const newIncident: Incident = {
      id: Date.now(),
      type,
      severity,
      date: formData.date || new Date().toISOString().split('T')[0],
      status: 'Under Investigation',
      assigned: 'Risk Team A',
      description,
      location,
      patient,
    };

    setIncidents([...incidents, newIncident]);
    showToast(`Incident reported: ${type}. Assigned to Risk Team A for investigation.`, 'success');
    setShowIncidentModal(false);
    setFormData({});
  };

  const handleViewDetails = (incident: Incident) => {
    setSelectedIncident(incident);
    setShowDetailsModal(true);
  };

  const handleResolveIncident = (incident: Incident) => {
    const resolution = prompt('Enter resolution details:');
    if (resolution) {
      setIncidents(incidents.map(i => 
        i.id === incident.id ? { ...i, status: 'Resolved', description: `${i.description}\n\nResolution: ${resolution}` } : i
      ));
      showToast(`Incident ${incident.type} resolved successfully`, 'success');
      setShowDetailsModal(false);
    }
  };

  const handleCloseIncident = (incident: Incident) => {
    if (confirm(`Close incident ${incident.type}? This will mark it as permanently closed.`)) {
      setIncidents(incidents.map(i => 
        i.id === incident.id ? { ...i, status: 'Closed' } : i
      ));
      showToast(`Incident ${incident.type} closed`, 'success');
      setShowDetailsModal(false);
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Risk Management</h1>
        <p className="text-gray-600 mt-2">Incident reporting, patient safety event management, malpractice claim tracking</p>
      </div>

      <DashboardGrid columns={4}>
        <Card className="text-center p-4 bg-red-50">
          <div className="text-3xl font-bold text-red-600">{openIncidents}</div>
          <p className="text-sm text-gray-600 mt-1">Open Incidents</p>
        </Card>
        <Card className="text-center p-4 bg-yellow-50">
          <div className="text-3xl font-bold text-yellow-600">{underInvestigation}</div>
          <p className="text-sm text-gray-600 mt-1">Under Investigation</p>
        </Card>
        <Card className="text-center p-4 bg-green-50">
          <div className="text-3xl font-bold text-green-600">{resolvedThisMonth}</div>
          <p className="text-sm text-gray-600 mt-1">Resolved This Month</p>
        </Card>
        <Card className="text-center p-4 bg-blue-50">
          <div className="text-3xl font-bold text-blue-600">2</div>
          <p className="text-sm text-gray-600 mt-1">Active Claims</p>
        </Card>
      </DashboardGrid>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Incident Reporting & Analysis</h2>
          <Button onClick={handleReportIncident}>Report Incident</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {incidents.filter(i => i.status !== 'Closed').map((incident) => (
                <tr key={incident.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{incident.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      incident.severity === 'High' ? 'bg-red-100 text-red-800' :
                      incident.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{incident.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      incident.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {incident.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{incident.assigned}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleViewDetails(incident)} className="text-blue-600 hover:text-blue-900">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Report Incident Modal */}
      <Modal
        isOpen={showIncidentModal}
        onClose={() => {
          setShowIncidentModal(false);
          setFormData({});
        }}
        title="Report New Incident"
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowIncidentModal(false);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Submit Report</Button>
          </div>
        }
      >
        <form onSubmit={handleSaveIncident} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Incident Type *</label>
            <select
              required
              value={formData.type || ''}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">Select Type</option>
              <option value="Patient Fall">Patient Fall</option>
              <option value="Medication Error">Medication Error</option>
              <option value="Equipment Malfunction">Equipment Malfunction</option>
              <option value="Infection Control">Infection Control</option>
              <option value="Patient Safety">Patient Safety</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Severity *</label>
            <select
              required
              value={formData.severity || ''}
              onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">Select Severity</option>
              <option value="High">High</option>
              <option value="Moderate">Moderate</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Room 201, ICU-102, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
              <input
                type="text"
                value={formData.patient || ''}
                onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Patient name (if applicable)"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              required
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              rows={4}
              placeholder="Provide detailed description of the incident..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={formData.date || ''}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Important:</strong> All incidents are automatically assigned to the Risk Management team for investigation. High severity incidents require immediate attention.
            </p>
          </div>
        </form>
      </Modal>

      {/* Incident Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedIncident(null);
        }}
        title={`Incident Details: ${selectedIncident?.type}`}
        size="lg"
        footer={
          selectedIncident && selectedIncident.status === 'Under Investigation' && (
            <div className="flex justify-between">
              <Button variant="danger" onClick={() => {
                if (selectedIncident) handleCloseIncident(selectedIncident);
              }}>Close Incident</Button>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedIncident(null);
                }}>Cancel</Button>
                <Button onClick={() => {
                  if (selectedIncident) handleResolveIncident(selectedIncident);
                }}>Resolve</Button>
              </div>
            </div>
          )
        }
      >
        {selectedIncident && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900">Type</h4>
                <p className="text-gray-600">{selectedIncident.type}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Severity</h4>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  selectedIncident.severity === 'High' ? 'bg-red-100 text-red-800' :
                  selectedIncident.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {selectedIncident.severity}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Date</h4>
                <p className="text-gray-600">{selectedIncident.date}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Status</h4>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  selectedIncident.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedIncident.status}
                </span>
              </div>
              {selectedIncident.location && (
                <div>
                  <h4 className="font-semibold text-gray-900">Location</h4>
                  <p className="text-gray-600">{selectedIncident.location}</p>
                </div>
              )}
              {selectedIncident.patient && (
                <div>
                  <h4 className="font-semibold text-gray-900">Patient</h4>
                  <p className="text-gray-600">{selectedIncident.patient}</p>
                </div>
              )}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
              <p className="text-gray-600 whitespace-pre-wrap">{selectedIncident.description || 'No description provided'}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Assigned To</h4>
              <p className="text-gray-600">{selectedIncident.assigned}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
