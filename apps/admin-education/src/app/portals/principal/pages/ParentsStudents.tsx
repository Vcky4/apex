import { useState } from 'react';
import { Card, Button } from '@apex-providers/ui-components';

interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  children: Child[];
  totalFee: number;
  paidAmount: number;
  paymentStatus: 'Fully Paid' | 'Partially Paid' | 'Not Paid';
  hasAccess: boolean;
  registrationDate: string;
}

interface Child {
  id: string;
  name: string;
  studentId: string;
  grade: string;
  dateOfBirth: string;
  hasAccess: boolean;
}

export default function ParentsStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Fully Paid' | 'Partially Paid' | 'Not Paid'>('all');
  const [filterAccess, setFilterAccess] = useState<'all' | 'granted' | 'restricted'>('all');

  const [parents, setParents] = useState<Parent[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '555-0101',
      children: [
        { id: '1', name: 'Alex Smith', studentId: 'STU001', grade: '10', dateOfBirth: '2009-05-15', hasAccess: true },
        { id: '2', name: 'Emma Smith', studentId: 'STU002', grade: '8', dateOfBirth: '2011-08-22', hasAccess: true },
      ],
      totalFee: 10000,
      paidAmount: 10000,
      paymentStatus: 'Fully Paid',
      hasAccess: true,
      registrationDate: '2024-09-01',
    },
    {
      id: '2',
      name: 'Mary Johnson',
      email: 'mary.johnson@email.com',
      phone: '555-0102',
      children: [
        { id: '3', name: 'Michael Johnson', studentId: 'STU003', grade: '11', dateOfBirth: '2008-03-10', hasAccess: true },
      ],
      totalFee: 5000,
      paidAmount: 3000,
      paymentStatus: 'Partially Paid',
      hasAccess: true,
      registrationDate: '2024-09-05',
    },
    {
      id: '3',
      name: 'Robert Davis',
      email: 'robert.davis@email.com',
      phone: '555-0103',
      children: [
        { id: '4', name: 'Sarah Davis', studentId: 'STU004', grade: '9', dateOfBirth: '2010-01-18', hasAccess: false },
      ],
      totalFee: 5000,
      paidAmount: 0,
      paymentStatus: 'Not Paid',
      hasAccess: false,
      registrationDate: '2024-09-10',
    },
    {
      id: '4',
      name: 'Linda Wilson',
      email: 'linda.wilson@email.com',
      phone: '555-0104',
      children: [
        { id: '5', name: 'James Wilson', studentId: 'STU005', grade: '12', dateOfBirth: '2007-07-25', hasAccess: true },
      ],
      totalFee: 5000,
      paidAmount: 0,
      paymentStatus: 'Not Paid',
      hasAccess: true,
      registrationDate: '2024-09-15',
    },
  ]);

  const toggleAccess = (parentId: string, childId?: string) => {
    setParents(parents.map(parent => {
      if (parent.id === parentId) {
        if (childId) {
          // Toggle child access
          return {
            ...parent,
            children: parent.children.map(child =>
              child.id === childId ? { ...child, hasAccess: !child.hasAccess } : child
            ),
          };
        } else {
          // Toggle parent access
          const newAccess = !parent.hasAccess;
          return {
            ...parent,
            hasAccess: newAccess,
            children: parent.children.map(child => ({ ...child, hasAccess: newAccess })),
          };
        }
      }
      return parent;
    }));
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Fully Paid': return 'bg-green-100 text-green-800';
      case 'Partially Paid': return 'bg-yellow-100 text-yellow-800';
      case 'Not Paid': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccessBadge = (hasAccess: boolean) => {
    return hasAccess ? (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Access Granted</span>
    ) : (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Access Restricted</span>
    );
  };

  const filteredParents = parents.filter(parent => {
    const matchesSearch = parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parent.children.some(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || parent.paymentStatus === filterStatus;
    const matchesAccess = filterAccess === 'all' ||
                         (filterAccess === 'granted' && parent.hasAccess) ||
                         (filterAccess === 'restricted' && !parent.hasAccess);
    return matchesSearch && matchesStatus && matchesAccess;
  });

  const totalParents = parents.length;
  const fullyPaid = parents.filter(p => p.paymentStatus === 'Fully Paid').length;
  const partiallyPaid = parents.filter(p => p.paymentStatus === 'Partially Paid').length;
  const notPaid = parents.filter(p => p.paymentStatus === 'Not Paid').length;
  const totalChildren = parents.reduce((sum, p) => sum + p.children.length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Parents & Students</h1>
        <p className="text-gray-600 mt-2">View parents, students, payment status, and manage access</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <div className="text-sm text-gray-600 mb-1">Total Parents</div>
          <div className="text-2xl font-bold text-charcoal-gray">{totalParents}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Total Students</div>
          <div className="text-2xl font-bold text-blue-600">{totalChildren}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Fully Paid</div>
          <div className="text-2xl font-bold text-green-600">{fullyPaid}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Partially Paid</div>
          <div className="text-2xl font-bold text-yellow-600">{partiallyPaid}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Not Paid</div>
          <div className="text-2xl font-bold text-red-600">{notPaid}</div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
              >
                <option value="all">All Statuses</option>
                <option value="Fully Paid">Fully Paid</option>
                <option value="Partially Paid">Partially Paid</option>
                <option value="Not Paid">Not Paid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Access Status</label>
              <select
                value={filterAccess}
                onChange={(e) => setFilterAccess(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
              >
                <option value="all">All Access</option>
                <option value="granted">Access Granted</option>
                <option value="restricted">Access Restricted</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Parents List */}
      <div className="space-y-4">
        {filteredParents.map((parent) => (
          <Card key={parent.id}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-charcoal-gray">{parent.name}</h3>
                    {getAccessBadge(parent.hasAccess)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(parent.paymentStatus)}`}>
                      {parent.paymentStatus}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Email: {parent.email}</p>
                    <p>Phone: {parent.phone}</p>
                    <p>Registered: {new Date(parent.registrationDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">Payment</div>
                  <div className="text-lg font-bold text-charcoal-gray">
                    ${parent.paidAmount.toLocaleString()} / ${parent.totalFee.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {Math.round((parent.paidAmount / parent.totalFee) * 100)}% paid
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-700 mb-3">Children ({parent.children.length})</h4>
                <div className="space-y-3">
                  {parent.children.map((child) => (
                    <div key={child.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{child.name}</span>
                          {getAccessBadge(child.hasAccess)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Student ID: {child.studentId} • Grade {child.grade} • DOB: {new Date(child.dateOfBirth).toLocaleDateString()}
                        </div>
                      </div>
                      <Button
                        variant={child.hasAccess ? "outline" : "primary"}
                        size="sm"
                        onClick={() => toggleAccess(parent.id, child.id)}
                      >
                        {child.hasAccess ? 'Revoke Access' : 'Grant Access'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 mt-4 flex justify-end gap-2">
                <Button
                  variant={parent.hasAccess ? "outline" : "primary"}
                  onClick={() => toggleAccess(parent.id)}
                >
                  {parent.hasAccess ? 'Revoke All Access' : 'Grant All Access'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredParents.length === 0 && (
        <Card>
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Parents Found</h3>
            <p className="text-gray-500">No parents match your search criteria.</p>
          </div>
        </Card>
      )}
    </div>
  );
}

