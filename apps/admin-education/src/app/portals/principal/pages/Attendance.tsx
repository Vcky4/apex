import { useState, useMemo } from 'react';

interface AttendanceRecord {
  id: number;
  studentId: string;
  name: string;
  grade: string;
  class: string;
  status: string;
  time: string;
  notes: string;
  date: string;
}

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [showMarkModal, setShowMarkModal] = useState(false);
  const [showTakeAttendanceModal, setShowTakeAttendanceModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [bulkAttendanceGrade, setBulkAttendanceGrade] = useState('9');
  const [bulkAttendanceClass, setBulkAttendanceClass] = useState('');
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([
    { id: 1, studentId: 'STU001', name: 'Alex Johnson', grade: '10', class: 'Math 101', status: 'Present', time: '8:05 AM', notes: '', date: new Date().toISOString().split('T')[0] },
    { id: 2, studentId: 'STU002', name: 'Emma Davis', grade: '10', class: 'Math 101', status: 'Present', time: '8:02 AM', notes: '', date: new Date().toISOString().split('T')[0] },
    { id: 3, studentId: 'STU003', name: 'Michael Brown', grade: '11', class: 'Physics', status: 'Late', time: '10:45 AM', notes: 'Arrived 15 min late', date: new Date().toISOString().split('T')[0] },
    { id: 4, studentId: 'STU004', name: 'Sarah Wilson', grade: '11', class: 'Physics', status: 'Present', time: '10:28 AM', notes: '', date: new Date().toISOString().split('T')[0] },
    { id: 5, studentId: 'STU005', name: 'James Martinez', grade: '9', class: 'Algebra I', status: 'Absent', time: '-', notes: 'Parent called - sick', date: new Date().toISOString().split('T')[0] },
    { id: 6, studentId: 'STU006', name: 'Olivia Garcia', grade: '12', class: 'Calculus', status: 'Present', time: '2:16 PM', notes: '', date: new Date().toISOString().split('T')[0] },
    { id: 7, studentId: 'STU007', name: 'Daniel Lee', grade: '9', class: 'Algebra I', status: 'Present', time: '8:00 AM', notes: '', date: new Date().toISOString().split('T')[0] },
    { id: 8, studentId: 'STU008', name: 'Sophia Anderson', grade: '12', class: 'Calculus', status: 'Excused', time: '-', notes: 'School event', date: new Date().toISOString().split('T')[0] },
  ]);

  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');

  // Students for bulk attendance (would come from API in real app)
  const studentsForClass = [
    { id: 1, studentId: 'STU001', name: 'Alex Johnson', grade: '10' },
    { id: 2, studentId: 'STU002', name: 'Emma Davis', grade: '10' },
    { id: 3, studentId: 'STU003', name: 'Michael Brown', grade: '11' },
    { id: 4, studentId: 'STU004', name: 'Sarah Wilson', grade: '11' },
    { id: 5, studentId: 'STU005', name: 'James Martinez', grade: '9' },
  ];

  const [bulkAttendanceStates, setBulkAttendanceStates] = useState<Record<number, string>>({});

  const filteredAttendance = useMemo(() => {
    return attendanceData.filter(record => {
      const matchesGrade = selectedGrade === 'all' || record.grade === selectedGrade;
      const matchesClass = selectedClass === 'all' || record.class.toLowerCase().includes(selectedClass.toLowerCase());
      const matchesDate = record.date === selectedDate;
      return matchesGrade && matchesClass && matchesDate;
    });
  }, [attendanceData, selectedGrade, selectedClass, selectedDate]);

  const stats = [
    { label: 'Present Today', value: attendanceData.filter(a => a.status === 'Present').length.toString(), percentage: '95.5%' },
    { label: 'Absent', value: attendanceData.filter(a => a.status === 'Absent').length.toString(), percentage: '2.6%' },
    { label: 'Late', value: attendanceData.filter(a => a.status === 'Late').length.toString(), percentage: '1.4%' },
    { label: 'Excused', value: attendanceData.filter(a => a.status === 'Excused').length.toString(), percentage: '0.5%' },
  ];

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      'Present': 'bg-green-100 text-green-800',
      'Absent': 'bg-red-100 text-red-800',
      'Late': 'bg-orange-100 text-orange-800',
      'Excused': 'bg-blue-100 text-blue-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const handleEdit = (record: AttendanceRecord) => {
    setSelectedRecord(record);
    setEditStatus(record.status);
    setEditNotes(record.notes);
    setShowMarkModal(true);
  };

  const saveEdit = () => {
    if (selectedRecord) {
      setAttendanceData(attendanceData.map(r => 
        r.id === selectedRecord.id 
          ? { ...r, status: editStatus, notes: editNotes, time: editStatus === 'Present' || editStatus === 'Late' ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '-' }
          : r
      ));
      setShowMarkModal(false);
    }
  };

  const handleExport = () => {
    // Convert filtered attendance to CSV
    const headers = ['Student ID', 'Name', 'Grade', 'Class', 'Status', 'Time', 'Notes', 'Date'];
    const csvData = filteredAttendance.map(record => [
      record.studentId,
      record.name,
      record.grade,
      record.class,
      record.status,
      record.time,
      record.notes,
      record.date
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${selectedDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleTakeAttendance = () => {
    setBulkAttendanceGrade('9');
    setBulkAttendanceClass('Math 101');
    // Initialize all students as present by default
    const initialStates: Record<number, string> = {};
    studentsForClass.forEach(student => {
      initialStates[student.id] = 'Present';
    });
    setBulkAttendanceStates(initialStates);
    setShowTakeAttendanceModal(true);
  };

  const saveBulkAttendance = () => {
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const newRecords: AttendanceRecord[] = studentsForClass.map(student => ({
      id: attendanceData.length + student.id,
      studentId: student.studentId,
      name: student.name,
      grade: student.grade,
      class: bulkAttendanceClass,
      status: bulkAttendanceStates[student.id] || 'Present',
      time: bulkAttendanceStates[student.id] === 'Absent' || bulkAttendanceStates[student.id] === 'Excused' ? '-' : currentTime,
      notes: '',
      date: selectedDate,
    }));
    
    setAttendanceData([...attendanceData, ...newRecords]);
    setShowTakeAttendanceModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-600 mt-2">Track and manage student attendance</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleExport}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Export</span>
          </button>
          <button 
            onClick={handleTakeAttendance}
            className="px-6 py-3 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span>Take Attendance</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <div className="flex items-baseline space-x-2 mt-2">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-lg font-semibold text-gray-500">{stat.percentage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
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
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
          >
            <option value="all">All Classes</option>
            <option value="math101">Math 101</option>
            <option value="physics">Physics</option>
            <option value="calculus">Calculus</option>
          </select>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendance.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.studentId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Grade {record.grade}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs rounded-full ${getStatusBadge(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.time}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{record.notes}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleEdit(record)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Take Attendance Modal */}
      {showTakeAttendanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Take Attendance</h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Grade</label>
                  <select
                    value={bulkAttendanceGrade}
                    onChange={(e) => setBulkAttendanceGrade(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  >
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
                  <select
                    value={bulkAttendanceClass}
                    onChange={(e) => setBulkAttendanceClass(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  >
                    <option value="Math 101">Math 101</option>
                    <option value="English Lit">English Literature</option>
                    <option value="Physics">Physics</option>
                    <option value="History">World History</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Grade {bulkAttendanceGrade}</span> • <span className="font-semibold">{bulkAttendanceClass}</span> • {studentsForClass.length} students enrolled
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {studentsForClass.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-authority-purple text-white flex items-center justify-center font-semibold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.studentId} • Grade {student.grade}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setBulkAttendanceStates({...bulkAttendanceStates, [student.id]: 'Present'})}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          bulkAttendanceStates[student.id] === 'Present'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => setBulkAttendanceStates({...bulkAttendanceStates, [student.id]: 'Absent'})}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          bulkAttendanceStates[student.id] === 'Absent'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Absent
                      </button>
                      <button
                        onClick={() => setBulkAttendanceStates({...bulkAttendanceStates, [student.id]: 'Late'})}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          bulkAttendanceStates[student.id] === 'Late'
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Late
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-between">
              <button 
                onClick={() => setShowTakeAttendanceModal(false)} 
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveBulkAttendance} 
                className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Save Attendance ({studentsForClass.length} students)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Attendance Modal */}
      {showMarkModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Mark Attendance</h2>
              <p className="text-sm text-gray-600 mt-1">{selectedRecord.name} - {selectedRecord.class}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                  <option value="Excused">Excused</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={3}
                  placeholder="Add notes (optional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button onClick={() => setShowMarkModal(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={saveEdit} className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
