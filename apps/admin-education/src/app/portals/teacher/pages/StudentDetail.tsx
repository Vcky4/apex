import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from '@apex-providers/ui-components';

interface Grade {
  id: number;
  assignment: string;
  type: string;
  score: number;
  maxScore: number;
  date: string;
  status: string;
}

interface ClassEnrollment {
  id: number;
  classCode: string;
  className: string;
  currentGrade: number;
  attendance: number;
}

export default function StudentDetail() {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const [showAssignClassModal, setShowAssignClassModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');

  // Mock student data
  const student = {
    id: parseInt(studentId || '1'),
    studentId: 'STU001',
    name: 'Alex Johnson',
    email: 'alex.j@school.edu',
    grade: '10',
    gpa: 3.8,
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Springfield',
    parentName: 'John Johnson',
    parentEmail: 'john.j@email.com',
    parentPhone: '+1 (555) 123-4568',
  };

  const classes: ClassEnrollment[] = [
    { id: 1, classCode: 'MATH101', className: 'Math 101 - Grade 9', currentGrade: 92, attendance: 96 },
    { id: 2, classCode: 'ENG201', className: 'English Literature', currentGrade: 88, attendance: 98 },
    { id: 3, classCode: 'SCI301', className: 'Science', currentGrade: 85, attendance: 94 },
  ];

  const grades: Grade[] = [
    { id: 1, assignment: 'Math Quiz #5', type: 'Quiz', score: 92, maxScore: 100, date: '2025-03-10', status: 'Graded' },
    { id: 2, assignment: 'Math Homework #12', type: 'Homework', score: 88, maxScore: 100, date: '2025-03-08', status: 'Graded' },
    { id: 3, assignment: 'Math Test #3', type: 'Test', score: 95, maxScore: 100, date: '2025-03-05', status: 'Graded' },
    { id: 4, assignment: 'English Essay', type: 'Assignment', score: 90, maxScore: 100, date: '2025-03-12', status: 'Graded' },
  ];

  const availableClasses = [
    { code: 'MATH201', name: 'Algebra II - Grade 10' },
    { code: 'GEOM201', name: 'Geometry - Grade 10' },
    { code: 'CALC201', name: 'Pre-Calculus - Grade 11' },
    { code: 'PHYS301', name: 'Physics - Mechanics' },
  ];

  const handleAssignClass = () => {
    if (selectedClass) {
      // In real app, make API call to assign class
      alert(`Class ${selectedClass} assigned successfully!`);
      setShowAssignClassModal(false);
      setSelectedClass('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/teacher/students')}
            className="text-gray-600 hover:text-gray-900 mb-2 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Students</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
          <p className="text-gray-600 mt-2">Student ID: {student.studentId} • Grade {student.grade}</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={() => setShowAssignClassModal(true)} variant="primary">
            Assign Class
          </Button>
          <Button onClick={() => navigate(`/teacher/grading?student=${student.id}`)} variant="outline">
            Assign Grade
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-authority-purple text-white flex items-center justify-center font-bold text-2xl">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>
                  <p className="text-sm text-gray-600">{student.email}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Student ID</p>
                  <p className="text-base text-gray-900">{student.studentId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Grade Level</p>
                  <p className="text-base text-gray-900">Grade {student.grade}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">GPA</p>
                  <p className="text-base font-bold text-green-600">{student.gpa.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Phone</p>
                  <p className="text-base text-gray-900">{student.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Address</p>
                  <p className="text-base text-gray-900">{student.address}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-3">Parent/Guardian</h3>
                <div className="space-y-2">
                  <p className="text-base text-gray-900">{student.parentName}</p>
                  <p className="text-sm text-gray-600">{student.parentEmail}</p>
                  <p className="text-sm text-gray-600">{student.parentPhone}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Classes and Grades */}
        <div className="lg:col-span-2 space-y-6">
          {/* Enrolled Classes */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Enrolled Classes</h2>
              <div className="space-y-3">
                {classes.map((cls) => (
                  <div
                    key={cls.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate(`/teacher/classes/${cls.id}`)}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{cls.className}</h3>
                      <p className="text-sm text-gray-600">{cls.classCode}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Grade</p>
                        <p className="text-lg font-bold text-green-600">{cls.currentGrade}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Attendance</p>
                        <p className="text-lg font-bold text-blue-600">{cls.attendance}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Recent Grades */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Grades</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignment</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {grades.map((grade) => (
                      <tr key={grade.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{grade.assignment}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{grade.type}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                            (grade.score / grade.maxScore * 100) >= 90 ? 'bg-green-100 text-green-800' :
                            (grade.score / grade.maxScore * 100) >= 80 ? 'bg-blue-100 text-blue-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {grade.score}/{grade.maxScore}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{grade.date}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => navigate(`/teacher/assignments/view/${grade.id}`)}
                            className="text-blue-600 hover:text-blue-900 text-sm"
                          >
                            View Answer
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
      </div>

      {/* Assign Class Modal */}
      {showAssignClassModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Assign Class to {student.name}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Class *</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                >
                  <option value="">Choose a class...</option>
                  {availableClasses.map((cls) => (
                    <option key={cls.code} value={cls.code}>{cls.name} ({cls.code})</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAssignClassModal(false);
                  setSelectedClass('');
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignClass}
                className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Assign Class
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

