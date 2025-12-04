import React, { useState } from 'react';
import { Card, Button } from '@apex-providers/ui-components';

// Reusing Modal Component
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function Tasks() {
  const [filter, setFilter] = useState<'all' | 'my-tasks' | 'high-priority'>('all');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'AC Repair - Room 304', type: 'Maintenance', priority: 'High', status: 'Pending', assignee: 'Mike (Engineering)', time: '10:30 AM' },
    { id: 2, title: 'Extra Towels - Room 501', type: 'Housekeeping', priority: 'Normal', status: 'In Progress', assignee: 'Sarah (HK)', time: '11:15 AM' },
    { id: 3, title: 'VIP Amenity Setup - Room 802', type: 'Service', priority: 'High', status: 'Pending', assignee: 'Unassigned', time: '12:00 PM' },
    { id: 4, title: 'Luggage Assistance - Lobby', type: 'Concierge', priority: 'Normal', status: 'Completed', assignee: 'Bell Desk', time: '09:45 AM' },
    { id: 5, title: 'Light Bulb Change - Hallway', type: 'Maintenance', priority: 'Low', status: 'Pending', assignee: 'Unassigned', time: '08:30 AM' },
  ]);

  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'high-priority') return task.priority === 'High';
    if (filter === 'my-tasks') return task.assignee.includes('Sarah'); // Mock current user
    return true;
  });

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const updateStatus = (newStatus: string) => {
    setTasks(prev => prev.map(t => 
      t.id === selectedTask.id ? { ...t, status: newStatus } : t
    ));
    setIsModalOpen(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Normal': return 'text-blue-600 bg-blue-50';
      case 'Low': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'In Progress': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Task Management</h1>
          <p className="text-gray-600 mt-1">Track and resolve operational requests</p>
        </div>
        <Button onClick={() => { setSelectedTask(null); setIsModalOpen(true); }}>+ New Task</Button>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 border-b border-gray-200 pb-1">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
            filter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          All Tasks
        </button>
        <button 
          onClick={() => setFilter('my-tasks')}
          className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
            filter === 'my-tasks' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          My Tasks
        </button>
        <button 
          onClick={() => setFilter('high-priority')}
          className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
            filter === 'high-priority' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          High Priority
        </button>
      </div>

      {/* Kanban-style List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTasks.map((task) => (
          <Card 
            key={task.id} 
            className="hover:shadow-md transition-shadow cursor-pointer border-l-4"
            style={{ borderLeftColor: task.priority === 'High' ? '#ef4444' : task.priority === 'Normal' ? '#3b82f6' : '#9ca3af' }}
            onClick={() => handleTaskClick(task)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-1">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className="text-xs text-gray-500">{task.type} • {task.time}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{task.title}</h3>
                <p className="text-sm text-gray-600 mt-1">Assigned to: {task.assignee}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Task Detail/Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTask ? 'Task Details' : 'Create New Task'}
      >
        <div className="space-y-6">
          {selectedTask ? (
            <>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{selectedTask.title}</h4>
                <div className="flex space-x-2 text-sm">
                  <span className="bg-gray-100 px-2 py-1 rounded">{selectedTask.type}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">Reported at {selectedTask.time}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500 mb-1">Current Status</p>
                <div className="flex items-center justify-between">
                  <span className={`font-bold ${
                    selectedTask.status === 'Completed' ? 'text-green-600' : 
                    selectedTask.status === 'High' ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {selectedTask.status}
                  </span>
                  <div className="space-x-2">
                    {selectedTask.status !== 'In Progress' && selectedTask.status !== 'Completed' && (
                      <button 
                        onClick={() => updateStatus('In Progress')}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Start
                      </button>
                    )}
                    {selectedTask.status !== 'Completed' && (
                      <button 
                        onClick={() => updateStatus('Completed')}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  placeholder="Add completion notes or updates..."
                ></textarea>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Broken Lamp" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Maintenance</option>
                    <option>Housekeeping</option>
                    <option>Guest Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Normal</option>
                    <option>High</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location / Room</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Room 304" />
              </div>
              <div className="pt-4 flex justify-end">
                <Button onClick={() => setIsModalOpen(false)}>Create Task</Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

