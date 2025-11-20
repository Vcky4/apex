import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedDate: string;
  uploadedBy: string;
  size: string;
  url: string;
}

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
  documents: Document[];
  sessionNotes?: string;
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
  documents: Document[];
  assessmentReports: Document[];
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
  const [showNewSupportModal, setShowNewSupportModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showScheduleSessionModal, setShowScheduleSessionModal] = useState(false);
  const [showAccommodationModal, setShowAccommodationModal] = useState(false);
  const [showAddAccommodationModal, setShowAddAccommodationModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<CounselingSession | null>(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState<SpecialNeedsAccommodation | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [supportFormData, setSupportFormData] = useState({
    studentName: '',
    studentId: '',
    supportType: 'Counseling' as 'Counseling' | 'Accommodation' | 'Tutoring' | 'Crisis',
    description: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High' | 'Urgent',
  });

  const [sessionFormData, setSessionFormData] = useState({
    studentName: '',
    studentId: '',
    grade: '',
    counselor: '',
    sessionType: 'Individual' as CounselingSession['sessionType'],
    scheduledDate: '',
    scheduledTime: '',
    notes: '',
    priority: 'Medium' as CounselingSession['priority'],
  });

  const [accommodationFormData, setAccommodationFormData] = useState({
    studentName: '',
    studentId: '',
    accommodationType: 'IEP' as SpecialNeedsAccommodation['accommodationType'],
    accommodationDetails: '',
    startDate: '',
    reviewDate: '',
    assignedStaff: '',
  });

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
      priority: 'Medium',
      documents: [],
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
      priority: 'Urgent',
      documents: [
        { id: '1', name: 'Crisis_Report.pdf', type: 'Report', uploadedDate: '2024-01-24', uploadedBy: 'Mr. Brown', size: '145 KB', url: '#' },
      ],
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
      priority: 'Low',
      documents: [],
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
      assignedStaff: 'Ms. Davis',
      documents: [
        { id: '1', name: 'IEP_Plan.pdf', type: 'IEP', uploadedDate: '2023-09-01', uploadedBy: 'Ms. Davis', size: '320 KB', url: '#' },
        { id: '2', name: 'Assessment_Report.pdf', type: 'Assessment', uploadedDate: '2023-08-15', uploadedBy: 'Psychologist', size: '450 KB', url: '#' },
      ],
      assessmentReports: [
        { id: '2', name: 'Assessment_Report.pdf', type: 'Assessment', uploadedDate: '2023-08-15', uploadedBy: 'Psychologist', size: '450 KB', url: '#' },
      ],
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
      assignedStaff: 'Mr. Wilson',
      documents: [
        { id: '3', name: '504_Plan.pdf', type: '504 Plan', uploadedDate: '2023-09-01', uploadedBy: 'Mr. Wilson', size: '280 KB', url: '#' },
      ],
      assessmentReports: [],
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
      assignedStaff: 'Ms. Martinez',
      documents: [
        { id: '4', name: 'ELL_Assessment.pdf', type: 'Assessment', uploadedDate: '2024-01-10', uploadedBy: 'Ms. Martinez', size: '195 KB', url: '#' },
      ],
      assessmentReports: [
        { id: '4', name: 'ELL_Assessment.pdf', type: 'Assessment', uploadedDate: '2024-01-10', uploadedBy: 'Ms. Martinez', size: '195 KB', url: '#' },
      ],
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

  const handleFileUpload = (files: FileList | null, sessionId?: string, accommodationId?: string) => {
    if (!files) return;
    const fileArray = Array.from(files);
    setUploadedFiles([...uploadedFiles, ...fileArray]);
    
    const newDocuments: Document[] = fileArray.map((file, index) => ({
      id: `doc-${Date.now()}-${index}`,
      name: file.name,
      type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
      uploadedDate: new Date().toISOString().split('T')[0],
      uploadedBy: 'Admin',
      size: `${(file.size / 1024).toFixed(0)} KB`,
      url: '#',
    }));
    
    if (sessionId) {
      setCounselingSessions(counselingSessions.map(session => 
        session.id === sessionId 
          ? { ...session, documents: [...session.documents, ...newDocuments] }
          : session
      ));
    }
    
    if (accommodationId) {
      setAccommodations(accommodations.map(acc => 
        acc.id === accommodationId 
          ? { ...acc, documents: [...acc.documents, ...newDocuments] }
          : acc
      ));
    }
    
    alert(`${fileArray.length} file(s) uploaded successfully!`);
  };

  const handleCompleteSession = (sessionId: string, notes: string) => {
    setCounselingSessions(counselingSessions.map(session => 
      session.id === sessionId 
        ? { ...session, status: 'Completed' as const, sessionNotes: notes }
        : session
    ));
    alert('Session marked as completed!');
  };

  const handleScheduleSession = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession: CounselingSession = {
      id: `session-${Date.now()}`,
      studentName: sessionFormData.studentName,
      studentId: sessionFormData.studentId,
      grade: sessionFormData.grade,
      counselor: sessionFormData.counselor,
      sessionType: sessionFormData.sessionType,
      scheduledDate: sessionFormData.scheduledDate,
      status: 'Scheduled',
      notes: sessionFormData.notes,
      priority: sessionFormData.priority,
      documents: [],
    };
    setCounselingSessions([newSession, ...counselingSessions]);
    setSessionFormData({
      studentName: '',
      studentId: '',
      grade: '',
      counselor: '',
      sessionType: 'Individual',
      scheduledDate: '',
      scheduledTime: '',
      notes: '',
      priority: 'Medium',
    });
    setShowScheduleSessionModal(false);
    alert('Counseling session scheduled successfully!');
  };

  const handleAddAccommodation = (e: React.FormEvent) => {
    e.preventDefault();
    const newAccommodation: SpecialNeedsAccommodation = {
      id: `acc-${Date.now()}`,
      studentName: accommodationFormData.studentName,
      studentId: accommodationFormData.studentId,
      accommodationType: accommodationFormData.accommodationType,
      accommodationDetails: accommodationFormData.accommodationDetails,
      startDate: accommodationFormData.startDate,
      reviewDate: accommodationFormData.reviewDate,
      status: 'Active',
      assignedStaff: accommodationFormData.assignedStaff,
      documents: [],
      assessmentReports: [],
    };
    setAccommodations([newAccommodation, ...accommodations]);
    setAccommodationFormData({
      studentName: '',
      studentId: '',
      accommodationType: 'IEP',
      accommodationDetails: '',
      startDate: '',
      reviewDate: '',
      assignedStaff: '',
    });
    setShowAddAccommodationModal(false);
    alert('Accommodation added successfully!');
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
        <Button onClick={() => setShowNewSupportModal(true)}>New Support Request</Button>
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
            <Button size="sm" variant="secondary" onClick={() => setShowScheduleSessionModal(true)}>Schedule Session</Button>
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
                      <button 
                        onClick={() => {
                          setSelectedSession(session);
                          setShowSessionModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      {session.status === 'Scheduled' && (
                        <button 
                          onClick={() => {
                            const notes = prompt('Enter session notes:');
                            if (notes) {
                              handleCompleteSession(session.id, notes);
                            }
                          }}
                          className="text-green-600 hover:text-green-900"
                        >
                          Complete
                        </button>
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
          <Button size="sm" variant="secondary" onClick={() => setShowAddAccommodationModal(true)}>Add Accommodation</Button>
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
                      <button 
                        onClick={() => {
                          setSelectedAccommodation(accommodation);
                          setShowAccommodationModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => {
                          setAccommodations(accommodations.map(acc => 
                            acc.id === accommodation.id 
                              ? { ...acc, status: 'Pending Review' as const }
                              : acc
                          ));
                          alert('Accommodation marked for review!');
                        }}
                        className="text-green-600 hover:text-green-900"
                      >
                        Review
                      </button>
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
            <Button variant="outline" fullWidth onClick={() => {
              setShowNewSupportModal(true);
              setSupportFormData({...supportFormData, supportType: 'Crisis'});
            }}>Report New Crisis</Button>
          </div>
        </Card>
      </div>

      {/* New Support Request Modal */}
      {showNewSupportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">New Support Request</h2>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (supportFormData.supportType === 'Counseling') {
                const newSession: CounselingSession = {
                  id: `session-${Date.now()}`,
                  studentName: supportFormData.studentName,
                  studentId: supportFormData.studentId,
                  grade: 'Grade 10',
                  counselor: 'Ms. Johnson',
                  sessionType: 'Individual',
                  scheduledDate: new Date().toISOString().split('T')[0],
                  status: 'Scheduled',
                  notes: supportFormData.description,
                  priority: supportFormData.priority,
                  documents: uploadedFiles.map((file, index) => ({
                    id: `doc-${Date.now()}-${index}`,
                    name: file.name,
                    type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
                    uploadedDate: new Date().toISOString().split('T')[0],
                    uploadedBy: 'Admin',
                    size: `${(file.size / 1024).toFixed(0)} KB`,
                    url: '#',
                  })),
                };
                setCounselingSessions([newSession, ...counselingSessions]);
              }
              setSupportFormData({
                studentName: '',
                studentId: '',
                supportType: 'Counseling',
                description: '',
                priority: 'Medium',
              });
              setUploadedFiles([]);
              setShowNewSupportModal(false);
              alert('Support request created successfully!');
            }} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name *</label>
                  <input
                    type="text"
                    value={supportFormData.studentName}
                    onChange={(e) => setSupportFormData({...supportFormData, studentName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID *</label>
                  <input
                    type="text"
                    value={supportFormData.studentId}
                    onChange={(e) => setSupportFormData({...supportFormData, studentId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Type *</label>
                  <select
                    value={supportFormData.supportType}
                    onChange={(e) => setSupportFormData({...supportFormData, supportType: e.target.value as any})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  >
                    <option value="Counseling">Counseling</option>
                    <option value="Accommodation">Accommodation</option>
                    <option value="Tutoring">Tutoring</option>
                    <option value="Crisis">Crisis Intervention</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority *</label>
                  <select
                    value={supportFormData.priority}
                    onChange={(e) => setSupportFormData({...supportFormData, priority: e.target.value as any})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={supportFormData.description}
                  onChange={(e) => setSupportFormData({...supportFormData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={4}
                  required
                  placeholder="Describe the support needed..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Documents</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files) {
                        setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)]);
                      }
                    }}
                    className="hidden"
                    id="support-docs"
                  />
                  <label htmlFor="support-docs" className="cursor-pointer flex items-center gap-2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-600">Click to upload documents</span>
                  </label>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                          <span>{file.name}</span>
                          <button
                            type="button"
                            onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                            className="text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowNewSupportModal(false);
                    setSupportFormData({
                      studentName: '',
                      studentId: '',
                      supportType: 'Counseling',
                      description: '',
                      priority: 'Medium',
                    });
                    setUploadedFiles([]);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Create Request</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Session Details Modal */}
      {showSessionModal && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Counseling Session - {selectedSession.studentName}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                  <p className="text-gray-900">{selectedSession.studentName} ({selectedSession.studentId})</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
                  <p className="text-gray-900">{selectedSession.sessionType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Counselor</label>
                  <p className="text-gray-900">{selectedSession.counselor}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
                  <p className="text-gray-900">{selectedSession.scheduledDate}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <p className="text-gray-900">{selectedSession.notes}</p>
              </div>
              {selectedSession.sessionNotes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Notes</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded">{selectedSession.sessionNotes}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Session Documents</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e.target.files, selectedSession.id)}
                    className="hidden"
                    id="session-docs"
                  />
                  <label htmlFor="session-docs" className="cursor-pointer flex items-center gap-2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-600">Upload session notes or reports</span>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Session Documents ({selectedSession.documents.length})</h3>
                <div className="space-y-2">
                  {selectedSession.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <div className="font-medium text-gray-900">{doc.name}</div>
                          <div className="text-xs text-gray-500">{doc.size} • {doc.uploadedDate}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900 text-sm">View</button>
                        <button className="text-green-600 hover:text-green-900 text-sm">Download</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowSessionModal(false);
                    setSelectedSession(null);
                  }}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Accommodation Details Modal */}
      {showAccommodationModal && selectedAccommodation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Accommodation - {selectedAccommodation.studentName}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                  <p className="text-gray-900">{selectedAccommodation.studentName} ({selectedAccommodation.studentId})</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Accommodation Type</label>
                  <p className="text-gray-900">{selectedAccommodation.accommodationType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <p className="text-gray-900">{selectedAccommodation.startDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review Date</label>
                  <p className="text-gray-900">{selectedAccommodation.reviewDate}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Accommodation Details</label>
                <p className="text-gray-900">{selectedAccommodation.accommodationDetails}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Assessment Reports</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e.target.files, undefined, selectedAccommodation.id)}
                    className="hidden"
                    id="accommodation-docs"
                  />
                  <label htmlFor="accommodation-docs" className="cursor-pointer flex items-center gap-2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-600">Upload assessment reports or documents</span>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Accommodation Documents ({selectedAccommodation.documents.length})</h3>
                <div className="space-y-2">
                  {selectedAccommodation.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <div className="font-medium text-gray-900">{doc.name}</div>
                          <div className="text-xs text-gray-500">{doc.type} • {doc.size} • {doc.uploadedDate}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900 text-sm">View</button>
                        <button className="text-green-600 hover:text-green-900 text-sm">Download</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAccommodationModal(false);
                    setSelectedAccommodation(null);
                  }}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Session Modal */}
      {showScheduleSessionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Schedule Counseling Session</h2>
            </div>
            <form onSubmit={handleScheduleSession} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name *</label>
                  <input
                    type="text"
                    value={sessionFormData.studentName}
                    onChange={(e) => setSessionFormData({...sessionFormData, studentName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID *</label>
                  <input
                    type="text"
                    value={sessionFormData.studentId}
                    onChange={(e) => setSessionFormData({...sessionFormData, studentId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grade *</label>
                  <select
                    value={sessionFormData.grade}
                    onChange={(e) => setSessionFormData({...sessionFormData, grade: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  >
                    <option value="">Select Grade</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Counselor *</label>
                  <input
                    type="text"
                    value={sessionFormData.counselor}
                    onChange={(e) => setSessionFormData({...sessionFormData, counselor: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                    placeholder="e.g., Ms. Johnson"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Type *</label>
                  <select
                    value={sessionFormData.sessionType}
                    onChange={(e) => setSessionFormData({...sessionFormData, sessionType: e.target.value as any})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  >
                    <option value="Individual">Individual</option>
                    <option value="Group">Group</option>
                    <option value="Crisis">Crisis</option>
                    <option value="Follow-up">Follow-up</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority *</label>
                  <select
                    value={sessionFormData.priority}
                    onChange={(e) => setSessionFormData({...sessionFormData, priority: e.target.value as any})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Date *</label>
                  <input
                    type="date"
                    value={sessionFormData.scheduledDate}
                    onChange={(e) => setSessionFormData({...sessionFormData, scheduledDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Time *</label>
                  <input
                    type="time"
                    value={sessionFormData.scheduledTime}
                    onChange={(e) => setSessionFormData({...sessionFormData, scheduledTime: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={sessionFormData.notes}
                  onChange={(e) => setSessionFormData({...sessionFormData, notes: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={3}
                  placeholder="Enter session notes or reason for scheduling..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowScheduleSessionModal(false);
                    setSessionFormData({
                      studentName: '',
                      studentId: '',
                      grade: '',
                      counselor: '',
                      sessionType: 'Individual',
                      scheduledDate: '',
                      scheduledTime: '',
                      notes: '',
                      priority: 'Medium',
                    });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Schedule Session</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Accommodation Modal */}
      {showAddAccommodationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add Special Needs Accommodation</h2>
            </div>
            <form onSubmit={handleAddAccommodation} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name *</label>
                  <input
                    type="text"
                    value={accommodationFormData.studentName}
                    onChange={(e) => setAccommodationFormData({...accommodationFormData, studentName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID *</label>
                  <input
                    type="text"
                    value={accommodationFormData.studentId}
                    onChange={(e) => setAccommodationFormData({...accommodationFormData, studentId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation Type *</label>
                  <select
                    value={accommodationFormData.accommodationType}
                    onChange={(e) => setAccommodationFormData({...accommodationFormData, accommodationType: e.target.value as any})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  >
                    <option value="IEP">IEP</option>
                    <option value="504 Plan">504 Plan</option>
                    <option value="ELL Support">ELL Support</option>
                    <option value="Gifted Program">Gifted Program</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Staff *</label>
                  <input
                    type="text"
                    value={accommodationFormData.assignedStaff}
                    onChange={(e) => setAccommodationFormData({...accommodationFormData, assignedStaff: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                    placeholder="e.g., Ms. Davis"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={accommodationFormData.startDate}
                    onChange={(e) => setAccommodationFormData({...accommodationFormData, startDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Review Date *</label>
                  <input
                    type="date"
                    value={accommodationFormData.reviewDate}
                    onChange={(e) => setAccommodationFormData({...accommodationFormData, reviewDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation Details *</label>
                <textarea
                  value={accommodationFormData.accommodationDetails}
                  onChange={(e) => setAccommodationFormData({...accommodationFormData, accommodationDetails: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={4}
                  required
                  placeholder="Describe the accommodation details, e.g., Extended time for tests, note-taking support, preferential seating..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Assessment Reports</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      if (e.target.files) {
                        setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)]);
                        alert(`${e.target.files.length} file(s) selected. They will be uploaded when you submit the form.`);
                      }
                    }}
                    className="hidden"
                    id="accommodation-assessment"
                  />
                  <label htmlFor="accommodation-assessment" className="cursor-pointer flex items-center gap-2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-600">Click to upload assessment reports</span>
                  </label>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                          <span>{file.name}</span>
                          <button
                            type="button"
                            onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                            className="text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddAccommodationModal(false);
                    setAccommodationFormData({
                      studentName: '',
                      studentId: '',
                      accommodationType: 'IEP',
                      accommodationDetails: '',
                      startDate: '',
                      reviewDate: '',
                      assignedStaff: '',
                    });
                    setUploadedFiles([]);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Add Accommodation</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
