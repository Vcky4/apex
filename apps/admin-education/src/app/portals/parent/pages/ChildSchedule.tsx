import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Card, Button } from '@apex-providers/ui-components';

interface ScheduleItem {
  id: string;
  type: 'class' | 'exam' | 'test' | 'excursion' | 'event';
  title: string;
  subject?: string;
  date: string;
  time: string;
  location: string;
  teacher?: string;
  description?: string;
}

export default function ChildSchedule() {
  const location = useLocation();
  const { childId } = useParams<{ childId: string }>();
  const [selectedView, setSelectedView] = useState<'day' | 'week' | 'month'>('week');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get child ID from route params or location state
  const currentChildId = childId || location.state?.childId || '1';

  // Mock data - in real app, this would come from API
  const scheduleData: ScheduleItem[] = [
    {
      id: '1',
      type: 'class',
      title: 'Mathematics',
      subject: 'Math',
      date: '2025-01-15',
      time: '08:00 - 09:00',
      location: 'Room 101',
      teacher: 'Mr. Smith',
    },
    {
      id: '2',
      type: 'class',
      title: 'English Literature',
      subject: 'English',
      date: '2025-01-15',
      time: '09:15 - 10:15',
      location: 'Room 205',
      teacher: 'Mrs. Johnson',
    },
    {
      id: '3',
      type: 'class',
      title: 'Science Lab',
      subject: 'Science',
      date: '2025-01-15',
      time: '10:30 - 11:30',
      location: 'Lab A',
      teacher: 'Dr. Brown',
    },
    {
      id: '4',
      type: 'exam',
      title: 'Mathematics Midterm Exam',
      subject: 'Math',
      date: '2025-01-20',
      time: '09:00 - 11:00',
      location: 'Hall A',
      teacher: 'Mr. Smith',
      description: 'Covering chapters 1-5',
    },
    {
      id: '5',
      type: 'test',
      title: 'English Quiz',
      subject: 'English',
      date: '2025-01-17',
      time: '09:15 - 10:00',
      location: 'Room 205',
      teacher: 'Mrs. Johnson',
      description: 'Grammar and vocabulary',
    },
    {
      id: '6',
      type: 'excursion',
      title: 'Museum Field Trip',
      subject: 'History',
      date: '2025-01-25',
      time: '08:00 - 15:00',
      location: 'City Museum',
      teacher: 'Mr. Davis',
      description: 'Educational visit to the local history museum',
    },
    {
      id: '7',
      type: 'class',
      title: 'Physical Education',
      subject: 'PE',
      date: '2025-01-16',
      time: '14:00 - 15:00',
      location: 'Gymnasium',
      teacher: 'Coach Wilson',
    },
    {
      id: '8',
      type: 'test',
      title: 'Science Test',
      subject: 'Science',
      date: '2025-01-18',
      time: '10:30 - 11:30',
      location: 'Lab A',
      teacher: 'Dr. Brown',
      description: 'Chemistry basics',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'class':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'exam':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'test':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'excursion':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'event':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'class':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'exam':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'test':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        );
      case 'excursion':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  // Group schedule by date
  const groupedSchedule = scheduleData.reduce((acc, item) => {
    const date = item.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, ScheduleItem[]>);

  // Sort dates
  const sortedDates = Object.keys(groupedSchedule).sort();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Child Schedule</h1>
          <p className="text-gray-600 mt-2">View classes, exams, tests, and excursions for your child</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedView === 'day' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedView('day')}
          >
            Day
          </Button>
          <Button
            variant={selectedView === 'week' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedView('week')}
          >
            Week
          </Button>
          <Button
            variant={selectedView === 'month' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedView('month')}
          >
            Month
          </Button>
        </div>
      </div>

      {/* Schedule Legend */}
      <Card>
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Legend</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
              <span className="text-sm text-gray-600">Classes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
              <span className="text-sm text-gray-600">Exams</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-100 border border-orange-200 rounded"></div>
              <span className="text-sm text-gray-600">Tests</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
              <span className="text-sm text-gray-600">Excursions</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Schedule Items */}
      <div className="space-y-4">
        {sortedDates.map((date) => (
          <Card key={date}>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-charcoal-gray mb-4">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
              <div className="space-y-3">
                {groupedSchedule[date].map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg border ${getTypeColor(item.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-0.5">
                          {getTypeIcon(item.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{item.title}</h4>
                            <span className="text-xs px-2 py-0.5 rounded bg-white bg-opacity-50">
                              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </span>
                          </div>
                          {item.subject && (
                            <p className="text-sm opacity-90 mb-1">Subject: {item.subject}</p>
                          )}
                          {item.description && (
                            <p className="text-sm opacity-80 mb-2">{item.description}</p>
                          )}
                          <div className="flex flex-wrap gap-4 text-sm opacity-90">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {item.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {item.location}
                            </div>
                            {item.teacher && (
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {item.teacher}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {scheduleData.length === 0 && (
        <Card>
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Schedule Items</h3>
            <p className="text-gray-500">There are no scheduled items for this period.</p>
          </div>
        </Card>
      )}
    </div>
  );
}

