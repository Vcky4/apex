import React, { useState } from 'react';
import { Card, Button, StatCard } from '@apex-providers/ui-components';

export default function EstateStaffManagement() {
  const [selectedEstate, setSelectedEstate] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const estates = ['All Estates', 'Mountain Estate', 'Seaside Estate', 'Urban Estate'];
  const departments = ['All Departments', 'Maintenance', 'Grounds', 'Security', 'Technical'];

  const staffMembers = [
    {
      id: 1,
      name: 'Robert Martinez',
      estate: 'Mountain Estate',
      department: 'Maintenance',
      role: 'Maintenance Lead',
      certifications: ['HVAC', 'Plumbing'],
      certificationExpiry: '2026-03-15',
      performanceReview: '2025-12-01',
      trainingRenewal: '2026-01-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Jennifer Lee',
      estate: 'Seaside Estate',
      department: 'Grounds',
      role: 'Landscape Manager',
      certifications: ['Landscape Design', 'Pest Control'],
      certificationExpiry: '2025-11-20',
      performanceReview: '2025-11-15',
      trainingRenewal: '2025-12-10',
      status: 'Active'
    },
    {
      id: 3,
      name: 'David Kim',
      estate: 'Urban Estate',
      department: 'Security',
      role: 'Security Supervisor',
      certifications: ['Security Management', 'First Aid'],
      certificationExpiry: '2026-06-30',
      performanceReview: '2026-01-01',
      trainingRenewal: '2026-02-01',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Amanda White',
      estate: 'Mountain Estate',
      department: 'Technical',
      role: 'IT Support Specialist',
      certifications: ['Network Security', 'System Administration'],
      certificationExpiry: '2026-05-10',
      performanceReview: '2025-12-15',
      trainingRenewal: '2026-01-20',
      status: 'Active'
    },
  ];

  const stats = {
    totalStaff: 32,
    maintenance: 12,
    grounds: 8,
    security: 7,
    technical: 5
  };

  const upcomingReminders = [
    { type: 'Certification Expiry', staff: 'Jennifer Lee', date: '2025-11-20', priority: 'high' },
    { type: 'Performance Review', staff: 'Jennifer Lee', date: '2025-11-15', priority: 'medium' },
    { type: 'Training Renewal', staff: 'Robert Martinez', date: '2026-01-15', priority: 'low' },
  ];

  const filteredStaff = staffMembers.filter(staff => {
    if (selectedEstate !== 'all' && staff.estate !== selectedEstate) return false;
    if (selectedDepartment !== 'all' && staff.department !== selectedDepartment) return false;
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isExpiringSoon = (date: string) => {
    const expiryDate = new Date(date);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Estate Staff & Security Management</h1>
        <p className="text-gray-600 mt-2">Assign estate-specific staff roles, manage maintenance and security teams, and track certifications</p>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Staff"
          value={stats.totalStaff.toString()}
          icon={<span className="text-xl">👥</span>}
          color="blue"
        />
        <StatCard
          title="Maintenance"
          value={stats.maintenance.toString()}
          icon={<span className="text-xl">🔧</span>}
          color="orange"
        />
        <StatCard
          title="Grounds"
          value={stats.grounds.toString()}
          icon={<span className="text-xl">🌳</span>}
          color="green"
        />
        <StatCard
          title="Security"
          value={stats.security.toString()}
          icon={<span className="text-xl">🛡️</span>}
          color="red"
        />
        <StatCard
          title="Technical"
          value={stats.technical.toString()}
          icon={<span className="text-xl">💻</span>}
          color="purple"
        />
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedEstate}
          onChange={(e) => setSelectedEstate(e.target.value)}
        >
          {estates.map(estate => (
            <option key={estate} value={estate === 'All Estates' ? 'all' : estate}>{estate}</option>
          ))}
        </select>
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          {departments.map(dept => (
            <option key={dept} value={dept === 'All Departments' ? 'all' : dept}>{dept}</option>
          ))}
        </select>
        <Button>Assign Staff</Button>
        <Button variant="outline">Plan Seasonal Staffing</Button>
      </div>

      {/* System Reminders */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">System Reminders</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingReminders.map((reminder, idx) => (
            <div key={idx} className={`p-4 rounded-lg border ${getPriorityColor(reminder.priority)}`}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold uppercase">{reminder.type}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  reminder.priority === 'high' ? 'bg-red-200 text-red-900' :
                  reminder.priority === 'medium' ? 'bg-yellow-200 text-yellow-900' :
                  'bg-blue-200 text-blue-900'
                }`}>
                  {reminder.priority}
                </span>
              </div>
              <p className="font-medium text-sm">{reminder.staff}</p>
              <p className="text-xs mt-1">Due: {reminder.date}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Staff List */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Estate Staff Directory</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certifications</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cert Expiry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Review</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                    <div className="text-sm text-gray-500">{staff.status}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.estate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {staff.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {staff.certifications.map((cert, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${isExpiringSoon(staff.certificationExpiry) ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                      {staff.certificationExpiry}
                      {isExpiringSoon(staff.certificationExpiry) && (
                        <span className="ml-1 text-red-500">⚠️</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.performanceReview}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-gray-600 hover:text-gray-900">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Admin Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Admin Capabilities</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">✓ Assign estate-specific staff roles</p>
              <p className="text-xs text-gray-500 mt-1">Manage maintenance, grounds, and technical teams</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">✓ Control security personnel rotation</p>
              <p className="text-xs text-gray-500 mt-1">Schedule and manage security team assignments</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">✓ Plan seasonal staffing increases</p>
              <p className="text-xs text-gray-500 mt-1">Prepare for peak seasons and events</p>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Certification & Review Tracking</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Certifications Expiring Soon</span>
                <span className="font-bold text-red-600">1</span>
              </div>
              <p className="text-xs text-gray-500">Within next 30 days</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Performance Reviews Due</span>
                <span className="font-bold text-yellow-600">2</span>
              </div>
              <p className="text-xs text-gray-500">Next 30 days</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Training Renewals</span>
                <span className="font-bold text-blue-600">3</span>
              </div>
              <p className="text-xs text-gray-500">Next 60 days</p>
            </div>
            <Button variant="outline" className="w-full">View All Reminders</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
