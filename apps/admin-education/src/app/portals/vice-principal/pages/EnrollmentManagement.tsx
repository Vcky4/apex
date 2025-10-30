import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface Admission {
  id: string;
  applicantName: string;
  gradeLevel: string;
  applicationDate: string;
  status: 'Pending' | 'Under Review' | 'Accepted' | 'Rejected' | 'Waitlisted';
  documentsComplete: boolean;
}

interface Enrollment {
  id: string;
  studentName: string;
  gradeLevel: string;
  enrollmentDate: string;
  classAssigned: string;
  status: 'Enrolled' | 'Pending' | 'Completed';
}

interface Transfer {
  id: string;
  studentName: string;
  fromClass: string;
  toClass: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestDate: string;
}

export default function EnrollmentManagement() {
  const [admissions, setAdmissions] = useState<Admission[]>([
    {
      id: '1',
      applicantName: 'Emily Johnson',
      gradeLevel: 'Grade 9',
      applicationDate: '2024-01-15',
      status: 'Under Review',
      documentsComplete: true
    },
    {
      id: '2',
      applicantName: 'Michael Chen',
      gradeLevel: 'Grade 10',
      applicationDate: '2024-01-18',
      status: 'Accepted',
      documentsComplete: true
    }
  ]);

  const [enrollments, setEnrollments] = useState<Enrollment[]>([
    {
      id: '1',
      studentName: 'Sarah Williams',
      gradeLevel: 'Grade 9',
      enrollmentDate: '2024-01-20',
      classAssigned: '9A',
      status: 'Enrolled'
    }
  ]);

  const [transfers, setTransfers] = useState<Transfer[]>([
    {
      id: '1',
      studentName: 'John Doe',
      fromClass: '10A',
      toClass: '10B',
      reason: 'Schedule conflict',
      status: 'Pending',
      requestDate: '2024-01-22'
    }
  ]);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Enrolled': 'bg-green-100 text-green-800',
      'Accepted': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Under Review': 'bg-blue-100 text-blue-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Waitlisted': 'bg-orange-100 text-orange-800',
      'Approved': 'bg-green-100 text-green-800',
      'Completed': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Enrollment Management</h1>
          <p className="text-gray-600 mt-2">Admission process, student registration, and class placement</p>
        </div>
        <Button>New Admission</Button>
      </div>

      <DashboardGrid columns={4}>
        <StatCard title="Pending Applications" value="12" color="orange" />
        <StatCard title="New Enrollments" value="45" color="green" />
        <StatCard title="Total Students" value="2,450" color="blue" />
        <StatCard title="Transfer Requests" value="8" color="purple" />
      </DashboardGrid>

      {/* Admission Process Workflow */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Admission Process Workflow</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Under Review</option>
              <option>Accepted</option>
            </select>
            <Button size="sm" variant="secondary">Process Batch</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admissions.map((admission) => (
                <tr key={admission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{admission.applicantName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{admission.gradeLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{admission.applicationDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {admission.documentsComplete ? (
                      <span className="text-green-600">
                        <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    ) : (
                      <span className="text-red-600">
                        <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(admission.status)}`}>
                      {admission.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">Review</button>
                      {admission.status === 'Accepted' && (
                        <button className="text-green-600 hover:text-green-900">Enroll</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Student Registration & Records */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Student Registration & Records</h2>
          <Button size="sm" variant="secondary">Bulk Registration</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{enrollment.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{enrollment.gradeLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{enrollment.classAssigned}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{enrollment.enrollmentDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(enrollment.status)}`}>
                      {enrollment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">View Records</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Transfer & Withdrawal Processing */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Transfer & Withdrawal Processing</h2>
          <Button size="sm" variant="secondary">Process Transfer</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transfers.map((transfer) => (
                <tr key={transfer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{transfer.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{transfer.fromClass}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{transfer.toClass}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{transfer.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transfer.status)}`}>
                      {transfer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {transfer.status === 'Pending' && (
                        <>
                          <button className="text-green-600 hover:text-green-900">Approve</button>
                          <button className="text-red-600 hover:text-red-900">Reject</button>
                        </>
                      )}
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Class Placement Optimization */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Class Placement Optimization</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Optimization Criteria</div>
            <div className="text-sm text-gray-600 space-y-1">
              <div>• Academic performance</div>
              <div>• Learning styles</div>
              <div>• Social compatibility</div>
              <div>• Special needs</div>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Current Placement</div>
            <div className="text-2xl font-bold text-blue-600 mb-2">2,450</div>
            <div className="text-sm text-gray-600">Students placed</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Optimization Score</div>
            <div className="text-2xl font-bold text-green-600 mb-2">92%</div>
            <div className="text-sm text-gray-600">Optimal placement rate</div>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="secondary" fullWidth>Run Placement Optimization</Button>
        </div>
      </Card>
    </div>
  );
}