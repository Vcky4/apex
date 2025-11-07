import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface AccreditationRequirement {
  id: string;
  requirementName: string;
  category: 'Curriculum' | 'Faculty' | 'Facilities' | 'Student Services' | 'Financial' | 'Governance' | 'Other';
  description: string;
  dueDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Overdue' | 'Submitted';
  assignedTo: string;
  completionPercentage: number;
  evidenceCount: number;
  priority: 'High' | 'Medium' | 'Low';
}

interface SelfStudyDocument {
  id: string;
  documentName: string;
  documentType: 'Self-Study Report' | 'Evidence Document' | 'Supporting Material' | 'Response Letter' | 'Other';
  requirementId: string;
  requirementName: string;
  version: string;
  status: 'Draft' | 'Under Review' | 'Approved' | 'Submitted';
  createdBy: string;
  createdDate: string;
  lastModified: string;
  fileSize: string;
}

interface SiteVisit {
  id: string;
  visitType: 'Initial' | 'Reaffirmation' | 'Focused' | 'Follow-up';
  scheduledDate: string;
  status: 'Scheduled' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  accreditingBody: string;
  teamLead: string;
  teamMembers: string[];
  agenda: string[];
  preparationStatus: number;
}

interface ComplianceEvidence {
  id: string;
  evidenceName: string;
  requirementId: string;
  requirementName: string;
  evidenceType: 'Document' | 'Photo' | 'Video' | 'Data' | 'Testimony' | 'Other';
  uploadDate: string;
  uploadedBy: string;
  status: 'Pending Review' | 'Approved' | 'Rejected' | 'Needs Revision';
  reviewer: string | null;
  reviewDate: string | null;
}

