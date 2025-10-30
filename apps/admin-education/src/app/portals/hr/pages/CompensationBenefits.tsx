import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface SalaryStructure {
  position: string;
  minSalary: number;
  maxSalary: number;
  medianSalary: number;
  employeeCount: number;
}

interface BenefitsPackage {
  id: string;
  name: string;
  type: 'Health' | 'Retirement' | 'Other';
  enrollmentCount: number;
  status: 'Active' | 'Pending' | 'Expired';
}

interface BonusProgram {
  id: string;
  name: string;
  type: 'Performance' | 'Retention' | 'Special';
  eligibility: string;
  budget: number;
  distributed: number;
  status: 'Active' | 'Completed' | 'Pending';
}

export default function CompensationBenefits() {
  const [salaryStructures, setSalaryStructures] = useState<SalaryStructure[]>([
    {
      position: 'Math Teacher',
      minSalary: 45000,
      maxSalary: 65000,
      medianSalary: 55000,
      employeeCount: 12
    },
    {
      position: 'Science Teacher',
      minSalary: 45000,
      maxSalary: 65000,
      medianSalary: 55000,
      employeeCount: 10
    },
    {
      position: 'Department Head',
      minSalary: 65000,
      maxSalary: 85000,
      medianSalary: 75000,
      employeeCount: 5
    }
  ]);

  const [benefits, setBenefits] = useState<BenefitsPackage[]>([
    {
      id: '1',
      name: 'Health Insurance - Basic Plan',
      type: 'Health',
      enrollmentCount: 180,
      status: 'Active'
    },
    {
      id: '2',
      name: '401(k) Retirement Plan',
      type: 'Retirement',
      enrollmentCount: 165,
      status: 'Active'
    },
    {
      id: '3',
      name: 'Dental Insurance',
      type: 'Health',
      enrollmentCount: 145,
      status: 'Active'
    }
  ]);

  const [bonusPrograms, setBonusPrograms] = useState<BonusProgram[]>([
    {
      id: '1',
      name: 'Performance Bonus Q4 2023',
      type: 'Performance',
      eligibility: 'All full-time staff',
      budget: 50000,
      distributed: 48500,
      status: 'Active'
    },
    {
      id: '2',
      name: 'Retention Bonus',
      type: 'Retention',
      eligibility: '5+ years tenure',
      budget: 30000,
      distributed: 28500,
      status: 'Active'
    }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Compensation & Benefits</h1>
        <p className="text-gray-600 mt-2">Salary structure, benefits administration, and payroll integration</p>
      </div>

      {/* Overview Stats */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Average Salary"
          value="$58,500"
          color="blue"
          trend={{ value: 3.2, isPositive: true }}
        />
        <StatCard
          title="Benefits Enrollment"
          value="92%"
          color="green"
          trend={{ value: 2.1, isPositive: true }}
        />
        <StatCard
          title="Bonus Budget"
          value="$80K"
          color="gold"
          trend={{ value: 0, isPositive: true }}
        />
        <StatCard
          title="Payroll Compliance"
          value="100%"
          color="green"
          trend={{ value: 0, isPositive: true }}
        />
      </DashboardGrid>

      {/* Salary Structure Management */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Salary Structure Management</h2>
          <Button size="sm" variant="secondary">Add New Structure</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Median Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salaryStructures.map((structure, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{structure.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${structure.minSalary.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${structure.maxSalary.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-blue-600">${structure.medianSalary.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{structure.employeeCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-gray-600 hover:text-gray-900">View Details</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Benefits Administration */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Benefits Administration</h2>
          <Button size="sm" variant="secondary">Add New Benefit</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium text-gray-900">{benefit.name}</div>
                  <div className="text-sm text-gray-500 mt-1">{benefit.type}</div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  benefit.status === 'Active' ? 'bg-green-100 text-green-800' :
                  benefit.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {benefit.status}
                </span>
              </div>
              <div className="mt-3">
                <div className="text-sm text-gray-600 mb-1">Enrollments</div>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(benefit.enrollmentCount / 245) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900">{benefit.enrollmentCount}</span>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" fullWidth>Manage</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Bonus & Incentive Programs */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Bonus & Incentive Programs</h2>
          <Button size="sm" variant="secondary">Create New Program</Button>
        </div>

        <div className="space-y-4">
          {bonusPrograms.map((program) => (
            <div key={program.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium text-gray-900">{program.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{program.type} • {program.eligibility}</div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  program.status === 'Active' ? 'bg-green-100 text-green-800' :
                  program.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {program.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-sm text-gray-600">Budget</div>
                  <div className="text-lg font-semibold text-gray-900">${program.budget.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Distributed</div>
                  <div className="text-lg font-semibold text-green-600">${program.distributed.toLocaleString()}</div>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{Math.round((program.distributed / program.budget) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(program.distributed / program.budget) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">View Details</Button>
                <Button size="sm" variant="secondary">Manage Distribution</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Payroll Integration & Validation */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Payroll Integration & Validation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Last Payroll Run</div>
            <div className="text-sm text-gray-600 mb-4">Jan 15, 2024</div>
            <div className="flex items-center text-green-600 mb-2">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Validation Successful</span>
            </div>
            <div className="text-xs text-gray-600">245 employees processed</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Next Payroll Run</div>
            <div className="text-sm text-gray-600 mb-4">Jan 31, 2024</div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Pending validation</div>
              <Button size="sm" variant="outline">Validate</Button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="secondary">Run Payroll Validation</Button>
          <Button variant="outline">View Payroll History</Button>
          <Button variant="outline">Configure Integration</Button>
        </div>
      </Card>
    </div>
  );
}