import { Card } from '@apex-providers/ui-components';

export default function AcademicCalendar() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Academic Calendar</h1>
        <p className="text-gray-600 mt-2">Term planning, examination schedules, and event management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <div className="text-sm text-gray-600 mb-1">Current Term</div>
          <div className="text-2xl font-bold text-authority-purple">Term 2</div>
          <div className="text-sm text-gray-600 mt-2">Week 8 of 12</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Days Remaining</div>
          <div className="text-2xl font-bold text-blue-600">28</div>
          <div className="text-sm text-gray-600 mt-2">Until term end</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Upcoming Exams</div>
          <div className="text-2xl font-bold text-orange-600">3</div>
          <div className="text-sm text-gray-600 mt-2">Next 30 days</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">School Events</div>
          <div className="text-2xl font-bold text-green-600">5</div>
          <div className="text-sm text-gray-600 mt-2">This month</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Term Schedule</h2>
          <div className="space-y-4">
            {[
              { term: 'Term 1', start: 'Sep 1, 2024', end: 'Dec 15, 2024', status: 'Completed', weeks: 15 },
              { term: 'Term 2', start: 'Jan 8, 2025', end: 'Apr 18, 2025', status: 'In Progress', weeks: 12 },
              { term: 'Term 3', start: 'May 5, 2025', end: 'Aug 15, 2025', status: 'Planned', weeks: 15 },
            ].map((item) => (
              <div key={item.term} className={`p-4 border-2 rounded-lg ${
                item.status === 'In Progress' ? 'border-authority-purple bg-purple-50' : 
                item.status === 'Completed' ? 'border-gray-300' : 'border-gray-200'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold text-lg text-charcoal-gray">{item.term}</div>
                    <div className="text-sm text-gray-600">{item.start} - {item.end}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === 'In Progress' ? 'bg-authority-purple text-white' :
                    item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">Duration: {item.weeks} weeks</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Examination Timetable</h2>
          <div className="space-y-3">
            {[
              { exam: 'Mid-Term Assessment', date: 'Mar 15-20, 2025', grade: 'All Grades', status: 'Approved' },
              { exam: 'Final Examinations', date: 'Apr 10-18, 2025', grade: 'All Grades', status: 'Scheduled' },
              { exam: 'Standardized Tests', date: 'Mar 25, 2025', grade: 'Grade 10-12', status: 'Scheduled' },
            ].map((item) => (
              <div key={item.exam} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-charcoal-gray">{item.exam}</div>
                    <div className="text-sm text-gray-600">{item.date}</div>
                    <div className="text-xs text-gray-500 mt-1">{item.grade}</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-charcoal-gray mb-4">School Events & Holidays</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { event: 'Science Fair', date: 'Mar 15, 2025', type: 'Event', status: 'Confirmed' },
            { event: 'Professional Development Day', date: 'Mar 12, 2025', type: 'Holiday', status: 'Confirmed' },
            { event: 'Spring Break', date: 'Mar 25 - Apr 1, 2025', type: 'Holiday', status: 'Confirmed' },
            { event: 'Sports Day', date: 'Mar 28, 2025', type: 'Event', status: 'Planned' },
            { event: 'Parent-Teacher Conferences', date: 'Apr 5, 2025', type: 'Event', status: 'Scheduled' },
            { event: 'Graduation Ceremony', date: 'Aug 10, 2025', type: 'Event', status: 'Planned' },
          ].map((item) => (
            <div key={item.event} className="p-4 border rounded-lg hover:shadow-md transition">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="font-semibold text-charcoal-gray">{item.event}</div>
                  <div className="text-sm text-gray-600 mt-1">{item.date}</div>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  item.type === 'Holiday' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.type}
                </span>
              </div>
              <div className="text-xs text-gray-500">{item.status}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

