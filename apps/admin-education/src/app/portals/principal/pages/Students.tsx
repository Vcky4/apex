import { useState, useMemo } from 'react';

interface Student {
  id: number;
  studentId: string;
  name: string;
  grade: string;
  gpa: number;
  attendance: number;
  status: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
}

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([
    { id: 1, studentId: 'STU001', name: 'Alex Johnson', grade: '10', gpa: 3.8, attendance: 96, status: 'Active', email: 'alex.j@school.edu', phone: '555-0101', dateOfBirth: '2009-05-15', parentName: 'Robert Johnson', parentEmail: 'robert.j@email.com', parentPhone: '555-0201' },
    { id: 2, studentId: 'STU002', name: 'Emma Davis', grade: '10', gpa: 3.9, attendance: 98, status: 'Active', email: 'emma.d@school.edu', phone: '555-0102', dateOfBirth: '2009-08-22', parentName: 'Linda Davis', parentEmail: 'linda.d@email.com', parentPhone: '555-0202' },
    { id: 3, studentId: 'STU003', name: 'Michael Brown', grade: '11', gpa: 3.6, attendance: 92, status: 'Active', email: 'michael.b@school.edu', phone: '555-0103', dateOfBirth: '2008-03-10', parentName: 'Sarah Brown', parentEmail: 'sarah.b@email.com', parentPhone: '555-0203' },
    { id: 4, studentId: 'STU004', name: 'Sarah Wilson', grade: '11', gpa: 4.0, attendance: 99, status: 'Active', email: 'sarah.w@school.edu', phone: '555-0104', dateOfBirth: '2008-11-30', parentName: 'John Wilson', parentEmail: 'john.w@email.com', parentPhone: '555-0204' },
    { id: 5, studentId: 'STU005', name: 'James Martinez', grade: '9', gpa: 3.5, attendance: 94, status: 'Active', email: 'james.m@school.edu', phone: '555-0105', dateOfBirth: '2010-01-18', parentName: 'Maria Martinez', parentEmail: 'maria.m@email.com', parentPhone: '555-0205' },
    { id: 6, studentId: 'STU006', name: 'Olivia Garcia', grade: '12', gpa: 3.7, attendance: 97, status: 'Active', email: 'olivia.g@school.edu', phone: '555-0106', dateOfBirth: '2007-07-25', parentName: 'Carlos Garcia', parentEmail: 'carlos.g@email.com', parentPhone: '555-0206' },
    { id: 7, studentId: 'STU007', name: 'Daniel Lee', grade: '9', gpa: 3.4, attendance: 89, status: 'Active', email: 'daniel.l@school.edu', phone: '555-0107', dateOfBirth: '2010-04-12', parentName: 'Wei Lee', parentEmail: 'wei.l@email.com', parentPhone: '555-0207' },
    { id: 8, studentId: 'STU008', name: 'Sophia Anderson', grade: '12', gpa: 3.9, attendance: 98, status: 'Active', email: 'sophia.a@school.edu', phone: '555-0108', dateOfBirth: '2007-09-05', parentName: 'Anna Anderson', parentEmail: 'anna.a@email.com', parentPhone: '555-0208' },
  ]);

  // Form state for add/edit
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    grade: '9',
    email: '',
    phone: '',
    dateOfBirth: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    status: 'Active',
  });

  // Filtered students based on search and filters
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = searchTerm === '' || 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
      const matchesStatus = selectedStatus === 'all' || student.status.toLowerCase() === selectedStatus.toLowerCase();
      
      return matchesSearch && matchesGrade && matchesStatus;
    });
  }, [students, searchTerm, selectedGrade, selectedStatus]);

  const stats = [
    { label: 'Total Students', value: students.length.toString(), trend: '+3.2%', color: 'blue' },
    { label: 'Active Students', value: students.filter(s => s.status === 'Active').length.toString(), trend: '+2.1%', color: 'green' },
    { label: 'Avg Attendance', value: '94.5%', trend: '+1.5%', color: 'purple' },
    { label: 'Avg GPA', value: '3.7', trend: '+0.2', color: 'orange' },
  ];

  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.8) return 'text-green-600';
    if (gpa >= 3.5) return 'text-blue-600';
    if (gpa >= 3.0) return 'text-orange-600';
    return 'text-red-600';
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 95) return 'text-green-600';
    if (attendance >= 90) return 'text-blue-600';
    if (attendance >= 85) return 'text-orange-600';
    return 'text-red-600';
  };

  // CRUD Functions
  const handleAdd = () => {
    setFormData({
      studentId: `STU${String(students.length + 1).padStart(3, '0')}`,
      name: '',
      grade: '9',
      email: '',
      phone: '',
      dateOfBirth: '',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      status: 'Active',
    });
    setShowAddModal(true);
  };

  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setFormData({
      studentId: student.studentId,
      name: student.name,
      grade: student.grade,
      email: student.email,
      phone: student.phone,
      dateOfBirth: student.dateOfBirth || '',
      parentName: student.parentName || '',
      parentEmail: student.parentEmail || '',
      parentPhone: student.parentPhone || '',
      status: student.status,
    });
    setShowEditModal(true);
  };

  const handleDelete = (student: Student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const saveAdd = () => {
    const newStudent: Student = {
      id: students.length + 1,
      studentId: formData.studentId,
      name: formData.name,
      grade: formData.grade,
      gpa: 3.5, // Default GPA
      attendance: 95, // Default attendance
      status: formData.status,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      parentName: formData.parentName,
      parentEmail: formData.parentEmail,
      parentPhone: formData.parentPhone,
    };
    setStudents([...students, newStudent]);
    setShowAddModal(false);
  };

  const saveEdit = () => {
    if (selectedStudent) {
      setStudents(students.map(s => 
        s.id === selectedStudent.id 
          ? { ...s, ...formData }
          : s
      ));
      setShowEditModal(false);
    }
  };

  const confirmDelete = () => {
    if (selectedStudent) {
      setStudents(students.filter(s => s.id !== selectedStudent.id));
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600 mt-2">Manage all student records and information</p>
        </div>
        <button 
          onClick={handleAdd}
          className="px-6 py-3 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Student</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-sm text-green-600 mt-2">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="search"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
          />
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
          >
            <option value="all">All Grades</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="graduated">Graduated</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GPA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.studentId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-authority-purple text-white flex items-center justify-center font-semibold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Grade {student.grade}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-semibold ${getGpaColor(student.gpa)}`}>{student.gpa.toFixed(1)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-semibold ${getAttendanceColor(student.attendance)}`}>{student.attendance}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">{student.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleView(student)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleEdit(student)}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(student)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add New Student</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                  <input
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grade *</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  >
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parent/Guardian Name</label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parent Email</label>
                  <input
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => setFormData({...formData, parentEmail: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parent Phone</label>
                  <input
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Graduated">Graduated</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveAdd}
                className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Student Modal */}
      {showViewModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Student Details</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-authority-purple text-white flex items-center justify-center text-3xl font-bold">
                  {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedStudent.name}</h3>
                  <p className="text-gray-600">{selectedStudent.studentId}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">Grade</p>
                  <p className="text-lg font-semibold text-gray-900">Grade {selectedStudent.grade}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">GPA</p>
                  <p className={`text-lg font-semibold ${getGpaColor(selectedStudent.gpa)}`}>{selectedStudent.gpa.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Attendance</p>
                  <p className={`text-lg font-semibold ${getAttendanceColor(selectedStudent.attendance)}`}>{selectedStudent.attendance}%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedStudent.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900">{selectedStudent.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-gray-900">{selectedStudent.phone}</p>
                </div>
                {selectedStudent.dateOfBirth && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                    <p className="text-gray-900">{selectedStudent.dateOfBirth}</p>
                  </div>
                )}
                {selectedStudent.parentName && (
                  <>
                    <div className="col-span-2 pt-4 border-t border-gray-200">
                      <p className="text-lg font-semibold text-gray-900 mb-4">Parent/Guardian Information</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Parent Name</p>
                      <p className="text-gray-900">{selectedStudent.parentName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Parent Email</p>
                      <p className="text-gray-900">{selectedStudent.parentEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Parent Phone</p>
                      <p className="text-gray-900">{selectedStudent.parentPhone}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Edit Student</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                  <input
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple bg-gray-50"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grade *</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  >
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parent Name</label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parent Email</label>
                  <input
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => setFormData({...formData, parentEmail: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parent Phone</label>
                  <input
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Graduated">Graduated</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Student</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <span className="font-semibold">{selectedStudent.name}</span>? This action cannot be undone.
              </p>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
