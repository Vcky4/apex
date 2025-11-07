import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface NetworkDevice {
  id: string;
  deviceName: string;
  deviceType: 'Router' | 'Switch' | 'Access Point' | 'Firewall' | 'Server';
  location: string;
  ipAddress: string;
  status: 'Online' | 'Offline' | 'Maintenance' | 'Warning';
  uptime: string;
  lastMaintenance: string;
}

interface ITDevice {
  id: string;
  deviceName: string;
  deviceType: 'Laptop' | 'Desktop' | 'Tablet' | 'Printer' | 'Projector' | 'Other';
  serialNumber: string;
  assignedTo: string | null;
  location: string;
  purchaseDate: string;
  warrantyExpiry: string;
  status: 'Active' | 'In Repair' | 'Retired' | 'Available';
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
}

interface SoftwareLicense {
  id: string;
  softwareName: string;
  vendor: string;
  licenseType: 'Perpetual' | 'Subscription' | 'Annual' | 'Monthly';
  totalLicenses: number;
  usedLicenses: number;
  expiryDate: string;
  cost: number;
  status: 'Active' | 'Expiring Soon' | 'Expired' | 'Renewal Pending';
  autoRenew: boolean;
}

interface SupportTicket {
  id: string;
  ticketNumber: string;
  requester: string;
  department: string;
  issueType: 'Hardware' | 'Software' | 'Network' | 'Account' | 'Other';
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  assignedTo: string | null;
  createdAt: string;
  resolvedAt: string | null;
  resolutionTime: string | null;
}

