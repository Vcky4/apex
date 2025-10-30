import { useState } from 'react';
import { Card, Button } from '@apex-providers/ui-components';

interface Position {
  id: string;
  title: string;
  department: string;
  priority: 'Urgent' | 'High' | 'Normal' | 'Low';
  status: 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Open' | 'Closed';
  budget: number;
  createdDate: string;
  applicantCount: number;
}

interface Applicant {
  id: string;
  name: string;
  email: string;
  position: string;
  stage: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
  appliedDate: string;
  nextAction?: string;
}

export default function Recruitment() {
  const [positions, setPositions] = useState<Position[]>([
    {
      id: '1',
      title: 'Math Teacher - High School',
      department: 'Mathematics',
      priority: 'Urgent',
      status: 'Open',
      budget: 55000,
      createdDate: '2024-01-15',
      applicantCount: 12
    },
    {
      id: '2',
      title: 'Librarian',
      department: 'Library Services',
      priority: 'Normal',
      status: 'Pending Approval',
      budget: 42000,
      createdDate: '2024-01-20',
      applicantCount: 8
    },
    {
      id: '3',
      title: 'IT Support Specialist',
      department: 'IT Department',
      priority: 'High',
      status: 'Open',
      budget: 48000,
      createdDate: '2024-01-18',
      applicantCount: 15
    }
  ]);

  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      position: 'Math Teacher - High School',
      stage: 'Interview',
      appliedDate: '2024-01-16',
      nextAction: 'Schedule final interview'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'm.chen@email.com',
      position: 'IT Support Specialist',
      stage: 'Screening',
      appliedDate: '2024-01-19',
      nextAction: 'Technical assessment'
    }
  ]);

  const [showNewPosition, setShowNewPosition] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-green-100 text-green-800';
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Normal': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Hired': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Interview': return 'bg-purple-100 text-purple-800';
      case 'Offer': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Recruitment & Staffing</h1>
          <p className="text-gray-600 mt-2">Position requisition management, applicant tracking, and onboarding</p>
        </div>
        <Button onClick={() => setShowNewPosition(!showNewPosition)}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Position Requisition
        </Button>
      </div>

      {/* Position Requisition Management */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Position Requisition Management</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Departments</option>
              <option>Mathematics</option>
              <option>Science</option>
              <option>Library Services</option>
              <option>IT Department</option>
            </select>
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Statuses</option>
              <option>Open</option>
              <option>Pending Approval</option>
              <option>Closed</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {positions.map((position) => (
                <tr key={position.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{position.title}</div>
                    <div className="text-sm text-gray-500">Created: {position.createdDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{position.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(position.priority)}`}>
                      {position.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(position.status)}`}>
                      {position.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${position.budget.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{position.applicantCount}</span>
                      <button
                        onClick={() => setSelectedPosition(position.id)}
                        className="ml-2 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-green-600 hover:text-green-900">Approve</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Applicant Tracking System */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Applicant Tracking System (ATS)</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Positions</option>
              <option>Math Teacher - High School</option>
              <option>IT Support Specialist</option>
            </select>
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Stages</option>
              <option>Applied</option>
              <option>Screening</option>
              <option>Interview</option>
              <option>Offer</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applicants.map((applicant) => (
                <tr key={applicant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{applicant.name}</div>
                    <div className="text-sm text-gray-500">{applicant.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{applicant.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(applicant.stage)}`}>
                      {applicant.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{applicant.appliedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{applicant.nextAction || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Schedule</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Interview Scheduling & Coordination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Interview Scheduling & Coordination</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
              <div className="font-medium text-gray-900">Sarah Johnson - Math Teacher</div>
              <div className="text-sm text-gray-600">Final Interview</div>
              <div className="text-sm text-gray-500">Jan 25, 2024 at 2:00 PM</div>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="secondary">Reschedule</Button>
                <Button size="sm" variant="outline">Cancel</Button>
              </div>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50">
              <div className="font-medium text-gray-900">Michael Chen - IT Support</div>
              <div className="text-sm text-gray-600">Technical Interview</div>
              <div className="text-sm text-gray-500">Jan 24, 2024 at 10:00 AM</div>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="secondary">Reschedule</Button>
                <Button size="sm" variant="outline">Cancel</Button>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="secondary" fullWidth>Schedule New Interview</Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Onboarding Workflow Automation</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Document Collection</div>
                <div className="text-sm text-gray-600">Pending - 2 items</div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Background Check</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Orientation Scheduled</div>
                <div className="text-sm text-gray-600">Jan 30, 2024</div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="secondary" fullWidth>View Onboarding Pipeline</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}