import { useState } from 'react';

export default function Attendance() {
  const [selectedClass, setSelectedClass] = useState('Math 101');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const students = [
    { id: 1, studentId: 'STU001', name: 'Alex Johnson', status: 'Present' },
    { id: 2, studentId: 'STU002', name: 'Emma Davis', status: 'Present' },
    { id: 3, studentId: 'STU003', name: 'Michael Brown', status: 'Present' },
    { id: 4, studentId: 'STU005', name: 'James Martinez', status: 'Absent' },
    { id: 5, studentId: 'STU007', name: 'Daniel Lee', status: 'Late' },
  ];

  const [attendance, setAttendance] = useState<Record<number, string>>(() => {
    const initial: Record<number, string> = {};
    students.forEach(s => initial[s.id] = s.status);
    return initial;
  });

  const saveAttendance = () => {
    alert('Attendance saved successfully!');
  };

  const presentCount = Object.values(attendance).filter(s => s === 'Present').length;
  const absentCount = Object.values(attendance).filter(s => s === 'Absent').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Take Attendance</h1>
        <p className="text-gray-600 mt-2">Mark attendance for your classes</p>
      </div>

      {/* Class Selector */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple">
              <option value="Math 101">Math 101</option>
              <option value="Algebra II">Algebra II</option>
              <option value="Geometry">Geometry</option>
              <option value="Pre-Calculus">Pre-Calculus</option>
              <option value="Calculus">Calculus</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-6 text-sm">
          <span className="text-gray-600">Present: <span className="font-bold text-green-600">{presentCount}</span></span>
          <span className="text-gray-600">Absent: <span className="font-bold text-red-600">{absentCount}</span></span>
          <span className="text-gray-600">Total: <span className="font-bold">{students.length}</span></span>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
        {students.map((student) => (
          <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-authority-purple text-white flex items-center justify-center font-semibold">
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-gray-900">{student.name}</p>
                <p className="text-sm text-gray-500">{student.studentId}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setAttendance({...attendance, [student.id]: 'Present'})}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  attendance[student.id] === 'Present' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Present
              </button>
              <button
                onClick={() => setAttendance({...attendance, [student.id]: 'Absent'})}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  attendance[student.id] === 'Absent' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Absent
              </button>
              <button
                onClick={() => setAttendance({...attendance, [student.id]: 'Late'})}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  attendance[student.id] === 'Late' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Late
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={saveAttendance} className="px-8 py-3 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">
          Save Attendance
        </button>
      </div>
    </div>
  );
}
