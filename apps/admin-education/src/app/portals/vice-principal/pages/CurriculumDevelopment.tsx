import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface Curriculum {
  id: string;
  name: string;
  gradeLevel: string;
  subject: string;
  status: 'Draft' | 'Under Review' | 'Approved' | 'Active' | 'Archived';
  version: string;
  createdDate: string;
  lastModified: string;
  createdBy: string;
  description: string;
}

interface CurriculumItem {
  id: string;
  curriculumId: string;
  unit: string;
  topic: string;
  learningObjectives: string[];
  duration: number; // weeks
  resources: string[];
  assessments: string[];
}

interface Review {
  id: string;
  curriculumId: string;
  reviewer: string;
  reviewDate: string;
  status: 'Pending' | 'Approved' | 'Revisions Required';
  comments: string;
  rating: number;
}

export default function CurriculumDevelopment() {
  const [showCreateCurriculumModal, setShowCreateCurriculumModal] = useState(false);
  const [showEditCurriculumModal, setShowEditCurriculumModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showCurriculumDetailsModal, setShowCurriculumDetailsModal] = useState(false);
  const [selectedCurriculum, setSelectedCurriculum] = useState<Curriculum | null>(null);
  const [selectedCurriculumForReview, setSelectedCurriculumForReview] = useState<Curriculum | null>(null);

  const [curriculumFormData, setCurriculumFormData] = useState({
    name: '',
    gradeLevel: '',
    subject: '',
    description: '',
    version: '1.0',
  });

  const [itemFormData, setItemFormData] = useState({
    unit: '',
    topic: '',
    learningObjectives: [''],
    duration: 1,
    resources: [''],
    assessments: [''],
  });

  const [reviewFormData, setReviewFormData] = useState({
    reviewer: '',
    comments: '',
    rating: 5,
    status: 'Pending' as Review['status'],
  });

  const [curricula, setCurricula] = useState<Curriculum[]>([
    {
      id: '1',
      name: 'Mathematics Grade 9',
      gradeLevel: 'Grade 9',
      subject: 'Mathematics',
      status: 'Active',
      version: '2.1',
      createdDate: '2023-08-01',
      lastModified: '2024-01-15',
      createdBy: 'Dr. Smith',
      description: 'Comprehensive mathematics curriculum for Grade 9 students covering algebra, geometry, and statistics.',
    },
    {
      id: '2',
      name: 'English Language Arts Grade 10',
      gradeLevel: 'Grade 10',
      subject: 'English',
      status: 'Under Review',
      version: '1.5',
      createdDate: '2023-09-01',
      lastModified: '2024-01-20',
      createdBy: 'Ms. Johnson',
      description: 'English Language Arts curriculum focusing on literature, writing, and communication skills.',
    },
    {
      id: '3',
      name: 'Science Grade 11',
      gradeLevel: 'Grade 11',
      subject: 'Science',
      status: 'Draft',
      version: '0.8',
      createdDate: '2024-01-10',
      lastModified: '2024-01-22',
      createdBy: 'Dr. White',
      description: 'Advanced science curriculum covering physics, chemistry, and biology.',
    },
  ]);

  const [curriculumItems, setCurriculumItems] = useState<CurriculumItem[]>([
    {
      id: '1',
      curriculumId: '1',
      unit: 'Unit 1: Algebra Fundamentals',
      topic: 'Linear Equations and Inequalities',
      learningObjectives: ['Solve linear equations', 'Graph linear functions', 'Solve systems of equations'],
      duration: 4,
      resources: ['Textbook Chapter 1', 'Online exercises', 'Video tutorials'],
      assessments: ['Quiz 1', 'Unit Test', 'Project'],
    },
  ]);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      curriculumId: '2',
      reviewer: 'Dr. Brown',
      reviewDate: '2024-01-18',
      status: 'Revisions Required',
      comments: 'Need to add more writing exercises and update reading list.',
      rating: 3,
    },
  ]);

  const handleCreateCurriculum = (e: React.FormEvent) => {
    e.preventDefault();
    const newCurriculum: Curriculum = {
      id: `curr-${Date.now()}`,
      name: curriculumFormData.name,
      gradeLevel: curriculumFormData.gradeLevel,
      subject: curriculumFormData.subject,
      status: 'Draft',
      version: curriculumFormData.version,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      createdBy: 'Current User',
      description: curriculumFormData.description,
    };
    setCurricula([newCurriculum, ...curricula]);
    setCurriculumFormData({ name: '', gradeLevel: '', subject: '', description: '', version: '1.0' });
    setShowCreateCurriculumModal(false);
    alert('Curriculum created successfully!');
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCurriculum) return;
    const newItem: CurriculumItem = {
      id: `item-${Date.now()}`,
      curriculumId: selectedCurriculum.id,
      unit: itemFormData.unit,
      topic: itemFormData.topic,
      learningObjectives: itemFormData.learningObjectives.filter(obj => obj.trim() !== ''),
      duration: itemFormData.duration,
      resources: itemFormData.resources.filter(res => res.trim() !== ''),
      assessments: itemFormData.assessments.filter(ass => ass.trim() !== ''),
    };
    setCurriculumItems([...curriculumItems, newItem]);
    setItemFormData({
      unit: '',
      topic: '',
      learningObjectives: [''],
      duration: 1,
      resources: [''],
      assessments: [''],
    });
    setShowAddItemModal(false);
    alert('Curriculum item added successfully!');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCurriculumForReview) return;
    const newReview: Review = {
      id: `review-${Date.now()}`,
      curriculumId: selectedCurriculumForReview.id,
      reviewer: reviewFormData.reviewer,
      reviewDate: new Date().toISOString().split('T')[0],
      status: reviewFormData.status,
      comments: reviewFormData.comments,
      rating: reviewFormData.rating,
    };
    setReviews([...reviews, newReview]);
    
    if (reviewFormData.status === 'Approved') {
      setCurricula(curricula.map(c => 
        c.id === selectedCurriculumForReview.id 
          ? { ...c, status: 'Approved' as const }
          : c
      ));
    }
    
    setReviewFormData({ reviewer: '', comments: '', rating: 5, status: 'Pending' });
    setShowReviewModal(false);
    setSelectedCurriculumForReview(null);
    alert('Review submitted successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const activeCurricula = curricula.filter(c => c.status === 'Active').length;
  const underReview = curricula.filter(c => c.status === 'Under Review').length;
  const drafts = curricula.filter(c => c.status === 'Draft').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Curriculum Development</h1>
          <p className="text-gray-600 mt-2">Design, review, and manage academic curricula</p>
        </div>
        <Button onClick={() => setShowCreateCurriculumModal(true)}>Create Curriculum</Button>
      </div>

      <DashboardGrid columns={3}>
        <StatCard title="Active Curricula" value={activeCurricula.toString()} color="green" />
        <StatCard title="Under Review" value={underReview.toString()} color="yellow" />
        <StatCard title="Drafts" value={drafts.toString()} color="blue" />
      </DashboardGrid>

      {/* Curricula List */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Curricula</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Under Review</option>
              <option>Draft</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Curriculum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {curricula.map((curriculum) => (
                <tr key={curriculum.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{curriculum.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{curriculum.gradeLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{curriculum.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{curriculum.version}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(curriculum.status)}`}>
                      {curriculum.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{curriculum.lastModified}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedCurriculum(curriculum);
                          setShowCurriculumDetailsModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      {curriculum.status === 'Draft' && (
                        <button
                          onClick={() => {
                            setSelectedCurriculum(curriculum);
                            setShowAddItemModal(true);
                          }}
                          className="text-green-600 hover:text-green-900"
                        >
                          Add Item
                        </button>
                      )}
                      {curriculum.status === 'Under Review' && (
                        <button
                          onClick={() => {
                            setSelectedCurriculumForReview(curriculum);
                            setShowReviewModal(true);
                          }}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          Review
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Curriculum Modal */}
      {showCreateCurriculumModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create New Curriculum</h2>
            </div>
            <form onSubmit={handleCreateCurriculum} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Curriculum Name *</label>
                <input
                  type="text"
                  value={curriculumFormData.name}
                  onChange={(e) => setCurriculumFormData({...curriculumFormData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  placeholder="e.g., Mathematics Grade 9"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level *</label>
                  <select
                    value={curriculumFormData.gradeLevel}
                    onChange={(e) => setCurriculumFormData({...curriculumFormData, gradeLevel: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  >
                    <option value="">Select Grade</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    value={curriculumFormData.subject}
                    onChange={(e) => setCurriculumFormData({...curriculumFormData, subject: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                    placeholder="e.g., Mathematics, English"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Version</label>
                <input
                  type="text"
                  value={curriculumFormData.version}
                  onChange={(e) => setCurriculumFormData({...curriculumFormData, version: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="e.g., 1.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={curriculumFormData.description}
                  onChange={(e) => setCurriculumFormData({...curriculumFormData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={4}
                  required
                  placeholder="Describe the curriculum..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateCurriculumModal(false);
                    setCurriculumFormData({ name: '', gradeLevel: '', subject: '', description: '', version: '1.0' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Create Curriculum</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Curriculum Item Modal */}
      {showAddItemModal && selectedCurriculum && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add Curriculum Item - {selectedCurriculum.name}</h2>
            </div>
            <form onSubmit={handleAddItem} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit *</label>
                  <input
                    type="text"
                    value={itemFormData.unit}
                    onChange={(e) => setItemFormData({...itemFormData, unit: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                    placeholder="e.g., Unit 1: Algebra Fundamentals"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topic *</label>
                  <input
                    type="text"
                    value={itemFormData.topic}
                    onChange={(e) => setItemFormData({...itemFormData, topic: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                    placeholder="e.g., Linear Equations"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (weeks) *</label>
                <input
                  type="number"
                  value={itemFormData.duration}
                  onChange={(e) => setItemFormData({...itemFormData, duration: parseInt(e.target.value) || 1})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Learning Objectives *</label>
                {itemFormData.learningObjectives.map((obj, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={obj}
                      onChange={(e) => {
                        const newObjectives = [...itemFormData.learningObjectives];
                        newObjectives[index] = e.target.value;
                        setItemFormData({...itemFormData, learningObjectives: newObjectives});
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder={`Objective ${index + 1}`}
                    />
                    {itemFormData.learningObjectives.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setItemFormData({
                            ...itemFormData,
                            learningObjectives: itemFormData.learningObjectives.filter((_, i) => i !== index),
                          });
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setItemFormData({
                      ...itemFormData,
                      learningObjectives: [...itemFormData.learningObjectives, ''],
                    });
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm mt-2"
                >
                  + Add Objective
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resources</label>
                {itemFormData.resources.map((res, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={res}
                      onChange={(e) => {
                        const newResources = [...itemFormData.resources];
                        newResources[index] = e.target.value;
                        setItemFormData({...itemFormData, resources: newResources});
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder={`Resource ${index + 1}`}
                    />
                    {itemFormData.resources.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setItemFormData({
                            ...itemFormData,
                            resources: itemFormData.resources.filter((_, i) => i !== index),
                          });
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setItemFormData({
                      ...itemFormData,
                      resources: [...itemFormData.resources, ''],
                    });
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm mt-2"
                >
                  + Add Resource
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assessments</label>
                {itemFormData.assessments.map((ass, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={ass}
                      onChange={(e) => {
                        const newAssessments = [...itemFormData.assessments];
                        newAssessments[index] = e.target.value;
                        setItemFormData({...itemFormData, assessments: newAssessments});
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder={`Assessment ${index + 1}`}
                    />
                    {itemFormData.assessments.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setItemFormData({
                            ...itemFormData,
                            assessments: itemFormData.assessments.filter((_, i) => i !== index),
                          });
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setItemFormData({
                      ...itemFormData,
                      assessments: [...itemFormData.assessments, ''],
                    });
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm mt-2"
                >
                  + Add Assessment
                </button>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddItemModal(false);
                    setSelectedCurriculum(null);
                    setItemFormData({
                      unit: '',
                      topic: '',
                      learningObjectives: [''],
                      duration: 1,
                      resources: [''],
                      assessments: [''],
                    });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Add Item</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedCurriculumForReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Review Curriculum - {selectedCurriculumForReview.name}</h2>
            </div>
            <form onSubmit={handleSubmitReview} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reviewer Name *</label>
                <input
                  type="text"
                  value={reviewFormData.reviewer}
                  onChange={(e) => setReviewFormData({...reviewFormData, reviewer: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5) *</label>
                <input
                  type="number"
                  value={reviewFormData.rating}
                  onChange={(e) => setReviewFormData({...reviewFormData, rating: parseInt(e.target.value) || 5})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  min="1"
                  max="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Review Status *</label>
                <select
                  value={reviewFormData.status}
                  onChange={(e) => setReviewFormData({...reviewFormData, status: e.target.value as any})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Revisions Required">Revisions Required</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comments *</label>
                <textarea
                  value={reviewFormData.comments}
                  onChange={(e) => setReviewFormData({...reviewFormData, comments: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={4}
                  required
                  placeholder="Enter your review comments..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowReviewModal(false);
                    setSelectedCurriculumForReview(null);
                    setReviewFormData({ reviewer: '', comments: '', rating: 5, status: 'Pending' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Submit Review</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Curriculum Details Modal */}
      {showCurriculumDetailsModal && selectedCurriculum && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">{selectedCurriculum.name}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
                  <p className="text-gray-900">{selectedCurriculum.gradeLevel}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <p className="text-gray-900">{selectedCurriculum.subject}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Version</label>
                  <p className="text-gray-900">{selectedCurriculum.version}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedCurriculum.status)}`}>
                    {selectedCurriculum.status}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-900">{selectedCurriculum.description}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Curriculum Items</h3>
                <div className="space-y-2">
                  {curriculumItems.filter(item => item.curriculumId === selectedCurriculum.id).map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <div className="font-medium text-gray-900">{item.unit}</div>
                      <div className="text-sm text-gray-600 mt-1">Topic: {item.topic}</div>
                      <div className="text-sm text-gray-600">Duration: {item.duration} weeks</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCurriculumDetailsModal(false);
                    setSelectedCurriculum(null);
                  }}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

