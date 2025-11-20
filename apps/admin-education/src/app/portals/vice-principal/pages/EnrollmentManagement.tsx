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

interface Admission {
  id: string;
  applicantName: string;
  gradeLevel: string;
  applicationDate: string;
  status: 'Pending' | 'Under Review' | 'Accepted' | 'Rejected' | 'Waitlisted';
  documentsComplete: boolean;
  documents: Document[];
  email: string;
  phone: string;
  parentName: string;
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
  const [showNewAdmissionModal, setShowNewAdmissionModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);
  const [showViewRecordsModal, setShowViewRecordsModal] = useState(false);
  const [showReviewAdmissionModal, setShowReviewAdmissionModal] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [selectedAdmissionForReview, setSelectedAdmissionForReview] = useState<Admission | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [admissions, setAdmissions] = useState<Admission[]>([
    {
      id: '1',
      applicantName: 'Emily Johnson',
      gradeLevel: 'Grade 9',
      applicationDate: '2024-01-15',
      status: 'Under Review',
      documentsComplete: true,
      documents: [
        { id: '1', name: 'Birth Certificate.pdf', type: 'Birth Certificate', uploadedDate: '2024-01-15', uploadedBy: 'Parent', size: '245 KB', url: '#' },
        { id: '2', name: 'Previous School Transcript.pdf', type: 'Transcript', uploadedDate: '2024-01-15', uploadedBy: 'Parent', size: '180 KB', url: '#' },
        { id: '3', name: 'Medical Records.pdf', type: 'Medical', uploadedDate: '2024-01-16', uploadedBy: 'Parent', size: '320 KB', url: '#' },
      ],
      email: 'emily.j@email.com',
      phone: '555-0101',
      parentName: 'John Johnson',
    },
    {
      id: '2',
      applicantName: 'Michael Chen',
      gradeLevel: 'Grade 10',
      applicationDate: '2024-01-18',
      status: 'Accepted',
      documentsComplete: true,
      documents: [
        { id: '4', name: 'Birth Certificate.pdf', type: 'Birth Certificate', uploadedDate: '2024-01-18', uploadedBy: 'Parent', size: '250 KB', url: '#' },
        { id: '5', name: 'Transcript.pdf', type: 'Transcript', uploadedDate: '2024-01-18', uploadedBy: 'Parent', size: '195 KB', url: '#' },
      ],
      email: 'michael.c@email.com',
      phone: '555-0102',
      parentName: 'Lisa Chen',
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

  const [admissionFormData, setAdmissionFormData] = useState({
    applicantName: '',
    gradeLevel: '',
    email: '',
    phone: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    dateOfBirth: '',
    previousSchool: '',
    notes: '',
  });

  const handleFileUpload = (files: FileList | null, admissionId?: string) => {
    if (!files) return;
    const fileArray = Array.from(files);
    setUploadedFiles([...uploadedFiles, ...fileArray]);
    
    if (admissionId) {
      const newDocuments: Document[] = fileArray.map((file, index) => ({
        id: `doc-${Date.now()}-${index}`,
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        uploadedDate: new Date().toISOString().split('T')[0],
        uploadedBy: 'Admin',
        size: `${(file.size / 1024).toFixed(0)} KB`,
        url: '#',
      }));
      
      setAdmissions(admissions.map(adm => 
        adm.id === admissionId 
          ? { ...adm, documents: [...adm.documents, ...newDocuments], documentsComplete: true }
          : adm
      ));
    }
    
    alert(`${fileArray.length} file(s) uploaded successfully!`);
  };

  const handleBulkEnrollment = (file: File) => {
    // In real app, this would parse CSV/Excel and create enrollments
    alert(`Bulk enrollment file "${file.name}" uploaded. Processing ${file.name}...`);
    // Simulate processing
    setTimeout(() => {
      alert('Bulk enrollment completed! 25 students enrolled successfully.');
      setShowBulkUploadModal(false);
    }, 2000);
  };

  const handleNewAdmission = (e: React.FormEvent) => {
    e.preventDefault();
    const newAdmission: Admission = {
      id: `adm-${Date.now()}`,
      applicantName: admissionFormData.applicantName,
      gradeLevel: admissionFormData.gradeLevel,
      applicationDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      documentsComplete: uploadedFiles.length > 0,
      documents: uploadedFiles.map((file, index) => ({
        id: `doc-${Date.now()}-${index}`,
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        uploadedDate: new Date().toISOString().split('T')[0],
        uploadedBy: 'Admin',
        size: `${(file.size / 1024).toFixed(0)} KB`,
        url: '#',
      })),
      email: admissionFormData.email,
      phone: admissionFormData.phone,
      parentName: admissionFormData.parentName,
    };
    setAdmissions([newAdmission, ...admissions]);
    setAdmissionFormData({
      applicantName: '',
      gradeLevel: '',
      email: '',
      phone: '',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      dateOfBirth: '',
      previousSchool: '',
      notes: '',
    });
    setUploadedFiles([]);
    setShowNewAdmissionModal(false);
    alert('New admission application created successfully!');
  };

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
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowBulkUploadModal(true)}>Bulk Upload</Button>
          <Button onClick={() => setShowNewAdmissionModal(true)}>New Admission</Button>
        </div>
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
            <Button size="sm" variant="secondary" onClick={() => {
              const selected = admissions.filter(a => a.status === 'Under Review' || a.status === 'Accepted');
              if (selected.length > 0) {
                alert(`Processing ${selected.length} applications...`);
              } else {
                alert('No applications selected for batch processing.');
              }
            }}>Process Batch</Button>
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
                    <div className="flex items-center gap-2">
                      {admission.documentsComplete ? (
                        <span className="text-green-600" title={`${admission.documents.length} documents uploaded`}>
                          <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      ) : (
                        <span className="text-red-600" title="Documents incomplete">
                          <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                      )}
                      <button
                        onClick={() => {
                          setSelectedAdmission(admission);
                          setShowDocumentModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 text-xs"
                        title="View/Upload Documents"
                      >
                        ({admission.documents.length})
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(admission.status)}`}>
                      {admission.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setSelectedAdmissionForReview(admission);
                          setShowReviewAdmissionModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Review
                      </button>
                      {admission.status === 'Accepted' && (
                        <button 
                          onClick={() => {
                            const newEnrollment: Enrollment = {
                              id: `enr-${Date.now()}`,
                              studentName: admission.applicantName,
                              gradeLevel: admission.gradeLevel,
                              enrollmentDate: new Date().toISOString().split('T')[0],
                              classAssigned: `${admission.gradeLevel.replace('Grade ', '')}A`,
                              status: 'Enrolled',
                            };
                            setEnrollments([newEnrollment, ...enrollments]);
                            setAdmissions(admissions.filter(a => a.id !== admission.id));
                            alert(`${admission.applicantName} enrolled successfully!`);
                          }}
                          className="text-green-600 hover:text-green-900"
                        >
                          Enroll
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

      {/* Student Registration & Records */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Student Registration & Records</h2>
          <Button size="sm" variant="secondary" onClick={() => setShowBulkUploadModal(true)}>Bulk Registration</Button>
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
                    <button 
                      onClick={() => {
                        setSelectedEnrollment(enrollment);
                        setShowViewRecordsModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Records
                    </button>
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
                          <button 
                            onClick={() => {
                              setTransfers(transfers.map(t => 
                                t.id === transfer.id 
                                  ? { ...t, status: 'Approved' as const }
                                  : t
                              ));
                              alert(`Transfer from ${transfer.fromClass} to ${transfer.toClass} approved!`);
                            }}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => {
                              const reason = prompt('Enter rejection reason:');
                              if (reason) {
                                setTransfers(transfers.map(t => 
                                  t.id === transfer.id 
                                    ? { ...t, status: 'Rejected' as const }
                                    : t
                                ));
                                alert(`Transfer rejected: ${reason}`);
                              }
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => {
                          alert(`Transfer Details:\nStudent: ${transfer.studentName}\nFrom: ${transfer.fromClass}\nTo: ${transfer.toClass}\nReason: ${transfer.reason}\nStatus: ${transfer.status}`);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
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
          <Button variant="secondary" fullWidth onClick={() => {
            alert('Running placement optimization algorithm...');
            setTimeout(() => {
              alert('Placement optimization completed! 92% optimal placement rate achieved.');
            }, 2000);
          }}>Run Placement Optimization</Button>
        </div>
      </Card>

      {/* New Admission Modal */}
      {showNewAdmissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">New Admission Application</h2>
            </div>
            <form onSubmit={handleNewAdmission} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Applicant Name *</label>
                  <input
                    type="text"
                    value={admissionFormData.applicantName}
                    onChange={(e) => setAdmissionFormData({...admissionFormData, applicantName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level *</label>
                  <select
                    value={admissionFormData.gradeLevel}
                    onChange={(e) => setAdmissionFormData({...admissionFormData, gradeLevel: e.target.value})}
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    value={admissionFormData.dateOfBirth}
                    onChange={(e) => setAdmissionFormData({...admissionFormData, dateOfBirth: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Previous School</label>
                  <input
                    type="text"
                    value={admissionFormData.previousSchool}
                    onChange={(e) => setAdmissionFormData({...admissionFormData, previousSchool: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={admissionFormData.email}
                    onChange={(e) => setAdmissionFormData({...admissionFormData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={admissionFormData.phone}
                    onChange={(e) => setAdmissionFormData({...admissionFormData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parent/Guardian Name *</label>
                  <input
                    type="text"
                    value={admissionFormData.parentName}
                    onChange={(e) => setAdmissionFormData({...admissionFormData, parentName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parent Email</label>
                  <input
                    type="email"
                    value={admissionFormData.parentEmail}
                    onChange={(e) => setAdmissionFormData({...admissionFormData, parentEmail: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Required Documents *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="document-upload"
                  />
                  <label htmlFor="document-upload" className="cursor-pointer">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600">Click to upload documents</p>
                    <p className="text-xs text-gray-500 mt-1">Birth Certificate, Transcripts, Medical Records, etc.</p>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={admissionFormData.notes}
                  onChange={(e) => setAdmissionFormData({...admissionFormData, notes: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={3}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowNewAdmissionModal(false);
                    setAdmissionFormData({
                      applicantName: '',
                      gradeLevel: '',
                      email: '',
                      phone: '',
                      parentName: '',
                      parentEmail: '',
                      parentPhone: '',
                      dateOfBirth: '',
                      previousSchool: '',
                      notes: '',
                    });
                    setUploadedFiles([]);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Submit Application</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {showBulkUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Bulk Enrollment Upload</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload CSV/Excel File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleBulkEnrollment(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                    id="bulk-upload"
                  />
                  <label htmlFor="bulk-upload" className="cursor-pointer">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600">Click to upload CSV or Excel file</p>
                    <p className="text-xs text-gray-500 mt-1">Format: Name, Grade, Email, Phone, Parent Name</p>
                  </label>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Template Format:</strong> Download the template CSV file with required columns: Student Name, Grade Level, Date of Birth, Email, Phone, Parent Name, Parent Email, Previous School
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowBulkUploadModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    alert('Downloading enrollment template...');
                  }}
                  variant="secondary"
                  className="flex-1"
                >
                  Download Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Management Modal */}
      {showDocumentModal && selectedAdmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Documents - {selectedAdmission.applicantName}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Additional Documents</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e.target.files, selectedAdmission.id)}
                    className="hidden"
                    id="additional-docs"
                  />
                  <label htmlFor="additional-docs" className="cursor-pointer flex items-center gap-2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-600">Click to upload more documents</span>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Uploaded Documents ({selectedAdmission.documents.length})</h3>
                <div className="space-y-2">
                  {selectedAdmission.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <div className="font-medium text-gray-900">{doc.name}</div>
                          <div className="text-xs text-gray-500">{doc.type} • {doc.size} • Uploaded {doc.uploadedDate}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900 text-sm">View</button>
                        <button className="text-green-600 hover:text-green-900 text-sm">Download</button>
                        <button 
                          onClick={() => {
                            setAdmissions(admissions.map(adm => 
                              adm.id === selectedAdmission.id
                                ? { ...adm, documents: adm.documents.filter(d => d.id !== doc.id) }
                                : adm
                            ));
                            setSelectedAdmission({
                              ...selectedAdmission,
                              documents: selectedAdmission.documents.filter(d => d.id !== doc.id)
                            });
                          }}
                          className="text-red-600 hover:text-red-900 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDocumentModal(false);
                    setSelectedAdmission(null);
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

      {/* View Records Modal */}
      {showViewRecordsModal && selectedEnrollment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Student Records - {selectedEnrollment.studentName}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                  <p className="text-gray-900">{selectedEnrollment.studentName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
                  <p className="text-gray-900">{selectedEnrollment.gradeLevel}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class Assigned</label>
                  <p className="text-gray-900">{selectedEnrollment.classAssigned}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Date</label>
                  <p className="text-gray-900">{selectedEnrollment.enrollmentDate}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Enrollment Documents</h3>
                <div className="space-y-2">
                  {[
                    { name: 'Enrollment Form.pdf', date: selectedEnrollment.enrollmentDate, size: '125 KB' },
                    { name: 'Parent Consent Form.pdf', date: selectedEnrollment.enrollmentDate, size: '98 KB' },
                    { name: 'Medical Records.pdf', date: selectedEnrollment.enrollmentDate, size: '245 KB' },
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <div className="font-medium text-gray-900">{doc.name}</div>
                          <div className="text-xs text-gray-500">{doc.size} • {doc.date}</div>
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
                    setShowViewRecordsModal(false);
                    setSelectedEnrollment(null);
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

      {/* Review Admission Modal */}
      {showReviewAdmissionModal && selectedAdmissionForReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Review Admission - {selectedAdmissionForReview.applicantName}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Applicant Name</label>
                  <p className="text-gray-900">{selectedAdmissionForReview.applicantName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
                  <p className="text-gray-900">{selectedAdmissionForReview.gradeLevel}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Application Date</label>
                  <p className="text-gray-900">{selectedAdmissionForReview.applicationDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedAdmissionForReview.status)}`}>
                    {selectedAdmissionForReview.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{selectedAdmissionForReview.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <p className="text-gray-900">{selectedAdmissionForReview.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian</label>
                  <p className="text-gray-900">{selectedAdmissionForReview.parentName}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Documents ({selectedAdmissionForReview.documents.length})</label>
                <div className="space-y-2">
                  {selectedAdmissionForReview.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">{doc.name}</span>
                      <button className="text-blue-600 hover:text-blue-900 text-sm">View</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setAdmissions(admissions.map(a => 
                      a.id === selectedAdmissionForReview.id 
                        ? { ...a, status: 'Rejected' as const }
                        : a
                    ));
                    setShowReviewAdmissionModal(false);
                    alert('Admission application rejected.');
                  }}
                  className="flex-1"
                >
                  Reject
                </Button>
                <Button
                  onClick={() => {
                    setAdmissions(admissions.map(a => 
                      a.id === selectedAdmissionForReview.id 
                        ? { ...a, status: 'Under Review' as const }
                        : a
                    ));
                    setShowReviewAdmissionModal(false);
                    alert('Admission moved to review.');
                  }}
                  variant="secondary"
                  className="flex-1"
                >
                  Move to Review
                </Button>
                <Button
                  onClick={() => {
                    setAdmissions(admissions.map(a => 
                      a.id === selectedAdmissionForReview.id 
                        ? { ...a, status: 'Accepted' as const }
                        : a
                    ));
                    setShowReviewAdmissionModal(false);
                    alert('Admission application accepted!');
                  }}
                  className="flex-1"
                >
                  Accept
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}