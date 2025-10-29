import { useState } from 'react';

export default function Teachers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const teachers = [
    { id: 1, teacherId: 'TCH001', name: 'Mr. John Smith', department: 'Mathematics', subject: 'Algebra, Calculus', students: 156, classes: 5, status: 'Active', email: 'j.smith@school.edu', phone: '555-1001' },
    { id: 2, teacherId: 'TCH002', name: 'Mrs. Emily Johnson', department: 'English', subject: 'Literature, Writing', students: 142, classes: 5, status: 'Active', email: 'e.johnson@school.edu', phone: '555-1002' },
    { id: 3, teacherId: 'TCH003', name: 'Dr. Robert Brown', department: 'Science', subject: 'Physics, Chemistry', students: 128, classes: 4, status: 'Active', email: 'r.brown@school.edu', phone: '555-1003' },
    { id: 4, teacherId: 'TCH004', name: 'Ms. Lisa Davis', department: 'History', subject: 'World History, US History', students: 134, classes: 4, status: 'Active', email: 'l.davis@school.edu', phone: '555-1004' },
    { id: 5, teacherId: 'TCH005', name: 'Mr. David Wilson', department: 'Physical Education', subject: 'PE, Health', students: 245, classes: 8, status: 'Active', email: 'd.wilson@school.edu', phone: '555-1005' },
    { id: 6, teacherId: 'TCH006', name: 'Mrs. Maria Garcia', department: 'Foreign Language', subject: 'Spanish, French', students: 98, classes: 3, status: 'Active', email: 'm.garcia@school.edu', phone: '555-1006' },
    { id: 7, teacherId: 'TCH007', name: 'Mr. Thomas Anderson', department: 'Arts', subject: 'Music, Band', students: 87, classes: 3, status: 'Active', email: 't.anderson@school.edu', phone: '555-1007' },
    { id: 8, teacherId: 'TCH008', name: 'Dr. Jennifer Taylor', department: 'Science', subject: 'Biology, Environmental', students: 119, classes: 4, status: 'Active', email: 'j.taylor@school.edu', phone: '555-1008' },
  ];

  const stats = [
    { label: 'Total Teachers', value: '87', icon: '👨‍🏫' },
    { label: 'Departments', value: '12', icon: '🏢' },
    { label: 'Avg Students/Teacher', value: '32', icon: '📊' },
    { label: 'Open Positions', value: '3', icon: '📢' },
  ];

  const getDepartmentColor = (dept: string) => {
    const colors: Record<string, string> = {
      'Mathematics': 'bg-blue-100 text-blue-800',
      'English': 'bg-purple-100 text-purple-800',
      'Science': 'bg-green-100 text-green-800',
      'History': 'bg-orange-100 text-orange-800',
      'Physical Education': 'bg-red-100 text-red-800',
      'Foreign Language': 'bg-pink-100 text-pink-800',
      'Arts': 'bg-yellow-100 text-yellow-800',
    };
    return colors[dept] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teachers</h1>
          <p className="text-gray-600 mt-2">Manage teaching staff and assignments</p>
        </div>
        <button className="px-6 py-3 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Teacher</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="search"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
          />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
          >
            <option value="all">All Departments</option>
            <option value="math">Mathematics</option>
            <option value="english">English</option>
            <option value="science">Science</option>
            <option value="history">History</option>
            <option value="pe">Physical Education</option>
            <option value="language">Foreign Language</option>
            <option value="arts">Arts</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="on-leave">On Leave</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject(s)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{teacher.teacherId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-authority-purple text-white flex items-center justify-center font-semibold">
                        {teacher.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                        <div className="text-sm text-gray-500">{teacher.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs rounded-full ${getDepartmentColor(teacher.department)}`}>
                      {teacher.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{teacher.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{teacher.students}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{teacher.classes}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">{teacher.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors">View</button>
                      <button className="text-gray-600 hover:text-gray-900 transition-colors">Edit</button>
                      <button className="text-authority-purple hover:text-opacity-80 transition-colors">Schedule</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{' '}
          <span className="font-medium">87</span> results
        </p>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-4 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">
            1
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            2
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            3
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