export default function ITAdministration() {
  const [networkDevices, setNetworkDevices] = useState<NetworkDevice[]>([
    {
      id: '1',
      deviceName: 'Main Router - Building A',
      deviceType: 'Router',
      location: 'Server Room A',
      ipAddress: '192.168.1.1',
      status: 'Online',
      uptime: '99.8%',
      lastMaintenance: '2024-01-15'
    },
    {
      id: '2',
      deviceName: 'Core Switch - Floor 2',
      deviceType: 'Switch',
      location: 'Network Closet 2B',
      ipAddress: '192.168.1.10',
      status: 'Warning',
      uptime: '95.2%',
      lastMaintenance: '2023-12-20'
    },
    {
      id: '3',
      deviceName: 'WiFi Access Point - Library',
      deviceType: 'Access Point',
      location: 'Library',
      ipAddress: '192.168.1.25',
      status: 'Online',
      uptime: '98.5%',
      lastMaintenance: '2024-01-10'
    },
    {
      id: '4',
      deviceName: 'Firewall - Main',
      deviceType: 'Firewall',
      location: 'Server Room A',
      ipAddress: '192.168.1.2',
      status: 'Online',
      uptime: '99.9%',
      lastMaintenance: '2024-01-05'
    }
  ]);

  const [itDevices, setItDevices] = useState<ITDevice[]>([
    {
      id: '1',
      deviceName: 'Dell Latitude 5520',
      deviceType: 'Laptop',
      serialNumber: 'DL-2024-001',
      assignedTo: 'Dr. Smith',
      location: 'Science Department',
      purchaseDate: '2023-06-15',
      warrantyExpiry: '2026-06-15',
      status: 'Active',
      condition: 'Excellent'
    },
    {
      id: '2',
      deviceName: 'HP LaserJet Pro',
      deviceType: 'Printer',
      serialNumber: 'HP-2023-045',
      assignedTo: null,
      location: 'Admin Office',
      purchaseDate: '2023-03-10',
      warrantyExpiry: '2025-03-10',
      status: 'In Repair',
      condition: 'Fair'
    },
    {
      id: '3',
      deviceName: 'Epson Projector',
      deviceType: 'Projector',
      serialNumber: 'EP-2023-012',
      assignedTo: null,
      location: 'Classroom 201',
      purchaseDate: '2023-08-20',
      warrantyExpiry: '2025-08-20',
      status: 'Active',
      condition: 'Good'
    },
    {
      id: '4',
      deviceName: 'iPad Pro 12.9"',
      deviceType: 'Tablet',
      serialNumber: 'AP-2024-003',
      assignedTo: 'Ms. Johnson',
      location: 'IT Department',
      purchaseDate: '2024-01-05',
      warrantyExpiry: '2025-01-05',
      status: 'Active',
      condition: 'Excellent'
    }
  ]);

  const [softwareLicenses, setSoftwareLicenses] = useState<SoftwareLicense[]>([
    {
      id: '1',
      softwareName: 'Microsoft Office 365',
      vendor: 'Microsoft',
      licenseType: 'Subscription',
      totalLicenses: 100,
      usedLicenses: 87,
      expiryDate: '2024-12-31',
      cost: 12000,
      status: 'Active',
      autoRenew: true
    },
    {
      id: '2',
      softwareName: 'Adobe Creative Suite',
      vendor: 'Adobe',
      licenseType: 'Annual',
      totalLicenses: 25,
      usedLicenses: 25,
      expiryDate: '2024-03-15',
      cost: 7500,
      status: 'Expiring Soon',
      autoRenew: false
    },
    {
      id: '3',
      softwareName: 'Antivirus Pro',
      vendor: 'Security Corp',
      licenseType: 'Annual',
      totalLicenses: 150,
      usedLicenses: 142,
      expiryDate: '2024-06-30',
      cost: 4500,
      status: 'Active',
      autoRenew: true
    },
    {
      id: '4',
      softwareName: 'Learning Management System',
      vendor: 'EduTech Solutions',
      licenseType: 'Subscription',
      totalLicenses: 1,
      usedLicenses: 1,
      expiryDate: '2024-02-28',
      cost: 15000,
      status: 'Renewal Pending',
      autoRenew: true
    }
  ]);

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    {
      id: '1',
      ticketNumber: 'IT-2024-001',
      requester: 'John Doe',
      department: 'Science',
      issueType: 'Hardware',
      description: 'Laptop screen flickering issue',
      priority: 'High',
      status: 'In Progress',
      assignedTo: 'IT Support Team',
      createdAt: '2024-01-22',
      resolvedAt: null,
      resolutionTime: null
    },
    {
      id: '2',
      ticketNumber: 'IT-2024-002',
      requester: 'Jane Smith',
      department: 'Administration',
      issueType: 'Software',
      description: 'Cannot access email account',
      priority: 'Medium',
      status: 'Open',
      assignedTo: null,
      createdAt: '2024-01-23',
      resolvedAt: null,
      resolutionTime: null
    },
    {
      id: '3',
      ticketNumber: 'IT-2024-003',
      requester: 'Bob Wilson',
      department: 'IT',
      issueType: 'Network',
      description: 'Slow internet connection in Building B',
      priority: 'High',
      status: 'Resolved',
      assignedTo: 'Network Team',
      createdAt: '2024-01-20',
      resolvedAt: '2024-01-21',
      resolutionTime: '1 day'
    },
    {
      id: '4',
      ticketNumber: 'IT-2024-004',
      requester: 'Alice Brown',
      department: 'Library',
      issueType: 'Hardware',
      description: 'Printer not printing',
      priority: 'Low',
      status: 'Open',
      assignedTo: null,
      createdAt: '2024-01-23',
      resolvedAt: null,
      resolutionTime: null
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online': return 'bg-green-100 text-green-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Open': return 'bg-yellow-100 text-yellow-800';
      case 'Offline': return 'bg-red-100 text-red-800';
      case 'In Repair': return 'bg-orange-100 text-orange-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Renewal Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Maintenance': return 'bg-blue-100 text-blue-800';
      case 'Retired': return 'bg-gray-100 text-gray-800';
      case 'Available': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalDevices = itDevices.length;
  const activeDevices = itDevices.filter(d => d.status === 'Active').length;
  const openTickets = supportTickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
  const criticalTickets = supportTickets.filter(t => t.priority === 'Critical' || t.priority === 'High').length;
  const expiringLicenses = softwareLicenses.filter(l => l.status === 'Expiring Soon' || l.status === 'Renewal Pending').length;
  const totalLicenseCost = softwareLicenses.reduce((sum, l) => sum + l.cost, 0);
  const networkUptime = networkDevices.filter(d => d.status === 'Online').length / networkDevices.length * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">IT Administration</h1>
          <p className="text-gray-600 mt-2">Network infrastructure, device management, and software licensing</p>
        </div>
        <Button>New Request</Button>
      </div>

      {/* Overview Stats */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Network Uptime"
          value={`${networkUptime.toFixed(1)}%`}
          color="green"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          }
        />
        <StatCard
          title="Active Devices"
          value={`${activeDevices}/${totalDevices}`}
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatCard
          title="Open Tickets"
          value={openTickets.toString()}
          color={criticalTickets > 0 ? 'red' : 'yellow'}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <StatCard
          title="License Cost"
          value={`$${(totalLicenseCost / 1000).toFixed(0)}K`}
          color="purple"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
      </DashboardGrid>

      {/* Network Infrastructure Management */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Network Infrastructure Management</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary">Add Device</Button>
            <Button size="sm" variant="secondary">Run Diagnostics</Button>
          </div>
        </div>

        {networkDevices.filter(d => d.status === 'Warning' || d.status === 'Offline').length > 0 && (
          <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <div className="flex">
              <svg className="h-5 w-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  {networkDevices.filter(d => d.status === 'Warning' || d.status === 'Offline').length} network device(s) require attention
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uptime</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {networkDevices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{device.deviceName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{device.deviceType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{device.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">{device.ipAddress}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{device.uptime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(device.status)}`}>
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Configure</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Device Inventory & Management */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Device Inventory & Management</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Types</option>
              <option>Laptop</option>
              <option>Desktop</option>
              <option>Tablet</option>
              <option>Printer</option>
            </select>
            <Button size="sm" variant="secondary">Add Device</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warranty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {itDevices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{device.deviceName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{device.deviceType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">{device.serialNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{device.assignedTo || 'Unassigned'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{device.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{device.warrantyExpiry}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(device.status)}`}>
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Assign</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Software License Tracking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Software License Tracking</h2>
            <Button size="sm" variant="secondary">Add License</Button>
          </div>

          {expiringLicenses > 0 && (
            <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="flex">
                <svg className="h-5 w-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    {expiringLicenses} license(s) expiring soon
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Software</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Licenses</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {softwareLicenses.map((license) => (
                  <tr key={license.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{license.softwareName}</div>
                      <div className="text-xs text-gray-500">{license.vendor}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{license.usedLicenses}/{license.totalLicenses}</div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className={`h-1.5 rounded-full ${
                            (license.usedLicenses / license.totalLicenses) >= 0.9 ? 'bg-red-600' :
                            (license.usedLicenses / license.totalLicenses) >= 0.7 ? 'bg-yellow-600' :
                            'bg-green-600'
                          }`}
                          style={{ width: `${(license.usedLicenses / license.totalLicenses) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{license.expiryDate}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(license.status)}`}>
                        {license.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">License Summary</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">Total Annual Cost</div>
              <div className="text-2xl font-bold text-blue-600 mb-1">${totalLicenseCost.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Across {softwareLicenses.length} software products</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">License Utilization</div>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {((softwareLicenses.reduce((sum, l) => sum + l.usedLicenses, 0) / 
                   softwareLicenses.reduce((sum, l) => sum + l.totalLicenses, 0)) * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">Average across all licenses</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">Auto-Renewal</div>
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {softwareLicenses.filter(l => l.autoRenew).length}/{softwareLicenses.length}
              </div>
              <div className="text-sm text-gray-600">Licenses set to auto-renew</div>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" fullWidth>View License Details</Button>
          </div>
        </Card>
      </div>

      {/* Help Desk & Support Management */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Help Desk & Support Management</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Statuses</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
            <Button size="sm" variant="secondary">New Ticket</Button>
          </div>
        </div>

        {criticalTickets > 0 && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-red-800">
                  {criticalTickets} high priority ticket(s) requiring immediate attention
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {supportTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{ticket.ticketNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ticket.requester}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ticket.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ticket.issueType}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{ticket.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ticket.assignedTo || 'Unassigned'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      {ticket.status === 'Open' && (
                        <button className="text-green-600 hover:text-green-900">Assign</button>
                      )}
                      {ticket.status === 'In Progress' && (
                        <button className="text-purple-600 hover:text-purple-900">Resolve</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Average Resolution Time</div>
            <div className="text-2xl font-bold text-blue-600">2.5 days</div>
            <div className="text-sm text-gray-600 mt-1">Based on resolved tickets</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Satisfaction Rating</div>
            <div className="text-2xl font-bold text-green-600">4.6/5</div>
            <div className="text-sm text-gray-600 mt-1">From user feedback</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">First Response Time</div>
            <div className="text-2xl font-bold text-purple-600">4.2 hrs</div>
            <div className="text-sm text-gray-600 mt-1">Average initial response</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
