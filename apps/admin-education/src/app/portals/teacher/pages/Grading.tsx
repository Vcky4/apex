import { useState } from 'react';

interface GradeRecord {
  id: number;
  student: string;
  studentId: string;
  class: string;
  assignment: string;
  submitted: boolean;
  score?: number;
  maxScore: number;
  graded: boolean;
}

export default function Grading() {
  const [selectedClass, setSelectedClass] = useState('all');
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<GradeRecord | null>(null);
  const [score, setScore] = useState('');

  const [gradeRecords, setGradeRecords] = useState<GradeRecord[]>([
    { id: 1, student: 'Alex Johnson', studentId: 'STU001', class: 'Math 101', assignment: 'Quiz #5', submitted: true, score: 92, maxScore: 100, graded: true },
    { id: 2, student: 'Emma Davis', studentId: 'STU002', class: 'Algebra II', assignment: 'Homework #12', submitted: true, score: 88, maxScore: 100, graded: true },
    { id: 3, student: 'Michael Brown', studentId: 'STU003', class: 'Geometry', assignment: 'Test #3', submitted: true, maxScore: 100, graded: false },
    { id: 4, student: 'Sarah Wilson', studentId: 'STU004', class: 'Pre-Calculus', assignment: 'Project', submitted: true, score: 95, maxScore: 100, graded: true },
    { id: 5, student: 'James Martinez', studentId: 'STU005', class: 'Math 101', assignment: 'Quiz #5', submitted: true, maxScore: 100, graded: false },
    { id: 6, student: 'Olivia Garcia', studentId: 'STU006', class: 'Calculus', assignment: 'Midterm', submitted: false, maxScore: 100, graded: false },
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

  const pendingCount = gradeRecords.filter(r => r.submitted && !r.graded).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Grading</h1>
          <p className="text-gray-600 mt-2">Grade student assignments and track progress</p>
        </div>
        <div className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg font-semibold">
          {pendingCount} Pending
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {gradeRecords.filter(r => selectedClass === 'all' || r.class === selectedClass).map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.student}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.class}</td>
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
                      <span className="text-sm text-gray-400">Not Graded</span>
                    )}
                  </td>
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
    </div>
  );
}
