import { useState } from 'react';

export default function Grades() {
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedTerm, setSelectedTerm] = useState('current');

  const gradeData = [
    { id: 1, studentId: 'STU001', student: 'Alex Johnson', class: 'Math 101', assignment: 'Midterm Exam', score: 92, maxScore: 100, percentage: 92, letterGrade: 'A-', date: '2025-03-01' },
    { id: 2, studentId: 'STU002', student: 'Emma Davis', class: 'English Lit', assignment: 'Poetry Analysis', score: 95, maxScore: 100, percentage: 95, letterGrade: 'A', date: '2025-02-28' },
    { id: 3, studentId: 'STU003', student: 'Michael Brown', class: 'Physics', assignment: 'Lab Report #3', score: 88, maxScore: 100, percentage: 88, letterGrade: 'B+', date: '2025-02-25' },
    { id: 4, studentId: 'STU004', student: 'Sarah Wilson', class: 'Calculus', assignment: 'Final Project', score: 98, maxScore: 100, percentage: 98, letterGrade: 'A+', date: '2025-03-05' },
    { id: 5, studentId: 'STU005', student: 'James Martinez', class: 'History', assignment: 'Essay', score: 85, maxScore: 100, percentage: 85, letterGrade: 'B', date: '2025-03-03' },
    { id: 6, studentId: 'STU006', student: 'Olivia Garcia', class: 'Biology', assignment: 'Lab Practical', score: 91, maxScore: 100, percentage: 91, letterGrade: 'A-', date: '2025-03-02' },
    { id: 7, studentId: 'STU007', student: 'Daniel Lee', class: 'Math 101', assignment: 'Quiz #5', score: 78, maxScore: 100, percentage: 78, letterGrade: 'C+', date: '2025-03-04' },
    { id: 8, studentId: 'STU008', student: 'Sophia Anderson', class: 'English Lit', assignment: 'Book Report', score: 94, maxScore: 100, percentage: 94, letterGrade: 'A', date: '2025-03-01' },
  ];

  const stats = [
    { label: 'Avg GPA', value: '3.7', trend: '+0.2', icon: '📈' },
    { label: 'Honor Roll', value: '247', percentage: '19.8%', icon: '🏆' },
    { label: 'Needs Attention', value: '43', percentage: '3.5%', icon: '⚠️' },
    { label: 'Graded This Week', value: '1,823', icon: '✅' },
  ];

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50';
    if (percentage >= 80) return 'text-blue-600 bg-blue-50';
    if (percentage >= 70) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Grades & Reports</h1>
          <p className="text-gray-600 mt-2">Monitor student performance and academic progress</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Generate Report</span>
          </button>
          <button className="px-6 py-3 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Enter Grade</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                {stat.trend && <p className="text-sm text-green-600 mt-1">{stat.trend}</p>}
                {stat.percentage && <p className="text-sm text-gray-500 mt-1">{stat.percentage}</p>}
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
          >
            <option value="all">All Classes</option>
            <option value="math">Mathematics</option>
            <option value="english">English</option>
            <option value="science">Science</option>
            <option value="history">History</option>
          </select>
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
          >
            <option value="current">Current Term</option>
            <option value="fall">Fall 2024</option>
            <option value="spring">Spring 2025</option>
            <option value="all">All Terms</option>
          </select>
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {gradeData.map((grade) => (
                <tr key={grade.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.student}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.class}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{grade.assignment}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.score}/{grade.maxScore}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-semibold ${getGradeColor(grade.percentage).split(' ')[0]}`}>
                      {grade.percentage}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getGradeColor(grade.percentage)}`}>
                      {grade.letterGrade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grade.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors">View</button>
                      <button className="text-gray-600 hover:text-gray-900 transition-colors">Edit</button>
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
