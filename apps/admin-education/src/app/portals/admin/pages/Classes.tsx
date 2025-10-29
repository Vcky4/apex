import { useState } from 'react';

export default function Classes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const classes = [
    { id: 1, code: 'MATH101', name: 'Algebra I', teacher: 'Mr. John Smith', grade: '9', students: 28, capacity: 30, schedule: 'Mon/Wed/Fri 8:00-9:00', room: '201', status: 'Active' },
    { id: 2, code: 'MATH201', name: 'Algebra II', teacher: 'Mr. John Smith', grade: '10', students: 32, capacity: 32, schedule: 'Mon/Wed/Fri 9:15-10:15', room: '201', status: 'Active' },
    { id: 3, code: 'ENG101', name: 'English Literature', teacher: 'Mrs. Emily Johnson', grade: '10', students: 30, capacity: 32, schedule: 'Tue/Thu 9:15-10:15', room: '105', status: 'Active' },
    { id: 4, code: 'PHY201', name: 'Physics', teacher: 'Dr. Robert Brown', grade: '11', students: 26, capacity: 28, schedule: 'Mon/Wed/Fri 10:30-11:30', room: 'Lab 3', status: 'Active' },
    { id: 5, code: 'HIST101', name: 'World History', teacher: 'Ms. Lisa Davis', grade: '9', students: 29, capacity: 30, schedule: 'Tue/Thu 8:00-9:00', room: '302', status: 'Active' },
    { id: 6, code: 'CALC301', name: 'Calculus', teacher: 'Mr. John Smith', grade: '12', students: 24, capacity: 25, schedule: 'Mon/Wed/Fri 2:15-3:15', room: '201', status: 'Active' },
    { id: 7, code: 'BIO201', name: 'Biology', teacher: 'Dr. Jennifer Taylor', grade: '10', students: 28, capacity: 30, schedule: 'Tue/Thu 10:30-11:30', room: 'Lab 2', status: 'Active' },
    { id: 8, code: 'PE101', name: 'Physical Education', teacher: 'Mr. David Wilson', grade: 'All', students: 120, capacity: 120, schedule: 'Daily 11:45-12:45', room: 'Gym', status: 'Active' },
  ];

  const stats = [
    { label: 'Total Classes', value: '156', icon: '📚' },
    { label: 'Active Courses', value: '42', icon: '✅' },
    { label: 'Avg Class Size', value: '28', icon: '👥' },
    { label: 'Utilization', value: '91%', icon: '📊' },
  ];

  const getCapacityColor = (students: number, capacity: number) => {
    const percent = (students / capacity) * 100;
    if (percent >= 95) return 'text-red-600';
    if (percent >= 85) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Classes & Courses</h1>
          <p className="text-gray-600 mt-2">Manage class schedules and course assignments</p>
        </div>
        <button className="px-6 py-3 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Class</span>
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
            placeholder="Search by class name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
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
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
          >
            <option value="all">All Subjects</option>
            <option value="math">Mathematics</option>
            <option value="english">English</option>
            <option value="science">Science</option>
            <option value="history">History</option>
            <option value="pe">Physical Education</option>
          </select>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{cls.name}</h3>
                <p className="text-sm text-gray-500">{cls.code}</p>
              </div>
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">{cls.status}</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-700">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {cls.teacher}
              </div>

              <div className="flex items-center text-sm text-gray-700">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Grade {cls.grade} • {cls.room}
              </div>

              <div className="flex items-center text-sm text-gray-700">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {cls.schedule}
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Enrollment</span>
                  <span className={`text-sm font-semibold ${getCapacityColor(cls.students, cls.capacity)}`}>
                    {cls.students}/{cls.capacity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-authority-purple h-2 rounded-full" 
                    style={{ width: `${(cls.students / cls.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-4 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
