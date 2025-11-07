import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface AssessmentSchedule {
  id: string;
  assessmentName: string;
  assessmentType: 'Standardized Test' | 'Midterm' | 'Final Exam' | 'Quiz' | 'Project' | 'Other';
  subject: string;
  gradeLevel: string;
  scheduledDate: string;
  duration: number;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  totalStudents: number;
  completedStudents: number;
}

interface Test {
  id: string;
  testName: string;
  subject: string;
  gradeLevel: string;
  testType: 'Multiple Choice' | 'Essay' | 'Practical' | 'Mixed';
  totalQuestions: number;
  maxScore: number;
  securityLevel: 'Standard' | 'High' | 'Confidential';
  status: 'Draft' | 'Review' | 'Approved' | 'Active' | 'Archived';
  createdBy: string;
  createdDate: string;
}

interface AssessmentResult {
  id: string;
  assessmentName: string;
  subject: string;
  gradeLevel: string;
  averageScore: number;
  maxScore: number;
  passRate: number;
  totalStudents: number;
  completedDate: string;
  trend: 'Improving' | 'Stable' | 'Declining';
}

interface StudentProgress {
  id: string;
  studentName: string;
  studentId: string;
  grade: string;
  subject: string;
  currentScore: number;
  previousScore: number;
  trend: number;
  performanceLevel: 'Exceeding' | 'Meeting' | 'Approaching' | 'Below';
  areasForImprovement: string[];
}

