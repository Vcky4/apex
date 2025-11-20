import { useState } from 'react';
import { Button } from '@apex-providers/ui-components';

interface GradeRecord {
  id: number;
  student: string;
  studentId: string;
  class: string;
  assignment: string;
  assignmentType: 'CA' | 'Assignment' | 'Quiz' | 'Test' | 'Project' | 'Exam' | 'Other';
  submitted: boolean;
  score?: number;
  maxScore: number;
  graded: boolean;
  date: string;
}

interface Student {
  id: string;
  name: string;
  studentId: string;
  classId: string;
  className: string;
}

interface Course {
  id: string;
  code: string;
  name: string;
}

export default function Grading() {
  const [selectedClass, setSelectedClass] = useState('all');
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showAddGradeModal, setShowAddGradeModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<GradeRecord | null>(null);
  const [score, setScore] = useState('');

  const [addGradeFormData, setAddGradeFormData] = useState({
    studentId: '',
    studentName: '',
    courseId: '',
    courseName: '',
    assignmentType: 'CA' as GradeRecord['assignmentType'],
    assignmentName: '',
    score: '',
    maxScore: '100',
    date: new Date().toISOString().split('T')[0],
  });

  const [students] = useState<Student[]>([
    { id: '1', name: 'Alex Johnson', studentId: 'STU001', classId: '1', className: 'Math 101' },
    { id: '2', name: 'Emma Davis', studentId: 'STU002', classId: '2', className: 'Algebra II' },
    { id: '3', name: 'Michael Brown', studentId: 'STU003', classId: '3', className: 'Geometry' },
    { id: '4', name: 'Sarah Wilson', studentId: 'STU004', classId: '4', className: 'Pre-Calculus' },
    { id: '5', name: 'James Martinez', studentId: 'STU005', classId: '1', className: 'Math 101' },
    { id: '6', name: 'Olivia Garcia', studentId: 'STU006', classId: '5', className: 'Calculus' },
  ]);

  const [courses] = useState<Course[]>([
    { id: '1', code: 'MATH101', name: 'Math 101 - Grade 9' },
    { id: '2', code: 'MATH201', name: 'Algebra II - Grade 10' },
    { id: '3', code: 'GEOM201', name: 'Geometry - Grade 10' },
    { id: '4', code: 'CALC201', name: 'Pre-Calculus - Grade 11' },
    { id: '5', code: 'CALC301', name: 'Calculus - Grade 12' },
  ]);

  const [gradeRecords, setGradeRecords] = useState<GradeRecord[]>([
    { id: 1, student: 'Alex Johnson', studentId: 'STU001', class: 'Math 101', assignment: 'Quiz #5', assignmentType: 'Quiz', submitted: true, score: 92, maxScore: 100, graded: true, date: '2024-01-15' },
    { id: 2, student: 'Emma Davis', studentId: 'STU002', class: 'Algebra II', assignment: 'Homework #12', assignmentType: 'Assignment', submitted: true, score: 88, maxScore: 100, graded: true, date: '2024-01-18' },
    { id: 3, student: 'Michael Brown', studentId: 'STU003', class: 'Geometry', assignment: 'Test #3', assignmentType: 'Test', submitted: true, maxScore: 100, graded: false, date: '2024-01-20' },
    { id: 4, student: 'Sarah Wilson', studentId: 'STU004', class: 'Pre-Calculus', assignment: 'Project', assignmentType: 'Project', submitted: true, score: 95, maxScore: 100, graded: true, date: '2024-01-22' },
    { id: 5, student: 'James Martinez', studentId: 'STU005', class: 'Math 101', assignment: 'Quiz #5', assignmentType: 'Quiz', submitted: true, maxScore: 100, graded: false, date: '2024-01-15' },
    { id: 6, student: 'Olivia Garcia', studentId: 'STU006', class: 'Calculus', assignment: 'Midterm', assignmentType: 'Exam', submitted: false, maxScore: 100, graded: false, date: '2024-01-25' },
  ]);

  const handleGrade = (record: GradeRecord) => {
    setSelectedRecord(record);
    setScore(record.score?.toString() || '');
    setShowGradeModal(true);
  };

  const saveGrade = () => {
    if (selectedRecord && score) {
      setGradeRecords(gradeRecords.map(r => 
        r.id === selectedRecord.id 
          ? { ...r, score: parseInt(score), graded: true }
          : r
      ));
      setShowGradeModal(false);
    }
  };

  const handleAddNewGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addGradeFormData.studentId || !addGradeFormData.courseId || !addGradeFormData.assignmentName || !addGradeFormData.score) {
      alert('Please fill in all required fields');
      return;
    }

    const newGrade: GradeRecord = {
      id: gradeRecords.length + 1,
      student: addGradeFormData.studentName,
      studentId: addGradeFormData.studentId,
      class: addGradeFormData.courseName,
      assignment: addGradeFormData.assignmentName,
      assignmentType: addGradeFormData.assignmentType,
      submitted: true,
      score: parseInt(addGradeFormData.score),
      maxScore: parseInt(addGradeFormData.maxScore),
      graded: true,
      date: addGradeFormData.date,
    };

    setGradeRecords([newGrade, ...gradeRecords]);
    setAddGradeFormData({
      studentId: '',
      studentName: '',
      courseId: '',
      courseName: '',
      assignmentType: 'CA',
      assignmentName: '',
      score: '',
      maxScore: '100',
      date: new Date().toISOString().split('T')[0],
    });
    setShowAddGradeModal(false);
    alert('Grade added successfully!');
  };

  const filteredStudents = addGradeFormData.courseId 
    ? students.filter(s => s.classId === addGradeFormData.courseId)
    : students;

  const pendingCount = gradeRecords.filter(r => r.submitted && !r.graded).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Grading</h1>
          <p className="text-gray-600 mt-2">Grade student assignments and track progress</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg font-semibold">
            {pendingCount} Pending
          </div>
          <Button onClick={() => setShowAddGradeModal(true)}>Add New Grade</Button>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
        >
          <option value="all">All Classes</option>
          <option value="Math 101">Math 101</option>
          <option value="Algebra II">Algebra II</option>
          <option value="Geometry">Geometry</option>
          <option value="Pre-Calculus">Pre-Calculus</option>
          <option value="Calculus">Calculus</option>
        </select>
      </div>

      {/* Grading Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {gradeRecords.filter(r => selectedClass === 'all' || r.class === selectedClass).map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.student}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      record.assignmentType === 'CA' ? 'bg-blue-100 text-blue-800' :
                      record.assignmentType === 'Exam' ? 'bg-red-100 text-red-800' :
                      record.assignmentType === 'Test' ? 'bg-orange-100 text-orange-800' :
                      record.assignmentType === 'Quiz' ? 'bg-purple-100 text-purple-800' :
                      record.assignmentType === 'Project' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {record.assignmentType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.assignment}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.graded ? (
                      <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        (record.score! / record.maxScore * 100) >= 90 ? 'bg-green-100 text-green-800' :
                        (record.score! / record.maxScore * 100) >= 80 ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {record.score}/{record.maxScore}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">Not Graded                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {!record.submitted ? (
                      <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Not Submitted</span>
                    ) : record.graded ? (
                      <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">✓ Graded</span>
                    ) : (
                      <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-800">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {record.submitted && !record.graded && (
                      <button 
                        onClick={() => handleGrade(record)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        Grade Now
                      </button>
                    )}
                    {record.graded && (
                      <button 
                        onClick={() => handleGrade(record)}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Modal */}
      {showGradeModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Grade Assignment</h2>
              <p className="text-sm text-gray-600 mt-1">{selectedRecord.student} - {selectedRecord.assignment}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Score (out of {selectedRecord.maxScore})</label>
                <input
                  type="number"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  max={selectedRecord.maxScore}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                />
              </div>
              {score && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Grade:</p>
                  <p className="text-2xl font-bold text-gray-900">{Math.round((parseInt(score) / selectedRecord.maxScore) * 100)}%</p>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button onClick={() => setShowGradeModal(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={saveGrade} className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">Save Grade</button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Grade Modal */}
      {showAddGradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add New Grade</h2>
              <p className="text-sm text-gray-600 mt-1">Select student, course, and assignment to add a grade</p>
            </div>
            <form onSubmit={handleAddNewGrade} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course/Class *</label>
                <select
                  value={addGradeFormData.courseId}
                  onChange={(e) => {
                    const selectedCourse = courses.find(c => c.id === e.target.value);
                    setAddGradeFormData({
                      ...addGradeFormData,
                      courseId: e.target.value,
                      courseName: selectedCourse?.name || '',
                      studentId: '', // Reset student when course changes
                      studentName: '',
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>{course.name} ({course.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student *</label>
                <select
                  value={addGradeFormData.studentId}
                  onChange={(e) => {
                    const selectedStudent = students.find(s => s.id === e.target.value);
                    setAddGradeFormData({
                      ...addGradeFormData,
                      studentId: e.target.value,
                      studentName: selectedStudent?.name || '',
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  required
                  disabled={!addGradeFormData.courseId}
                >
                  <option value="">{addGradeFormData.courseId ? 'Select Student' : 'Select Course First'}</option>
                  {filteredStudents.map((student) => (
                    <option key={student.id} value={student.id}>{student.name} ({student.studentId})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Type *</label>
                  <select
                    value={addGradeFormData.assignmentType}
                    onChange={(e) => setAddGradeFormData({...addGradeFormData, assignmentType: e.target.value as any})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    required
                  >
                    <option value="CA">CA (Continuous Assessment)</option>
                    <option value="Assignment">Assignment</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Test">Test</option>
                    <option value="Project">Project</option>
                    <option value="Exam">Exam</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Name *</label>
                  <input
                    type="text"
                    value={addGradeFormData.assignmentName}
                    onChange={(e) => setAddGradeFormData({...addGradeFormData, assignmentName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    required
                    placeholder="e.g., Quiz #5, CA 1, Final Project"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Score *</label>
                  <input
                    type="number"
                    value={addGradeFormData.score}
                    onChange={(e) => setAddGradeFormData({...addGradeFormData, score: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    required
                    min="0"
                    max={addGradeFormData.maxScore}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Score *</label>
                  <input
                    type="number"
                    value={addGradeFormData.maxScore}
                    onChange={(e) => setAddGradeFormData({...addGradeFormData, maxScore: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    required
                    min="1"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={addGradeFormData.date}
                    onChange={(e) => setAddGradeFormData({...addGradeFormData, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    required
                  />
                </div>
              </div>

              {addGradeFormData.score && addGradeFormData.maxScore && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Grade Preview:</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round((parseInt(addGradeFormData.score) / parseInt(addGradeFormData.maxScore)) * 100)}%
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {addGradeFormData.score} / {addGradeFormData.maxScore} points
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddGradeModal(false);
                    setAddGradeFormData({
                      studentId: '',
                      studentName: '',
                      courseId: '',
                      courseName: '',
                      assignmentType: 'CA',
                      assignmentName: '',
                      score: '',
                      maxScore: '100',
                      date: new Date().toISOString().split('T')[0],
                    });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Add Grade</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
