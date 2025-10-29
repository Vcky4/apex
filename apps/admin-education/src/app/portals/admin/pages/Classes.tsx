import { useState, useMemo } from 'react';

interface Class {
  id: number;
  code: string;
  name: string;
  teacher: string;
  grade: string;
  students: number;
  capacity: number;
  schedule: string;
  room: string;
  status: string;
}

export default function Classes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [classes, setClasses] = useState<Class[]>([
    { id: 1, code: 'MATH101', name: 'Algebra I', teacher: 'Mr. John Smith', grade: '9', students: 28, capacity: 30, schedule: 'Mon/Wed/Fri 8:00-9:00', room: '201', status: 'Active' },
    { id: 2, code: 'MATH201', name: 'Algebra II', teacher: 'Mr. John Smith', grade: '10', students: 32, capacity: 32, schedule: 'Mon/Wed/Fri 9:15-10:15', room: '201', status: 'Active' },
    { id: 3, code: 'ENG101', name: 'English Literature', teacher: 'Mrs. Emily Johnson', grade: '10', students: 30, capacity: 32, schedule: 'Tue/Thu 9:15-10:15', room: '105', status: 'Active' },
    { id: 4, code: 'PHY201', name: 'Physics', teacher: 'Dr. Robert Brown', grade: '11', students: 26, capacity: 28, schedule: 'Mon/Wed/Fri 10:30-11:30', room: 'Lab 3', status: 'Active' },
    { id: 5, code: 'HIST101', name: 'World History', teacher: 'Ms. Lisa Davis', grade: '9', students: 29, capacity: 30, schedule: 'Tue/Thu 8:00-9:00', room: '302', status: 'Active' },
    { id: 6, code: 'CALC301', name: 'Calculus', teacher: 'Mr. John Smith', grade: '12', students: 24, capacity: 25, schedule: 'Mon/Wed/Fri 2:15-3:15', room: '201', status: 'Active' },
    { id: 7, code: 'BIO201', name: 'Biology', teacher: 'Dr. Jennifer Taylor', grade: '10', students: 28, capacity: 30, schedule: 'Tue/Thu 10:30-11:30', room: 'Lab 2', status: 'Active' },
    { id: 8, code: 'PE101', name: 'Physical Education', teacher: 'Mr. David Wilson', grade: 'All', students: 120, capacity: 120, schedule: 'Daily 11:45-12:45', room: 'Gym', status: 'Active' },
  ]);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    teacher: '',
    grade: '9',
    capacity: 30,
    schedule: '',
    room: '',
    status: 'Active',
  });

  const filteredClasses = useMemo(() => {
    return classes.filter(cls => {
      const matchesSearch = searchTerm === '' || 
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.code.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGrade = selectedGrade === 'all' || cls.grade === selectedGrade;
      const matchesSubject = selectedSubject === 'all' || true; // Can add subject filtering logic
      
      return matchesSearch && matchesGrade && matchesSubject;
    });
  }, [classes, searchTerm, selectedGrade, selectedSubject]);

  const stats = [
    { label: 'Total Classes', value: classes.length.toString(), icon: '📚' },
    { label: 'Active Courses', value: classes.filter(c => c.status === 'Active').length.toString(), icon: '✅' },
    { label: 'Avg Class Size', value: '28', icon: '👥' },
    { label: 'Utilization', value: '91%', icon: '📊' },
  ];

  const getCapacityColor = (students: number, capacity: number) => {
    const percent = (students / capacity) * 100;
    if (percent >= 95) return 'text-red-600';
    if (percent >= 85) return 'text-orange-600';
    return 'text-green-600';
  };

  // CRUD Functions
  const handleAdd = () => {
    setFormData({
      code: '',
      name: '',
      teacher: '',
      grade: '9',
      capacity: 30,
      schedule: '',
      room: '',
      status: 'Active',
    });
    setShowAddModal(true);
  };

  const handleEdit = (cls: Class) => {
    setSelectedClass(cls);
    setFormData({
      code: cls.code,
      name: cls.name,
      teacher: cls.teacher,
      grade: cls.grade,
      capacity: cls.capacity,
      schedule: cls.schedule,
      room: cls.room,
      status: cls.status,
    });
    setShowEditModal(true);
  };

  const handleDelete = (cls: Class) => {
    setSelectedClass(cls);
    setShowDeleteModal(true);
  };

  const saveAdd = () => {
    const newClass: Class = {
      id: classes.length + 1,
      code: formData.code,
      name: formData.name,
      teacher: formData.teacher,
      grade: formData.grade,
      students: 0,
      capacity: formData.capacity,
      schedule: formData.schedule,
      room: formData.room,
      status: formData.status,
    };
    setClasses([...classes, newClass]);
    setShowAddModal(false);
  };

  const saveEdit = () => {
    if (selectedClass) {
      setClasses(classes.map(c => 
        c.id === selectedClass.id 
          ? { ...c, ...formData, students: c.students }
          : c
      ));
      setShowEditModal(false);
    }
  };

  const confirmDelete = () => {
    if (selectedClass) {
      setClasses(classes.filter(c => c.id !== selectedClass.id));
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Classes & Courses</h1>
          <p className="text-gray-600 mt-2">Manage class schedules and course assignments</p>
        </div>
        <button 
          onClick={handleAdd}
          className="px-6 py-3 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Class</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="search"
            placeholder="Search by class name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
          />
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
          >
            <option value="all">All Grades</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
          >
            <option value="all">All Subjects</option>
            <option value="math">Mathematics</option>
            <option value="english">English</option>
            <option value="science">Science</option>
            <option value="history">History</option>
            <option value="pe">Physical Education</option>
          </select>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <div key={cls.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{cls.name}</h3>
                <p className="text-sm text-gray-500">{cls.code}</p>
              </div>
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">{cls.status}</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-700">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {cls.teacher}
              </div>

              <div className="flex items-center text-sm text-gray-700">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Grade {cls.grade} • {cls.room}
              </div>

              <div className="flex items-center text-sm text-gray-700">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {cls.schedule}
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Enrollment</span>
                  <span className={`text-sm font-semibold ${getCapacityColor(cls.students, cls.capacity)}`}>
                    {cls.students}/{cls.capacity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-authority-purple h-2 rounded-full" 
                    style={{ width: `${(cls.students / cls.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button 
                onClick={() => handleEdit(cls)}
                className="flex-1 px-4 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm"
              >
                Edit Class
              </button>
              <button 
                onClick={() => handleDelete(cls)}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add New Class</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class Code *</label>
                  <input type="text" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teacher *</label>
                  <input type="text" value={formData.teacher} onChange={(e) => setFormData({...formData, teacher: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grade *</label>
                  <select value={formData.grade} onChange={(e) => setFormData({...formData, grade: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple">
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                    <option value="All">All Grades</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capacity *</label>
                  <input type="number" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room *</label>
                  <input type="text" value={formData.room} onChange={(e) => setFormData({...formData, room: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule *</label>
                  <input type="text" value={formData.schedule} onChange={(e) => setFormData({...formData, schedule: e.target.value})} placeholder="e.g., Mon/Wed/Fri 8:00-9:00" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button onClick={() => setShowAddModal(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={saveAdd} className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">Add Class</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Edit Class</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class Code</label>
                  <input type="text" value={formData.code} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50" disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teacher *</label>
                  <input type="text" value={formData.teacher} onChange={(e) => setFormData({...formData, teacher: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grade *</label>
                  <select value={formData.grade} onChange={(e) => setFormData({...formData, grade: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple">
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                    <option value="All">All Grades</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capacity *</label>
                  <input type="number" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room *</label>
                  <input type="text" value={formData.room} onChange={(e) => setFormData({...formData, room: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule *</label>
                  <input type="text" value={formData.schedule} onChange={(e) => setFormData({...formData, schedule: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button onClick={() => setShowEditModal(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={saveEdit} className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Class</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <span className="font-semibold">{selectedClass.name}</span>? This will affect {selectedClass.students} enrolled students.
              </p>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button onClick={() => setShowDeleteModal(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={confirmDelete} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
