import { Link } from 'react-router-dom';

export default function MyClasses() {
  const classes = [
    { id: 1, code: 'MATH101', name: 'Math 101 - Grade 9', students: 28, capacity: 30, room: 'Room 201', schedule: 'Mon/Wed/Fri 8:00-9:00', avgGrade: 86, attendance: 95 },
    { id: 2, code: 'MATH201', name: 'Algebra II - Grade 10', students: 32, capacity: 32, room: 'Room 201', schedule: 'Mon/Wed/Fri 9:15-10:15', avgGrade: 88, attendance: 97 },
    { id: 3, code: 'GEOM201', name: 'Geometry - Grade 10', students: 30, capacity: 32, room: 'Room 201', schedule: 'Tue/Thu 10:30-11:30', avgGrade: 85, attendance: 94 },
    { id: 4, code: 'CALC201', name: 'Pre-Calculus - Grade 11', students: 35, capacity: 35, room: 'Room 201', schedule: 'Mon/Wed 1:00-2:00', avgGrade: 89, attendance: 96 },
    { id: 5, code: 'CALC301', name: 'Calculus - Grade 12', students: 31, capacity: 32, room: 'Room 201', schedule: 'Mon/Wed/Fri 2:15-3:15', avgGrade: 91, attendance: 98 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>
        <p className="text-gray-600 mt-2">Overview of all your classes and their performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm font-medium text-gray-600">Total Classes</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{classes.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm font-medium text-gray-600">Total Students</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">156</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm font-medium text-gray-600">Avg Performance</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">88%</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">96%</p>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{cls.name}</h3>
                <p className="text-sm text-gray-500">{cls.code}</p>
              </div>
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-700">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {cls.schedule}
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {cls.room}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500">Students</p>
                  <p className="text-lg font-bold text-gray-900">{cls.students}/{cls.capacity}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Avg Grade</p>
                  <p className="text-lg font-bold text-green-600">{cls.avgGrade}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Attendance</p>
                  <p className="text-lg font-bold text-blue-600">{cls.attendance}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Assignments</p>
                  <p className="text-lg font-bold text-gray-900">12</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <Link 
                to={`/teacher/classes/${cls.id}`}
                className="flex-1 px-4 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm text-center"
              >
                View Class
              </Link>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Roster
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
