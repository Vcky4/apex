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

interface DisciplineIncident {
  id: string;
  incidentNumber: string;
  studentName: string;
  studentId: string;
  grade: string;
  incidentType: 'Disruption' | 'Tardiness' | 'Absenteeism' | 'Bullying' | 'Academic Dishonesty' | 'Violence' | 'Other';
  description: string;
  reportedBy: string;
  reportedDate: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'Under Review' | 'Resolved' | 'Referred' | 'Closed';
  assignedTo: string | null;
  resolution: string | null;
  resolutionDate: string | null;
  actionsTaken: string[];
  evidence: Document[];
  witnessStatements: Document[];
}

interface CodeOfConductRule {
  id: string;
  ruleName: string;
  category: 'Attendance' | 'Dress Code' | 'Respect' | 'Academic Integrity' | 'Technology Use' | 'Other';
  complianceRate: number;
  trend: number;
  violations: number;
  totalStudents: number;
}

interface RestorativePractice {
  id: string;
  practiceType: 'Mediation' | 'Circle' | 'Conference' | 'Peer Support' | 'Other';
  studentName: string;
  studentId: string;
  scheduledDate: string;
  facilitator: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  outcome: string | null;
  success: boolean | null;
}

interface ParentCommunication {
  id: string;
  studentName: string;
  studentId: string;
  parentName: string;
  communicationType: 'Phone Call' | 'Email' | 'Meeting' | 'Letter' | 'Other';
  date: string;
  topic: string;
  notes: string;
  followUpRequired: boolean;
}

