import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface CounselingSession {
  id: string;
  studentName: string;
  studentId: string;
  grade: string;
  counselor: string;
  sessionType: 'Individual' | 'Group' | 'Crisis' | 'Follow-up';
  scheduledDate: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No Show';
  notes: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
}

interface SpecialNeedsAccommodation {
  id: string;
  studentName: string;
  studentId: string;
  accommodationType: 'IEP' | '504 Plan' | 'ELL Support' | 'Gifted Program' | 'Other';
  accommodationDetails: string;
  startDate: string;
  reviewDate: string;
  status: 'Active' | 'Pending Review' | 'Expired';
  assignedStaff: string;
}

interface TutoringSession {
  id: string;
  studentName: string;
  studentId: string;
  subject: string;
  tutor: string;
  scheduledDate: string;
  duration: number;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  progress: string;
}

interface CrisisIntervention {
  id: string;
  studentName: string;
  studentId: string;
  incidentType: 'Mental Health' | 'Bullying' | 'Family Crisis' | 'Academic Crisis' | 'Other';
  reportedBy: string;
  reportedDate: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Active' | 'Resolved' | 'Referred';
  assignedStaff: string;
  followUpRequired: boolean;
}

export default function StudentSupportServices() {
  const [counselingSessions, setCounselingSessions] = useState<CounselingSession[]>([
    {
      id: '1',
      studentName: 'John Doe',
      studentId: 'STU-2024-001',
      grade: 'Grade 10',
      counselor: 'Ms. Johnson',
      sessionType: 'Individual',
      scheduledDate: '2024-01-25',
      status: 'Scheduled',
      notes: 'Follow-up on academic stress concerns',
      priority: 'Medium'
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      studentId: 'STU-2024-002',
      grade: 'Grade 11',
      counselor: 'Mr. Brown',
      sessionType: 'Crisis',
      scheduledDate: '2024-01-24',
      status: 'Completed',
      notes: 'Immediate intervention for family crisis',
      priority: 'Urgent'
    },
    {
      id: '3',
      studentName: 'Mike Johnson',
      studentId: 'STU-2024-003',
      grade: 'Grade 9',
      counselor: 'Ms. Johnson',
      sessionType: 'Group',
      scheduledDate: '2024-01-26',
      status: 'Scheduled',
      notes: 'Social skills group session',
      priority: 'Low'
    }
  ]);

  const [accommodations, setAccommodations] = useState<SpecialNeedsAccommodation[]>([
    {
      id: '1',
      studentName: 'Sarah Williams',
      studentId: 'STU-2024-004',
      accommodationType: 'IEP',
      accommodationDetails: 'Extended time for tests, note-taking support',
      startDate: '2023-09-01',
      reviewDate: '2024-03-15',
      status: 'Active',
      assignedStaff: 'Ms. Davis'
    },
    {
      id: '2',
      studentName: 'Alex Chen',
      studentId: 'STU-2024-005',
      accommodationType: '504 Plan',
      accommodationDetails: 'Preferential seating, breaks as needed',
      startDate: '2023-09-01',
      reviewDate: '2024-06-30',
      status: 'Active',
      assignedStaff: 'Mr. Wilson'
    },
    {
      id: '3',
      studentName: 'Emily Rodriguez',
      studentId: 'STU-2024-006',
      accommodationType: 'ELL Support',
      accommodationDetails: 'Bilingual support, modified assignments',
      startDate: '2024-01-10',
      reviewDate: '2024-04-10',
      status: 'Active',
      assignedStaff: 'Ms. Martinez'
    }
  ]);

  const [tutoringSessions, setTutoringSessions] = useState<TutoringSession[]>([
    {
      id: '1',
      studentName: 'John Doe',
      studentId: 'STU-2024-001',
      subject: 'Mathematics',
      tutor: 'Mr. Anderson',
      scheduledDate: '2024-01-25',
      duration: 60,
      status: 'Scheduled',
      progress: 'Improving in algebra concepts'
    },
    {
      id: '2',
      studentName: 'Lisa Park',
      studentId: 'STU-2024-007',
      subject: 'English',
      tutor: 'Ms. Thompson',
      scheduledDate: '2024-01-24',
      duration: 45,
      status: 'Completed',
      progress: 'Strong improvement in reading comprehension'
    },
    {
      id: '3',
      studentName: 'David Kim',
      studentId: 'STU-2024-008',
      subject: 'Science',
      tutor: 'Dr. White',
      scheduledDate: '2024-01-26',
      duration: 60,
      status: 'Scheduled',
      progress: 'Working on chemistry fundamentals'
    }
  ]);

  const [crisisInterventions, setCrisisInterventions] = useState<CrisisIntervention[]>([
    {
      id: '1',
      studentName: 'Jane Smith',
      studentId: 'STU-2024-002',
      incidentType: 'Family Crisis',
      reportedBy: 'Teacher - Ms. Green',
      reportedDate: '2024-01-23',
      severity: 'High',
      status: 'Resolved',
      assignedStaff: 'Mr. Brown',
      followUpRequired: true
    },
    {
      id: '2',
      studentName: 'Tom Wilson',
      studentId: 'STU-2024-009',
      incidentType: 'Bullying',
      reportedBy: 'Student - Peer Report',
      reportedDate: '2024-01-24',
      severity: 'Medium',
      status: 'Active',
      assignedStaff: 'Ms. Johnson',
      followUpRequired: true
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      case 'No Show': return 'bg-red-100 text-red-800';
      case 'Expired': return 'bg-gray-100 text-gray-800';
      case 'Referred': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const activeCounselingSessions = counselingSessions.filter(s => s.status === 'Scheduled').length;
  const activeAccommodations = accommodations.filter(a => a.status === 'Active').length;
  const activeTutoringSessions = tutoringSessions.filter(t => t.status === 'Scheduled').length;
  const activeCrises = crisisInterventions.filter(c => c.status === 'Active').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Student Support Services</h1>
          <p className="text-gray-600 mt-2">Counseling, special needs accommodation, and academic support</p>
        </div>
        <Button>New Support Request</Button>
      </div>

      {/* Overview Stats */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Active Counseling Sessions"
          value={activeCounselingSessions.toString()}
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          }
        />
        <StatCard
          title="Active Accommodations"
          value={activeAccommodations.toString()}
          color="green"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Tutoring Sessions"
          value={activeTutoringSessions.toString()}
          color="purple"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
        />
        <StatCard
          title="Active Crises"
          value={activeCrises.toString()}
          color={activeCrises > 0 ? 'red' : 'green'}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        />
      </DashboardGrid>

      {/* Counseling Program Management */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Counseling Program Management</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Types</option>
              <option>Individual</option>
              <option>Group</option>
              <option>Crisis</option>
            </select>
            <Button size="sm" variant="secondary">Schedule Session</Button>
          </div>
        </div>

        {counselingSessions.filter(s => s.priority === 'Urgent').length > 0 && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-red-800">
                  {counselingSessions.filter(s => s.priority === 'Urgent').length} urgent counseling session(s) requiring immediate attention
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Counselor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {counselingSessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{session.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{session.grade}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{session.counselor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{session.sessionType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{session.scheduledDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(session.priority)}`}>
                      {session.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      {session.status === 'Scheduled' && (
                        <button className="text-green-600 hover:text-green-900">Complete</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Special Needs Accommodation Tracking */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Special Needs Accommodation Tracking</h2>
          <Button size="sm" variant="secondary">Add Accommodation</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accommodation Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Staff</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accommodations.map((accommodation) => (
                <tr key={accommodation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{accommodation.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{accommodation.accommodationType}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">{accommodation.accommodationDetails}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{accommodation.startDate}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                    new Date(accommodation.reviewDate) < new Date() ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {accommodation.reviewDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{accommodation.assignedStaff}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(accommodation.status)}`}>
                      {accommodation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Review</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Tutoring & Academic Support */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Tutoring & Academic Support</h2>
            <Button size="sm" variant="secondary">Schedule Session</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutor</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tutoringSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">{session.studentName}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{session.subject}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{session.tutor}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(session.status)}`}>
                        {session.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Crisis Intervention Coordination</h2>

          {activeCrises > 0 && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded">
              <div className="flex">
                <svg className="h-5 w-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-red-800">
                    {activeCrises} active crisis intervention(s) requiring immediate attention
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {crisisInterventions.map((crisis) => (
              <div key={crisis.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-gray-900">{crisis.studentName}</div>
                    <div className="text-sm text-gray-600">{crisis.incidentType}</div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(crisis.severity)}`}>
                    {crisis.severity}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Reported by: {crisis.reportedBy} on {crisis.reportedDate}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(crisis.status)}`}>
                      {crisis.status}
                    </span>
                    {crisis.followUpRequired && (
                      <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Follow-up Required
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-900 text-sm">View</button>
                    {crisis.status === 'Active' && (
                      <button className="text-green-600 hover:text-green-900 text-sm">Resolve</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Button variant="outline" fullWidth>Report New Crisis</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
