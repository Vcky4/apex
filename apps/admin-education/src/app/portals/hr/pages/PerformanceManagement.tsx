import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface PerformanceReview {
  id: string;
  employeeName: string;
  position: string;
  reviewPeriod: string;
  overallScore: number;
  status: 'Draft' | 'In Progress' | 'Completed' | 'Pending Approval';
  lastUpdated: string;
  reviewer: string;
}

interface PerformanceTrend {
  employeeName: string;
  position: string;
  scores: { period: string; score: number }[];
  trend: 'improving' | 'declining' | 'stable';
}

export default function PerformanceManagement() {
  const [reviews, setReviews] = useState<PerformanceReview[]>([
    {
      id: '1',
      employeeName: 'Sarah Johnson',
      position: 'Math Teacher',
      reviewPeriod: 'Q4 2023',
      overallScore: 4.2,
      status: 'Completed',
      lastUpdated: '2024-01-15',
      reviewer: 'Dr. Michael Chen'
    },
    {
      id: '2',
      employeeName: 'Robert Williams',
      position: 'Science Teacher',
      reviewPeriod: 'Q4 2023',
      overallScore: 3.8,
      status: 'In Progress',
      lastUpdated: '2024-01-20',
      reviewer: 'Dr. Michael Chen'
    },
    {
      id: '3',
      employeeName: 'Emily Davis',
      position: 'English Teacher',
      reviewPeriod: 'Q4 2023',
      overallScore: 4.5,
      status: 'Pending Approval',
      lastUpdated: '2024-01-18',
      reviewer: 'Dr. Michael Chen'
    }
  ]);

  const [trends, setTrends] = useState<PerformanceTrend[]>([
    {
      employeeName: 'Sarah Johnson',
      position: 'Math Teacher',
      scores: [
        { period: 'Q1 2023', score: 3.8 },
        { period: 'Q2 2023', score: 4.0 },
        { period: 'Q3 2023', score: 4.1 },
        { period: 'Q4 2023', score: 4.2 }
      ],
      trend: 'improving'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 4.0) return 'text-blue-600';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Performance Management</h1>
        <p className="text-gray-600 mt-2">Teacher and staff performance evaluation system</p>
      </div>

      {/* Performance Overview */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Average Performance Score"
          value="4.1"
          color="blue"
          trend={{ value: 0.2, isPositive: true }}
        />
        <StatCard
          title="Reviews Completed"
          value="85%"
          color="green"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Improvement Plans"
          value="12"
          color="orange"
          trend={{ value: -2, isPositive: true }}
        />
        <StatCard
          title="360-Degree Reviews"
          value="68"
          color="purple"
          trend={{ value: 8, isPositive: true }}
        />
      </DashboardGrid>

      {/* Teacher Performance Evaluation System */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Teacher Performance Evaluation System</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Review Periods</option>
              <option>Q4 2023</option>
              <option>Q3 2023</option>
            </select>
            <Button size="sm" variant="secondary">New Performance Review</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reviewer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{review.employeeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{review.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{review.reviewPeriod}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-lg font-bold ${getScoreColor(review.overallScore)}`}>
                      {review.overallScore}/5.0
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(review.status)}`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{review.reviewer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Support Staff Assessment */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Support Staff Assessment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 border rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Administrative Staff</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">3.9/5.0</div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
              <div className="text-sm text-green-600">↑ 0.1</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Support Services</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">4.0/5.0</div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
              <div className="text-sm text-green-600">↑ 0.2</div>
            </div>
          </div>
        </div>
        <Button variant="outline" fullWidth>View All Support Staff Reviews</Button>
      </Card>

      {/* Professional Growth Tracking */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Professional Growth Tracking</h2>
        <div className="space-y-4">
          {trends.map((trend, idx) => (
            <div key={idx} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium text-gray-900">{trend.employeeName}</div>
                  <div className="text-sm text-gray-600">{trend.position}</div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  trend.trend === 'improving' ? 'bg-green-100 text-green-800' :
                  trend.trend === 'declining' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {trend.trend === 'improving' ? '↑ Improving' : trend.trend === 'declining' ? '↓ Declining' : '→ Stable'}
                </span>
              </div>
              <div className="flex items-end space-x-2 h-32">
                {trend.scores.map((score, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                      style={{ height: `${(score.score / 5) * 100}%` }}
                      title={`${score.period}: ${score.score}/5.0`}
                    ></div>
                    <div className="text-xs text-gray-600 mt-2">{score.period}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 360-Degree Feedback Collection */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">360-Degree Feedback Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Pending Feedback</div>
            <div className="text-3xl font-bold text-yellow-600 mb-2">12</div>
            <div className="text-sm text-gray-600">Awaiting responses</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">In Progress</div>
            <div className="text-3xl font-bold text-blue-600 mb-2">25</div>
            <div className="text-sm text-gray-600">Being completed</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Completed</div>
            <div className="text-3xl font-bold text-green-600 mb-2">68</div>
            <div className="text-sm text-gray-600">This cycle</div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="secondary">Launch New 360 Review</Button>
          <Button variant="outline">View Feedback Reports</Button>
        </div>
      </Card>

      {/* Recognition Programs */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Recognition Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-gray-900">Teacher of the Month</div>
              <span className="text-xs text-green-600">Active</span>
            </div>
            <div className="text-sm text-gray-600 mb-2">Current Winner: Sarah Johnson</div>
            <Button size="sm" variant="outline" fullWidth>View Program Details</Button>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-gray-900">Excellence Awards</div>
              <span className="text-xs text-green-600">Active</span>
            </div>
            <div className="text-sm text-gray-600 mb-2">15 recipients this year</div>
            <Button size="sm" variant="outline" fullWidth>Manage Awards</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}