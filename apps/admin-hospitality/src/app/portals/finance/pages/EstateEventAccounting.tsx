import React, { useState } from 'react';
import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';

export default function EstateEventAccounting() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const types = ['All Types', 'Estate Rental', 'Event Deposit', 'Staged Payment', 'Vendor Payout', 'Service Billing'];
  const statuses = ['All Statuses', 'Pending', 'Approved', 'Paid', 'Overdue'];

  const estateRentals = [
    {
      id: 1,
      property: 'Mountain Estate',
      tenant: 'Corporate Retreat Inc.',
      period: 'Nov 2025',
      amount: 45000,
      status: 'Paid',
      dueDate: '2025-11-01',
      paidDate: '2025-10-28'
    },
    {
      id: 2,
      property: 'Seaside Estate',
      tenant: 'Luxury Events LLC',
      period: 'Nov 2025',
      amount: 52000,
      status: 'Pending',
      dueDate: '2025-11-05',
      paidDate: null
    },
    {
      id: 3,
      property: 'Urban Estate',
      tenant: 'Private Residence',
      period: 'Nov 2025',
      amount: 38000,
      status: 'Overdue',
      dueDate: '2025-10-25',
      paidDate: null
    },
  ];

  const eventPayments = [
    {
      id: 1,
      event: 'Grand Wedding - Johnson Family',
      type: 'Deposit',
      amount: 15000,
      status: 'Paid',
      date: '2025-10-15',
      nextPayment: '2025-11-01'
    },
    {
      id: 2,
      event: 'Corporate Retreat - Tech Corp',
      type: 'Staged Payment',
      amount: 25000,
      status: 'Pending',
      date: '2025-11-01',
      nextPayment: '2025-11-15'
    },
    {
      id: 3,
      event: 'Private Gala - Annual Fundraiser',
      type: 'Final Payment',
      amount: 18000,
      status: 'Approved',
      date: '2025-11-10',
      nextPayment: null
    },
  ];

  const vendorPayouts = [
    {
      id: 1,
      vendor: 'Catering Excellence Co.',
      service: 'Wedding Catering',
      amount: 12500,
      status: 'Approved',
      dueDate: '2025-11-05',
      contractRenewal: '2026-01-01'
    },
    {
      id: 2,
      vendor: 'Floral Designs Ltd.',
      service: 'Event Decorations',
      amount: 8500,
      status: 'Pending',
      dueDate: '2025-11-10',
      contractRenewal: '2026-02-15'
    },
    {
      id: 3,
      vendor: 'Audio Visual Pro',
      service: 'Event AV Equipment',
      amount: 6200,
      status: 'Paid',
      dueDate: '2025-10-28',
      contractRenewal: '2026-03-01'
    },
  ];

  const serviceBillings = [
    {
      id: 1,
      service: 'Ultra-Luxury Concierge',
      guest: 'VIP Guest - Suite 501',
      amount: 3500,
      status: 'Paid',
      date: '2025-10-20'
    },
    {
      id: 2,
      service: 'Private Butler Service',
      guest: 'Estate Guest - Mountain Estate',
      amount: 2800,
      status: 'Pending',
      date: '2025-11-01'
    },
    {
      id: 3,
      service: 'Personal Chef Service',
      guest: 'VIP Guest - Seaside Villa',
      amount: 4200,
      status: 'Approved',
      date: '2025-10-25'
    },
  ];

  const stats = {
    totalEstateIncome: 135000,
    totalEventPayments: 58000,
    pendingVendorPayouts: 21000,
    serviceRevenue: 10500
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Estate & Event Accounting</h1>
        <p className="text-gray-600 mt-2">Track estate rental income, manage event deposits and staged payments, approve vendor payouts</p>
      </div>

      {/* Statistics Overview */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Estate Rental Income"
          value={`$${(stats.totalEstateIncome / 1000).toFixed(0)}k`}
          icon={<span className="text-xl">🏛️</span>}
          color="blue"
        />
        <StatCard
          title="Event Payments"
          value={`$${(stats.totalEventPayments / 1000).toFixed(0)}k`}
          icon={<span className="text-xl">🎉</span>}
          color="purple"
        />
        <StatCard
          title="Vendor Payouts"
          value={`$${(stats.pendingVendorPayouts / 1000).toFixed(0)}k`}
          icon={<span className="text-xl">💼</span>}
          color="orange"
        />
        <StatCard
          title="Service Revenue"
          value={`$${(stats.serviceRevenue / 1000).toFixed(0)}k`}
          icon={<span className="text-xl">✨</span>}
          color="green"
        />
      </DashboardGrid>

      {/* Filters */}
      <div className="flex space-x-4">
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {types.map(type => (
            <option key={type} value={type === 'All Types' ? 'all' : type}>{type}</option>
          ))}
        </select>
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          {statuses.map(status => (
            <option key={status} value={status === 'All Statuses' ? 'all' : status}>{status}</option>
          ))}
        </select>
        <Button>Approve Payments</Button>
        <Button variant="outline">Export Report</Button>
      </div>

      {/* Estate Rental Income */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Estate Rental Income</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {estateRentals.map((rental) => (
                <tr key={rental.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rental.property}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rental.tenant}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rental.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${rental.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rental.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(rental.status)}`}>
                      {rental.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Event Deposits & Staged Payments */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Event Deposits & Staged Payments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {eventPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.event}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${payment.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.nextPayment || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                      {payment.status}
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

      {/* Vendor & Contractor Payouts */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Vendor & Contractor Payouts</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract Renewal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendorPayouts.map((payout) => (
                <tr key={payout.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payout.vendor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payout.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${payout.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payout.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payout.contractRenewal}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payout.status)}`}>
                      {payout.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Approve</button>
                    <button className="text-gray-600 hover:text-gray-900">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Luxury Service Billing */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Luxury Service Billing</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {serviceBillings.map((billing) => (
                <tr key={billing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{billing.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{billing.guest}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${billing.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{billing.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(billing.status)}`}>
                      {billing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">Invoice</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Admin Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Payment Schedules</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">Configure payment schedules</p>
              <p className="text-xs text-gray-500 mt-1">Set automatic payment reminders and due dates</p>
              <Button variant="outline" className="mt-2">Configure</Button>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Contract Renewal Enforcement</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">Audit readiness rules</p>
              <p className="text-xs text-gray-500 mt-1">Ensure all contracts are up-to-date and compliant</p>
              <Button variant="outline" className="mt-2">View Contracts</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
