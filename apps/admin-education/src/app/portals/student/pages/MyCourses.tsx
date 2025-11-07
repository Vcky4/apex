import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  instructorEmail: string;
  credits: number;
  schedule: string;
  room: string;
  currentGrade: number;
  gradeLetter: string;
  progress: number;
  status: 'Active' | 'Completed' | 'Dropped';
  enrolledDate: string;
  totalAssignments: number;
  completedAssignments: number;
  totalQuizzes: number;
  completedQuizzes: number;
  description: string;
}

export default function MyCourses() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const courses: Course[] = [
    {
      id: '1',
      courseCode: 'MATH101',
      courseName: 'Advanced Mathematics',
      instructor: 'Mr. Smith',
      instructorEmail: 'smith@school.edu',
      credits: 4,
      schedule: 'Mon, Wed, Fri 8:00 AM - 9:30 AM',
      room: 'Room 201',
      currentGrade: 92,
      gradeLetter: 'A-',
      progress: 75,
      status: 'Active',
      enrolledDate: '2024-01-15',
      totalAssignments: 12,
      completedAssignments: 9,
      totalQuizzes: 8,
      completedQuizzes: 6,
      description: 'Advanced topics in algebra, calculus, and mathematical analysis.'
    },
    {
      id: '2',
      courseCode: 'ENG201',
      courseName: 'English Literature',
      instructor: 'Mrs. Johnson',
      instructorEmail: 'johnson@school.edu',
      credits: 3,
      schedule: 'Tue, Thu 9:15 AM - 10:45 AM',
      room: 'Room 105',
      currentGrade: 95,
      gradeLetter: 'A',
      progress: 80,
      status: 'Active',
      enrolledDate: '2024-01-15',
      totalAssignments: 10,
      completedAssignments: 8,
      totalQuizzes: 5,
      completedQuizzes: 4,
      description: 'Study of classic and contemporary literature with emphasis on critical analysis.'
    },
    {
      id: '3',
      courseCode: 'PHYS301',
      courseName: 'Physics - Mechanics',
      instructor: 'Dr. Brown',
      instructorEmail: 'brown@school.edu',
      credits: 4,
      schedule: 'Mon, Wed 10:30 AM - 12:00 PM',
      room: 'Lab 3',
      currentGrade: 88,
      gradeLetter: 'B+',
      progress: 70,
      status: 'Active',
      enrolledDate: '2024-01-15',
      totalAssignments: 15,
      completedAssignments: 10,
      totalQuizzes: 10,
      completedQuizzes: 7,
      description: 'Fundamental principles of mechanics, motion, and energy.'
    },
    {
      id: '4',
      courseCode: 'HIST202',
      courseName: 'World History',
      instructor: 'Mr. Davis',
      instructorEmail: 'davis@school.edu',
      credits: 3,
      schedule: 'Tue, Thu 12:45 PM - 2:15 PM',
      room: 'Room 302',
      currentGrade: 94,
      gradeLetter: 'A',
      progress: 85,
      status: 'Active',
      enrolledDate: '2024-01-15',
      totalAssignments: 8,
      completedAssignments: 7,
      totalQuizzes: 6,
      completedQuizzes: 5,
      description: 'Comprehensive study of world history from ancient civilizations to modern times.'
    },
    {
      id: '5',
      courseCode: 'CHEM201',
      courseName: 'Chemistry',
      instructor: 'Dr. Wilson',
      instructorEmail: 'wilson@school.edu',
      credits: 4,
      schedule: 'Mon, Wed, Fri 2:30 PM - 4:00 PM',
      room: 'Lab 5',
      currentGrade: 90,
      gradeLetter: 'A-',
      progress: 65,
      status: 'Active',
      enrolledDate: '2024-01-15',
      totalAssignments: 14,
      completedAssignments: 9,
      totalQuizzes: 9,
      completedQuizzes: 6,
      description: 'Introduction to chemical principles, reactions, and laboratory techniques.'
    },
    {
      id: '6',
      courseCode: 'BIO101',
      courseName: 'Biology',
      instructor: 'Ms. Martinez',
      instructorEmail: 'martinez@school.edu',
      credits: 4,
      schedule: 'Tue, Thu 3:00 PM - 4:30 PM',
      room: 'Lab 2',
      currentGrade: 87,
      gradeLetter: 'B+',
      progress: 72,
      status: 'Active',
      enrolledDate: '2024-01-15',
      totalAssignments: 11,
      completedAssignments: 8,
      totalQuizzes: 7,
      completedQuizzes: 5,
      description: 'Study of living organisms, their structure, function, and interactions.'
    }
  ];

  const totalCredits = courses.filter(c => c.status === 'Active').reduce((sum, c) => sum + c.credits, 0);
  const averageGrade = courses.filter(c => c.status === 'Active').reduce((sum, c) => sum + c.currentGrade, 0) / courses.filter(c => c.status === 'Active').length;
  const activeCourses = courses.filter(c => c.status === 'Active').length;
  const totalAssignments = courses.reduce((sum, c) => sum + c.totalAssignments, 0);
  const completedAssignments = courses.reduce((sum, c) => sum + c.completedAssignments, 0);

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Dropped': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">My Courses</h1>
        <p className="text-gray-600 mt-2">View and manage your enrolled courses</p>
      </div>

      <DashboardGrid columns={4}>
        <StatCard
          title="Active Courses"
          value={activeCourses.toString()}
          color="blue"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
        />
        <StatCard
          title="Total Credits"
          value={totalCredits.toString()}
          color="purple"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
        />
        <StatCard
          title="Average Grade"
          value={`${averageGrade.toFixed(1)}%`}
          color="green"
          trend={{ value: 2.5, isPositive: true }}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
        />
        <StatCard
          title="Assignments Progress"
          value={`${completedAssignments}/${totalAssignments}`}
          color="orange"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
        />
      </DashboardGrid>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-charcoal-gray">{course.courseName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Course Code: {course.courseCode}</p>
                  <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getGradeColor(course.currentGrade)}`}>
                    {course.gradeLetter}
                  </div>
                  <div className={`text-sm font-medium ${getGradeColor(course.currentGrade)}`}>
                    {course.currentGrade}%
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4">{course.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {course.schedule}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {course.room}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {course.credits} Credits
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Course Progress</span>
                  <span className="font-medium text-gray-700">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-light-gray p-3 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">Assignments</div>
                  <div className="text-sm font-semibold text-charcoal-gray">
                    {course.completedAssignments}/{course.totalAssignments}
                  </div>
                </div>
                <div className="bg-light-gray p-3 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">Quizzes</div>
                  <div className="text-sm font-semibold text-charcoal-gray">
                    {course.completedQuizzes}/{course.totalQuizzes}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="primary" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  Contact Instructor
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
