import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface Assignment {
  id: string;
  courseCode: string;
  courseName: string;
  assignmentName: string;
  assignmentType: 'Homework' | 'Quiz' | 'Project' | 'Essay' | 'Lab Report' | 'Presentation';
  description: string;
  dueDate: string;
  dueTime: string;
  status: 'Not Started' | 'In Progress' | 'Submitted' | 'Graded' | 'Late' | 'Overdue';
  priority: 'High' | 'Medium' | 'Low';
  points: number;
  submittedDate?: string;
  grade?: number;
  feedback?: string;
  attachments?: string[];
  instructions?: string;
}

export default function Assignments() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterCourse, setFilterCourse] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('dueDate');
  const [showSubmissionModal, setShowSubmissionModal] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState<string | null>(null);
  const [submissionText, setSubmissionText] = useState('');

  const assignments: Assignment[] = [
    {
      id: '1',
      courseCode: 'MATH101',
      courseName: 'Advanced Mathematics',
      assignmentName: 'Quiz 1 - Algebra Fundamentals',
      assignmentType: 'Quiz',
      description: 'Complete quiz covering chapters 1-3 on algebra fundamentals.',
      dueDate: '2024-03-10',
      dueTime: '11:59 PM',
      status: 'Overdue',
      priority: 'High',
      points: 20,
      instructions: 'Complete all 20 questions. Show your work for partial credit.'
    },
    {
      id: '2',
      courseCode: 'ENG201',
      courseName: 'English Literature',
      assignmentName: 'Essay - Shakespeare Analysis',
      assignmentType: 'Essay',
      description: 'Write a 1500-word essay analyzing themes in Shakespeare\'s works.',
      dueDate: '2024-03-15',
      dueTime: '11:59 PM',
      status: 'In Progress',
      priority: 'High',
      points: 100,
      instructions: 'Minimum 1500 words, MLA format, include citations.'
    },
    {
      id: '3',
      courseCode: 'PHYS301',
      courseName: 'Physics - Mechanics',
      assignmentName: 'Lab Report - Motion Experiment',
      assignmentType: 'Lab Report',
      description: 'Complete lab report for motion experiment conducted last week.',
      dueDate: '2024-03-18',
      dueTime: '11:59 PM',
      status: 'Not Started',
      priority: 'Medium',
      points: 50,
      instructions: 'Include hypothesis, methodology, results, and conclusion.'
    },
    {
      id: '4',
      courseCode: 'HIST202',
      courseName: 'World History',
      assignmentName: 'Presentation - WWII Impact',
      assignmentType: 'Presentation',
      description: 'Create a 10-minute presentation on the impact of WWII.',
      dueDate: '2024-03-20',
      dueTime: '2:00 PM',
      status: 'Not Started',
      priority: 'Medium',
      points: 75,
      instructions: '10 slides minimum, include visual aids and references.'
    },
    {
      id: '5',
      courseCode: 'MATH101',
      courseName: 'Advanced Mathematics',
      assignmentName: 'Homework 5 - Calculus Problems',
      assignmentType: 'Homework',
      description: 'Complete problems 1-15 from chapter 5.',
      dueDate: '2024-03-12',
      dueTime: '11:59 PM',
      status: 'Submitted',
      priority: 'Medium',
      points: 30,
      submittedDate: '2024-03-11'
    },
    {
      id: '6',
      courseCode: 'ENG201',
      courseName: 'English Literature',
      assignmentName: 'Reading Response - Poetry',
      assignmentType: 'Essay',
      description: 'Write a 500-word response to assigned poetry readings.',
      dueDate: '2024-03-08',
      dueTime: '11:59 PM',
      status: 'Graded',
      priority: 'Low',
      points: 25,
      submittedDate: '2024-03-07',
      grade: 23,
      feedback: 'Excellent analysis! Your insights on the use of metaphor were particularly strong.'
    },
    {
      id: '7',
      courseCode: 'PHYS301',
      courseName: 'Physics - Mechanics',
      assignmentName: 'Problem Set 4 - Forces',
      assignmentType: 'Homework',
      description: 'Solve problems related to Newton\'s laws and forces.',
      dueDate: '2024-03-14',
      dueTime: '11:59 PM',
      status: 'In Progress',
      priority: 'High',
      points: 40,
      instructions: 'Show all work and include free-body diagrams where applicable.'
    },
    {
      id: '8',
      courseCode: 'CHEM201',
      courseName: 'Chemistry',
      assignmentName: 'Lab Report - Chemical Reactions',
      assignmentType: 'Lab Report',
      description: 'Document the chemical reactions observed in lab session.',
      dueDate: '2024-03-16',
      dueTime: '11:59 PM',
      status: 'Not Started',
      priority: 'Medium',
      points: 50,
      instructions: 'Include balanced equations and safety observations.'
    }
  ];

  const filteredAssignments = assignments.filter(assignment => {
    if (filterStatus !== 'All' && assignment.status !== filterStatus) return false;
    if (filterCourse !== 'All' && assignment.courseCode !== filterCourse) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (sortBy === 'priority') {
      const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  const pendingAssignments = assignments.filter(a => a.status === 'Not Started' || a.status === 'In Progress').length;
  const overdueAssignments = assignments.filter(a => a.status === 'Overdue').length;
  const submittedAssignments = assignments.filter(a => a.status === 'Submitted' || a.status === 'Graded').length;
  const totalPoints = assignments.reduce((sum, a) => sum + a.points, 0);
  const earnedPoints = assignments.filter(a => a.grade).reduce((sum, a) => sum + (a.grade || 0), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Graded': return 'bg-green-100 text-green-800';
      case 'Submitted': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Not Started': return 'bg-gray-100 text-gray-800';
      case 'Late': return 'bg-orange-100 text-orange-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const isOverdue = (dueDate: string, dueTime: string) => {
    const due = new Date(`${dueDate}T${dueTime}`);
    return new Date() > due;
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">My Assignments</h1>
        <p className="text-gray-600 mt-2">Track and manage your assignments</p>
      </div>

      <DashboardGrid columns={4}>
        <StatCard
          title="Pending"
          value={pendingAssignments.toString()}
          color="orange"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title="Overdue"
          value={overdueAssignments.toString()}
          color="red"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
        />
        <StatCard
          title="Submitted"
          value={submittedAssignments.toString()}
          color="green"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title="Points Earned"
          value={`${earnedPoints}/${totalPoints}`}
          color="blue"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
        />
      </DashboardGrid>

      {/* Filters */}
      <Card>
        <div className="p-4">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All</option>
                <option>Not Started</option>
                <option>In Progress</option>
                <option>Submitted</option>
                <option>Graded</option>
                <option>Overdue</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Course</label>
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All</option>
                {Array.from(new Set(assignments.map(a => a.courseCode))).map(code => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => {
          const daysUntilDue = getDaysUntilDue(assignment.dueDate);
          const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0 && assignment.status !== 'Graded' && assignment.status !== 'Submitted';
          
          return (
            <Card key={assignment.id} className={isOverdue(assignment.dueDate, assignment.dueTime) && assignment.status !== 'Graded' && assignment.status !== 'Submitted' ? 'border-l-4 border-red-500' : ''}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-charcoal-gray">{assignment.assignmentName}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                        {assignment.status}
                      </span>
                      <span className={`text-sm font-medium ${getPriorityColor(assignment.priority)}`}>
                        {assignment.priority} Priority
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{assignment.courseCode} - {assignment.courseName}</p>
                    <p className="text-sm text-gray-700">{assignment.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-lg font-bold text-gray-700">{assignment.points} pts</div>
                    {assignment.grade !== undefined && (
                      <div className="text-sm text-gray-600 mt-1">
                        Grade: {assignment.grade}/{assignment.points}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Due: {new Date(assignment.dueDate).toLocaleDateString()} at {assignment.dueTime}
                    {isDueSoon && (
                      <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                        Due Soon!
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Type: {assignment.assignmentType}
                  </div>
                  {assignment.submittedDate && (
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Submitted: {new Date(assignment.submittedDate).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {assignment.feedback && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="text-sm font-semibold text-green-800 mb-1">Feedback:</div>
                    <div className="text-sm text-green-700">{assignment.feedback}</div>
                  </div>
                )}

                {assignment.instructions && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="text-sm font-semibold text-blue-800 mb-1">Instructions:</div>
                    <div className="text-sm text-blue-700">{assignment.instructions}</div>
                  </div>
                )}

                <div className="flex gap-2">
                  {(assignment.status === 'Not Started' || assignment.status === 'In Progress') && (
                    <>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => setShowSubmissionModal(assignment.id)}
                      >
                        Start Assignment
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          navigate(`/student/assignments/${assignment.id}`);
                        }}
                      >
                        View Details
                      </Button>
                    </>
                  )}
                  {assignment.status === 'Submitted' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        alert(`Submission Date: ${assignment.submittedDate}\nAssignment: ${assignment.assignmentName}`);
                      }}
                    >
                      View Submission
                    </Button>
                  )}
                  {assignment.status === 'Graded' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        alert(`Feedback: ${assignment.feedback || 'No feedback available'}\nGrade: ${assignment.grade}/${assignment.points}`);
                      }}
                    >
                      View Feedback
                    </Button>
                  )}
                  {assignment.status === 'Overdue' && (
                    <>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => setShowSubmissionModal(assignment.id)}
                      >
                        Submit Now
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowContactModal(assignment.id)}
                      >
                        Contact Instructor
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredAssignments.length === 0 && (
        <Card>
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No assignments found</h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        </Card>
      )}

      {/* Submission Modal */}
      {showSubmissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-charcoal-gray mb-4">
              Submit Assignment
            </h3>
            {(() => {
              const assignment = assignments.find(a => a.id === showSubmissionModal);
              return assignment ? (
                <>
                  <div className="mb-4">
                    <p className="font-semibold text-charcoal-gray">{assignment.assignmentName}</p>
                    <p className="text-sm text-gray-600">{assignment.courseCode} - {assignment.courseName}</p>
                    {assignment.instructions && (
                      <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">{assignment.instructions}</p>
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Submission</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={8}
                      placeholder="Enter your assignment submission..."
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Attach Files (Optional)</label>
                    <input
                      type="file"
                      multiple
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setShowSubmissionModal(null);
                        setSubmissionText('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        if (!submissionText.trim()) {
                          alert('Please enter your submission');
                          return;
                        }
                        alert('Assignment submitted successfully!');
                        setShowSubmissionModal(null);
                        setSubmissionText('');
                        // In a real app, update the assignment status here
                      }}
                    >
                      Submit Assignment
                    </Button>
                  </div>
                </>
              ) : null;
            })()}
          </div>
        </div>
      )}

      {/* Contact Instructor Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-charcoal-gray mb-4">
              Contact Instructor
            </h3>
            {(() => {
              const assignment = assignments.find(a => a.id === showContactModal);
              return assignment ? (
                <>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Assignment: {assignment.assignmentName}</p>
                    <p className="text-sm text-gray-600 mb-2">Course: {assignment.courseCode} - {assignment.courseName}</p>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="Enter your message..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setShowContactModal(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        alert('Message sent successfully!');
                        setShowContactModal(null);
                      }}
                    >
                      Send Message
                    </Button>
                  </div>
                </>
              ) : null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
