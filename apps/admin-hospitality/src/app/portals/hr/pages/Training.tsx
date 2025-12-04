import React, { useState } from 'react';
import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';

// Simple Modal Component
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default function Training() {
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'staff' | 'certifications'>('overview');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [selectedModule, setSelectedModule] = useState('');

  // Mock Data
  const trainingStats = {
    completionRate: '88%',
    pendingCertifications: 12,
    upcomingSessions: 5,
    avgScore: '92/100'
  };

  const modules = [
    { id: 1, title: 'Brand Standards & Etiquette', type: 'Video', duration: '45m', mandatory: true },
    { id: 2, title: 'Advanced Guest Service', type: 'Workshop', duration: '2h', mandatory: true },
    { id: 3, title: 'Safety & Emergency Procedures', type: 'Quiz', duration: '30m', mandatory: true },
    { id: 4, title: 'Wine Appreciation Level 1', type: 'Course', duration: '4 weeks', mandatory: false },
    { id: 5, title: 'Concierge Excellence', type: 'Workshop', duration: '1 day', mandatory: false },
  ];

  const [staffProgress, setStaffProgress] = useState([
    { id: 1, name: 'Sarah Jones', role: 'Front Desk', module: 'Brand Standards & Etiquette', status: 'Completed', score: '95', date: 'Oct 1, 2025' },
    { id: 2, name: 'Mike Chen', role: 'Concierge', module: 'Advanced Guest Service', status: 'In Progress', score: '-', date: 'Oct 10, 2025' },
    { id: 3, name: 'Elena Rodriguez', role: 'Housekeeping', module: 'Safety & Emergency Procedures', status: 'Pending', score: '-', date: '-' },
    { id: 4, name: 'David Wilson', role: 'F&B Server', module: 'Wine Appreciation Level 1', status: 'Completed', score: '88', date: 'Sep 15, 2025' },
  ]);

  const certifications = [
    { id: 1, name: 'First Aid & CPR', expiry: 'Dec 2025', holders: 24, status: 'Valid' },
    { id: 2, name: 'Food Safety Level 2', expiry: 'Oct 2025', holders: 15, status: 'Expiring Soon' },
    { id: 3, name: 'Certified Concierge', expiry: 'Jun 2026', holders: 3, status: 'Valid' },
  ];

  const handleAssign = () => {
    if (selectedStaff && selectedModule) {
      const staffName = selectedStaff === 'all' ? 'All Staff' : 'Selected Staff'; // Simplified
      const moduleTitle = modules.find(m => m.id.toString() === selectedModule)?.title;
      
      const newRecord = {
        id: staffProgress.length + 1,
        name: staffName, // In a real app, this would be the actual staff name
        role: 'Various',
        module: moduleTitle || 'Unknown',
        status: 'Pending',
        score: '-',
        date: '-'
      };
      
      setStaffProgress([...staffProgress, newRecord]);
      setShowAssignModal(false);
      setSelectedStaff('');
      setSelectedModule('');
      alert(`Assigned ${moduleTitle} to ${staffName}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Training & Development</h1>
          <p className="text-gray-600 mt-1">Service excellence tracking and certification management</p>
        </div>
        <Button onClick={() => setShowAssignModal(true)}>Assign Training</Button>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['Overview', 'Modules', 'Staff Progress', 'Certifications'].map((tab) => {
            const key = tab.toLowerCase().replace(' ', '') as any;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <DashboardGrid columns={4}>
              <StatCard title="Completion Rate" value={trainingStats.completionRate} color="green" icon={<span>✅</span>} />
              <StatCard title="Avg. Score" value={trainingStats.avgScore} color="blue" icon={<span>🏆</span>} />
              <StatCard title="Pending Certs" value={trainingStats.pendingCertifications} color="orange" icon={<span>⚠️</span>} />
              <StatCard title="Sessions" value={trainingStats.upcomingSessions} color="purple" icon={<span>📅</span>} />
            </DashboardGrid>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="font-bold text-gray-900 mb-4">Recent Completions</h3>
                <div className="space-y-4">
                  {staffProgress.filter(p => p.status === 'Completed').slice(0, 3).map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{record.name}</p>
                        <p className="text-xs text-gray-500">{record.module}</p>
                      </div>
                      <span className="text-green-600 font-bold">{record.score}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <h3 className="font-bold text-gray-900 mb-4">Expiring Certifications</h3>
                <div className="space-y-4">
                  {certifications.filter(c => c.status === 'Expiring Soon').map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                      <div>
                        <p className="font-medium text-gray-900">{cert.name}</p>
                        <p className="text-xs text-gray-600">Expires: {cert.expiry}</p>
                      </div>
                      <span className="text-orange-600 text-sm font-medium">{cert.holders} Staff</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'modules' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <Card key={module.id}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg ${module.mandatory ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    {module.type === 'Video' ? '🎥' : module.type === 'Workshop' ? '👥' : '📝'}
                  </div>
                  {module.mandatory && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Mandatory</span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{module.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-3">⏱️ {module.duration}</span>
                  <span>{module.type}</span>
                </div>
                <Button variant="outline" className="w-full">View Content</Button>
              </Card>
            ))}
            <button className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors h-full min-h-[200px]">
              <span className="text-4xl mb-2">+</span>
              <span className="font-medium">Add New Module</span>
            </button>
          </div>
        )}

        {activeTab === 'staffprogress' && (
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Member</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {staffProgress.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{record.name}</div>
                        <div className="text-sm text-gray-500">{record.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.module}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.score}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'certifications' && (
          <div className="space-y-6">
            <Card>
              <h3 className="font-bold text-gray-900 mb-4">Certification Tracking</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certification Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holders</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {certifications.map((cert) => (
                      <tr key={cert.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cert.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.expiry}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.holders}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            cert.status === 'Valid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {cert.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">Manage</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Assign Modal */}
      <Modal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        title="Assign Training Module"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Staff</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
            >
              <option value="">Select staff member...</option>
              <option value="all">All Staff</option>
              <option value="front_desk">Front Desk Team</option>
              <option value="housekeeping">Housekeeping Team</option>
              <option value="Sarah Jones">Sarah Jones</option>
              <option value="Mike Chen">Mike Chen</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Module</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
            >
              <option value="">Select module...</option>
              {modules.map(m => (
                <option key={m.id} value={m.id}>{m.title}</option>
              ))}
            </select>
          </div>
          <div className="pt-4 flex justify-end">
            <Button onClick={handleAssign} disabled={!selectedStaff || !selectedModule}>
              Assign Training
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

