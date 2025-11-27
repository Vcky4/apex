import { StatCard, DashboardGrid, Card, Button } from '@apex-providers/ui-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

export default function ClinicalOperationsDashboard() {
  const navigate = useNavigate();
  const { toasts, showToast, removeToast } = useToast();
  const [showVitalsModal, setShowVitalsModal] = useState(false);
  const [vitalsData, setVitalsData] = useState<any>({});

  const inventoryAlerts = [
    { id: 1, source: 'Pharmacy', message: 'Amoxicillin 500mg Out of Stock', time: '10 mins ago', priority: 'High' },
    { id: 2, source: 'Lab', message: 'Hematology Reagent Low Stock', time: '1 hour ago', priority: 'Medium' },
    { id: 3, source: 'Pharmacy', message: 'New Stock Received: Metformin', time: '2 hours ago', priority: 'Low' },
  ];

  const handleSaveVitals = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Vitals posted for ${vitalsData.patient}. Doctor notified.`, 'success');
    setShowVitalsModal(false);
    setVitalsData({});
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Clinical Operations Dashboard</h1>
        <p className="text-gray-600 mt-2">Clinical service line and operational management</p>
      </div>

      {/* Inventory & Alerts Notification Center */}
      <Card className="bg-white border-l-4 border-l-orange-500">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800 flex items-center">
            <span className="text-2xl mr-2">🔔</span> Operational Alerts
          </h2>
          <Button size="sm" variant="outline">View All</Button>
        </div>
        <div className="space-y-2">
          {inventoryAlerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100">
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-3 ${
                  alert.priority === 'High' ? 'bg-red-500' : 
                  alert.priority === 'Medium' ? 'bg-orange-500' : 'bg-blue-500'
                }`}></span>
                <div>
                  <span className="font-semibold text-sm text-gray-900">[{alert.source}]</span>
                  <span className="ml-2 text-sm text-gray-700">{alert.message}</span>
                </div>
              </div>
              <span className="text-xs text-gray-500">{alert.time}</span>
            </div>
          ))}
        </div>
      </Card>

      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Service Line Performance</h2>
        <DashboardGrid columns={4}>
          <StatCard title="Patient Volume" value="2,456" color="blue" trend={{ value: 5.2, isPositive: true }} icon={<span className="text-2xl">👥</span>} />
          <StatCard title="Procedure Efficiency" value="92%" color="green" trend={{ value: 2.1, isPositive: true }} icon={<span className="text-2xl">⚡</span>} />
          <StatCard title="Quality Outcomes" value="96%" color="purple" trend={{ value: 1.5, isPositive: true }} icon={<span className="text-2xl">✅</span>} />
          <StatCard title="Patient Satisfaction" value="4.6/5" color="orange" trend={{ value: 0.2, isPositive: true }} icon={<span className="text-2xl">⭐</span>} />
        </DashboardGrid>
      </section>

      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Resource Utilization</h2>
        <DashboardGrid columns={4}>
          <StatCard title="OR Utilization" value="84%" color="blue" trend={{ value: 3.2, isPositive: true }} />
          <StatCard title="Bed Turnover" value="2.8/day" color="green" trend={{ value: 0.3, isPositive: true }} />
          <StatCard title="Equipment Usage" value="78%" color="purple" trend={{ value: 2.5, isPositive: true }} />
          <StatCard title="Staff Productivity" value="91%" color="orange" trend={{ value: 1.8, isPositive: true }} />
        </DashboardGrid>
      </section>

      <DashboardGrid columns={2}>
        <Card>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">Department-wise Patient Volume</h3>
            <Button size="sm" variant="outline" onClick={() => navigate('/healthcare/admin/clinical-operations/departments')}>View All</Button>
          </div>
          <div className="space-y-3">
            {['Cardiology: 245', 'Emergency: 1,245', 'Surgery: 456', 'Pediatrics: 678'].map((dept, i) => (
              <div key={i} className="flex justify-between p-2 bg-gray-50 rounded">
                <span>{dept.split(':')[0]}</span>
                <span className="font-semibold">{dept.split(':')[1]}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">Patient Flow Metrics</h3>
            <Button size="sm" variant="outline" onClick={() => navigate('/healthcare/admin/clinical-operations/patient-flow')}>View Details</Button>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Avg Length of Stay</span>
              <span className="font-semibold">3.2 days</span>
            </div>
            <div className="flex justify-between">
              <span>Wait Time (ED)</span>
              <span className="font-semibold">28 minutes</span>
            </div>
            <div className="flex justify-between">
              <span>Throughput Rate</span>
              <span className="font-semibold">94%</span>
            </div>
          </div>
        </Card>
      </DashboardGrid>

      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Quick Actions</h2>
        <DashboardGrid columns={4}>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/clinical-operations/departments')}>
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold mb-1">Department Analytics</h3>
            </div>
          </Card>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/clinical-operations/patient-flow')}>
            <div className="text-center">
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="font-semibold mb-1">Patient Flow</h3>
            </div>
          </Card>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/clinical-operations/appointments')}>
            <div className="text-center">
              <div className="text-3xl mb-2">📅</div>
              <h3 className="font-semibold mb-1">Book Appointments</h3>
            </div>
          </Card>
          <Card hover className="cursor-pointer" onClick={() => {
            setVitalsData({ date: new Date().toISOString().split('T')[0] });
            setShowVitalsModal(true);
          }}>
            <div className="text-center">
              <div className="text-3xl mb-2">🩺</div>
              <h3 className="font-semibold mb-1">Post Vitals</h3>
            </div>
          </Card>
        </DashboardGrid>
      </section>

      {/* Post Vitals Modal */}
      <Modal
        isOpen={showVitalsModal}
        onClose={() => {
          setShowVitalsModal(false);
          setVitalsData({});
        }}
        title="Post Patient Vitals"
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowVitalsModal(false)}>Cancel</Button>
            <Button onClick={() => {
               const form = document.getElementById('vitals-form') as HTMLFormElement;
               if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
            }}>Post to Doctor</Button>
          </div>
        }
      >
        <form id="vitals-form" onSubmit={handleSaveVitals} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name *</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={vitalsData.patient || ''}
              onChange={(e) => setVitalsData({ ...vitalsData, patient: e.target.value })}
              placeholder="Enter patient name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={vitalsData.bp || ''}
                onChange={(e) => setVitalsData({ ...vitalsData, bp: e.target.value })}
                placeholder="120/80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heart Rate</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={vitalsData.hr || ''}
                onChange={(e) => setVitalsData({ ...vitalsData, hr: e.target.value })}
                placeholder="72 bpm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temperature</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={vitalsData.temp || ''}
                onChange={(e) => setVitalsData({ ...vitalsData, temp: e.target.value })}
                placeholder="98.6 F"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={vitalsData.weight || ''}
                onChange={(e) => setVitalsData({ ...vitalsData, weight: e.target.value })}
                placeholder="lbs/kg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assigning Doctor</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={vitalsData.doctor || ''}
              onChange={(e) => setVitalsData({ ...vitalsData, doctor: e.target.value })}
              placeholder="Dr. Name"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

