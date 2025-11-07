import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface Child {
  id: string;
  name: string;
  studentId: string;
  grade: string;
  dateOfBirth: string;
  age: number;
  photo: string;
  gpa: number;
  attendanceRate: number;
  totalCourses: number;
  pendingAssignments: number;
  upcomingEvents: number;
  emergencyContact?: string;
  homeroomTeacher: string;
  homeroomTeacherEmail: string;
  enrollmentDate: string;
  status: 'Active' | 'Graduated' | 'Transferred';
}

export default function Children() {
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  const children: Child[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      studentId: '10245',
      grade: 'Grade 10',
      dateOfBirth: '2008-05-15',
      age: 15,
      photo: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=3B82F6&color=fff',
      gpa: 3.8,
      attendanceRate: 96,
      totalCourses: 6,
      pendingAssignments: 3,
      upcomingEvents: 2,
      homeroomTeacher: 'Mr. Smith',
      homeroomTeacherEmail: 'smith@school.edu',
      enrollmentDate: '2020-09-01',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Emma Johnson',
      studentId: '08312',
      grade: 'Grade 8',
      dateOfBirth: '2010-08-22',
      age: 13,
      photo: 'https://ui-avatars.com/api/?name=Emma+Johnson&background=EC4899&color=fff',
      gpa: 3.9,
      attendanceRate: 98,
      totalCourses: 5,
      pendingAssignments: 1,
      upcomingEvents: 1,
      homeroomTeacher: 'Mrs. Johnson',
      homeroomTeacherEmail: 'johnson@school.edu',
      enrollmentDate: '2022-09-01',
      status: 'Active'
    }
  ];

  const selectedChildData = selectedChild ? children.find(c => c.id === selectedChild) : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Graduated': return 'bg-blue-100 text-blue-800';
      case 'Transferred': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-green-600';
    if (gpa >= 3.0) return 'text-blue-600';
    if (gpa >= 2.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">My Children</h1>
        <p className="text-gray-600 mt-2">View and manage information for your children</p>
      </div>

      <DashboardGrid columns={2}>
        <StatCard
          title="Total Children"
          value={children.length.toString()}
          color="blue"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
        />
        <StatCard
          title="Average GPA"
          value={(children.reduce((sum, c) => sum + c.gpa, 0) / children.length).toFixed(2)}
          color="green"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
        />
      </DashboardGrid>

      {/* Children Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {children.map((child) => (
          <Card key={child.id} className="hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={child.photo}
                    alt={child.name}
                    className="w-20 h-20 rounded-full border-4 border-blue-100"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-charcoal-gray">{child.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(child.status)}`}>
                        {child.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Student ID: {child.studentId}</p>
                    <p className="text-sm text-gray-600">{child.grade} • Age {child.age}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-light-gray rounded-lg">
                  <div className={`text-2xl font-bold ${getGPAColor(child.gpa)}`}>
                    {child.gpa}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">GPA</div>
                </div>
                <div className="text-center p-3 bg-light-gray rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {child.attendanceRate}%
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Attendance</div>
                </div>
                <div className="text-center p-3 bg-light-gray rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {child.totalCourses}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Courses</div>
                </div>
                <div className="text-center p-3 bg-light-gray rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {child.pendingAssignments}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Pending</div>
                </div>
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Homeroom Teacher:</span>
                    <div className="font-medium text-charcoal-gray">{child.homeroomTeacher}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Enrollment Date:</span>
                    <div className="font-medium text-charcoal-gray">
                      {new Date(child.enrollmentDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => setSelectedChild(selectedChild === child.id ? null : child.id)}
                >
                  {selectedChild === child.id ? 'Hide Details' : 'View Details'}
                </Button>
                <Button variant="outline" size="sm">
                  Contact Teacher
                </Button>
              </div>

              {selectedChild === child.id && (
                <div className="mt-4 pt-4 border-t space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Date of Birth:</span>
                      <div className="font-medium text-charcoal-gray">
                        {new Date(child.dateOfBirth).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <div className="font-medium text-charcoal-gray">
                        {child.homeroomTeacherEmail}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Grades
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      View Attendance
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      View Schedule
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              View All Grades
            </Button>
            <Button variant="outline" className="justify-start">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              View Attendance
            </Button>
            <Button variant="outline" className="justify-start">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Send Message
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
