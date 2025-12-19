import React, { useState } from 'react';
import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';

export default function VisitorInvitationControl() {
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const roles = ['All Roles', 'Owners / Managers', 'Event Planners', 'Guests', 'Tenants'];

  const roleHierarchy = [
    {
      role: 'Owners / Managers',
      visitorLimit: 'Unlimited',
      visitType: 'Free',
      maxDuration: 'Unlimited',
      requiresApproval: false,
      canInvite: true
    },
    {
      role: 'Event Planners',
      visitorLimit: 'Bulk, Event-Only',
      visitType: 'Free',
      maxDuration: 'Event Duration',
      requiresApproval: false,
      canInvite: true
    },
    {
      role: 'Guests',
      visitorLimit: 'Limited (e.g., 5-10)',
      visitType: 'Paid or Free',
      maxDuration: '24 hours',
      requiresApproval: true,
      canInvite: true
    },
    {
      role: 'Tenants',
      visitorLimit: 'Pre-approved',
      visitType: 'Free',
      maxDuration: 'Unlimited',
      requiresApproval: true,
      canInvite: true
    },
  ];

  const visitorRules = [
    {
      id: 1,
      rule: 'Guest Visitor Limit',
      value: '10 visitors per stay',
      appliesTo: 'Guests',
      status: 'Active'
    },
    {
      id: 2,
      rule: 'Paid Visit Policy',
      value: 'Optional for guests',
      appliesTo: 'Guests',
      status: 'Active'
    },
    {
      id: 3,
      rule: 'Maximum Visit Duration',
      value: '24 hours',
      appliesTo: 'Guests',
      status: 'Active'
    },
    {
      id: 4,
      rule: 'Event Planner Bulk Invites',
      value: 'Unlimited for events',
      appliesTo: 'Event Planners',
      status: 'Active'
    },
    {
      id: 5,
      rule: 'Tenant Pre-approval',
      value: 'Required for all visitors',
      appliesTo: 'Tenants',
      status: 'Active'
    },
  ];

  const stats = {
    totalInvitations: 234,
    pendingApprovals: 12,
    activeVisitors: 45,
    violations: 2
  };

  const filteredRoles = selectedRole === 'all'
    ? roleHierarchy
    : roleHierarchy.filter(r => r.role === selectedRole);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Multi-Tier Visitor Invitation Control</h1>
        <p className="text-gray-600 mt-2">Define who can invite visitors, how many visitors per role, paid vs free visits, and maximum visit duration</p>
      </div>

      {/* Statistics Overview */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Total Invitations"
          value={stats.totalInvitations.toString()}
          icon={<span className="text-xl">📨</span>}
          color="blue"
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pendingApprovals.toString()}
          icon={<span className="text-xl">⏳</span>}
          color="orange"
        />
        <StatCard
          title="Active Visitors"
          value={stats.activeVisitors.toString()}
          icon={<span className="text-xl">👥</span>}
          color="green"
        />
        <StatCard
          title="Violations"
          value={stats.violations.toString()}
          icon={<span className="text-xl">⚠️</span>}
          color="red"
        />
      </DashboardGrid>

      {/* Filters */}
      <div className="flex space-x-4">
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          {roles.map(role => (
            <option key={role} value={role === 'All Roles' ? 'all' : role}>{role}</option>
          ))}
        </select>
        <Button>Create New Rule</Button>
        <Button variant="outline">Export Rules</Button>
      </div>

      {/* Role Hierarchy */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Role Hierarchy & Visitor Limits</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitor Limit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requires Approval</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Can Invite</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRoles.map((role, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{role.visitorLimit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      role.visitType === 'Free' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {role.visitType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{role.maxDuration}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {role.requiresApproval ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {role.canInvite ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Visitor Rules Configuration */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Visitor Rules Configuration</h3>
        <div className="space-y-3">
          {visitorRules.map((rule) => (
            <div key={rule.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{rule.rule}</p>
                  <p className="text-xs text-gray-600 mt-1">Applies to: {rule.appliesTo}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900">{rule.value}</span>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {rule.status}
                  </span>
                  <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="outline">Add New Rule</Button>
        </div>
      </Card>

      {/* Admin Defines Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Who Can Invite Visitors</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">✓ Owners / Managers</p>
              <p className="text-xs text-gray-500 mt-1">Unlimited invitations</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">✓ Event Planners</p>
              <p className="text-xs text-gray-500 mt-1">Bulk, event-only invitations</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">✓ Guests</p>
              <p className="text-xs text-gray-500 mt-1">Limited invitations per stay</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">✓ Tenants</p>
              <p className="text-xs text-gray-500 mt-1">Pre-approved invitations</p>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Visit Configuration</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">How Many Visitors Per Role</p>
              <p className="text-xs text-gray-500 mt-1">Configure limits for each role type</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">Paid vs Free Visits</p>
              <p className="text-xs text-gray-500 mt-1">Set monetization rules per role</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">Maximum Visit Duration</p>
              <p className="text-xs text-gray-500 mt-1">Define time limits for visits</p>
            </div>
            <Button variant="outline" className="w-full mt-4">Configure Settings</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
