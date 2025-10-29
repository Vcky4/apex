import { useState } from 'react';

interface Assignment {
  id: number;
  title: string;
  class: string;
  dueDate: string;
  submissions: number;
  total: number;
  type: string;
}

export default function Assignments() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, title: 'Math Quiz #5', class: 'Math 101', dueDate: '2025-03-15', submissions: 20, total: 28, type: 'Quiz' },
    { id: 2, title: 'Algebra Homework #12', class: 'Algebra II', dueDate: '2025-03-18', submissions: 30, total: 32, type: 'Homework' },
    { id: 3, title: 'Geometry Test #3', class: 'Geometry', dueDate: '2025-03-20', submissions: 15, total: 30, type: 'Test' },
    { id: 4, title: 'Calculus Project', class: 'Calculus', dueDate: '2025-03-25', submissions: 28, total: 31, type: 'Project' },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    class: 'Math 101',
    dueDate: '',
    type: 'Homework',
    maxScore: 100,
  });

  const saveAssignment = () => {
    const newAssignment: Assignment = {
      id: assignments.length + 1,
      title: formData.title,
      class: formData.class,
      dueDate: formData.dueDate,
      submissions: 0,
      total: 28, // Would get from class roster
      type: formData.type,
    };
    setAssignments([...assignments, newAssignment]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-600 mt-2">Create and manage assignments for your classes</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="px-6 py-3 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Create Assignment</span>
        </button>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
                <p className="text-sm text-gray-500">{assignment.class}</p>
              </div>
              <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{assignment.type}</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Due Date</span>
                <span className="font-medium text-gray-900">{assignment.dueDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Submissions</span>
                <span className="font-medium text-gray-900">{assignment.submissions}/{assignment.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-authority-purple h-2 rounded-full" style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}></div>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-4 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm">
                View Submissions
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Assignment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create Assignment</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Title *</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
                <select value={formData.class} onChange={(e) => setFormData({...formData, class: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple">
                  <option value="Math 101">Math 101</option>
                  <option value="Algebra II">Algebra II</option>
                  <option value="Geometry">Geometry</option>
                  <option value="Pre-Calculus">Pre-Calculus</option>
                  <option value="Calculus">Calculus</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple">
                  <option value="Homework">Homework</option>
                  <option value="Quiz">Quiz</option>
                  <option value="Test">Test</option>
                  <option value="Project">Project</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                <input type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Score</label>
                <input type="number" value={formData.maxScore} onChange={(e) => setFormData({...formData, maxScore: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button onClick={() => setShowAddModal(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={saveAssignment} className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">Create Assignment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
