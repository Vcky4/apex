import { useState } from 'react';
import { Card, Button } from '@apex-providers/ui-components';

interface Question {
  id: number;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  options?: string[];
  correctAnswer?: string;
  points: number;
}

interface Assignment {
  id: number;
  title: string;
  class: string;
  dueDate: string;
  submissions: number;
  total: number;
  type: 'Homework' | 'Quiz' | 'Test' | 'Exam' | 'Assignment';
  questions?: Question[];
  maxScore: number;
}

interface StudentAnswer {
  studentId: string;
  studentName: string;
  answers: { questionId: number; answer: string; score?: number; maxScore: number }[];
  submittedDate: string;
  totalScore?: number;
  graded: boolean;
}

export default function Assignments() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);
  const [showSubmissionsModal, setShowSubmissionsModal] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [selectedStudentAnswer, setSelectedStudentAnswer] = useState<StudentAnswer | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  
  const [assignments, setAssignments] = useState<Assignment[]>([
    { 
      id: 1, 
      title: 'Math Quiz #5', 
      class: 'Math 101', 
      dueDate: '2025-03-15', 
      submissions: 20, 
      total: 28, 
      type: 'Quiz',
      maxScore: 100,
      questions: [
        { id: 1, question: 'What is 2 + 2?', type: 'multiple-choice', options: ['3', '4', '5', '6'], correctAnswer: '4', points: 10 },
        { id: 2, question: 'Solve for x: 2x + 5 = 15', type: 'short-answer', correctAnswer: '5', points: 15 },
      ]
    },
    { 
      id: 2, 
      title: 'Algebra Test #3', 
      class: 'Algebra II', 
      dueDate: '2025-03-20', 
      submissions: 15, 
      total: 32, 
      type: 'Test',
      maxScore: 100,
    },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    class: 'Math 101',
    dueDate: '',
    type: 'Homework',
    maxScore: 100,
  });

  const [newQuestion, setNewQuestion] = useState<Question>({
    id: 0,
    question: '',
    type: 'multiple-choice',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 10,
  });

  const studentAnswers: StudentAnswer[] = [
    {
      studentId: 'STU001',
      studentName: 'Alex Johnson',
      answers: [
        { questionId: 1, answer: '4', score: 10, maxScore: 10 },
        { questionId: 2, answer: '5', score: 15, maxScore: 15 },
      ],
      submittedDate: '2025-03-14 10:30 AM',
      totalScore: 25,
      graded: true,
    },
    {
      studentId: 'STU002',
      studentName: 'Emma Davis',
      answers: [
        { questionId: 1, answer: '4', score: undefined, maxScore: 10 },
        { questionId: 2, answer: 'x = 5', score: undefined, maxScore: 15 },
      ],
      submittedDate: '2025-03-14 2:15 PM',
      graded: false,
    },
  ];

  const handleCreateAssignment = () => {
    if (questions.length === 0 && (formData.type === 'Quiz' || formData.type === 'Test' || formData.type === 'Exam')) {
      alert('Please add at least one question for ' + formData.type);
      return;
    }
    const newAssignment: Assignment = {
      id: assignments.length + 1,
      title: formData.title,
      class: formData.class,
      dueDate: formData.dueDate,
      submissions: 0,
      total: 28,
      type: formData.type as Assignment['type'],
      maxScore: formData.maxScore,
      questions: questions.length > 0 ? questions : undefined,
    };
    setAssignments([...assignments, newAssignment]);
    setShowAddModal(false);
    setShowQuestionsModal(false);
    setQuestions([]);
    setFormData({ title: '', class: 'Math 101', dueDate: '', type: 'Homework', maxScore: 100 });
    alert('Assignment created! All students in ' + formData.class + ' have been notified.');
  };

  const handleAddQuestion = () => {
    if (!newQuestion.question) {
      alert('Please enter a question');
      return;
    }
    if (newQuestion.type === 'multiple-choice' && (!newQuestion.options || newQuestion.options.some(o => !o))) {
      alert('Please fill all option fields');
      return;
    }
    if (!newQuestion.correctAnswer) {
      alert('Please provide a correct answer');
      return;
    }
    const question: Question = {
      ...newQuestion,
      id: questions.length + 1,
    };
    setQuestions([...questions, question]);
    setNewQuestion({
      id: 0,
      question: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 10,
    });
  };

  const handleViewAnswers = (assignment: Assignment, studentAnswer: StudentAnswer) => {
    setSelectedAssignment(assignment);
    setSelectedStudentAnswer(studentAnswer);
    setShowAnswerModal(true);
  };

  const handleGradeAnswer = (questionId: number, score: number) => {
    if (!selectedStudentAnswer) return;
    const updatedAnswers = selectedStudentAnswer.answers.map(a =>
      a.questionId === questionId ? { ...a, score } : a
    );
    const totalScore = updatedAnswers.reduce((sum, a) => sum + (a.score || 0), 0);
    setSelectedStudentAnswer({
      ...selectedStudentAnswer,
      answers: updatedAnswers,
      totalScore,
      graded: updatedAnswers.every(a => a.score !== undefined),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assignments, Tests & Exams</h1>
          <p className="text-gray-600 mt-2">Create and manage assignments, tests, and exams for your classes</p>
        </div>
        <button 
          onClick={() => {
            setShowAddModal(true);
            setQuestions([]);
          }} 
          className="px-6 py-3 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Create Assignment</span>
        </button>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((assignment) => (
          <Card key={assignment.id}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
                  <p className="text-sm text-gray-500">{assignment.class}</p>
                </div>
                <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{assignment.type}</span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Due Date</span>
                  <span className="font-medium text-gray-900">{assignment.dueDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Submissions</span>
                  <span className="font-medium text-gray-900">{assignment.submissions}/{assignment.total}</span>
                </div>
                {assignment.questions && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Questions</span>
                    <span className="font-medium text-gray-900">{assignment.questions.length}</span>
                  </div>
                )}
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-authority-purple h-2 rounded-full" style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}></div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setSelectedAssignment(assignment);
                    setShowSubmissionsModal(true);
                  }}
                  className="flex-1 px-4 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm"
                >
                  View Submissions
                </button>
                {assignment.questions && (
                  <button 
                    onClick={() => {
                      setSelectedAssignment(assignment);
                      setShowQuestionsModal(true);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    View Questions
                  </button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Assignment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create Assignment</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Title *</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
                  <select 
                    value={formData.class} 
                    onChange={(e) => setFormData({...formData, class: e.target.value})} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  >
                    <option value="Math 101">Math 101</option>
                    <option value="Algebra II">Algebra II</option>
                    <option value="Geometry">Geometry</option>
                    <option value="Pre-Calculus">Pre-Calculus</option>
                    <option value="Calculus">Calculus</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                  <select 
                    value={formData.type} 
                    onChange={(e) => setFormData({...formData, type: e.target.value})} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  >
                    <option value="Homework">Homework</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Test">Test</option>
                    <option value="Exam">Exam</option>
                    <option value="Assignment">Assignment</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                  <input 
                    type="date" 
                    value={formData.dueDate} 
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Score</label>
                  <input 
                    type="number" 
                    value={formData.maxScore} 
                    onChange={(e) => setFormData({...formData, maxScore: parseInt(e.target.value)})} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" 
                  />
                </div>
              </div>

              {/* Questions Section for Quiz/Test/Exam */}
              {(formData.type === 'Quiz' || formData.type === 'Test' || formData.type === 'Exam') && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Questions ({questions.length})</h3>
                    <button
                      onClick={() => setShowQuestionsModal(true)}
                      className="px-4 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 text-sm"
                    >
                      Add Question
                    </button>
                  </div>
                  {questions.length > 0 && (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {questions.map((q, idx) => (
                        <div key={q.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">Q{idx + 1}: {q.question}</p>
                              <p className="text-xs text-gray-600 mt-1">{q.type} • {q.points} points</p>
                            </div>
                            <button
                              onClick={() => setQuestions(questions.filter(q2 => q2.id !== q.id))}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setQuestions([]);
                  setFormData({ title: '', class: 'Math 101', dueDate: '', type: 'Homework', maxScore: 100 });
                }} 
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateAssignment} 
                className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Create Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Question Modal */}
      {showQuestionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add Question</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question *</label>
                <textarea
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question Type *</label>
                  <select
                    value={newQuestion.type}
                    onChange={(e) => {
                      const type = e.target.value as Question['type'];
                      setNewQuestion({
                        ...newQuestion,
                        type,
                        options: type === 'multiple-choice' ? ['', '', '', ''] : undefined,
                      });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="true-false">True/False</option>
                    <option value="short-answer">Short Answer</option>
                    <option value="essay">Essay</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Points *</label>
                  <input
                    type="number"
                    value={newQuestion.points}
                    onChange={(e) => setNewQuestion({...newQuestion, points: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
              </div>
              {newQuestion.type === 'multiple-choice' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Options *</label>
                  {newQuestion.options?.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={newQuestion.correctAnswer === option}
                        onChange={() => setNewQuestion({...newQuestion, correctAnswer: option})}
                        className="w-4 h-4"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const options = [...(newQuestion.options || [])];
                          options[idx] = e.target.value;
                          setNewQuestion({...newQuestion, options});
                        }}
                        placeholder={`Option ${idx + 1}`}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                      />
                    </div>
                  ))}
                </div>
              )}
              {(newQuestion.type === 'short-answer' || newQuestion.type === 'essay' || newQuestion.type === 'true-false') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer / Expected Response *</label>
                  {newQuestion.type === 'true-false' ? (
                    <select
                      value={newQuestion.correctAnswer}
                      onChange={(e) => setNewQuestion({...newQuestion, correctAnswer: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    >
                      <option value="">Select...</option>
                      <option value="True">True</option>
                      <option value="False">False</option>
                    </select>
                  ) : (
                    <textarea
                      value={newQuestion.correctAnswer}
                      onChange={(e) => setNewQuestion({...newQuestion, correctAnswer: e.target.value})}
                      rows={newQuestion.type === 'essay' ? 4 : 2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    />
                  )}
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowQuestionsModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleAddQuestion();
                  setShowQuestionsModal(false);
                }}
                className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Add Question
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Submissions Modal */}
      {showSubmissionsModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Submissions: {selectedAssignment.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{selectedAssignment.class} • Due: {selectedAssignment.dueDate}</p>
            </div>
            <div className="p-6">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date/Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {studentAnswers.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900">{sub.studentName}</p>
                          <p className="text-sm text-gray-500">{sub.studentId}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Yes</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{sub.submittedDate}</td>
                      <td className="px-4 py-3">
                        {sub.totalScore !== undefined ? (
                          <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                            sub.totalScore >= 90 ? 'bg-green-100 text-green-800' :
                            sub.totalScore >= 80 ? 'bg-blue-100 text-blue-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {sub.totalScore}/{selectedAssignment.maxScore}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          sub.graded ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {sub.graded ? 'Graded' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleViewAnswers(selectedAssignment, sub)}
                          className="text-blue-600 hover:text-blue-900 text-sm"
                        >
                          View Answers
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button 
                onClick={() => setShowSubmissionsModal(false)} 
                className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Answers Modal */}
      {showAnswerModal && selectedAssignment && selectedStudentAnswer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Student Answers</h2>
              <p className="text-sm text-gray-600 mt-1">
                {selectedStudentAnswer.studentName} ({selectedStudentAnswer.studentId}) • {selectedAssignment.title}
              </p>
            </div>
            <div className="p-6 space-y-6">
              {selectedAssignment.questions?.map((question, idx) => {
                const answer = selectedStudentAnswer.answers.find(a => a.questionId === question.id);
                return (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Question {idx + 1}: {question.question}</h3>
                        <p className="text-sm text-gray-600 mt-1">{question.type} • {question.points} points</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Score</p>
                        <p className="text-lg font-bold text-gray-900">
                          {answer?.score !== undefined ? `${answer.score}/${answer.maxScore}` : 'Not Graded'}
                        </p>
                      </div>
                    </div>
                    {question.type === 'multiple-choice' && question.options && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm font-medium text-gray-700">Options:</p>
                        {question.options.map((option, optIdx) => (
                          <div
                            key={optIdx}
                            className={`p-2 rounded ${
                              option === question.correctAnswer ? 'bg-green-100 border-2 border-green-500' :
                              option === answer?.answer ? 'bg-red-100 border-2 border-red-500' :
                              'bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                checked={option === answer?.answer}
                                disabled
                                className="w-4 h-4"
                              />
                              <span className="text-sm">{option}</span>
                              {option === question.correctAnswer && (
                                <span className="ml-auto text-xs text-green-600 font-medium">✓ Correct</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {(question.type === 'short-answer' || question.type === 'essay' || question.type === 'true-false') && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Student Answer:</p>
                        <div className="p-3 bg-gray-50 rounded border border-gray-200">
                          <p className="text-sm text-gray-900">{answer?.answer || 'No answer provided'}</p>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700 mb-1">Correct Answer:</p>
                          <p className="text-sm text-green-700 font-medium">{question.correctAnswer}</p>
                        </div>
                      </div>
                    )}
                    <div className="mt-4 flex items-center space-x-3">
                      <label className="text-sm font-medium text-gray-700">Grade:</label>
                      <input
                        type="number"
                        min="0"
                        max={answer?.maxScore || question.points}
                        value={answer?.score || ''}
                        onChange={(e) => handleGradeAnswer(question.id, parseInt(e.target.value) || 0)}
                        className="w-24 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                        placeholder="0"
                      />
                      <span className="text-sm text-gray-600">/ {answer?.maxScore || question.points}</span>
                    </div>
                  </div>
                );
              })}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-900">Total Score:</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedStudentAnswer.totalScore || 0}/{selectedAssignment.maxScore}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAnswerModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Grades saved successfully!');
                  setShowAnswerModal(false);
                }}
                className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Save Grades
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
