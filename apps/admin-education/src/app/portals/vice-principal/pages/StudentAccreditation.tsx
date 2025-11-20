import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface Accreditation {
  id: string;
  studentName: string;
  studentId: string;
  grade: string;
  accreditationType: 'Academic' | 'Vocational' | 'Professional' | 'Certification';
  program: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Expired';
  startDate: string;
  endDate: string | null;
  completionDate: string | null;
  credits: number;
  gpa: number | null;
}

interface AccreditationRequirement {
  id: string;
  accreditationId: string;
  requirement: string;
  status: 'Pending' | 'Completed' | 'Verified';
  completedDate: string | null;
  verifiedBy: string | null;
}

interface AccreditationDocument {
  id: string;
  accreditationId: string;
  name: string;
  type: string;
  uploadedDate: string;
  uploadedBy: string;
  size: string;
  url: string;
}

export default function StudentAccreditation() {
  const [showAddAccreditationModal, setShowAddAccreditationModal] = useState(false);
  const [showAccreditationDetailsModal, setShowAccreditationDetailsModal] = useState(false);
  const [showUploadDocumentModal, setShowUploadDocumentModal] = useState(false);
  const [selectedAccreditation, setSelectedAccreditation] = useState<Accreditation | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [accreditationFormData, setAccreditationFormData] = useState({
    studentName: '',
    studentId: '',
    grade: '',
    accreditationType: 'Academic' as Accreditation['accreditationType'],
    program: '',
    startDate: '',
    credits: 0,
  });

  const [accreditations, setAccreditations] = useState<Accreditation[]>([
    {
      id: '1',
      studentName: 'John Doe',
      studentId: 'STU-2024-001',
      grade: 'Grade 12',
      accreditationType: 'Academic',
      program: 'High School Diploma',
      status: 'In Progress',
      startDate: '2023-09-01',
      endDate: '2024-06-30',
      completionDate: null,
      credits: 120,
      gpa: 3.8,
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      studentId: 'STU-2024-002',
      grade: 'Grade 11',
      accreditationType: 'Vocational',
      program: 'Computer Science Certification',
      status: 'Completed',
      startDate: '2023-01-15',
      endDate: '2023-12-15',
      completionDate: '2023-12-10',
      credits: 60,
      gpa: 4.0,
    },
    {
      id: '3',
      studentName: 'Mike Johnson',
      studentId: 'STU-2024-003',
      grade: 'Grade 12',
      accreditationType: 'Professional',
      program: 'Engineering Prep Program',
      status: 'Pending',
      startDate: '2024-02-01',
      endDate: null,
      completionDate: null,
      credits: 0,
      gpa: null,
    },
  ]);

  const [requirements, setRequirements] = useState<AccreditationRequirement[]>([
    {
      id: '1',
      accreditationId: '1',
      requirement: 'Complete all core courses',
      status: 'Completed',
      completedDate: '2024-01-15',
      verifiedBy: 'Dr. Smith',
    },
    {
      id: '2',
      accreditationId: '1',
      requirement: 'Maintain minimum GPA of 3.0',
      status: 'Completed',
      completedDate: '2024-01-20',
      verifiedBy: 'Ms. Johnson',
    },
    {
      id: '3',
      accreditationId: '1',
      requirement: 'Complete capstone project',
      status: 'In Progress',
      completedDate: null,
      verifiedBy: null,
    },
  ]);

  const [documents, setDocuments] = useState<AccreditationDocument[]>([
    {
      id: '1',
      accreditationId: '1',
      name: 'Transcript.pdf',
      type: 'Transcript',
      uploadedDate: '2024-01-15',
      uploadedBy: 'Admin',
      size: '245 KB',
      url: '#',
    },
    {
      id: '2',
      accreditationId: '2',
      name: 'Certificate.pdf',
      type: 'Certificate',
      uploadedDate: '2023-12-10',
      uploadedBy: 'Admin',
      size: '180 KB',
      url: '#',
    },
  ]);

  const handleAddAccreditation = (e: React.FormEvent) => {
    e.preventDefault();
    const newAccreditation: Accreditation = {
      id: `acc-${Date.now()}`,
      studentName: accreditationFormData.studentName,
      studentId: accreditationFormData.studentId,
      grade: accreditationFormData.grade,
      accreditationType: accreditationFormData.accreditationType,
      program: accreditationFormData.program,
      status: 'Pending',
      startDate: accreditationFormData.startDate,
      endDate: null,
      completionDate: null,
      credits: accreditationFormData.credits,
      gpa: null,
    };
    setAccreditations([newAccreditation, ...accreditations]);
    setAccreditationFormData({
      studentName: '',
      studentId: '',
      grade: '',
      accreditationType: 'Academic',
      program: '',
      startDate: '',
      credits: 0,
    });
    setShowAddAccreditationModal(false);
    alert('Accreditation added successfully!');
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files || !selectedAccreditation) return;
    const fileArray = Array.from(files);
    setUploadedFiles([...uploadedFiles, ...fileArray]);
    
    const newDocuments: AccreditationDocument[] = fileArray.map((file, index) => ({
      id: `doc-${Date.now()}-${index}`,
      accreditationId: selectedAccreditation.id,
      name: file.name,
      type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
      uploadedDate: new Date().toISOString().split('T')[0],
      uploadedBy: 'Admin',
      size: `${(file.size / 1024).toFixed(0)} KB`,
      url: '#',
    }));
    
    setDocuments([...documents, ...newDocuments]);
    alert(`${fileArray.length} file(s) uploaded successfully!`);
  };

  const handleCompleteRequirement = (requirementId: string) => {
    setRequirements(requirements.map(req => 
      req.id === requirementId 
        ? { ...req, status: 'Completed' as const, completedDate: new Date().toISOString().split('T')[0], verifiedBy: 'Current User' }
        : req
    ));
    alert('Requirement marked as completed!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Verified': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const completedAccreditations = accreditations.filter(a => a.status === 'Completed').length;
  const inProgress = accreditations.filter(a => a.status === 'In Progress').length;
  const pending = accreditations.filter(a => a.status === 'Pending').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Student Accreditation</h1>
          <p className="text-gray-600 mt-2">Track and manage student accreditations, certifications, and credentials</p>
        </div>
        <Button onClick={() => setShowAddAccreditationModal(true)}>Add Accreditation</Button>
      </div>

      <DashboardGrid columns={3}>
        <StatCard title="Completed" value={completedAccreditations.toString()} color="green" />
        <StatCard title="In Progress" value={inProgress.toString()} color="blue" />
        <StatCard title="Pending" value={pending.toString()} color="yellow" />
      </DashboardGrid>

      {/* Accreditations List */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Accreditations</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Types</option>
              <option>Academic</option>
              <option>Vocational</option>
              <option>Professional</option>
              <option>Certification</option>
            </select>
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GPA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accreditations.map((accreditation) => (
                <tr key={accreditation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{accreditation.studentName}</div>
                    <div className="text-xs text-gray-500">{accreditation.studentId} • {accreditation.grade}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{accreditation.program}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{accreditation.accreditationType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{accreditation.credits}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {accreditation.gpa ? accreditation.gpa.toFixed(2) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(accreditation.status)}`}>
                      {accreditation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedAccreditation(accreditation);
                          setShowAccreditationDetailsModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      {accreditation.status !== 'Completed' && (
                        <button
                          onClick={() => {
                            setSelectedAccreditation(accreditation);
                            setShowUploadDocumentModal(true);
                          }}
                          className="text-green-600 hover:text-green-900"
                        >
                          Upload Docs
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

      {/* Add Accreditation Modal */}
      {showAddAccreditationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add Student Accreditation</h2>
            </div>
            <form onSubmit={handleAddAccreditation} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name *</label>
                  <input
                    type="text"
                    value={accreditationFormData.studentName}
                    onChange={(e) => setAccreditationFormData({...accreditationFormData, studentName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID *</label>
                  <input
                    type="text"
                    value={accreditationFormData.studentId}
                    onChange={(e) => setAccreditationFormData({...accreditationFormData, studentId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grade *</label>
                  <select
                    value={accreditationFormData.grade}
                    onChange={(e) => setAccreditationFormData({...accreditationFormData, grade: e.target.value})}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accreditation Type *</label>
                  <select
                    value={accreditationFormData.accreditationType}
                    onChange={(e) => setAccreditationFormData({...accreditationFormData, accreditationType: e.target.value as any})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  >
                    <option value="Academic">Academic</option>
                    <option value="Vocational">Vocational</option>
                    <option value="Professional">Professional</option>
                    <option value="Certification">Certification</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Program *</label>
                <input
                  type="text"
                  value={accreditationFormData.program}
                  onChange={(e) => setAccreditationFormData({...accreditationFormData, program: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  placeholder="e.g., High School Diploma, Computer Science Certification"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={accreditationFormData.startDate}
                    onChange={(e) => setAccreditationFormData({...accreditationFormData, startDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Credits</label>
                  <input
                    type="number"
                    value={accreditationFormData.credits}
                    onChange={(e) => setAccreditationFormData({...accreditationFormData, credits: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    min="0"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddAccreditationModal(false);
                    setAccreditationFormData({
                      studentName: '',
                      studentId: '',
                      grade: '',
                      accreditationType: 'Academic',
                      program: '',
                      startDate: '',
                      credits: 0,
                    });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Add Accreditation</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Accreditation Details Modal */}
      {showAccreditationDetailsModal && selectedAccreditation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Accreditation Details - {selectedAccreditation.studentName}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                  <p className="text-gray-900">{selectedAccreditation.studentName} ({selectedAccreditation.studentId})</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                  <p className="text-gray-900">{selectedAccreditation.grade}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                  <p className="text-gray-900">{selectedAccreditation.program}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <p className="text-gray-900">{selectedAccreditation.accreditationType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
                  <p className="text-gray-900">{selectedAccreditation.credits}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
                  <p className="text-gray-900">{selectedAccreditation.gpa ? selectedAccreditation.gpa.toFixed(2) : 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <p className="text-gray-900">{selectedAccreditation.startDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedAccreditation.status)}`}>
                    {selectedAccreditation.status}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Requirements</h3>
                <div className="space-y-2">
                  {requirements.filter(req => req.accreditationId === selectedAccreditation.id).map((req) => (
                    <div key={req.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{req.requirement}</div>
                        {req.completedDate && (
                          <div className="text-xs text-gray-500">Completed: {req.completedDate} • Verified by: {req.verifiedBy}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                        {req.status === 'Pending' && (
                          <button
                            onClick={() => handleCompleteRequirement(req.id)}
                            className="text-green-600 hover:text-green-900 text-sm"
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Documents ({documents.filter(d => d.accreditationId === selectedAccreditation.id).length})</h3>
                <div className="space-y-2">
                  {documents.filter(d => d.accreditationId === selectedAccreditation.id).map((doc) => (
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
                      <button className="text-blue-600 hover:text-blue-900 text-sm">Download</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAccreditationDetailsModal(false);
                    setSelectedAccreditation(null);
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

      {/* Upload Document Modal */}
      {showUploadDocumentModal && selectedAccreditation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Upload Documents - {selectedAccreditation.studentName}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Documents</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="accreditation-docs"
                  />
                  <label htmlFor="accreditation-docs" className="cursor-pointer">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600">Click to upload documents</p>
                    <p className="text-xs text-gray-500 mt-1">Transcripts, Certificates, etc.</p>
                  </label>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <button
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
                  variant="outline"
                  onClick={() => {
                    setShowUploadDocumentModal(false);
                    setSelectedAccreditation(null);
                    setUploadedFiles([]);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setShowUploadDocumentModal(false);
                    setSelectedAccreditation(null);
                    setUploadedFiles([]);
                  }}
                  className="flex-1"
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