export default function ProgramAccreditation() {
  const [requirements, setRequirements] = useState<AccreditationRequirement[]>([
    {
      id: '1',
      requirementName: 'Curriculum Standards Alignment',
      category: 'Curriculum',
      description: 'Demonstrate alignment with national curriculum standards',
      dueDate: '2024-03-15',
      status: 'In Progress',
      assignedTo: 'Academic Executive',
      completionPercentage: 75,
      evidenceCount: 12,
      priority: 'High'
    },
    {
      id: '2',
      requirementName: 'Faculty Qualifications Documentation',
      category: 'Faculty',
      description: 'Document all faculty qualifications and certifications',
      dueDate: '2024-03-20',
      status: 'In Progress',
      assignedTo: 'HR Executive',
      completionPercentage: 90,
      evidenceCount: 45,
      priority: 'High'
    },
    {
      id: '3',
      requirementName: 'Facilities Assessment Report',
      category: 'Facilities',
      description: 'Complete facilities assessment and compliance report',
      dueDate: '2024-02-28',
      status: 'Overdue',
      assignedTo: 'Operations Executive',
      completionPercentage: 60,
      evidenceCount: 8,
      priority: 'Medium'
    },
    {
      id: '4',
      requirementName: 'Student Support Services Documentation',
      category: 'Student Services',
      description: 'Document student support services and programs',
      dueDate: '2024-03-10',
      status: 'Completed',
      assignedTo: 'Student Affairs Executive',
      completionPercentage: 100,
      evidenceCount: 20,
      priority: 'Medium'
    }
  ]);

  const [selfStudyDocuments, setSelfStudyDocuments] = useState<SelfStudyDocument[]>([
    {
      id: '1',
      documentName: 'Institutional Self-Study Report 2024',
      documentType: 'Self-Study Report',
      requirementId: '1',
      requirementName: 'Curriculum Standards Alignment',
      version: '2.1',
      status: 'Under Review',
      createdBy: 'Academic Executive',
      createdDate: '2024-01-15',
      lastModified: '2024-01-25',
      fileSize: '2.5 MB'
    },
    {
      id: '2',
      documentName: 'Faculty Credentials Evidence Package',
      documentType: 'Evidence Document',
      requirementId: '2',
      requirementName: 'Faculty Qualifications Documentation',
      version: '1.0',
      status: 'Approved',
      createdBy: 'HR Executive',
      createdDate: '2024-01-20',
      lastModified: '2024-01-22',
      fileSize: '5.2 MB'
    },
    {
      id: '3',
      documentName: 'Facilities Compliance Evidence',
      documentType: 'Evidence Document',
      requirementId: '3',
      requirementName: 'Facilities Assessment Report',
      version: '1.5',
      status: 'Draft',
      createdBy: 'Operations Executive',
      createdDate: '2024-01-18',
      lastModified: '2024-01-24',
      fileSize: '3.8 MB'
    }
  ]);

  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>([
    {
      id: '1',
      visitType: 'Reaffirmation',
      scheduledDate: '2024-04-15',
      status: 'Scheduled',
      accreditingBody: 'National Accreditation Board',
      teamLead: 'Dr. Sarah Johnson',
      teamMembers: ['Dr. Michael Brown', 'Ms. Emily Davis', 'Mr. Robert Wilson'],
      agenda: ['Opening Meeting', 'Facilities Tour', 'Document Review', 'Stakeholder Interviews', 'Closing Meeting'],
      preparationStatus: 65
    },
    {
      id: '2',
      visitType: 'Focused',
      scheduledDate: '2024-03-05',
      status: 'Confirmed',
      accreditingBody: 'Regional Education Authority',
      teamLead: 'Dr. James Anderson',
      teamMembers: ['Ms. Lisa Martinez'],
      agenda: ['Program Review', 'Student Interviews', 'Report Presentation'],
      preparationStatus: 85
    }
  ]);

  const [complianceEvidence, setComplianceEvidence] = useState<ComplianceEvidence[]>([
    {
      id: '1',
      evidenceName: 'Curriculum Mapping Document',
      requirementId: '1',
      requirementName: 'Curriculum Standards Alignment',
      evidenceType: 'Document',
      uploadDate: '2024-01-20',
      uploadedBy: 'Academic Executive',
      status: 'Approved',
      reviewer: 'Vice Principal',
      reviewDate: '2024-01-22'
    },
    {
      id: '2',
      evidenceName: 'Faculty Credentials Database',
      requirementId: '2',
      requirementName: 'Faculty Qualifications Documentation',
      evidenceType: 'Data',
      uploadDate: '2024-01-18',
      uploadedBy: 'HR Executive',
      status: 'Approved',
      reviewer: 'Principal',
      reviewDate: '2024-01-19'
    },
    {
      id: '3',
      evidenceName: 'Science Lab Photos',
      requirementId: '3',
      requirementName: 'Facilities Assessment Report',
      evidenceType: 'Photo',
      uploadDate: '2024-01-25',
      uploadedBy: 'Operations Executive',
      status: 'Pending Review',
      reviewer: null,
      reviewDate: null
    },
    {
      id: '4',
      evidenceName: 'Student Support Services Video',
      requirementId: '4',
      requirementName: 'Student Support Services Documentation',
      evidenceType: 'Video',
      uploadDate: '2024-01-15',
      uploadedBy: 'Student Affairs Executive',
      status: 'Needs Revision',
      reviewer: 'Vice Principal',
      reviewDate: '2024-01-17'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Submitted': return 'bg-blue-100 text-blue-800';
      case 'Confirmed': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Not Started': return 'bg-gray-100 text-gray-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Needs Revision': return 'bg-orange-100 text-orange-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRequirements = requirements.length;
  const completedRequirements = requirements.filter(r => r.status === 'Completed' || r.status === 'Submitted').length;
  const overdueRequirements = requirements.filter(r => r.status === 'Overdue').length;
  const overallProgress = requirements.reduce((sum, r) => sum + r.completionPercentage, 0) / requirements.length;
  const upcomingSiteVisits = siteVisits.filter(v => v.status === 'Scheduled' || v.status === 'Confirmed').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Program Accreditation</h1>
          <p className="text-gray-600 mt-2">Accreditation requirement tracking and compliance</p>
        </div>
        <Button>Add Requirement</Button>
      </div>

      {/* Overview Stats */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Total Requirements"
          value={totalRequirements.toString()}
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          }
        />
        <StatCard
          title="Completed"
          value={completedRequirements.toString()}
          color="green"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Overall Progress"
          value={`${overallProgress.toFixed(0)}%`}
          color="purple"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
        <StatCard
          title="Upcoming Site Visits"
          value={upcomingSiteVisits.toString()}
          color={overdueRequirements > 0 ? 'red' : 'orange'}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
      </DashboardGrid>

      {/* Accreditation Requirement Tracking */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Accreditation Requirement Tracking</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Categories</option>
              <option>Curriculum</option>
              <option>Faculty</option>
              <option>Facilities</option>
            </select>
            <Button size="sm" variant="secondary">Add Requirement</Button>
          </div>
        </div>

        {overdueRequirements > 0 && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-red-800">
                  {overdueRequirements} requirement(s) overdue and require immediate attention
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evidence</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requirements.map((requirement) => (
                <tr key={requirement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{requirement.requirementName}</div>
                    <div className="text-sm text-gray-500 max-w-xs truncate">{requirement.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{requirement.category}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                    requirement.status === 'Overdue' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {requirement.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{requirement.assignedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            requirement.completionPercentage >= 90 ? 'bg-green-600' :
                            requirement.completionPercentage >= 70 ? 'bg-yellow-600' :
                            'bg-orange-600'
                          }`}
                          style={{ width: `${requirement.completionPercentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{requirement.completionPercentage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{requirement.evidenceCount} items</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(requirement.priority)}`}>
                      {requirement.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(requirement.status)}`}>
                      {requirement.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Update</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Self-Study Documentation Management */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Self-Study Documentation Management</h2>
          <Button size="sm" variant="secondary">Upload Document</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selfStudyDocuments.map((document) => (
                <tr key={document.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{document.documentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{document.documentType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{document.requirementName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{document.version}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{document.createdBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{document.lastModified}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(document.status)}`}>
                      {document.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      {document.status === 'Draft' && (
                        <button className="text-purple-600 hover:text-purple-900">Edit</button>
                      )}
                      <button className="text-green-600 hover:text-green-900">Download</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Site Visit Coordination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Site Visit Coordination</h2>
            <Button size="sm" variant="secondary">Schedule Visit</Button>
          </div>

          <div className="space-y-4">
            {siteVisits.map((visit) => (
              <div key={visit.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-medium text-gray-900">{visit.visitType} Visit</div>
                    <div className="text-sm text-gray-600">{visit.accreditingBody}</div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(visit.status)}`}>
                    {visit.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  <div>Scheduled: {visit.scheduledDate}</div>
                  <div>Team Lead: {visit.teamLead}</div>
                  <div>Team Members: {visit.teamMembers.length}</div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Preparation Status</span>
                    <span className="font-semibold text-gray-900">{visit.preparationStatus}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        visit.preparationStatus >= 80 ? 'bg-green-600' :
                        visit.preparationStatus >= 60 ? 'bg-yellow-600' :
                        'bg-orange-600'
                      }`}
                      style={{ width: `${visit.preparationStatus}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="text-sm font-medium text-gray-900 mb-1">Agenda:</div>
                  <div className="text-sm text-gray-600">
                    {visit.agenda.slice(0, 3).map((item, idx) => (
                      <div key={idx}>• {item}</div>
                    ))}
                    {visit.agenda.length > 3 && (
                      <div className="text-xs text-gray-500">+{visit.agenda.length - 3} more items</div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" fullWidth>View Details</Button>
                  <Button size="sm" variant="outline" fullWidth>Manage</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Compliance Evidence Collection</h2>
            <Button size="sm" variant="secondary">Upload Evidence</Button>
          </div>

          <div className="space-y-3">
            {complianceEvidence.map((evidence) => (
              <div key={evidence.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-gray-900">{evidence.evidenceName}</div>
                    <div className="text-sm text-gray-600">{evidence.requirementName}</div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(evidence.status)}`}>
                    {evidence.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <div>Type: {evidence.evidenceType}</div>
                  <div>Uploaded: {evidence.uploadDate} by {evidence.uploadedBy}</div>
                  {evidence.reviewer && (
                    <div>Reviewed: {evidence.reviewDate} by {evidence.reviewer}</div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" fullWidth>View</Button>
                  {evidence.status === 'Pending Review' && (
                    <Button size="sm" variant="outline" fullWidth>Review</Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Evidence Summary</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-2xl font-bold text-blue-600">{complianceEvidence.length}</div>
                <div className="text-sm text-gray-600">Total Evidence</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {complianceEvidence.filter(e => e.status === 'Approved').length}
                </div>
                <div className="text-sm text-gray-600">Approved</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
