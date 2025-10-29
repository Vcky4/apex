import { useState } from 'react';

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const students = [
    { id: 1, studentId: 'STU001', name: 'Alex Johnson', grade: '10', gpa: 3.8, attendance: 96, status: 'Active', email: 'alex.j@school.edu', phone: '555-0101' },
    { id: 2, studentId: 'STU002', name: 'Emma Davis', grade: '10', gpa: 3.9, attendance: 98, status: 'Active', email: 'emma.d@school.edu', phone: '555-0102' },
    { id: 3, studentId: 'STU003', name: 'Michael Brown', grade: '11', gpa: 3.6, attendance: 92, status: 'Active', email: 'michael.b@school.edu', phone: '555-0103' },
    { id: 4, studentId: 'STU004', name: 'Sarah Wilson', grade: '11', gpa: 4.0, attendance: 99, status: 'Active', email: 'sarah.w@school.edu', phone: '555-0104' },
    { id: 5, studentId: 'STU005', name: 'James Martinez', grade: '9', gpa: 3.5, attendance: 94, status: 'Active', email: 'james.m@school.edu', phone: '555-0105' },
    { id: 6, studentId: 'STU006', name: 'Olivia Garcia', grade: '12', gpa: 3.7, attendance: 97, status: 'Active', email: 'olivia.g@school.edu', phone: '555-0106' },
    { id: 7, studentId: 'STU007', name: 'Daniel Lee', grade: '9', gpa: 3.4, attendance: 89, status: 'Active', email: 'daniel.l@school.edu', phone: '555-0107' },
    { id: 8, studentId: 'STU008', name: 'Sophia Anderson', grade: '12', gpa: 3.9, attendance: 98, status: 'Active', email: 'sophia.a@school.edu', phone: '555-0108' },
  ];

  const stats = [
    { label: 'Total Students', value: '1,245', trend: '+3.2%', color: 'blue' },
    { label: 'Active Students', value: '1,189', trend: '+2.1%', color: 'green' },
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600 mt-2">Manage all student records and information</p>
        </div>
        <button className="px-6 py-3 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2">
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
              {students.map((student) => (
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
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-gray-600 hover:text-gray-900">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
