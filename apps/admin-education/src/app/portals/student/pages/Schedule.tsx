import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface ClassSchedule {
  id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string;
  endTime: string;
  room: string;
  building: string;
  type: 'Lecture' | 'Lab' | 'Seminar' | 'Tutorial';
  credits: number;
}

interface WeeklySchedule {
  [key: string]: ClassSchedule[];
}

export default function Schedule() {
  const [selectedWeek, setSelectedWeek] = useState<string>(new Date().toISOString().slice(0, 10));
  const [viewMode, setViewMode] = useState<'week' | 'list'>('week');

  const classes: ClassSchedule[] = [
    {
      id: '1',
      courseCode: 'MATH101',
      courseName: 'Advanced Mathematics',
      instructor: 'Mr. Smith',
      day: 'Monday',
      startTime: '08:00',
      endTime: '09:30',
      room: '201',
      building: 'Science Building',
      type: 'Lecture',
      credits: 4
    },
    {
      id: '2',
      courseCode: 'MATH101',
      courseName: 'Advanced Mathematics',
      instructor: 'Mr. Smith',
      day: 'Wednesday',
      startTime: '08:00',
      endTime: '09:30',
      room: '201',
      building: 'Science Building',
      type: 'Lecture',
      credits: 4
    },
    {
      id: '3',
      courseCode: 'MATH101',
      courseName: 'Advanced Mathematics',
      instructor: 'Mr. Smith',
      day: 'Friday',
      startTime: '08:00',
      endTime: '09:30',
      room: '201',
      building: 'Science Building',
      type: 'Lecture',
      credits: 4
    },
    {
      id: '4',
      courseCode: 'ENG201',
      courseName: 'English Literature',
      instructor: 'Mrs. Johnson',
      day: 'Tuesday',
      startTime: '09:15',
      endTime: '10:45',
      room: '105',
      building: 'Humanities Building',
      type: 'Lecture',
      credits: 3
    },
    {
      id: '5',
      courseCode: 'ENG201',
      courseName: 'English Literature',
      instructor: 'Mrs. Johnson',
      day: 'Thursday',
      startTime: '09:15',
      endTime: '10:45',
      room: '105',
      building: 'Humanities Building',
      type: 'Lecture',
      credits: 3
    },
    {
      id: '6',
      courseCode: 'PHYS301',
      courseName: 'Physics - Mechanics',
      instructor: 'Dr. Brown',
      day: 'Monday',
      startTime: '10:30',
      endTime: '12:00',
      room: 'Lab 3',
      building: 'Science Building',
      type: 'Lab',
      credits: 4
    },
    {
      id: '7',
      courseCode: 'PHYS301',
      courseName: 'Physics - Mechanics',
      instructor: 'Dr. Brown',
      day: 'Wednesday',
      startTime: '10:30',
      endTime: '12:00',
      room: 'Lab 3',
      building: 'Science Building',
      type: 'Lab',
      credits: 4
    },
    {
      id: '8',
      courseCode: 'HIST202',
      courseName: 'World History',
      instructor: 'Mr. Davis',
      day: 'Tuesday',
      startTime: '12:45',
      endTime: '14:15',
      room: '302',
      building: 'Humanities Building',
      type: 'Lecture',
      credits: 3
    },
    {
      id: '9',
      courseCode: 'HIST202',
      courseName: 'World History',
      instructor: 'Mr. Davis',
      day: 'Thursday',
      startTime: '12:45',
      endTime: '14:15',
      room: '302',
      building: 'Humanities Building',
      type: 'Lecture',
      credits: 3
    },
    {
      id: '10',
      courseCode: 'CHEM201',
      courseName: 'Chemistry',
      instructor: 'Dr. Wilson',
      day: 'Monday',
      startTime: '14:30',
      endTime: '16:00',
      room: 'Lab 5',
      building: 'Science Building',
      type: 'Lab',
      credits: 4
    },
    {
      id: '11',
      courseCode: 'CHEM201',
      courseName: 'Chemistry',
      instructor: 'Dr. Wilson',
      day: 'Wednesday',
      startTime: '14:30',
      endTime: '16:00',
      room: 'Lab 5',
      building: 'Science Building',
      type: 'Lab',
      credits: 4
    },
    {
      id: '12',
      courseCode: 'CHEM201',
      courseName: 'Chemistry',
      instructor: 'Dr. Wilson',
      day: 'Friday',
      startTime: '14:30',
      endTime: '16:00',
      room: 'Lab 5',
      building: 'Science Building',
      type: 'Lab',
      credits: 4
    },
    {
      id: '13',
      courseCode: 'BIO101',
      courseName: 'Biology',
      instructor: 'Ms. Martinez',
      day: 'Tuesday',
      startTime: '15:00',
      endTime: '16:30',
      room: 'Lab 2',
      building: 'Science Building',
      type: 'Lab',
      credits: 4
    },
    {
      id: '14',
      courseCode: 'BIO101',
      courseName: 'Biology',
      instructor: 'Ms. Martinez',
      day: 'Thursday',
      startTime: '15:00',
      endTime: '16:30',
      room: 'Lab 2',
      building: 'Science Building',
      type: 'Lab',
      credits: 4
    }
  ];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  const getClassesForDay = (day: string) => {
    return classes.filter(c => c.day === day).sort((a, b) => 
      a.startTime.localeCompare(b.startTime)
    );
  };

  const getTimeSlotPosition = (time: string) => {
    const index = timeSlots.indexOf(time);
    return index >= 0 ? index * 60 : 0; // 60px per 30-minute slot
  };

  const getClassDuration = (startTime: string, endTime: string) => {
    const start = timeSlots.indexOf(startTime);
    const end = timeSlots.indexOf(endTime);
    return (end - start) * 60; // height in pixels
  };

  const totalClasses = classes.length;
  const totalCredits = Array.from(new Set(classes.map(c => c.courseCode))).reduce((sum, code) => {
    const course = classes.find(c => c.courseCode === code);
    return sum + (course?.credits || 0);
  }, 0);
  const uniqueCourses = new Set(classes.map(c => c.courseCode)).size;
  const todayClasses = getClassesForDay(daysOfWeek[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Lecture': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Lab': return 'bg-green-100 text-green-800 border-green-300';
      case 'Seminar': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Tutorial': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">My Schedule</h1>
          <p className="text-gray-600 mt-2">View your weekly class schedule</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'week' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('week')}
          >
            Week View
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List View
          </Button>
        </div>
      </div>

      <DashboardGrid columns={4}>
        <StatCard
          title="Total Classes"
          value={totalClasses.toString()}
          color="blue"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
        />
        <StatCard
          title="Total Credits"
          value={totalCredits.toString()}
          color="purple"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
        />
        <StatCard
          title="Active Courses"
          value={uniqueCourses.toString()}
          color="green"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
        />
        <StatCard
          title="Today's Classes"
          value={todayClasses.length.toString()}
          color="orange"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
      </DashboardGrid>

      {viewMode === 'week' ? (
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Weekly Schedule</h3>
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Time slots header */}
                <div className="grid grid-cols-8 gap-2 mb-2">
                  <div className="text-sm font-medium text-gray-700"></div>
                  {daysOfWeek.map(day => (
                    <div key={day} className="text-sm font-medium text-gray-700 text-center">
                      {day.slice(0, 3)}
                    </div>
                  ))}
                </div>

                {/* Schedule grid */}
                <div className="relative">
                  {timeSlots.map((time, idx) => (
                    idx % 2 === 0 && (
                      <div key={time} className="grid grid-cols-8 gap-2 border-b border-gray-200 py-1">
                        <div className="text-xs text-gray-500">{time}</div>
                        {daysOfWeek.map(day => (
                          <div key={day} className="min-h-[60px]"></div>
                        ))}
                      </div>
                    )
                  ))}

                  {/* Classes positioned */}
                  {classes.map(classItem => {
                    const dayIndex = daysOfWeek.indexOf(classItem.day) + 1;
                    const top = getTimeSlotPosition(classItem.startTime);
                    const height = getClassDuration(classItem.startTime, classItem.endTime);

                    return (
                      <div
                        key={classItem.id}
                        className={`absolute border-l-4 rounded p-2 text-xs ${getTypeColor(classItem.type)}`}
                        style={{
                          left: `${(dayIndex * 12.5)}%`,
                          top: `${top}px`,
                          width: '12%',
                          height: `${height}px`,
                          zIndex: 10
                        }}
                      >
                        <div className="font-semibold">{classItem.courseCode}</div>
                        <div className="text-xs opacity-90">{classItem.courseName}</div>
                        <div className="text-xs opacity-75 mt-1">
                          {classItem.startTime} - {classItem.endTime}
                        </div>
                        <div className="text-xs opacity-75">
                          {classItem.building} {classItem.room}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {daysOfWeek.map(day => {
            const dayClasses = getClassesForDay(day);
            if (dayClasses.length === 0) return null;

            return (
              <Card key={day}>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-charcoal-gray mb-4">{day}</h3>
                  <div className="space-y-3">
                    {dayClasses.map(classItem => (
                      <div
                        key={classItem.id}
                        className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${getTypeColor(classItem.type)}`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-charcoal-gray">{classItem.courseCode}</h4>
                            <span className="text-xs font-medium px-2 py-1 bg-white bg-opacity-50 rounded">
                              {classItem.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">{classItem.courseName}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {classItem.startTime} - {classItem.endTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {classItem.building} {classItem.room}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              {classItem.instructor}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-700">{classItem.credits} Credits</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Today's Schedule Quick View */}
      {todayClasses.length > 0 && (
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Today's Classes</h3>
            <div className="space-y-3">
              {todayClasses.map(classItem => (
                <div
                  key={classItem.id}
                  className="flex items-center justify-between p-4 bg-light-gray rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-charcoal-gray">{classItem.courseCode} - {classItem.courseName}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {classItem.startTime} - {classItem.endTime} • {classItem.building} {classItem.room}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-700">{classItem.instructor}</div>
                    <div className="text-xs text-gray-500">{classItem.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
