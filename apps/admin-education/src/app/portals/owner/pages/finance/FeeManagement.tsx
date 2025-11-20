import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface FeeStructure {
  id: string;
  gradeLevel: string;
  tuitionFee: number;
  registrationFee: number;
  otherFees: number;
  totalFee: number;
  paymentPlans: number;
}

interface OutstandingFee {
  id: string;
  studentName: string;
  gradeLevel: string;
  totalDue: number;
  overdueAmount: number;
  daysOverdue: number;
  paymentPlan: string;
  status: 'Current' | 'Overdue' | 'Critical';
}

interface Scholarship {
  id: string;
  name: string;
  type: 'Merit' | 'Need-Based' | 'Athletic' | 'Other';
  discount: number;
  studentsCount: number;
  totalValue: number;
  status: 'Active' | 'Inactive';
}

export default function FeeManagement() {
  const [showScholarshipModal, setShowScholarshipModal] = useState(false);
  const [scholarshipFormData, setScholarshipFormData] = useState({
    name: '',
    type: 'Merit' as 'Merit' | 'Need-Based' | 'Athletic' | 'Other',
    discount: '',
    description: '',
    eligibilityCriteria: '',
    notifyParents: true,
  });

  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>([
    {
      id: '1',
      gradeLevel: 'Grade 9-12',
      tuitionFee: 12000,
      registrationFee: 500,
      otherFees: 800,
      totalFee: 13300,
      paymentPlans: 3
    },
    {
      id: '2',
      gradeLevel: 'Grade 6-8',
      tuitionFee: 10000,
      registrationFee: 500,
      otherFees: 700,
      totalFee: 11200,
      paymentPlans: 2
    }
  ]);

  const [outstandingFees, setOutstandingFees] = useState<OutstandingFee[]>([
    {
      id: '1',
      studentName: 'John Doe',
      gradeLevel: 'Grade 10',
      totalDue: 3500,
      overdueAmount: 1500,
      daysOverdue: 45,
      paymentPlan: 'Monthly Installment',
      status: 'Overdue'
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      gradeLevel: 'Grade 11',
      totalDue: 5500,
      overdueAmount: 3000,
      daysOverdue: 90,
      paymentPlan: 'Quarterly Installment',
      status: 'Critical'
    }
  ]);

  const [scholarships, setScholarships] = useState<Scholarship[]>([
    {
      id: '1',
      name: 'Academic Excellence Scholarship',
      type: 'Merit',
      discount: 50,
      studentsCount: 25,
      totalValue: 165000,
      status: 'Active'
    },
    {
      id: '2',
      name: 'Financial Aid Program',
      type: 'Need-Based',
      discount: 30,
      studentsCount: 45,
      totalValue: 180000,
      status: 'Active'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Current': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalOutstanding = outstandingFees.reduce((sum, f) => sum + f.totalDue, 0);
  const totalOverdue = outstandingFees.reduce((sum, f) => sum + f.overdueAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Fee Management</h1>
          <p className="text-gray-600 mt-2">Tuition fee structure, payment plans, and collection tracking</p>
        </div>
        <Button>Configure Fee Structure</Button>
      </div>

      {/* Overview Stats */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Total Outstanding"
          value={`$${(totalOutstanding / 1000).toFixed(0)}K`}
          color="orange"
        />
        <StatCard
          title="Overdue Amount"
          value={`$${(totalOverdue / 1000).toFixed(0)}K`}
          color="red"
        />
        <StatCard
          title="Collection Rate"
          value="96.8%"
          color="green"
          trend={{ value: 1.2, isPositive: true }}
        />
        <StatCard
          title="Payment Plans"
          value="145"
          color="blue"
        />
      </DashboardGrid>

      {/* Tuition Fee Structure Management */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tuition Fee Structure Management</h2>
          <Button size="sm" variant="secondary">Add New Structure</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tuition Fee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Other Fees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Fee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Plans</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feeStructures.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{fee.gradeLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${fee.tuitionFee.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${fee.registrationFee.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${fee.otherFees.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-blue-600">${fee.totalFee.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{fee.paymentPlans} options</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-green-600 hover:text-green-900">Configure Plans</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Outstanding Fee Collection Tracking */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Outstanding Fee Collection Tracking</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Statuses</option>
              <option>Current</option>
              <option>Overdue</option>
              <option>Critical</option>
            </select>
            <Button size="sm" variant="secondary">Send Reminders</Button>
          </div>
        </div>

        {/* Overdue Alert */}
        {outstandingFees.filter(f => f.status === 'Critical').length > 0 && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-red-800">
                  {outstandingFees.filter(f => f.status === 'Critical').length} student(s) with critical overdue fees
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Due</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overdue Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Overdue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {outstandingFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{fee.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{fee.gradeLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${fee.totalDue.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">${fee.overdueAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{fee.daysOverdue} days</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(fee.status)}`}>
                      {fee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">Contact</button>
                      <button className="text-green-600 hover:text-green-900">Payment Plan</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Scholarship & Discount Administration */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Scholarship & Discount Administration</h2>
          <Button size="sm" variant="secondary" onClick={() => setShowScholarshipModal(true)}>Create Scholarship</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scholarships.map((scholarship) => (
            <div key={scholarship.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium text-gray-900">{scholarship.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{scholarship.type}</div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  scholarship.status === 'Active' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {scholarship.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-sm text-gray-600">Discount</div>
                  <div className="text-lg font-semibold text-blue-600">{scholarship.discount}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Students</div>
                  <div className="text-lg font-semibold text-gray-900">{scholarship.studentsCount}</div>
                </div>
              </div>
              <div className="mb-3">
                <div className="text-sm text-gray-600 mb-1">Total Value</div>
                <div className="text-xl font-bold text-green-600">${scholarship.totalValue.toLocaleString()}</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" fullWidth>Manage</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment Plan Configuration */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Payment Plan Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="font-medium text-gray-900 mb-2">One-Time Payment</div>
            <div className="text-sm text-gray-600 mb-3">Full payment upfront</div>
            <div className="text-xs text-blue-600 font-medium">5% discount applied</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Monthly Installment</div>
            <div className="text-sm text-gray-600 mb-3">10 monthly payments</div>
            <div className="text-xs text-gray-600">No additional fees</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Quarterly Installment</div>
            <div className="text-sm text-gray-600 mb-3">4 quarterly payments</div>
            <div className="text-xs text-gray-600">No additional fees</div>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="outline" fullWidth>Configure Payment Plans</Button>
        </div>
      </Card>

      {/* Create Scholarship Modal */}
      {showScholarshipModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create Scholarship</h2>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newScholarship: Scholarship = {
                id: `sch-${Date.now()}`,
                name: scholarshipFormData.name,
                type: scholarshipFormData.type,
                discount: parseFloat(scholarshipFormData.discount),
                studentsCount: 0,
                totalValue: 0,
                status: 'Active',
              };
              setScholarships([...scholarships, newScholarship]);
              
              // Send notification to all parents
              if (scholarshipFormData.notifyParents) {
                alert(`Scholarship "${scholarshipFormData.name}" created successfully!\n\nNotification sent to all parents via email.`);
              } else {
                alert(`Scholarship "${scholarshipFormData.name}" created successfully!`);
              }
              
              setScholarshipFormData({
                name: '',
                type: 'Merit',
                discount: '',
                description: '',
                eligibilityCriteria: '',
                notifyParents: true,
              });
              setShowScholarshipModal(false);
            }} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship Name *</label>
                <input
                  type="text"
                  value={scholarshipFormData.name}
                  onChange={(e) => setScholarshipFormData({...scholarshipFormData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  placeholder="e.g., Academic Excellence Scholarship"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                  <select
                    value={scholarshipFormData.type}
                    onChange={(e) => setScholarshipFormData({...scholarshipFormData, type: e.target.value as any})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  >
                    <option value="Merit">Merit</option>
                    <option value="Need-Based">Need-Based</option>
                    <option value="Athletic">Athletic</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%) *</label>
                  <input
                    type="number"
                    value={scholarshipFormData.discount}
                    onChange={(e) => setScholarshipFormData({...scholarshipFormData, discount: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                    min="1"
                    max="100"
                    placeholder="50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={scholarshipFormData.description}
                  onChange={(e) => setScholarshipFormData({...scholarshipFormData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={3}
                  required
                  placeholder="Describe the scholarship program..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility Criteria *</label>
                <textarea
                  value={scholarshipFormData.eligibilityCriteria}
                  onChange={(e) => setScholarshipFormData({...scholarshipFormData, eligibilityCriteria: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={3}
                  required
                  placeholder="List eligibility requirements..."
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifyParents"
                  checked={scholarshipFormData.notifyParents}
                  onChange={(e) => setScholarshipFormData({...scholarshipFormData, notifyParents: e.target.checked})}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="notifyParents" className="ml-2 text-sm text-gray-700">
                  Send notification to all parents
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowScholarshipModal(false);
                    setScholarshipFormData({
                      name: '',
                      type: 'Merit',
                      discount: '',
                      description: '',
                      eligibilityCriteria: '',
                      notifyParents: true,
                    });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Create Scholarship</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}