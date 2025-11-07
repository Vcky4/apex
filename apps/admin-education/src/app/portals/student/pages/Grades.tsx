import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface GradeItem {
  id: string;
  courseCode: string;
  courseName: string;
  assignmentType: 'Assignment' | 'Quiz' | 'Midterm' | 'Final Exam' | 'Project' | 'Lab';
  assignmentName: string;
  date: string;
  score: number;
  maxScore: number;
  percentage: number;
  letterGrade: string;
  weight: number;
  weightedScore: number;
}

interface CourseGrade {
  courseCode: string;
  courseName: string;
  instructor: string;
  currentGrade: number;
  letterGrade: string;
  credits: number;
  gradeItems: GradeItem[];
  categoryBreakdown: {
    category: string;
    weight: number;
    average: number;
  }[];
}

export default function Grades() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<string>('Spring 2024');

  const courseGrades: CourseGrade[] = [
    {
      courseCode: 'MATH101',
      courseName: 'Advanced Mathematics',
      instructor: 'Mr. Smith',
      currentGrade: 92,
      letterGrade: 'A-',
      credits: 4,
      gradeItems: [
        {
          id: '1',
          courseCode: 'MATH101',
          courseName: 'Advanced Mathematics',
          assignmentType: 'Quiz',
          assignmentName: 'Quiz 1 - Algebra Fundamentals',
          date: '2024-01-20',
          score: 18,
          maxScore: 20,
          percentage: 90,
          letterGrade: 'A-',
          weight: 10,
          weightedScore: 9.0
        },
        {
          id: '2',
          courseCode: 'MATH101',
          courseName: 'Advanced Mathematics',
          assignmentType: 'Assignment',
          assignmentName: 'Homework 3 - Calculus',
          date: '2024-01-25',
          score: 95,
          maxScore: 100,
          percentage: 95,
          letterGrade: 'A',
          weight: 15,
          weightedScore: 14.25
        },
        {
          id: '3',
          courseCode: 'MATH101',
          courseName: 'Advanced Mathematics',
          assignmentType: 'Midterm',
          assignmentName: 'Midterm Exam',
          date: '2024-02-15',
          score: 88,
          maxScore: 100,
          percentage: 88,
          letterGrade: 'B+',
          weight: 25,
          weightedScore: 22.0
        },
        {
          id: '4',
          courseCode: 'MATH101',
          courseName: 'Advanced Mathematics',
          assignmentType: 'Project',
          assignmentName: 'Mathematical Modeling Project',
          date: '2024-02-28',
          score: 92,
          maxScore: 100,
          percentage: 92,
          letterGrade: 'A-',
          weight: 20,
          weightedScore: 18.4
        }
      ],
      categoryBreakdown: [
        { category: 'Quizzes', weight: 20, average: 90 },
        { category: 'Assignments', weight: 30, average: 93 },
        { category: 'Midterm', weight: 25, average: 88 },
        { category: 'Final Exam', weight: 25, average: 0 }
      ]
    },
    {
      courseCode: 'ENG201',
      courseName: 'English Literature',
      instructor: 'Mrs. Johnson',
      currentGrade: 95,
      letterGrade: 'A',
      credits: 3,
      gradeItems: [
        {
          id: '5',
          courseCode: 'ENG201',
          courseName: 'English Literature',
          assignmentType: 'Essay',
          assignmentName: 'Poetry Analysis Essay',
          date: '2024-01-22',
          score: 95,
          maxScore: 100,
          percentage: 95,
          letterGrade: 'A',
          weight: 20,
          weightedScore: 19.0
        },
        {
          id: '6',
          courseCode: 'ENG201',
          courseName: 'English Literature',
          assignmentType: 'Quiz',
          assignmentName: 'Reading Comprehension Quiz',
          date: '2024-02-05',
          score: 98,
          maxScore: 100,
          percentage: 98,
          letterGrade: 'A',
          weight: 15,
          weightedScore: 14.7
        },
        {
          id: '7',
          courseCode: 'ENG201',
          courseName: 'English Literature',
          assignmentType: 'Project',
          assignmentName: 'Literary Analysis Presentation',
          date: '2024-02-20',
          score: 92,
          maxScore: 100,
          percentage: 92,
          letterGrade: 'A-',
          weight: 25,
          weightedScore: 23.0
        }
      ],
      categoryBreakdown: [
        { category: 'Essays', weight: 30, average: 95 },
        { category: 'Quizzes', weight: 20, average: 98 },
        { category: 'Presentations', weight: 25, average: 92 },
        { category: 'Final Exam', weight: 25, average: 0 }
      ]
    },
    {
      courseCode: 'PHYS301',
      courseName: 'Physics - Mechanics',
      instructor: 'Dr. Brown',
      currentGrade: 88,
      letterGrade: 'B+',
      credits: 4,
      gradeItems: [
        {
          id: '8',
          courseCode: 'PHYS301',
          courseName: 'Physics - Mechanics',
          assignmentType: 'Lab',
          assignmentName: 'Lab Report 1 - Motion',
          date: '2024-01-18',
          score: 85,
          maxScore: 100,
          percentage: 85,
          letterGrade: 'B',
          weight: 15,
          weightedScore: 12.75
        },
        {
          id: '9',
          courseCode: 'PHYS301',
          courseName: 'Physics - Mechanics',
          assignmentType: 'Quiz',
          assignmentName: 'Quiz 2 - Forces',
          date: '2024-02-01',
          score: 90,
          maxScore: 100,
          percentage: 90,
          letterGrade: 'A-',
          weight: 10,
          weightedScore: 9.0
        },
        {
          id: '10',
          courseCode: 'PHYS301',
          courseName: 'Physics - Mechanics',
          assignmentType: 'Midterm',
          assignmentName: 'Midterm Exam',
          date: '2024-02-18',
          score: 87,
          maxScore: 100,
          percentage: 87,
          letterGrade: 'B+',
          weight: 25,
          weightedScore: 21.75
        }
      ],
      categoryBreakdown: [
        { category: 'Labs', weight: 20, average: 85 },
        { category: 'Quizzes', weight: 20, average: 90 },
        { category: 'Midterm', weight: 25, average: 87 },
        { category: 'Final Exam', weight: 35, average: 0 }
      ]
    },
    {
      courseCode: 'HIST202',
      courseName: 'World History',
      instructor: 'Mr. Davis',
      currentGrade: 94,
      letterGrade: 'A',
      credits: 3,
      gradeItems: [
        {
          id: '11',
          courseCode: 'HIST202',
          courseName: 'World History',
          assignmentType: 'Essay',
          assignmentName: 'WWII Essay',
          date: '2024-01-30',
          score: 96,
          maxScore: 100,
          percentage: 96,
          letterGrade: 'A',
          weight: 25,
          weightedScore: 24.0
        },
        {
          id: '12',
          courseCode: 'HIST202',
          courseName: 'World History',
          assignmentType: 'Quiz',
          assignmentName: 'Chapter 5 Quiz',
          date: '2024-02-10',
          score: 92,
          maxScore: 100,
          percentage: 92,
          letterGrade: 'A-',
          weight: 15,
          weightedScore: 13.8
        }
      ],
      categoryBreakdown: [
        { category: 'Essays', weight: 35, average: 96 },
        { category: 'Quizzes', weight: 25, average: 92 },
        { category: 'Final Exam', weight: 40, average: 0 }
      ]
    }
  ];

  const allGradeItems = courseGrades.flatMap(cg => cg.gradeItems);
  const overallGPA = courseGrades.reduce((sum, cg) => {
    const gradePoints = cg.letterGrade === 'A' ? 4.0 : cg.letterGrade === 'A-' ? 3.7 : cg.letterGrade === 'B+' ? 3.3 : cg.letterGrade === 'B' ? 3.0 : 2.7;
    return sum + (gradePoints * cg.credits);
  }, 0) / courseGrades.reduce((sum, cg) => sum + cg.credits, 0);
  
  const averageGrade = courseGrades.reduce((sum, cg) => sum + cg.currentGrade, 0) / courseGrades.length;
  const totalCredits = courseGrades.reduce((sum, cg) => sum + cg.credits, 0);
  const recentGrades = allGradeItems.slice(0, 5);

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600 bg-green-50';
    if (grade >= 80) return 'text-blue-600 bg-blue-50';
    if (grade >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getLetterGradeColor = (letter: string) => {
    if (letter.startsWith('A')) return 'bg-green-100 text-green-800';
    if (letter.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (letter.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">My Grades</h1>
          <p className="text-gray-600 mt-2">View your academic performance and grade breakdown</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Spring 2024</option>
            <option>Fall 2023</option>
            <option>Summer 2023</option>
          </select>
        </div>
      </div>

      <DashboardGrid columns={4}>
        <StatCard
          title="Overall GPA"
          value={overallGPA.toFixed(2)}
          color="green"
          trend={{ value: 0.15, isPositive: true }}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
        />
        <StatCard
          title="Average Grade"
          value={`${averageGrade.toFixed(1)}%`}
          color="blue"
          trend={{ value: 2.3, isPositive: true }}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
        />
        <StatCard
          title="Total Credits"
          value={totalCredits.toString()}
          color="purple"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
        />
        <StatCard
          title="Graded Items"
          value={allGradeItems.length.toString()}
          color="orange"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
        />
      </DashboardGrid>

      {/* Course Grade Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courseGrades.map((course) => (
          <Card key={course.courseCode}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-charcoal-gray">{course.courseName}</h3>
                  <p className="text-sm text-gray-600">{course.courseCode} • {course.instructor}</p>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getGradeColor(course.currentGrade)} px-4 py-2 rounded-lg`}>
                    {course.currentGrade}%
                  </div>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getLetterGradeColor(course.letterGrade)}`}>
                    {course.letterGrade}
                  </span>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Grade Breakdown</h4>
                <div className="space-y-2">
                  {course.categoryBreakdown.map((category, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">{category.category}</span>
                        <span className="font-medium text-gray-700">
                          {category.average > 0 ? `${category.average}%` : 'N/A'} ({category.weight}%)
                        </span>
                      </div>
                      {category.average > 0 && (
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              category.average >= 90 ? 'bg-green-500' :
                              category.average >= 80 ? 'bg-blue-500' :
                              category.average >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${category.average}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setSelectedCourse(selectedCourse === course.courseCode ? null : course.courseCode)}
              >
                {selectedCourse === course.courseCode ? 'Hide Details' : 'View All Grades'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Detailed Grade Items */}
      {selectedCourse && (
        <Card>
          <div className="p-6">
            <h3 className="text-xl font-bold text-charcoal-gray mb-4">
              {courseGrades.find(cg => cg.courseCode === selectedCourse)?.courseName} - All Grades
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-light-gray">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Assignment</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Score</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Grade</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {courseGrades
                    .find(cg => cg.courseCode === selectedCourse)
                    ?.gradeItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 text-sm font-medium text-charcoal-gray">{item.assignmentName}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item.assignmentType}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item.score}/{item.maxScore}</td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLetterGradeColor(item.letterGrade)}`}>
                            {item.letterGrade} ({item.percentage}%)
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item.weight}%</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      )}

      {/* Recent Grades */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Recent Grades</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-light-gray">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Course</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Assignment</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Score</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentGrades.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 text-sm font-medium text-charcoal-gray">{item.courseCode}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.assignmentName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.score}/{item.maxScore}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLetterGradeColor(item.letterGrade)}`}>
                        {item.letterGrade} ({item.percentage}%)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
