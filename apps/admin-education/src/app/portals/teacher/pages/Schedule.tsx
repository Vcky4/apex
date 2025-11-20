import { useState } from 'react';
import { Card, Button } from '@apex-providers/ui-components';

interface ClassSchedule {
  id: number;
  classCode: string;
  className: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string;
  endTime: string;
  room: string;
  students: number;
}

export default function Schedule() {
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [formData, setFormData] = useState({
    classCode: '',
    className: '',
    startTime: '',
    endTime: '',
    room: '',
  });

  const [schedules, setSchedules] = useState<ClassSchedule[]>([
    { id: 1, classCode: 'MATH101', className: 'Math 101 - Grade 9', day: 'Monday', startTime: '08:00', endTime: '09:00', room: 'Room 201', students: 28 },
    { id: 2, classCode: 'MATH101', className: 'Math 101 - Grade 9', day: 'Wednesday', startTime: '08:00', endTime: '09:00', room: 'Room 201', students: 28 },
    { id: 3, classCode: 'MATH101', className: 'Math 101 - Grade 9', day: 'Friday', startTime: '08:00', endTime: '09:00', room: 'Room 201', students: 28 },
    { id: 4, classCode: 'MATH201', className: 'Algebra II - Grade 10', day: 'Monday', startTime: '09:15', endTime: '10:15', room: 'Room 201', students: 32 },
    { id: 5, classCode: 'MATH201', className: 'Algebra II - Grade 10', day: 'Wednesday', startTime: '09:15', endTime: '10:15', room: 'Room 201', students: 32 },
    { id: 6, classCode: 'MATH201', className: 'Algebra II - Grade 10', day: 'Friday', startTime: '09:15', endTime: '10:15', room: 'Room 201', students: 32 },
    { id: 7, classCode: 'GEOM201', className: 'Geometry - Grade 10', day: 'Tuesday', startTime: '10:30', endTime: '11:30', room: 'Room 201', students: 30 },
    { id: 8, classCode: 'GEOM201', className: 'Geometry - Grade 10', day: 'Thursday', startTime: '10:30', endTime: '11:30', room: 'Room 201', students: 30 },
    { id: 9, classCode: 'CALC201', className: 'Pre-Calculus - Grade 11', day: 'Monday', startTime: '13:00', endTime: '14:00', room: 'Room 201', students: 35 },
    { id: 10, classCode: 'CALC201', className: 'Pre-Calculus - Grade 11', day: 'Wednesday', startTime: '13:00', endTime: '14:00', room: 'Room 201', students: 35 },
    { id: 11, classCode: 'CALC301', className: 'Calculus - Grade 12', day: 'Monday', startTime: '14:15', endTime: '15:15', room: 'Room 201', students: 31 },
    { id: 12, classCode: 'CALC301', className: 'Calculus - Grade 12', day: 'Wednesday', startTime: '14:15', endTime: '15:15', room: 'Room 201', students: 31 },
    { id: 13, classCode: 'CALC301', className: 'Calculus - Grade 12', day: 'Friday', startTime: '14:15', endTime: '15:15', room: 'Room 201', students: 31 },
  ]);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  const getClassesForDay = (day: string) => {
    return schedules.filter(s => s.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const getTodayClasses = () => {
    const today = new Date();
    const dayName = daysOfWeek[today.getDay() === 0 ? 6 : today.getDay() - 1];
    return getClassesForDay(dayName);
  };

  const getWeekClasses = () => {
    const weekClasses: { [key: string]: ClassSchedule[] } = {};
    daysOfWeek.forEach(day => {
      weekClasses[day] = getClassesForDay(day);
    });
    return weekClasses;
  };

  const handleAddClass = () => {
    if (selectedDay && formData.classCode && formData.className && formData.startTime && formData.endTime && formData.room) {
      const newSchedule: ClassSchedule = {
        id: schedules.length + 1,
        classCode: formData.classCode,
        className: formData.className,
        day: selectedDay as ClassSchedule['day'],
        startTime: formData.startTime,
        endTime: formData.endTime,
        room: formData.room,
        students: 0,
      };
      setSchedules([...schedules, newSchedule]);
      setShowAddClassModal(false);
      setFormData({ classCode: '', className: '', startTime: '', endTime: '', room: '' });
      setSelectedDay('');
      alert('Class scheduled successfully! Students will be notified.');
    }
  };

  const availableClasses = [
    { code: 'MATH101', name: 'Math 101 - Grade 9' },
    { code: 'MATH201', name: 'Algebra II - Grade 10' },
    { code: 'GEOM201', name: 'Geometry - Grade 10' },
    { code: 'CALC201', name: 'Pre-Calculus - Grade 11' },
    { code: 'CALC301', name: 'Calculus - Grade 12' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Schedule</h1>
          <p className="text-gray-600 mt-2">View and manage your class schedule</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'day' ? 'bg-white text-authority-purple shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'week' ? 'bg-white text-authority-purple shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'month' ? 'bg-white text-authority-purple shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Month
            </button>
          </div>
          <Button onClick={() => setShowAddClassModal(true)} variant="primary">
            Add Class to Schedule
          </Button>
        </div>
      </div>

      {/* Today's Classes Quick View */}
      {viewMode === 'day' && (
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
              />
            </div>
            <div className="space-y-3">
              {getTodayClasses().length > 0 ? (
                getTodayClasses().map((schedule) => (
                  <div
                    key={schedule.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{schedule.className}</h3>
                      <p className="text-sm text-gray-600">{schedule.classCode} • {schedule.room}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{schedule.startTime} - {schedule.endTime}</p>
                      <p className="text-xs text-gray-600">{schedule.students} students</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No classes scheduled for today</p>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Week View */}
      {viewMode === 'week' && (
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Schedule</h2>
            <div className="space-y-4">
              {daysOfWeek.map((day) => {
                const dayClasses = getClassesForDay(day);
                return (
                  <div key={day} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h3 className="font-semibold text-gray-900 mb-3">{day}</h3>
                    {dayClasses.length > 0 ? (
                      <div className="space-y-2">
                        {dayClasses.map((schedule) => (
                          <div
                            key={schedule.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{schedule.className}</p>
                              <p className="text-sm text-gray-600">{schedule.classCode} • {schedule.room}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">{schedule.startTime} - {schedule.endTime}</p>
                              <p className="text-xs text-gray-600">{schedule.students} students</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No classes scheduled</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {/* Month View */}
      {viewMode === 'month' && (
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Overview</h2>
            <div className="grid grid-cols-7 gap-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center font-semibold text-gray-700 text-sm py-2">
                  {day.slice(0, 3)}
                </div>
              ))}
              {daysOfWeek.map((day) => {
                const dayClasses = getClassesForDay(day);
                return (
                  <div key={day} className="min-h-[120px] border border-gray-200 rounded-lg p-2">
                    <div className="text-xs font-medium text-gray-600 mb-1">{day.slice(0, 3)}</div>
                    <div className="space-y-1">
                      {dayClasses.slice(0, 3).map((schedule) => (
                        <div
                          key={schedule.id}
                          className="text-xs p-1 bg-authority-purple bg-opacity-10 rounded text-authority-purple font-medium truncate"
                          title={`${schedule.className} (${schedule.startTime}-${schedule.endTime})`}
                        >
                          {schedule.classCode}
                        </div>
                      ))}
                      {dayClasses.length > 3 && (
                        <div className="text-xs text-gray-500">+{dayClasses.length - 3} more</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {/* Add Class Modal */}
      {showAddClassModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add Class to Schedule</h2>
              <p className="text-sm text-gray-600 mt-1">Students will be notified of the new schedule</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
                <select
                  value={formData.classCode}
                  onChange={(e) => {
                    const selected = availableClasses.find(c => c.code === e.target.value);
                    setFormData({
                      ...formData,
                      classCode: e.target.value,
                      className: selected?.name || '',
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                >
                  <option value="">Select a class...</option>
                  {availableClasses.map((cls) => (
                    <option key={cls.code} value={cls.code}>{cls.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Day *</label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                >
                  <option value="">Select a day...</option>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time *</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room *</label>
                <input
                  type="text"
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  placeholder="e.g., Room 201"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddClassModal(false);
                  setFormData({ classCode: '', className: '', startTime: '', endTime: '', room: '' });
                  setSelectedDay('');
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClass}
                className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Add to Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