export default function DisciplineManagement() {
  const [showReportIncidentModal, setShowReportIncidentModal] = useState(false);
  const [showIncidentDetailsModal, setShowIncidentDetailsModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<DisciplineIncident | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [incidentFormData, setIncidentFormData] = useState({
    studentName: '',
    studentId: '',
    grade: '',
    incidentType: 'Disruption' as 'Disruption' | 'Tardiness' | 'Absenteeism' | 'Bullying' | 'Academic Dishonesty' | 'Violence' | 'Other',
    description: '',
    reportedBy: '',
    severity: 'Medium' as 'Low' | 'Medium' | 'High' | 'Critical',
    location: '',
    witnesses: '',
  });

  const [incidents, setIncidents] = useState<DisciplineIncident[]>([
    {
      id: '1',
      incidentNumber: 'INC-2024-001',
      studentName: 'John Doe',
      studentId: 'STU-2024-001',
      grade: 'Grade 10',
      incidentType: 'Disruption',
      description: 'Disruptive behavior during class, talking out of turn repeatedly',
      reportedBy: 'Ms. Green - Math Teacher',
      reportedDate: '2024-01-22',
      severity: 'Low',
      status: 'Resolved',
      assignedTo: 'Vice Principal',
      resolution: 'Verbal warning and parent notification',
      resolutionDate: '2024-01-23',
      actionsTaken: ['Verbal Warning', 'Parent Notification'],
      evidence: [],
      witnessStatements: [],
    },
    {
      id: '2',
      incidentNumber: 'INC-2024-002',
      studentName: 'Mike Johnson',
      studentId: 'STU-2024-003',
      grade: 'Grade 9',
      incidentType: 'Bullying',
      description: 'Reported incident of verbal bullying towards another student',
      reportedBy: 'Student - Peer Report',
      reportedDate: '2024-01-23',
      severity: 'High',
      status: 'Under Review',
      assignedTo: 'Counselor - Ms. Johnson',
      resolution: null,
      resolutionDate: null,
      actionsTaken: [],
      evidence: [
        { id: '1', name: 'Witness_Statement_1.pdf', type: 'Witness Statement', uploadedDate: '2024-01-23', uploadedBy: 'Student', size: '125 KB', url: '#' },
        { id: '2', name: 'Incident_Photo.jpg', type: 'Photo', uploadedDate: '2024-01-23', uploadedBy: 'Teacher', size: '450 KB', url: '#' },
      ],
      witnessStatements: [
        { id: '1', name: 'Witness_Statement_1.pdf', type: 'Witness Statement', uploadedDate: '2024-01-23', uploadedBy: 'Student', size: '125 KB', url: '#' },
      ],
    },
    {
      id: '3',
      incidentNumber: 'INC-2024-003',
      studentName: 'Sarah Williams',
      studentId: 'STU-2024-004',
      grade: 'Grade 11',
      incidentType: 'Tardiness',
      description: 'Chronic tardiness - 8 late arrivals this month',
      reportedBy: 'Attendance Office',
      reportedDate: '2024-01-20',
      severity: 'Low',
      status: 'Resolved',
      assignedTo: 'Vice Principal',
      resolution: 'Parent meeting scheduled and attendance contract created',
      resolutionDate: '2024-01-21',
      actionsTaken: ['Parent Meeting', 'Attendance Contract'],
      evidence: [],
      witnessStatements: [],
    },
    {
      id: '4',
      incidentNumber: 'INC-2024-004',
      studentName: 'Tom Wilson',
      studentId: 'STU-2024-009',
      grade: 'Grade 10',
      incidentType: 'Academic Dishonesty',
      description: 'Caught copying answers during exam',
      reportedBy: 'Mr. Brown - Science Teacher',
      reportedDate: '2024-01-24',
      severity: 'Medium',
      status: 'Open',
      assignedTo: null,
      resolution: null,
      resolutionDate: null,
      actionsTaken: [],
      evidence: [
        { id: '3', name: 'Exam_Paper_Evidence.pdf', type: 'Evidence', uploadedDate: '2024-01-24', uploadedBy: 'Mr. Brown', size: '280 KB', url: '#' },
      ],
      witnessStatements: [],
    }
  ]);

  const [codeOfConductRules, setCodeOfConductRules] = useState<CodeOfConductRule[]>([
    {
      id: '1',
      ruleName: 'Attendance Policy',
      category: 'Attendance',
      complianceRate: 94.5,
      trend: 1.5,
      violations: 45,
      totalStudents: 850
    },
    {
      id: '2',
      ruleName: 'Dress Code',
      category: 'Dress Code',
      complianceRate: 98.2,
      trend: 0.8,
      violations: 15,
      totalStudents: 850
    },
    {
      id: '3',
      ruleName: 'Respect Policy',
      category: 'Respect',
      complianceRate: 96.8,
      trend: 2.1,
      violations: 28,
      totalStudents: 850
    },
    {
      id: '4',
      ruleName: 'Academic Integrity',
      category: 'Academic Integrity',
      complianceRate: 99.1,
      trend: 0.5,
      violations: 8,
      totalStudents: 850
    }
  ]);

  const [restorativePractices, setRestorativePractices] = useState<RestorativePractice[]>([
    {
      id: '1',
      practiceType: 'Mediation',
      studentName: 'John Doe',
      studentId: 'STU-2024-001',
      scheduledDate: '2024-01-25',
      facilitator: 'Ms. Johnson',
      status: 'Scheduled',
      outcome: null,
      success: null
    },
    {
      id: '2',
      practiceType: 'Circle',
      studentName: 'Mike Johnson',
      studentId: 'STU-2024-003',
      scheduledDate: '2024-01-20',
      facilitator: 'Mr. Brown',
      status: 'Completed',
      outcome: 'Successful resolution, both parties agreed to improved behavior',
      success: true
    },
    {
      id: '3',
      practiceType: 'Conference',
      studentName: 'Sarah Williams',
      studentId: 'STU-2024-004',
      scheduledDate: '2024-01-18',
      facilitator: 'Vice Principal',
      status: 'Completed',
      outcome: 'Attendance improvement plan created with student and parent',
      success: true
    }
  ]);

  const [parentCommunications, setParentCommunications] = useState<ParentCommunication[]>([
    {
      id: '1',
      studentName: 'John Doe',
      studentId: 'STU-2024-001',
      parentName: 'Jane Doe',
      communicationType: 'Phone Call',
      date: '2024-01-23',
      topic: 'Disruptive Behavior Incident',
      notes: 'Discussed incident with parent, parent agreed to reinforce expectations at home',
      followUpRequired: true
    },
    {
      id: '2',
      studentName: 'Mike Johnson',
      studentId: 'STU-2024-003',
      parentName: 'Robert Johnson',
      communicationType: 'Meeting',
      date: '2024-01-24',
      topic: 'Bullying Investigation',
      notes: 'In-person meeting scheduled to discuss bullying incident and next steps',
      followUpRequired: true
    },
    {
      id: '3',
      studentName: 'Sarah Williams',
      studentId: 'STU-2024-004',
      parentName: 'Mary Williams',
      communicationType: 'Email',
      date: '2024-01-21',
      topic: 'Chronic Tardiness',
      notes: 'Sent email notification about attendance concerns and scheduled follow-up meeting',
      followUpRequired: false
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Open': return 'bg-red-100 text-red-800';
      case 'Referred': return 'bg-purple-100 text-purple-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
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

  const handleFileUpload = (files: FileList | null, incidentId?: string, fileType: 'evidence' | 'witness' = 'evidence') => {
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
    
    if (incidentId) {
      setIncidents(incidents.map(incident => {
        if (incident.id === incidentId) {
          if (fileType === 'evidence') {
            return { ...incident, evidence: [...incident.evidence, ...newDocuments] };
          } else {
            return { ...incident, witnessStatements: [...incident.witnessStatements, ...newDocuments] };
          }
        }
        return incident;
      }));
    }
    
    alert(`${fileArray.length} file(s) uploaded successfully!`);
  };

  const handleReportIncident = (e: React.FormEvent) => {
    e.preventDefault();
    const newIncident: DisciplineIncident = {
      id: `inc-${Date.now()}`,
      incidentNumber: `INC-${new Date().getFullYear()}-${String(incidents.length + 1).padStart(3, '0')}`,
      studentName: incidentFormData.studentName,
      studentId: incidentFormData.studentId,
      grade: incidentFormData.grade,
      incidentType: incidentFormData.incidentType,
      description: incidentFormData.description,
      reportedBy: incidentFormData.reportedBy,
      reportedDate: new Date().toISOString().split('T')[0],
      severity: incidentFormData.severity,
      status: 'Open',
      assignedTo: null,
      resolution: null,
      resolutionDate: null,
      actionsTaken: [],
      evidence: uploadedFiles.map((file, index) => ({
        id: `doc-${Date.now()}-${index}`,
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        uploadedDate: new Date().toISOString().split('T')[0],
        uploadedBy: incidentFormData.reportedBy,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        url: '#',
      })),
      witnessStatements: [],
    };
    setIncidents([newIncident, ...incidents]);
    setIncidentFormData({
      studentName: '',
      studentId: '',
      grade: '',
      incidentType: 'Disruption',
      description: '',
      reportedBy: '',
      severity: 'Medium',
      location: '',
      witnesses: '',
    });
    setUploadedFiles([]);
    setShowReportIncidentModal(false);
    alert('Incident reported successfully!');
  };

  const totalIncidents = incidents.length;
  const resolvedIncidents = incidents.filter(i => i.status === 'Resolved' || i.status === 'Closed').length;
  const pendingIncidents = incidents.filter(i => i.status === 'Open' || i.status === 'Under Review').length;
  const overallCompliance = codeOfConductRules.reduce((sum, rule) => sum + rule.complianceRate, 0) / codeOfConductRules.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Discipline & Behavior Management</h1>
          <p className="text-gray-600 mt-2">Code of conduct, incident reporting, and behavior intervention</p>
        </div>
        <Button onClick={() => setShowReportIncidentModal(true)}>Report Incident</Button>
      </div>

      {/* Overview Stats */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Total Incidents"
          value={totalIncidents.toString()}
          color="orange"
          trend={{ value: -15, isPositive: true }}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        />
        <StatCard
          title="Resolved"
          value={resolvedIncidents.toString()}
          color="green"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Pending"
          value={pendingIncidents.toString()}
          color="yellow"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Code Compliance"
          value={`${overallCompliance.toFixed(1)}%`}
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          }
        />
      </DashboardGrid>

      {/* Incident Reporting & Tracking */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Incident Reporting & Tracking</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Statuses</option>
              <option>Open</option>
              <option>Under Review</option>
              <option>Resolved</option>
            </select>
            <Button size="sm" variant="secondary" onClick={() => setShowReportIncidentModal(true)}>Report Incident</Button>
          </div>
        </div>

        {incidents.filter(i => i.severity === 'Critical' || i.severity === 'High').length > 0 && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-red-800">
                  {incidents.filter(i => i.severity === 'Critical' || i.severity === 'High').length} high severity incident(s) requiring immediate attention
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incident #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {incidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{incident.incidentNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{incident.studentName}</div>
                    <div className="text-xs text-gray-500">{incident.grade}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{incident.incidentType}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{incident.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{incident.reportedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setSelectedIncident(incident);
                          setShowIncidentDetailsModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      {incident.status === 'Open' && (
                        <button 
                          onClick={() => {
                            const assignee = prompt('Assign to (e.g., Vice Principal, Counselor):');
                            if (assignee) {
                              setIncidents(incidents.map(i => 
                                i.id === incident.id 
                                  ? { ...i, status: 'Under Review' as const, assignedTo: assignee }
                                  : i
                              ));
                              alert(`Incident assigned to ${assignee}`);
                            }
                          }}
                          className="text-green-600 hover:text-green-900"
                        >
                          Assign
                        </button>
                      )}
                      {incident.status === 'Under Review' && (
                        <button 
                          onClick={() => {
                            const resolution = prompt('Enter resolution details:');
                            if (resolution) {
                              setIncidents(incidents.map(i => 
                                i.id === incident.id 
                                  ? { 
                                      ...i, 
                                      status: 'Resolved' as const, 
                                      resolution,
                                      resolutionDate: new Date().toISOString().split('T')[0],
                                    }
                                  : i
                              ));
                              alert('Incident resolved!');
                            }
                          }}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          Resolve
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

      {/* Code of Conduct Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Code of Conduct Enforcement</h2>
            <Button size="sm" variant="secondary">Manage Rules</Button>
          </div>

          <div className="space-y-4">
            {codeOfConductRules.map((rule) => (
              <div key={rule.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-gray-900">{rule.ruleName}</div>
                    <div className="text-sm text-gray-600">{rule.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">+{rule.trend}%</div>
                    <div className="text-xs text-gray-500">trend</div>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Compliance Rate</span>
                    <span className="font-semibold text-gray-900">{rule.complianceRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        rule.complianceRate >= 95 ? 'bg-green-600' :
                        rule.complianceRate >= 90 ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}
                      style={{ width: `${rule.complianceRate}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {rule.violations} violations out of {rule.totalStudents} students
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Restorative Practice Programs</h2>
            <Button size="sm" variant="secondary">Schedule Practice</Button>
          </div>

          <div className="space-y-3">
            {restorativePractices.map((practice) => (
              <div key={practice.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-gray-900">{practice.studentName}</div>
                    <div className="text-sm text-gray-600">{practice.practiceType}</div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(practice.status)}`}>
                    {practice.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Facilitator: {practice.facilitator} • Scheduled: {practice.scheduledDate}
                </div>
                {practice.outcome && (
                  <div className="p-2 bg-gray-50 rounded text-sm text-gray-700 mb-2">
                    <div className="font-medium mb-1">Outcome:</div>
                    <div>{practice.outcome}</div>
                    {practice.success !== null && (
                      <div className={`mt-1 text-xs font-semibold ${
                        practice.success ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {practice.success ? '✓ Successful' : '✗ Unsuccessful'}
                      </div>
                    )}
                  </div>
                )}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" fullWidth>View Details</Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Program Statistics</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {restorativePractices.filter(p => p.success === true).length}
                </div>
                <div className="text-sm text-gray-600">Successful</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round((restorativePractices.filter(p => p.success === true).length / 
                    restorativePractices.filter(p => p.status === 'Completed').length) * 100) || 0}%
                </div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Parent Communication Logs */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Parent Communication Logs</h2>
          <Button size="sm" variant="secondary" onClick={() => {
            alert('Parent communication logging form would open here');
          }}>Log Communication</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Follow-up</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {parentCommunications.map((communication) => (
                <tr key={communication.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{communication.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{communication.parentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{communication.communicationType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{communication.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{communication.topic}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {communication.followUpRequired ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Required
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        None
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      {communication.followUpRequired && (
                        <button className="text-green-600 hover:text-green-900">Follow-up</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Report Incident Modal */}
      {showReportIncidentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Report Discipline Incident</h2>
            </div>
            <form onSubmit={handleReportIncident} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name *</label>
                  <input
                    type="text"
                    value={incidentFormData.studentName}
                    onChange={(e) => setIncidentFormData({...incidentFormData, studentName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID *</label>
                  <input
                    type="text"
                    value={incidentFormData.studentId}
                    onChange={(e) => setIncidentFormData({...incidentFormData, studentId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grade *</label>
                  <select
                    value={incidentFormData.grade}
                    onChange={(e) => setIncidentFormData({...incidentFormData, grade: e.target.value})}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Incident Type *</label>
                  <select
                    value={incidentFormData.incidentType}
                    onChange={(e) => setIncidentFormData({...incidentFormData, incidentType: e.target.value as any})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  >
                    <option value="Disruption">Disruption</option>
                    <option value="Tardiness">Tardiness</option>
                    <option value="Absenteeism">Absenteeism</option>
                    <option value="Bullying">Bullying</option>
                    <option value="Academic Dishonesty">Academic Dishonesty</option>
                    <option value="Violence">Violence</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reported By *</label>
                  <input
                    type="text"
                    value={incidentFormData.reportedBy}
                    onChange={(e) => setIncidentFormData({...incidentFormData, reportedBy: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                    placeholder="e.g., Ms. Green - Math Teacher"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Severity *</label>
                  <select
                    value={incidentFormData.severity}
                    onChange={(e) => setIncidentFormData({...incidentFormData, severity: e.target.value as any})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={incidentFormData.location}
                  onChange={(e) => setIncidentFormData({...incidentFormData, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="e.g., Classroom 301, Cafeteria"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={incidentFormData.description}
                  onChange={(e) => setIncidentFormData({...incidentFormData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={4}
                  required
                  placeholder="Describe the incident in detail..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Witnesses</label>
                <input
                  type="text"
                  value={incidentFormData.witnesses}
                  onChange={(e) => setIncidentFormData({...incidentFormData, witnesses: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="List witnesses (comma-separated)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Evidence</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mov"
                    onChange={(e) => {
                      if (e.target.files) {
                        setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)]);
                      }
                    }}
                    className="hidden"
                    id="incident-evidence"
                  />
                  <label htmlFor="incident-evidence" className="cursor-pointer">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600 text-center">Click to upload evidence</p>
                    <p className="text-xs text-gray-500 text-center mt-1">Photos, videos, documents, witness statements</p>
                  </label>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                            className="text-red-600 hover:text-red-800"
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
                    setShowReportIncidentModal(false);
                    setIncidentFormData({
                      studentName: '',
                      studentId: '',
                      grade: '',
                      incidentType: 'Disruption',
                      description: '',
                      reportedBy: '',
                      severity: 'Medium',
                      location: '',
                      witnesses: '',
                    });
                    setUploadedFiles([]);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Report Incident</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Incident Details Modal */}
      {showIncidentDetailsModal && selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Incident Details - {selectedIncident.incidentNumber}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                  <p className="text-gray-900">{selectedIncident.studentName} ({selectedIncident.studentId})</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                  <p className="text-gray-900">{selectedIncident.grade}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Incident Type</label>
                  <p className="text-gray-900">{selectedIncident.incidentType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(selectedIncident.severity)}`}>
                    {selectedIncident.severity}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reported By</label>
                  <p className="text-gray-900">{selectedIncident.reportedBy}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reported Date</label>
                  <p className="text-gray-900">{selectedIncident.reportedDate}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded">{selectedIncident.description}</p>
              </div>
              {selectedIncident.resolution && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resolution</label>
                  <p className="text-gray-900 bg-green-50 p-3 rounded">{selectedIncident.resolution}</p>
                </div>
              )}
              {selectedIncident.actionsTaken.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Actions Taken</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedIncident.actionsTaken.map((action, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Additional Evidence</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mov"
                    onChange={(e) => handleFileUpload(e.target.files, selectedIncident.id, 'evidence')}
                    className="hidden"
                    id="additional-evidence"
                  />
                  <label htmlFor="additional-evidence" className="cursor-pointer flex items-center gap-2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-600">Upload evidence files</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Witness Statements</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e.target.files, selectedIncident.id, 'witness')}
                    className="hidden"
                    id="witness-statements"
                  />
                  <label htmlFor="witness-statements" className="cursor-pointer flex items-center gap-2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-600">Upload witness statements</span>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Evidence Files ({selectedIncident.evidence.length})</h3>
                <div className="space-y-2">
                  {selectedIncident.evidence.map((doc) => (
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
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Witness Statements ({selectedIncident.witnessStatements.length})</h3>
                <div className="space-y-2">
                  {selectedIncident.witnessStatements.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <div className="font-medium text-gray-900">{doc.name}</div>
                          <div className="text-xs text-gray-500">{doc.size} • {doc.uploadedDate} • {doc.uploadedBy}</div>
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
                    setShowIncidentDetailsModal(false);
                    setSelectedIncident(null);
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
    </div>
  );
}
