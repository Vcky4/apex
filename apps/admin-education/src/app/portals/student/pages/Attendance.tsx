import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface AttendanceRecord {
  id: string;
  date: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused' | 'Tardy';
  checkInTime?: string;
  checkOutTime?: string;
  notes?: string;
}

interface AttendanceSummary {
  courseCode: string;
  courseName: string;
  totalClasses: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendanceRate: number;
}

export default function Attendance() {
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().slice(0, 7));
  const [selectedCourse, setSelectedCourse] = useState<string>('All');

  const attendanceRecords: AttendanceRecord[] = [
    {
      id: '1',
      date: '2024-03-01',
      courseCode: 'MATH101',
      courseName: 'Advanced Mathematics',
      instructor: 'Mr. Smith',
      status: 'Present',
      checkInTime: '08:05',
      checkOutTime: '09:30'
    },
    {
      id: '2',
      date: '2024-03-01',
      courseCode: 'ENG201',
      courseName: 'English Literature',
      instructor: 'Mrs. Johnson',
      status: 'Present',
      checkInTime: '09:18',
      checkOutTime: '10:45'
    },
    {
      id: '3',
      date: '2024-03-01',
      courseCode: 'PHYS301',
      courseName: 'Physics - Mechanics',
      instructor: 'Dr. Brown',
      status: 'Late',
      checkInTime: '10:35',
      checkOutTime: '12:05',
      notes: 'Arrived 5 minutes late'
    },
    {
      id: '4',
      date: '2024-03-01',
      courseCode: 'HIST202',
      courseName: 'World History',
      instructor: 'Mr. Davis',
      status: 'Present',
      checkInTime: '12:50',
      checkOutTime: '14:15'
    },
    {
      id: '5',
      date: '2024-03-04',
      courseCode: 'MATH101',
      courseName: 'Advanced Mathematics',
      instructor: 'Mr. Smith',
      status: 'Present',
      checkInTime: '08:02',
      checkOutTime: '09:30'
    },
    {
      id: '6',
      date: '2024-03-04',
      courseCode: 'ENG201',
      courseName: 'English Literature',
      instructor: 'Mrs. Johnson',
      status: 'Present',
      checkInTime: '09:15',
      checkOutTime: '10:45'
    },
    {
      id: '7',
      date: '2024-03-04',
      courseCode: 'PHYS301',
      courseName: 'Physics - Mechanics',
      instructor: 'Dr. Brown',
      status: 'Present',
      checkInTime: '10:30',
      checkOutTime: '12:00'
    },
    {
      id: '8',
      date: '2024-03-04',
      courseCode: 'HIST202',
      courseName: 'World History',
      instructor: 'Mr. Davis',
      status: 'Absent',
      notes: 'Medical appointment - excused'
    },
    {
      id: '9',
      date: '2024-03-05',
      courseCode: 'MATH101',
      courseName: 'Advanced Mathematics',
      instructor: 'Mr. Smith',
      status: 'Present',
      checkInTime: '08:00',
      checkOutTime: '09:30'
    },
    {
      id: '10',
      date: '2024-03-05',
      courseCode: 'ENG201',
      courseName: 'English Literature',
      instructor: 'Mrs. Johnson',
      status: 'Present',
      checkInTime: '09:15',
      checkOutTime: '10:45'
    },
    {
      id: '11',
      date: '2024-03-05',
      courseCode: 'PHYS301',
      courseName: 'Physics - Mechanics',
      instructor: 'Dr. Brown',
      status: 'Present',
      checkInTime: '10:30',
      checkOutTime: '12:00'
    },
    {
      id: '12',
      date: '2024-03-05',
      courseCode: 'HIST202',
      courseName: 'World History',
      instructor: 'Mr. Davis',
      status: 'Present',
      checkInTime: '12:45',
      checkOutTime: '14:15'
    },
    {
      id: '13',
      date: '2024-03-06',
      courseCode: 'MATH101',
      courseName: 'Advanced Mathematics',
      instructor: 'Mr. Smith',
      status: 'Tardy',
      checkInTime: '08:12',
      checkOutTime: '09:30',
      notes: 'Arrived 12 minutes late'
    },
    {
      id: '14',
      date: '2024-03-06',
      courseCode: 'ENG201',
      courseName: 'English Literature',
      instructor: 'Mrs. Johnson',
      status: 'Present',
      checkInTime: '09:15',
      checkOutTime: '10:45'
    },
    {
      id: '15',
      date: '2024-03-06',
      courseCode: 'PHYS301',
      courseName: 'Physics - Mechanics',
      instructor: 'Dr. Brown',
      status: 'Present',
      checkInTime: '10:30',
      checkOutTime: '12:00'
    },
    {
      id: '16',
      date: '2024-03-06',
      courseCode: 'HIST202',
      courseName: 'World History',
      instructor: 'Mr. Davis',
      status: 'Present',
      checkInTime: '12:45',
      checkOutTime: '14:15'
    },
    {
      id: '17',
      date: '2024-03-07',
      courseCode: 'MATH101',
      courseName: 'Advanced Mathematics',
      instructor: 'Mr. Smith',
      status: 'Present',
      checkInTime: '08:00',
      checkOutTime: '09:30'
    },
    {
      id: '18',
      date: '2024-03-07',
      courseCode: 'ENG201',
      courseName: 'English Literature',
      instructor: 'Mrs. Johnson',
      status: 'Excused',
      notes: 'Family emergency - excused'
    },
    {
      id: '19',
      date: '2024-03-07',
      courseCode: 'PHYS301',
      courseName: 'Physics - Mechanics',
      instructor: 'Dr. Brown',
      status: 'Present',
      checkInTime: '10:30',
      checkOutTime: '12:00'
    },
    {
      id: '20',
      date: '2024-03-07',
      courseCode: 'HIST202',
      courseName: 'World History',
      instructor: 'Mr. Davis',
      status: 'Present',
      checkInTime: '12:45',
      checkOutTime: '14:15'
    }
  ];

  const attendanceSummary: AttendanceSummary[] = [
    {
      courseCode: 'MATH101',
      courseName: 'Advanced Mathematics',
      totalClasses: 20,
      present: 18,
      absent: 0,
      late: 1,
      excused: 1,
      attendanceRate: 90
    },
    {
      courseCode: 'ENG201',
      courseName: 'English Literature',
      totalClasses: 18,
      present: 16,
      absent: 0,
      late: 0,
      excused: 2,
      attendanceRate: 88.9
    },
    {
      courseCode: 'PHYS301',
      courseName: 'Physics - Mechanics',
      totalClasses: 20,
      present: 19,
      absent: 0,
      late: 1,
      excused: 0,
      attendanceRate: 95
    },
    {
      courseCode: 'HIST202',
      courseName: 'World History',
      totalClasses: 18,
      present: 17,
      absent: 1,
      late: 0,
      excused: 0,
      attendanceRate: 94.4
    }
  ];

  const filteredRecords = attendanceRecords.filter(record => {
    if (selectedCourse !== 'All' && record.courseCode !== selectedCourse) return false;
    if (record.date.startsWith(selectedMonth)) return true;
    return false;
  });

  const overallAttendanceRate = attendanceSummary.reduce((sum, s) => sum + s.attendanceRate, 0) / attendanceSummary.length;
  const totalPresent = attendanceRecords.filter(r => r.status === 'Present').length;
  const totalAbsent = attendanceRecords.filter(r => r.status === 'Absent').length;
  const totalLate = attendanceRecords.filter(r => r.status === 'Late' || r.status === 'Tardy').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      case 'Late': return 'bg-yellow-100 text-yellow-800';
      case 'Tardy': return 'bg-orange-100 text-orange-800';
      case 'Excused': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      case 'Absent': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
      case 'Late': case 'Tardy': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      case 'Excused': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">My Attendance</h1>
          <p className="text-gray-600 mt-2">Track your class attendance and records</p>
        </div>
        <div className="flex gap-2">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>All</option>
            {attendanceSummary.map(summary => (
              <option key={summary.courseCode} value={summary.courseCode}>
                {summary.courseCode}
              </option>
            ))}
          </select>
        </div>
      </div>

      <DashboardGrid columns={4}>
        <StatCard
          title="Overall Attendance"
          value={`${overallAttendanceRate.toFixed(1)}%`}
          color="green"
          trend={{ value: 2.5, isPositive: true }}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title="Present"
          value={totalPresent.toString()}
          color="green"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title="Absent"
          value={totalAbsent.toString()}
          color="red"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
        />
        <StatCard
          title="Late/Tardy"
          value={totalLate.toString()}
          color="orange"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
      </DashboardGrid>

      {/* Course Attendance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {attendanceSummary.map((summary) => (
          <Card key={summary.courseCode}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-charcoal-gray">{summary.courseName}</h3>
                  <p className="text-sm text-gray-600">{summary.courseCode}</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    summary.attendanceRate >= 95 ? 'text-green-600' :
                    summary.attendanceRate >= 90 ? 'text-blue-600' :
                    summary.attendanceRate >= 85 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {summary.attendanceRate.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Attendance Rate</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Attendance Progress</span>
                  <span className="font-medium text-gray-700">
                    {summary.present + summary.excused}/{summary.totalClasses}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      summary.attendanceRate >= 95 ? 'bg-green-500' :
                      summary.attendanceRate >= 90 ? 'bg-blue-500' :
                      summary.attendanceRate >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${summary.attendanceRate}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-green-50 p-2 rounded">
                  <div className="text-lg font-bold text-green-700">{summary.present}</div>
                  <div className="text-xs text-green-600">Present</div>
                </div>
                <div className="bg-red-50 p-2 rounded">
                  <div className="text-lg font-bold text-red-700">{summary.absent}</div>
                  <div className="text-xs text-red-600">Absent</div>
                </div>
                <div className="bg-yellow-50 p-2 rounded">
                  <div className="text-lg font-bold text-yellow-700">{summary.late}</div>
                  <div className="text-xs text-yellow-600">Late</div>
                </div>
                <div className="bg-blue-50 p-2 rounded">
                  <div className="text-lg font-bold text-blue-700">{summary.excused}</div>
                  <div className="text-xs text-blue-600">Excused</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Attendance Records */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Attendance Records</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-light-gray">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Course</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Instructor</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Check-In</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Check-Out</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(record.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-charcoal-gray">{record.courseCode}</div>
                      <div className="text-xs text-gray-500">{record.courseName}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{record.instructor}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {getStatusIcon(record.status)}
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{record.checkInTime || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{record.checkOutTime || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{record.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredRecords.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No attendance records found for the selected period
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
