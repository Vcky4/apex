import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

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

interface BehaviorIntervention {
  id: string;
  studentName: string;
  studentId: string;
  interventionType: 'Behavior Plan' | 'Counseling' | 'Mentoring' | 'Parent Conference' | 'Suspension' | 'Other';
  startDate: string;
  endDate: string | null;
  status: 'Active' | 'Completed' | 'Discontinued';
  assignedTo: string;
  progress: number;
  goals: string[];
}

interface BehaviorAnalytics {
  period: string;
  totalIncidents: number;
  byType: { [key: string]: number };
  bySeverity: { [key: string]: number };
  trend: 'Improving' | 'Stable' | 'Worsening';
}

export default function DisciplineBehavior() {
  const [showReportIncidentModal, setShowReportIncidentModal] = useState(false);
  const [showManageRulesModal, setShowManageRulesModal] = useState(false);
  const [showSchedulePracticeModal, setShowSchedulePracticeModal] = useState(false);
  const [showCreateInterventionModal, setShowCreateInterventionModal] = useState(false);
  const [showLogCommunicationModal, setShowLogCommunicationModal] = useState(false);
  const [showIncidentDetailsModal, setShowIncidentDetailsModal] = useState(false);
  const [showPracticeDetailsModal, setShowPracticeDetailsModal] = useState(false);
  const [showInterventionDetailsModal, setShowInterventionDetailsModal] = useState(false);
  const [showCommunicationDetailsModal, setShowCommunicationDetailsModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<DisciplineIncident | null>(null);
  const [selectedPractice, setSelectedPractice] = useState<RestorativePractice | null>(null);
  const [selectedIntervention, setSelectedIntervention] = useState<BehaviorIntervention | null>(null);
  const [selectedCommunication, setSelectedCommunication] = useState<ParentCommunication | null>(null);
  const [editingRule, setEditingRule] = useState<CodeOfConductRule | null>(null);
  
  const [incidentFormData, setIncidentFormData] = useState({
    studentName: '',
    studentId: '',
    grade: '',
    incidentType: 'Disruption' as DisciplineIncident['incidentType'],
    description: '',
    reportedBy: '',
    severity: 'Medium' as DisciplineIncident['severity'],
    location: '',
  });

  const [practiceFormData, setPracticeFormData] = useState({
    studentName: '',
    studentId: '',
    practiceType: 'Mediation' as RestorativePractice['practiceType'],
    scheduledDate: '',
    facilitator: '',
    notes: '',
  });

  const [interventionFormData, setInterventionFormData] = useState({
    studentName: '',
    studentId: '',
    interventionType: 'Behavior Plan' as BehaviorIntervention['interventionType'],
    startDate: '',
    assignedTo: '',
    goals: [''],
  });

  const [communicationFormData, setCommunicationFormData] = useState({
    studentName: '',
    studentId: '',
    parentName: '',
    communicationType: 'Phone Call' as ParentCommunication['communicationType'],
    date: new Date().toISOString().split('T')[0],
    topic: '',
    notes: '',
    followUpRequired: false,
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
      actionsTaken: ['Verbal Warning', 'Parent Notification']
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
      actionsTaken: []
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
      actionsTaken: ['Parent Meeting', 'Attendance Contract']
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
      actionsTaken: []
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

  const [behaviorInterventions, setBehaviorInterventions] = useState<BehaviorIntervention[]>([
    {
      id: '1',
      studentName: 'John Doe',
      studentId: 'STU-2024-001',
      interventionType: 'Behavior Plan',
      startDate: '2024-01-15',
      endDate: null,
      status: 'Active',
      assignedTo: 'Counselor - Ms. Johnson',
      progress: 65,
      goals: ['Reduce disruptive behavior', 'Improve classroom participation', 'Complete assignments on time']
    },
    {
      id: '2',
      studentName: 'Mike Johnson',
      studentId: 'STU-2024-003',
      interventionType: 'Counseling',
      startDate: '2024-01-20',
      endDate: null,
      status: 'Active',
      assignedTo: 'Counselor - Mr. Brown',
      progress: 40,
      goals: ['Address bullying behavior', 'Develop empathy skills', 'Build positive relationships']
    },
    {
      id: '3',
      studentName: 'Sarah Williams',
      studentId: 'STU-2024-004',
      interventionType: 'Parent Conference',
      startDate: '2024-01-18',
      endDate: '2024-01-21',
      status: 'Completed',
      assignedTo: 'Vice Principal',
      progress: 100,
      goals: ['Improve attendance', 'Establish attendance contract']
    }
  ]);

  const [behaviorAnalytics] = useState<BehaviorAnalytics>({
    period: 'This Month',
    totalIncidents: 12,
    byType: {
      'Disruption': 4,
      'Tardiness': 3,
      'Bullying': 2,
      'Academic Dishonesty': 2,
      'Other': 1
    },
    bySeverity: {
      'Low': 8,
      'Medium': 3,
      'High': 1,
      'Critical': 0
    },
    trend: 'Improving'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Open': return 'bg-red-100 text-red-800';
      case 'Referred': return 'bg-purple-100 text-purple-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      case 'Discontinued': return 'bg-gray-100 text-gray-800';
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
    });
    setShowReportIncidentModal(false);
    alert('Incident reported successfully!');
  };

  const handleSchedulePractice = (e: React.FormEvent) => {
    e.preventDefault();
    const newPractice: RestorativePractice = {
      id: `practice-${Date.now()}`,
      practiceType: practiceFormData.practiceType,
      studentName: practiceFormData.studentName,
      studentId: practiceFormData.studentId,
      scheduledDate: practiceFormData.scheduledDate,
      facilitator: practiceFormData.facilitator,
      status: 'Scheduled',
      outcome: null,
      success: null,
    };
    setRestorativePractices([newPractice, ...restorativePractices]);
    setPracticeFormData({
      studentName: '',
      studentId: '',
      practiceType: 'Mediation',
      scheduledDate: '',
      facilitator: '',
      notes: '',
    });
    setShowSchedulePracticeModal(false);
    alert('Restorative practice scheduled successfully!');
  };

  const handleCreateIntervention = (e: React.FormEvent) => {
    e.preventDefault();
    const newIntervention: BehaviorIntervention = {
      id: `intervention-${Date.now()}`,
      studentName: interventionFormData.studentName,
      studentId: interventionFormData.studentId,
      interventionType: interventionFormData.interventionType,
      startDate: interventionFormData.startDate,
      endDate: null,
      status: 'Active',
      assignedTo: interventionFormData.assignedTo,
      progress: 0,
      goals: interventionFormData.goals.filter(g => g.trim() !== ''),
    };
    setBehaviorInterventions([newIntervention, ...behaviorInterventions]);
    setInterventionFormData({
      studentName: '',
      studentId: '',
      interventionType: 'Behavior Plan',
      startDate: '',
      assignedTo: '',
      goals: [''],
    });
    setShowCreateInterventionModal(false);
    alert('Behavior intervention created successfully!');
  };

  const handleLogCommunication = (e: React.FormEvent) => {
    e.preventDefault();
    const newCommunication: ParentCommunication = {
      id: `comm-${Date.now()}`,
      studentName: communicationFormData.studentName,
      studentId: communicationFormData.studentId,
      parentName: communicationFormData.parentName,
      communicationType: communicationFormData.communicationType,
      date: communicationFormData.date,
      topic: communicationFormData.topic,
      notes: communicationFormData.notes,
      followUpRequired: communicationFormData.followUpRequired,
    };
    setParentCommunications([newCommunication, ...parentCommunications]);
    setCommunicationFormData({
      studentName: '',
      studentId: '',
      parentName: '',
      communicationType: 'Phone Call',
      date: new Date().toISOString().split('T')[0],
      topic: '',
      notes: '',
      followUpRequired: false,
    });
    setShowLogCommunicationModal(false);
    alert('Parent communication logged successfully!');
  };

  const handleUpdateRule = (rule: CodeOfConductRule) => {
    setCodeOfConductRules(codeOfConductRules.map(r => 
      r.id === rule.id ? rule : r
    ));
    setEditingRule(null);
    alert('Code of conduct rule updated successfully!');
  };

  const totalIncidents = incidents.length;
  const resolvedIncidents = incidents.filter(i => i.status === 'Resolved' || i.status === 'Closed').length;
  const pendingIncidents = incidents.filter(i => i.status === 'Open' || i.status === 'Under Review').length;
  const overallCompliance = codeOfConductRules.reduce((sum, rule) => sum + rule.complianceRate, 0) / codeOfConductRules.length;
  const activeInterventions = behaviorInterventions.filter(i => i.status === 'Active').length;

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

      {/* Behavior Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Incidents by Type</h2>
          <div className="space-y-3">
            {Object.entries(behaviorAnalytics.byType).map(([type, count]) => (
              <div key={type}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{type}</span>
                  <span className="font-semibold text-gray-900">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(count / behaviorAnalytics.totalIncidents) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Incidents by Severity</h2>
          <div className="space-y-3">
            {Object.entries(behaviorAnalytics.bySeverity).map(([severity, count]) => (
              <div key={severity}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{severity}</span>
                  <span className="font-semibold text-gray-900">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      severity === 'Critical' ? 'bg-red-600' :
                      severity === 'High' ? 'bg-orange-600' :
                      severity === 'Medium' ? 'bg-yellow-600' :
                      'bg-gray-600'
                    }`}
                    style={{ width: `${(count / behaviorAnalytics.totalIncidents) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Trend Analysis</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">Overall Trend</div>
              <div className={`text-2xl font-bold mb-1 ${
                behaviorAnalytics.trend === 'Improving' ? 'text-green-600' :
                behaviorAnalytics.trend === 'Stable' ? 'text-blue-600' :
                'text-red-600'
              }`}>
                {behaviorAnalytics.trend}
              </div>
              <div className="text-sm text-gray-600">15% decrease from last month</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">Active Interventions</div>
              <div className="text-2xl font-bold text-blue-600 mb-1">{activeInterventions}</div>
              <div className="text-sm text-gray-600">Students receiving support</div>
            </div>
          </div>
        </Card>
      </div>

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

      {/* Code of Conduct Management & Restorative Practices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Code of Conduct Enforcement</h2>
            <Button size="sm" variant="secondary" onClick={() => setShowManageRulesModal(true)}>Manage Rules</Button>
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
            <Button size="sm" variant="secondary" onClick={() => setShowSchedulePracticeModal(true)}>Schedule Practice</Button>
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
                  <Button 
                    size="sm" 
                    variant="outline" 
                    fullWidth
                    onClick={() => {
                      setSelectedPractice(practice);
                      setShowPracticeDetailsModal(true);
                    }}
                  >
                    View Details
                  </Button>
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
                    Math.max(restorativePractices.filter(p => p.status === 'Completed').length, 1)) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Behavior Intervention Plans */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Behavior Intervention Plans</h2>
          <Button size="sm" variant="secondary" onClick={() => setShowCreateInterventionModal(true)}>Create Intervention</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intervention Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {behaviorInterventions.map((intervention) => (
                <tr key={intervention.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{intervention.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{intervention.interventionType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{intervention.assignedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{intervention.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            intervention.progress >= 75 ? 'bg-green-600' :
                            intervention.progress >= 50 ? 'bg-yellow-600' :
                            'bg-orange-600'
                          }`}
                          style={{ width: `${intervention.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{intervention.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(intervention.status)}`}>
                      {intervention.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setSelectedIntervention(intervention);
                          setShowInterventionDetailsModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      {intervention.status === 'Active' && (
                        <button 
                          onClick={() => {
                            const progress = prompt('Update progress (0-100):');
                            if (progress && !isNaN(Number(progress))) {
                              const progressNum = Math.min(100, Math.max(0, Number(progress)));
                              setBehaviorInterventions(behaviorInterventions.map(i => 
                                i.id === intervention.id 
                                  ? { ...i, progress: progressNum }
                                  : i
                              ));
                              alert(`Progress updated to ${progressNum}%`);
                            }
                          }}
                          className="text-green-600 hover:text-green-900"
                        >
                          Update
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

      {/* Parent Communication Logs */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Parent Communication Logs</h2>
          <Button size="sm" variant="secondary" onClick={() => setShowLogCommunicationModal(true)}>Log Communication</Button>
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
                      <button 
                        onClick={() => {
                          setSelectedCommunication(communication);
                          setShowCommunicationDetailsModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      {communication.followUpRequired && (
                        <button 
                          onClick={() => {
                            setParentCommunications(parentCommunications.map(c => 
                              c.id === communication.id 
                                ? { ...c, followUpRequired: false }
                                : c
                            ));
                            alert('Follow-up marked as completed!');
                          }}
                          className="text-green-600 hover:text-green-900"
                        >
                          Follow-up
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
                    });
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

      {/* Manage Rules Modal */}
      {showManageRulesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Manage Code of Conduct Rules</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                {codeOfConductRules.map((rule) => (
                  <div key={rule.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{rule.ruleName}</div>
                        <div className="text-sm text-gray-600">{rule.category}</div>
                      </div>
                      <button
                        onClick={() => setEditingRule(rule)}
                        className="text-blue-600 hover:text-blue-900 text-sm"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="text-sm text-gray-600">
                      Compliance: {rule.complianceRate}% • Violations: {rule.violations} / {rule.totalStudents}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowManageRulesModal(false);
                    setEditingRule(null);
                  }}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    const ruleName = prompt('Enter new rule name:');
                    if (ruleName) {
                      const newRule: CodeOfConductRule = {
                        id: `rule-${Date.now()}`,
                        ruleName,
                        category: 'Other',
                        complianceRate: 100,
                        trend: 0,
                        violations: 0,
                        totalStudents: 850,
                      };
                      setCodeOfConductRules([...codeOfConductRules, newRule]);
                      alert('New rule added!');
                    }
                  }}
                  className="flex-1"
                >
                  Add New Rule
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Practice Modal */}
      {showSchedulePracticeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Schedule Restorative Practice</h2>
            </div>
            <form onSubmit={handleSchedulePractice} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name *</label>
                  <input
                    type="text"
                    value={practiceFormData.studentName}
                    onChange={(e) => setPracticeFormData({...practiceFormData, studentName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID *</label>
                  <input
                    type="text"
                    value={practiceFormData.studentId}
                    onChange={(e) => setPracticeFormData({...practiceFormData, studentId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Practice Type *</label>
                  <select
                    value={practiceFormData.practiceType}
                    onChange={(e) => setPracticeFormData({...practiceFormData, practiceType: e.target.value as any})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  >
                    <option value="Mediation">Mediation</option>
                    <option value="Circle">Circle</option>
                    <option value="Conference">Conference</option>
                    <option value="Peer Support">Peer Support</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Date *</label>
                  <input
                    type="date"
                    value={practiceFormData.scheduledDate}
                    onChange={(e) => setPracticeFormData({...practiceFormData, scheduledDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facilitator *</label>
                <input
                  type="text"
                  value={practiceFormData.facilitator}
                  onChange={(e) => setPracticeFormData({...practiceFormData, facilitator: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  placeholder="e.g., Ms. Johnson, Counselor"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={practiceFormData.notes}
                  onChange={(e) => setPracticeFormData({...practiceFormData, notes: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={3}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowSchedulePracticeModal(false);
                    setPracticeFormData({
                      studentName: '',
                      studentId: '',
                      practiceType: 'Mediation',
                      scheduledDate: '',
                      facilitator: '',
                      notes: '',
                    });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Schedule Practice</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Intervention Modal */}
      {showCreateInterventionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create Behavior Intervention</h2>
            </div>
            <form onSubmit={handleCreateIntervention} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name *</label>
                  <input
                    type="text"
                    value={interventionFormData.studentName}
                    onChange={(e) => setInterventionFormData({...interventionFormData, studentName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID *</label>
                  <input
                    type="text"
                    value={interventionFormData.studentId}
                    onChange={(e) => setInterventionFormData({...interventionFormData, studentId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Intervention Type *</label>
                  <select
                    value={interventionFormData.interventionType}
                    onChange={(e) => setInterventionFormData({...interventionFormData, interventionType: e.target.value as any})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  >
                    <option value="Behavior Plan">Behavior Plan</option>
                    <option value="Counseling">Counseling</option>
                    <option value="Mentoring">Mentoring</option>
                    <option value="Parent Conference">Parent Conference</option>
                    <option value="Suspension">Suspension</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={interventionFormData.startDate}
                    onChange={(e) => setInterventionFormData({...interventionFormData, startDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To *</label>
                <input
                  type="text"
                  value={interventionFormData.assignedTo}
                  onChange={(e) => setInterventionFormData({...interventionFormData, assignedTo: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  placeholder="e.g., Counselor - Ms. Johnson"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Goals *</label>
                {interventionFormData.goals.map((goal, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={goal}
                      onChange={(e) => {
                        const newGoals = [...interventionFormData.goals];
                        newGoals[index] = e.target.value;
                        setInterventionFormData({...interventionFormData, goals: newGoals});
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder={`Goal ${index + 1}`}
                    />
                    {interventionFormData.goals.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setInterventionFormData({
                            ...interventionFormData,
                            goals: interventionFormData.goals.filter((_, i) => i !== index),
                          });
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setInterventionFormData({
                      ...interventionFormData,
                      goals: [...interventionFormData.goals, ''],
                    });
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm mt-2"
                >
                  + Add Goal
                </button>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateInterventionModal(false);
                    setInterventionFormData({
                      studentName: '',
                      studentId: '',
                      interventionType: 'Behavior Plan',
                      startDate: '',
                      assignedTo: '',
                      goals: [''],
                    });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Create Intervention</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Communication Modal */}
      {showLogCommunicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Log Parent Communication</h2>
            </div>
            <form onSubmit={handleLogCommunication} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name *</label>
                  <input
                    type="text"
                    value={communicationFormData.studentName}
                    onChange={(e) => setCommunicationFormData({...communicationFormData, studentName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID *</label>
                  <input
                    type="text"
                    value={communicationFormData.studentId}
                    onChange={(e) => setCommunicationFormData({...communicationFormData, studentId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parent Name *</label>
                  <input
                    type="text"
                    value={communicationFormData.parentName}
                    onChange={(e) => setCommunicationFormData({...communicationFormData, parentName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Communication Type *</label>
                  <select
                    value={communicationFormData.communicationType}
                    onChange={(e) => setCommunicationFormData({...communicationFormData, communicationType: e.target.value as any})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  >
                    <option value="Phone Call">Phone Call</option>
                    <option value="Email">Email</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Letter">Letter</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={communicationFormData.date}
                    onChange={(e) => setCommunicationFormData({...communicationFormData, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Required</label>
                  <div className="mt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={communicationFormData.followUpRequired}
                        onChange={(e) => setCommunicationFormData({...communicationFormData, followUpRequired: e.target.checked})}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Mark as requiring follow-up</span>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Topic *</label>
                <input
                  type="text"
                  value={communicationFormData.topic}
                  onChange={(e) => setCommunicationFormData({...communicationFormData, topic: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  placeholder="e.g., Disruptive Behavior Incident"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes *</label>
                <textarea
                  value={communicationFormData.notes}
                  onChange={(e) => setCommunicationFormData({...communicationFormData, notes: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={4}
                  required
                  placeholder="Enter communication details..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowLogCommunicationModal(false);
                    setCommunicationFormData({
                      studentName: '',
                      studentId: '',
                      parentName: '',
                      communicationType: 'Phone Call',
                      date: new Date().toISOString().split('T')[0],
                      topic: '',
                      notes: '',
                      followUpRequired: false,
                    });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Log Communication</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Incident Details Modal */}
      {showIncidentDetailsModal && selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
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

      {/* Practice Details Modal */}
      {showPracticeDetailsModal && selectedPractice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Restorative Practice Details</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                  <p className="text-gray-900">{selectedPractice.studentName} ({selectedPractice.studentId})</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Practice Type</label>
                  <p className="text-gray-900">{selectedPractice.practiceType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facilitator</label>
                  <p className="text-gray-900">{selectedPractice.facilitator}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
                  <p className="text-gray-900">{selectedPractice.scheduledDate}</p>
                </div>
              </div>
              {selectedPractice.outcome && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Outcome</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded">{selectedPractice.outcome}</p>
                </div>
              )}
              {selectedPractice.status === 'Scheduled' && (
                <div className="pt-4 border-t">
                  <Button
                    onClick={() => {
                      const outcome = prompt('Enter outcome:');
                      const success = confirm('Was this practice successful?');
                      if (outcome) {
                        setRestorativePractices(restorativePractices.map(p => 
                          p.id === selectedPractice.id 
                            ? { ...p, status: 'Completed' as const, outcome, success }
                            : p
                        ));
                        setShowPracticeDetailsModal(false);
                        alert('Practice marked as completed!');
                      }
                    }}
                    className="w-full"
                  >
                    Mark as Completed
                  </Button>
                </div>
              )}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPracticeDetailsModal(false);
                    setSelectedPractice(null);
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

      {/* Intervention Details Modal */}
      {showInterventionDetailsModal && selectedIntervention && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Behavior Intervention Details</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                  <p className="text-gray-900">{selectedIntervention.studentName} ({selectedIntervention.studentId})</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Intervention Type</label>
                  <p className="text-gray-900">{selectedIntervention.interventionType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                  <p className="text-gray-900">{selectedIntervention.assignedTo}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <p className="text-gray-900">{selectedIntervention.startDate}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Progress</label>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-3 mr-2">
                    <div 
                      className={`h-3 rounded-full ${
                        selectedIntervention.progress >= 75 ? 'bg-green-600' :
                        selectedIntervention.progress >= 50 ? 'bg-yellow-600' :
                        'bg-orange-600'
                      }`}
                      style={{ width: `${selectedIntervention.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{selectedIntervention.progress}%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Goals</label>
                <ul className="list-disc list-inside space-y-1">
                  {selectedIntervention.goals.map((goal, index) => (
                    <li key={index} className="text-gray-900">{goal}</li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowInterventionDetailsModal(false);
                    setSelectedIntervention(null);
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

      {/* Communication Details Modal */}
      {showCommunicationDetailsModal && selectedCommunication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Communication Details</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                  <p className="text-gray-900">{selectedCommunication.studentName} ({selectedCommunication.studentId})</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent</label>
                  <p className="text-gray-900">{selectedCommunication.parentName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <p className="text-gray-900">{selectedCommunication.communicationType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <p className="text-gray-900">{selectedCommunication.date}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                <p className="text-gray-900">{selectedCommunication.topic}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded">{selectedCommunication.notes}</p>
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCommunicationDetailsModal(false);
                    setSelectedCommunication(null);
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
