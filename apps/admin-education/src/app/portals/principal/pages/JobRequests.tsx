import { useState } from 'react';
import { Card, Button } from '@apex-providers/ui-components';

interface JobRequest {
  id: string;
  position: string;
  department: string;
  priority: 'Urgent' | 'High' | 'Normal' | 'Low';
  status: 'Pending' | 'In Review' | 'Approved' | 'Rejected' | 'Filled';
  description: string;
  requirements: string;
  budget: number;
  requestedDate: string;
  requestedBy: string;
  hrResponse?: string;
}

export default function JobRequests() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [jobRequests, setJobRequests] = useState<JobRequest[]>([
    {
      id: '1',
      position: 'Mathematics Teacher',
      department: 'Mathematics',
      priority: 'Urgent',
      status: 'In Review',
      description: 'Need a qualified mathematics teacher for high school students. Must have experience teaching algebra, geometry, and calculus.',
      requirements: 'Bachelor\'s degree in Mathematics or Education, Teaching certification, 3+ years experience',
      budget: 55000,
      requestedDate: '2025-01-10',
      requestedBy: 'Principal',
      hrResponse: 'Currently reviewing applications. Found 5 qualified candidates.',
    },
    {
      id: '2',
      position: 'Science Lab Assistant',
      department: 'Science',
      priority: 'High',
      status: 'Approved',
      description: 'Assistant needed for science laboratory to help with experiments and maintain equipment.',
      requirements: 'Associate degree in Science, Lab experience preferred',
      budget: 35000,
      requestedDate: '2025-01-05',
      requestedBy: 'Principal',
      hrResponse: 'Position approved. Recruitment process started.',
    },
  ]);

  const [formData, setFormData] = useState({
    position: '',
    department: '',
    priority: 'Normal' as 'Urgent' | 'High' | 'Normal' | 'Low',
    description: '',
    requirements: '',
    budget: '',
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Review': return 'bg-blue-100 text-blue-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Filled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Normal': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: JobRequest = {
      id: `req-${Date.now()}`,
      position: formData.position,
      department: formData.department,
      priority: formData.priority,
      status: 'Pending',
      description: formData.description,
      requirements: formData.requirements,
      budget: parseFloat(formData.budget),
      requestedDate: new Date().toISOString().split('T')[0],
      requestedBy: 'Principal',
    };
    setJobRequests([newRequest, ...jobRequests]);
    setFormData({
      position: '',
      department: '',
      priority: 'Normal',
      description: '',
      requirements: '',
      budget: '',
    });
    setShowAddModal(false);
    // In real app, this would send notification to HR
    alert('Job request submitted! HR has been notified.');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Job Requests</h1>
          <p className="text-gray-600 mt-2">Request new staff positions and track their status</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Job Request
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-sm text-gray-600 mb-1">Total Requests</div>
          <div className="text-2xl font-bold text-charcoal-gray">{jobRequests.length}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">
            {jobRequests.filter(r => r.status === 'Pending').length}
          </div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">In Review</div>
          <div className="text-2xl font-bold text-blue-600">
            {jobRequests.filter(r => r.status === 'In Review').length}
          </div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Approved</div>
          <div className="text-2xl font-bold text-green-600">
            {jobRequests.filter(r => r.status === 'Approved').length}
          </div>
        </Card>
      </div>

      {/* Job Requests List */}
      <div className="space-y-4">
        {jobRequests.map((request) => (
          <Card key={request.id}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-charcoal-gray">{request.position}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                      {request.priority} Priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Department: {request.department}</p>
                  <p className="text-sm text-gray-600">Requested: {new Date(request.requestedDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Budget</div>
                  <div className="text-lg font-bold text-charcoal-gray">${request.budget.toLocaleString()}</div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Description</h4>
                  <p className="text-sm text-gray-600">{request.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Requirements</h4>
                  <p className="text-sm text-gray-600">{request.requirements}</p>
                </div>
                {request.hrResponse && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h4 className="font-semibold text-blue-900 mb-1">HR Response</h4>
                    <p className="text-sm text-blue-800">{request.hrResponse}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {jobRequests.length === 0 && (
        <Card>
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Job Requests</h3>
            <p className="text-gray-500">Click "New Job Request" to submit your first request.</p>
          </div>
        </Card>
      )}

      {/* Add Job Request Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">New Job Request</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position Title *</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    required
                    placeholder="e.g., Mathematics Teacher"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="Social Studies">Social Studies</option>
                    <option value="Physical Education">Physical Education</option>
                    <option value="Arts">Arts</option>
                    <option value="IT Department">IT Department</option>
                    <option value="Library Services">Library Services</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority *</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget ($) *</label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    required
                    placeholder="50000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  rows={4}
                  required
                  placeholder="Describe the position and responsibilities..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Requirements *</label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  rows={3}
                  required
                  placeholder="List required qualifications, experience, certifications..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddModal(false);
                    setFormData({
                      position: '',
                      department: '',
                      priority: 'Normal',
                      description: '',
                      requirements: '',
                      budget: '',
                    });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Submit Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

