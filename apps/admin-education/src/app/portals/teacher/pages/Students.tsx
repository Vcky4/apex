import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Students() {
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    { id: 1, studentId: 'STU001', name: 'Alex Johnson', grade: '10', class: 'Math 101', gpa: 3.8, currentGrade: 92, attendance: 96, email: 'alex.j@school.edu' },
    { id: 2, studentId: 'STU002', name: 'Emma Davis', grade: '10', class: 'Algebra II', gpa: 3.9, currentGrade: 88, attendance: 98, email: 'emma.d@school.edu' },
    { id: 3, studentId: 'STU003', name: 'Michael Brown', grade: '10', class: 'Geometry', gpa: 3.6, currentGrade: 85, attendance: 92, email: 'michael.b@school.edu' },
    { id: 4, studentId: 'STU004', name: 'Sarah Wilson', grade: '11', class: 'Pre-Calculus', gpa: 4.0, currentGrade: 95, attendance: 99, email: 'sarah.w@school.edu' },
    { id: 5, studentId: 'STU005', name: 'James Martinez', grade: '9', class: 'Math 101', gpa: 3.5, currentGrade: 78, attendance: 94, email: 'james.m@school.edu' },
    { id: 6, studentId: 'STU006', name: 'Olivia Garcia', grade: '12', class: 'Calculus', gpa: 3.7, currentGrade: 91, attendance: 97, email: 'olivia.g@school.edu' },
  ];

  const filteredStudents = students.filter(student => {
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    const matchesSearch = searchTerm === '' || 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Students</h1>
        <p className="text-gray-600 mt-2">View and manage students in your classes</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="search"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
          />
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
          >
            <option value="all">All Classes</option>
            <option value="Math 101">Math 101</option>
            <option value="Algebra II">Algebra II</option>
            <option value="Geometry">Geometry</option>
            <option value="Pre-Calculus">Pre-Calculus</option>
            <option value="Calculus">Calculus</option>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GPA</th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      student.currentGrade >= 90 ? 'bg-green-100 text-green-800' :
                      student.currentGrade >= 80 ? 'bg-blue-100 text-blue-800' :
                      student.currentGrade >= 70 ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {student.currentGrade}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{student.attendance}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{student.gpa.toFixed(1)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/teacher/students/${student.id}`} className="text-blue-600 hover:text-blue-900 transition-colors">View Details</Link>
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
