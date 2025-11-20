import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from '@apex-providers/ui-components';

interface Student {
  id: number;
  studentId: string;
  name: string;
  email: string;
  currentGrade: number;
  attendance: number;
  assignmentsCompleted: number;
  assignmentsTotal: number;
}

export default function ClassDetail() {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Mock class data - in real app, fetch by classId
  const classData = {
    id: classId || '1',
    code: 'MATH101',
    name: 'Math 101 - Grade 9',
    room: 'Room 201',
    schedule: 'Mon/Wed/Fri 8:00-9:00',
    students: 28,
    capacity: 30,
    avgGrade: 86,
    attendance: 95,
  };

  const students: Student[] = [
    { id: 1, studentId: 'STU001', name: 'Alex Johnson', email: 'alex.j@school.edu', currentGrade: 92, attendance: 96, assignmentsCompleted: 10, assignmentsTotal: 12 },
    { id: 2, studentId: 'STU002', name: 'Emma Davis', email: 'emma.d@school.edu', currentGrade: 88, attendance: 98, assignmentsCompleted: 11, assignmentsTotal: 12 },
    { id: 3, studentId: 'STU003', name: 'Michael Brown', email: 'michael.b@school.edu', currentGrade: 85, attendance: 92, assignmentsCompleted: 9, assignmentsTotal: 12 },
    { id: 4, studentId: 'STU004', name: 'Sarah Wilson', email: 'sarah.w@school.edu', currentGrade: 95, attendance: 99, assignmentsCompleted: 12, assignmentsTotal: 12 },
    { id: 5, studentId: 'STU005', name: 'James Martinez', email: 'james.m@school.edu', currentGrade: 78, attendance: 94, assignmentsCompleted: 8, assignmentsTotal: 12 },
    { id: 6, studentId: 'STU006', name: 'Olivia Garcia', email: 'olivia.g@school.edu', currentGrade: 91, attendance: 97, assignmentsCompleted: 11, assignmentsTotal: 12 },
  ];

  const handleViewStudent = (student: Student) => {
    navigate(`/teacher/students/${student.id}`);
  };

  const handleAssignGrades = () => {
    navigate(`/teacher/grading?class=${classData.code}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/teacher/classes')}
            className="text-gray-600 hover:text-gray-900 mb-2 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Classes</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{classData.name}</h1>
          <p className="text-gray-600 mt-2">{classData.code} • {classData.room} • {classData.schedule}</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleAssignGrades} variant="primary">
            Assign Grades
          </Button>
          <Button onClick={() => navigate(`/teacher/assignments?class=${classData.code}`)} variant="outline">
            Create Assignment
          </Button>
        </div>
      </div>

      {/* Class Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-600">Total Students</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{classData.students}/{classData.capacity}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-600">Average Grade</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{classData.avgGrade}%</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{classData.attendance}%</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-600">Active Assignments</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">12</p>
          </div>
        </Card>
      </div>

      {/* Students List */}
      <Card>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Students ({students.length})</h2>
            <input
              type="search"
              placeholder="Search students..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignments</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.studentId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </td>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.assignmentsCompleted}/{student.assignmentsTotal}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewStudent(student)}
                        className="text-blue-600 hover:text-blue-900 transition-colors mr-3"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => navigate(`/teacher/grading?student=${student.id}&class=${classData.code}`)}
                        className="text-authority-purple hover:text-opacity-80 transition-colors"
                      >
                        Assign Grade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}

