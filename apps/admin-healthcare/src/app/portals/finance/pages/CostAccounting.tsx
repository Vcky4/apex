import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

interface Department {
  name: string;
  costPerCase: string;
  cases: number;
  totalCost: string;
  profitability: string;
  revenue?: string;
}

export default function CostAccounting() {
  const { toasts, showToast, removeToast } = useToast();
  
  const [departments, setDepartments] = useState<Department[]>([
    { name: 'Cardiology', costPerCase: '$12,450', cases: 245, totalCost: '$3.05M', profitability: '18%', revenue: '$3.60M' },
    { name: 'Emergency', costPerCase: '$3,850', cases: 1245, totalCost: '$4.79M', profitability: '12%', revenue: '$5.36M' },
    { name: 'Surgery', costPerCase: '$18,200', cases: 456, totalCost: '$8.30M', profitability: '22%', revenue: '$10.13M' },
    { name: 'Pediatrics', costPerCase: '$4,200', cases: 678, totalCost: '$2.85M', profitability: '15%', revenue: '$3.28M' },
  ]);

  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const handleAnalyze = (dept: Department) => {
    setSelectedDepartment(dept);
    setShowAnalysisModal(true);
  };

  const handleGenerateReport = () => {
    showToast('Generating cost accounting report...', 'info');
    setTimeout(() => {
      showToast('Cost accounting report generated successfully. Report includes departmental analysis, variance reports, and recommendations.', 'success');
    }, 2000);
  };

  const handleOptimizeCosts = (dept: Department) => {
    const currentCost = parseFloat(dept.costPerCase.replace(/[^0-9.]/g, ''));
    const optimizedCost = currentCost * 0.95; // 5% reduction
    setDepartments(departments.map(d => 
      d.name === dept.name 
        ? { ...d, costPerCase: `$${optimizedCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, profitability: `${(parseFloat(d.profitability) + 2).toFixed(0)}%` }
        : d
    ));
    showToast(`Cost optimization applied to ${dept.name}. Estimated savings: $${((currentCost - optimizedCost) * dept.cases).toLocaleString()}`, 'success');
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Cost Accounting</h1>
        <p className="text-gray-600 mt-2">Procedure cost analysis, departmental profitability, resource utilization optimization</p>
      </div>

      <DashboardGrid columns={4}>
        <StatCard title="Avg Cost per Case" value="$8,245" color="blue" trend={{ value: -2.3, isPositive: true }} />
        <StatCard title="Department Profitability" value="16.8%" color="green" trend={{ value: 1.2, isPositive: true }} />
        <StatCard title="Resource Utilization" value="84%" color="purple" trend={{ value: 3.1, isPositive: true }} />
        <StatCard title="Service Line Performance" value="92%" color="orange" trend={{ value: 0.8, isPositive: true }} />
      </DashboardGrid>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Departmental Profitability Analysis</h2>
          <Button onClick={handleGenerateReport}>Generate Report</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost per Case</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Cases</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profitability</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departments.map((dept) => (
                <tr key={dept.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{dept.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dept.costPerCase}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dept.cases.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">{dept.totalCost}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-600">{dept.revenue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      parseFloat(dept.profitability) > 15 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {dept.profitability}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleAnalyze(dept)} className="text-blue-600 hover:text-blue-900 mr-3">Analyze</button>
                    <button onClick={() => handleOptimizeCosts(dept)} className="text-green-600 hover:text-green-900">Optimize</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <DashboardGrid columns={2}>
        <Card>
          <h3 className="text-lg font-semibold mb-4">Cost Variance Analysis</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Labor Costs</span>
              <span className="font-semibold text-green-600">-2.1% vs budget</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '98%' }}></div>
            </div>
            <div className="flex justify-between mt-3">
              <span>Supply Costs</span>
              <span className="font-semibold text-yellow-600">+1.5% vs budget</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '101.5%' }}></div>
            </div>
            <div className="flex justify-between mt-3">
              <span>Equipment Costs</span>
              <span className="font-semibold text-green-600">-0.8% vs budget</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '99.2%' }}></div>
            </div>
            <Button className="mt-4 w-full" variant="outline" onClick={() => showToast('Generating detailed variance report...', 'info')}>
              View Detailed Variance Report
            </Button>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-4">Service Line Performance</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex justify-between">
                <span className="font-medium">Cardiac Services</span>
                <span className="font-semibold text-green-600">+18% ROI</span>
              </div>
              <Button size="sm" variant="outline" className="mt-2 w-full" onClick={() => showToast('Viewing Cardiac Services detailed analysis...', 'info')}>
                View Analysis
              </Button>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex justify-between">
                <span className="font-medium">Emergency Services</span>
                <span className="font-semibold text-blue-600">+12% ROI</span>
              </div>
              <Button size="sm" variant="outline" className="mt-2 w-full" onClick={() => showToast('Viewing Emergency Services detailed analysis...', 'info')}>
                View Analysis
              </Button>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="flex justify-between">
                <span className="font-medium">Surgical Services</span>
                <span className="font-semibold text-purple-600">+22% ROI</span>
              </div>
              <Button size="sm" variant="outline" className="mt-2 w-full" onClick={() => showToast('Viewing Surgical Services detailed analysis...', 'info')}>
                View Analysis
              </Button>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="flex justify-between">
                <span className="font-medium">Pediatric Services</span>
                <span className="font-semibold text-orange-600">+15% ROI</span>
              </div>
              <Button size="sm" variant="outline" className="mt-2 w-full" onClick={() => showToast('Viewing Pediatric Services detailed analysis...', 'info')}>
                View Analysis
              </Button>
            </div>
          </div>
        </Card>
      </DashboardGrid>

      {/* Department Analysis Modal */}
      <Modal
        isOpen={showAnalysisModal}
        onClose={() => {
          setShowAnalysisModal(false);
          setSelectedDepartment(null);
        }}
        title={`Cost Analysis: ${selectedDepartment?.name}`}
        size="lg"
        footer={
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => {
              setShowAnalysisModal(false);
              setSelectedDepartment(null);
            }}>Close</Button>
          </div>
        }
      >
        {selectedDepartment && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900">Cost per Case</h4>
                <p className="text-2xl font-bold text-gray-700">{selectedDepartment.costPerCase}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Total Cases</h4>
                <p className="text-2xl font-bold text-gray-700">{selectedDepartment.cases.toLocaleString()}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Total Cost</h4>
                <p className="text-2xl font-bold text-red-600">{selectedDepartment.totalCost}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Revenue</h4>
                <p className="text-2xl font-bold text-green-600">{selectedDepartment.revenue}</p>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Cost Breakdown</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Labor: 45% of total cost</li>
                <li>• Supplies: 30% of total cost</li>
                <li>• Equipment: 15% of total cost</li>
                <li>• Overhead: 10% of total cost</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Optimization Recommendations</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Reduce supply waste by 5% through better inventory management</li>
                <li>• Optimize staff scheduling to reduce overtime costs</li>
                <li>• Negotiate better pricing with suppliers</li>
                <li>• Implement lean processes to improve efficiency</li>
              </ul>
            </div>
            <Button onClick={() => handleOptimizeCosts(selectedDepartment)} className="w-full">
              Apply Cost Optimization
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