export default function StudentAssessment() {
  const [assessmentSchedules, setAssessmentSchedules] = useState<AssessmentSchedule[]>([
    {
      id: '1',
      assessmentName: 'Mathematics Midterm Exam',
      assessmentType: 'Midterm',
      subject: 'Mathematics',
      gradeLevel: 'Grade 10',
      scheduledDate: '2024-02-15',
      duration: 90,
      status: 'Scheduled',
      totalStudents: 45,
      completedStudents: 0
    },
    {
      id: '2',
      assessmentName: 'Science Standardized Test',
      assessmentType: 'Standardized Test',
      subject: 'Science',
      gradeLevel: 'Grade 9',
      scheduledDate: '2024-02-10',
      duration: 120,
      status: 'Completed',
      totalStudents: 52,
      completedStudents: 52
    },
    {
      id: '3',
      assessmentName: 'English Literature Quiz',
      assessmentType: 'Quiz',
      subject: 'English',
      gradeLevel: 'Grade 11',
      scheduledDate: '2024-02-08',
      duration: 45,
      status: 'In Progress',
      totalStudents: 38,
      completedStudents: 25
    }
  ]);

  const [tests, setTests] = useState<Test[]>([
    {
      id: '1',
      testName: 'Algebra Fundamentals Test',
      subject: 'Mathematics',
      gradeLevel: 'Grade 10',
      testType: 'Mixed',
      totalQuestions: 25,
      maxScore: 100,
      securityLevel: 'High',
      status: 'Approved',
      createdBy: 'Mr. Smith',
      createdDate: '2024-01-15'
    },
    {
      id: '2',
      testName: 'Biology Midterm Exam',
      subject: 'Science',
      gradeLevel: 'Grade 9',
      testType: 'Mixed',
      totalQuestions: 50,
      maxScore: 100,
      securityLevel: 'Confidential',
      status: 'Active',
      createdBy: 'Dr. Johnson',
      createdDate: '2024-01-20'
    },
    {
      id: '3',
      testName: 'Essay Writing Assessment',
      subject: 'English',
      gradeLevel: 'Grade 11',
      testType: 'Essay',
      totalQuestions: 3,
      maxScore: 100,
      securityLevel: 'Standard',
      status: 'Review',
      createdBy: 'Ms. Brown',
      createdDate: '2024-01-25'
    }
  ]);

  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult[]>([
    {
      id: '1',
      assessmentName: 'Science Standardized Test',
      subject: 'Science',
      gradeLevel: 'Grade 9',
      averageScore: 78.5,
      maxScore: 100,
      passRate: 85.2,
      totalStudents: 52,
      completedDate: '2024-02-10',
      trend: 'Improving'
    },
    {
      id: '2',
      assessmentName: 'Mathematics Quiz',
      subject: 'Mathematics',
      gradeLevel: 'Grade 10',
      averageScore: 82.3,
      maxScore: 100,
      passRate: 91.5,
      totalStudents: 45,
      completedDate: '2024-02-05',
      trend: 'Stable'
    },
    {
      id: '3',
      assessmentName: 'History Final Exam',
      subject: 'History',
      gradeLevel: 'Grade 11',
      averageScore: 75.8,
      maxScore: 100,
      passRate: 78.9,
      totalStudents: 38,
      completedDate: '2024-01-30',
      trend: 'Declining'
    }
  ]);

  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([
    {
      id: '1',
      studentName: 'John Doe',
      studentId: 'STU-2024-001',
      grade: 'Grade 10',
      subject: 'Mathematics',
      currentScore: 85,
      previousScore: 78,
      trend: 7,
      performanceLevel: 'Meeting',
      areasForImprovement: ['Algebra', 'Problem-solving speed']
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      studentId: 'STU-2024-002',
      grade: 'Grade 9',
      subject: 'Science',
      currentScore: 92,
      previousScore: 88,
      trend: 4,
      performanceLevel: 'Exceeding',
      areasForImprovement: []
    },
    {
      id: '3',
      studentName: 'Mike Johnson',
      studentId: 'STU-2024-003',
      grade: 'Grade 11',
      subject: 'English',
      currentScore: 68,
      previousScore: 72,
      trend: -4,
      performanceLevel: 'Below',
      areasForImprovement: ['Reading comprehension', 'Essay structure']
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Review': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSecurityColor = (level: string) => {
    switch (level) {
      case 'Confidential': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Standard': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (level: string) => {
    switch (level) {
      case 'Exceeding': return 'bg-green-100 text-green-800';
      case 'Meeting': return 'bg-blue-100 text-blue-800';
      case 'Approaching': return 'bg-yellow-100 text-yellow-800';
      case 'Below': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'Improving': return 'text-green-600';
      case 'Stable': return 'text-blue-600';
      case 'Declining': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const upcomingAssessments = assessmentSchedules.filter(a => a.status === 'Scheduled').length;
  const activeTests = tests.filter(t => t.status === 'Active' || t.status === 'Approved').length;
  const averagePassRate = assessmentResults.reduce((sum, r) => sum + r.passRate, 0) / assessmentResults.length;
  const studentsNeedingSupport = studentProgress.filter(s => s.performanceLevel === 'Below' || s.performanceLevel === 'Approaching').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Student Assessment</h1>
          <p className="text-gray-600 mt-2">Assessment schedules, test development, and results analysis</p>
        </div>
        <Button>Create Assessment</Button>
      </div>

      {/* Overview Stats */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Upcoming Assessments"
          value={upcomingAssessments.toString()}
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatCard
          title="Active Tests"
          value={activeTests.toString()}
          color="green"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <StatCard
          title="Average Pass Rate"
          value={`${averagePassRate.toFixed(1)}%`}
          color="purple"
          trend={{ value: 2.5, isPositive: true }}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Students Needing Support"
          value={studentsNeedingSupport.toString()}
          color="orange"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        />
      </DashboardGrid>

      {/* Assessment Schedule Management */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Assessment Schedule Management</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Statuses</option>
              <option>Scheduled</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <Button size="sm" variant="secondary">Schedule Assessment</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assessmentSchedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{schedule.assessmentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{schedule.assessmentType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{schedule.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{schedule.gradeLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{schedule.scheduledDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{schedule.duration} min</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(schedule.completedStudents / schedule.totalStudents) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        {schedule.completedStudents}/{schedule.totalStudents}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(schedule.status)}`}>
                      {schedule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      {schedule.status === 'Scheduled' && (
                        <button className="text-green-600 hover:text-green-900">Start</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Test Development & Security */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Test Development & Security</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Statuses</option>
              <option>Draft</option>
              <option>Review</option>
              <option>Approved</option>
            </select>
            <Button size="sm" variant="secondary">Create Test</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Security Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{test.testName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{test.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{test.gradeLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{test.testType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{test.totalQuestions}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSecurityColor(test.securityLevel)}`}>
                      {test.securityLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(test.status)}`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      {test.status === 'Draft' && (
                        <button className="text-purple-600 hover:text-purple-900">Edit</button>
                      )}
                      {test.status === 'Review' && (
                        <button className="text-green-600 hover:text-green-900">Approve</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Results Analysis & Reporting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Results Analysis & Reporting</h2>
            <Button size="sm" variant="secondary">Generate Report</Button>
          </div>

          <div className="space-y-4">
            {assessmentResults.map((result) => (
              <div key={result.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-medium text-gray-900">{result.assessmentName}</div>
                    <div className="text-sm text-gray-600">{result.subject} • {result.gradeLevel}</div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTrendColor(result.trend)}`}>
                    {result.trend}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <div className="text-sm text-gray-600">Average Score</div>
                    <div className="text-lg font-semibold text-blue-600">{result.averageScore}/{result.maxScore}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Pass Rate</div>
                    <div className="text-lg font-semibold text-green-600">{result.passRate}%</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Completed: {result.completedDate} • {result.totalStudents} students
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" fullWidth>View Details</Button>
                  <Button size="sm" variant="outline" fullWidth>Export</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Progress Monitoring Systems</h2>

          {studentsNeedingSupport > 0 && (
            <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="flex">
                <svg className="h-5 w-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    {studentsNeedingSupport} student(s) need additional support
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {studentProgress.map((progress) => (
              <div key={progress.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-gray-900">{progress.studentName}</div>
                    <div className="text-sm text-gray-600">{progress.subject} • {progress.grade}</div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPerformanceColor(progress.performanceLevel)}`}>
                    {progress.performanceLevel}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Current Score</span>
                    <span className="font-semibold text-gray-900">{progress.currentScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        progress.currentScore >= 80 ? 'bg-green-600' :
                        progress.currentScore >= 70 ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}
                      style={{ width: `${progress.currentScore}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Previous: {progress.previousScore}%</span>
                  <span className={`font-semibold ${progress.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {progress.trend >= 0 ? '+' : ''}{progress.trend}%
                  </span>
                </div>
                {progress.areasForImprovement.length > 0 && (
                  <div className="mt-2 pt-2 border-t">
                    <div className="text-xs font-medium text-gray-700 mb-1">Areas for Improvement:</div>
                    <div className="flex flex-wrap gap-1">
                      {progress.areasForImprovement.map((area, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-3">
                  <Button size="sm" variant="outline" fullWidth>View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
