import { useState } from 'react';

interface Department {
  id: number;
  code: string;
  name: string;
  head: string;
  budget: number;
  teachers: number;
}

export default function Settings() {
  const [activeSection, setActiveSection] = useState('school');
  const [showSaveModal, setShowSaveModal] = useState(false);
  
  // School Information
  const [schoolName, setSchoolName] = useState('Springfield Elementary');
  const [schoolEmail, setSchoolEmail] = useState('admin@springfield.edu');
  const [schoolPhone, setSchoolPhone] = useState('555-1234');
  const [principalName, setPrincipalName] = useState('Dr. Johnson');
  const [schoolType, setSchoolType] = useState('secondary');
  const [capacity, setCapacity] = useState('1500');
  const [address, setAddress] = useState('123 Education Street, Springfield, IL 62701');

  // Calendar Settings
  const [termStart, setTermStart] = useState('2025-09-01');
  const [termEnd, setTermEnd] = useState('2026-06-15');
  const [holidaysEnabled, setHolidaysEnabled] = useState(true);

  // Grading System
  const [gradingScale, setGradingScale] = useState('standard');
  const [passingGrade, setPassingGrade] = useState('70');
  const [gpaScale, setGpaScale] = useState('4.0');

  // Attendance Rules
  const [tardyMinutes, setTardyMinutes] = useState('15');
  const [excusedDays, setExcusedDays] = useState('10');
  const [notifyParents, setNotifyParents] = useState(true);

  // User Permissions
  const [teacherCanGrade, setTeacherCanGrade] = useState(true);
  const [teacherCanEdit, setTeacherCanEdit] = useState(false);
  const [parentCanMessage, setParentCanMessage] = useState(true);

  // Notifications
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [gradeNotifications, setGradeNotifications] = useState(true);

  // Departments
  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, code: 'MATH', name: 'Mathematics', head: 'Mr. John Smith', budget: 50000, teachers: 8 },
    { id: 2, code: 'ENG', name: 'English', head: 'Mrs. Emily Johnson', budget: 45000, teachers: 7 },
    { id: 3, code: 'SCI', name: 'Science', head: 'Dr. Robert Brown', budget: 65000, teachers: 9 },
    { id: 4, code: 'HIST', name: 'History', head: 'Ms. Lisa Davis', budget: 40000, teachers: 6 },
  ]);
  const [showDeptModal, setShowDeptModal] = useState(false);
  const [showEditDeptModal, setShowEditDeptModal] = useState(false);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [deptFormData, setDeptFormData] = useState({
    code: '',
    name: '',
    head: '',
    budget: 0,
  });

  const sections = [
    { id: 'school', label: 'School Information', icon: '🏫' },
    { id: 'departments', label: 'Departments', icon: '🏢' },
    { id: 'calendar', label: 'Academic Calendar', icon: '📅' },
    { id: 'grading', label: 'Grading System', icon: '📝' },
    { id: 'attendance', label: 'Attendance Rules', icon: '✅' },
    { id: 'permissions', label: 'User Permissions', icon: '🔐' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
  ];

  const handleSave = () => {
    setShowSaveModal(true);
    setTimeout(() => {
      setShowSaveModal(false);
    }, 2000);
  };

  const handleAddDept = () => {
    setDeptFormData({ code: '', name: '', head: '', budget: 0 });
    setShowDeptModal(true);
  };

  const handleEditDept = (dept: Department) => {
    setSelectedDept(dept);
    setDeptFormData({ code: dept.code, name: dept.name, head: dept.head, budget: dept.budget });
    setShowEditDeptModal(true);
  };

  const saveDept = () => {
    const newDept: Department = {
      id: departments.length + 1,
      code: deptFormData.code,
      name: deptFormData.name,
      head: deptFormData.head,
      budget: deptFormData.budget,
      teachers: 0,
    };
    setDepartments([...departments, newDept]);
    setShowDeptModal(false);
  };

  const saveEditDept = () => {
    if (selectedDept) {
      setDepartments(departments.map(d => 
        d.id === selectedDept.id ? { ...d, ...deptFormData } : d
      ));
      setShowEditDeptModal(false);
    }
  };

  const deleteDept = (dept: Department) => {
    if (confirm(`Delete ${dept.name} department?`)) {
      setDepartments(departments.filter(d => d.id !== dept.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage school configuration and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Nav */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                    activeSection === section.id
                      ? 'bg-authority-purple bg-opacity-10 text-authority-purple font-medium'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="text-xl">{section.icon}</span>
                  <span>{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            {/* School Information */}
            {activeSection === 'school' && (
              <>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">School Information</h2>
                  <p className="text-sm text-gray-600 mb-6">Update your school's basic information and contact details</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
                    <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">School Email</label>
                    <input type="email" value={schoolEmail} onChange={(e) => setSchoolEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" value={schoolPhone} onChange={(e) => setSchoolPhone(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Principal Name</label>
                    <input type="text" value={principalName} onChange={(e) => setPrincipalName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">School Type</label>
                    <select value={schoolType} onChange={(e) => setSchoolType(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple">
                      <option value="secondary">Secondary School</option>
                      <option value="primary">Primary School</option>
                      <option value="mixed">Mixed</option>
                      <option value="tertiary">Tertiary</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Student Capacity</label>
                    <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-200 flex justify-end space-x-3">
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={handleSave} className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">Save Changes</button>
                </div>
              </>
            )}

            {/* Departments */}
            {activeSection === 'departments' && (
              <>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Departments</h2>
                    <p className="text-sm text-gray-600 mt-1">Manage school departments and department heads</p>
                  </div>
                  <button onClick={handleAddDept} className="px-4 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm">
                    + Add Department
                  </button>
                </div>
                <div className="space-y-3">
                  {departments.map((dept) => (
                    <div key={dept.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div>
                        <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                        <p className="text-sm text-gray-600">Code: {dept.code} • Head: {dept.head} • {dept.teachers} Teachers</p>
                        <p className="text-sm text-gray-500">Budget: ${dept.budget.toLocaleString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditDept(dept)} className="px-4 py-2 text-blue-600 hover:text-blue-900">Edit</button>
                        <button onClick={() => deleteDept(dept)} className="px-4 py-2 text-red-600 hover:text-red-900">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Academic Calendar */}
            {activeSection === 'calendar' && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Academic Calendar</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year Start</label>
                    <input type="date" value={termStart} onChange={(e) => setTermStart(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year End</label>
                    <input type="date" value={termEnd} onChange={(e) => setTermEnd(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" checked={holidaysEnabled} onChange={(e) => setHolidaysEnabled(e.target.checked)} className="mr-3 h-4 w-4 text-authority-purple focus:ring-authority-purple border-gray-300 rounded" />
                    <label className="text-sm text-gray-700">Enable Holiday Calendar</label>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-200 flex justify-end space-x-3">
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={handleSave} className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">Save Changes</button>
                </div>
              </>
            )}

            {/* Grading System */}
            {activeSection === 'grading' && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Grading System</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Grading Scale</label>
                    <select value={gradingScale} onChange={(e) => setGradingScale(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple">
                      <option value="standard">Standard (A-F)</option>
                      <option value="percentage">Percentage Only</option>
                      <option value="pass-fail">Pass/Fail</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Passing Grade (%)</label>
                    <input type="number" value={passingGrade} onChange={(e) => setPassingGrade(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GPA Scale</label>
                    <select value={gpaScale} onChange={(e) => setGpaScale(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple">
                      <option value="4.0">4.0 Scale</option>
                      <option value="5.0">5.0 Scale (Weighted)</option>
                      <option value="100">100 Point Scale</option>
                    </select>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-200 flex justify-end space-x-3">
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={handleSave} className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">Save Changes</button>
                </div>
              </>
            )}

            {/* Attendance Rules */}
            {activeSection === 'attendance' && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Attendance Rules</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tardy Threshold (minutes)</label>
                    <input type="number" value={tardyMinutes} onChange={(e) => setTardyMinutes(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Excused Absences (per semester)</label>
                    <input type="number" value={excusedDays} onChange={(e) => setExcusedDays(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" checked={notifyParents} onChange={(e) => setNotifyParents(e.target.checked)} className="mr-3 h-4 w-4 text-authority-purple focus:ring-authority-purple border-gray-300 rounded" />
                    <label className="text-sm text-gray-700">Auto-notify parents of absences</label>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-200 flex justify-end space-x-3">
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={handleSave} className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">Save Changes</button>
                </div>
              </>
            )}

            {/* User Permissions */}
            {activeSection === 'permissions' && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">User Permissions</h2>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Teacher Permissions</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" checked={teacherCanGrade} onChange={(e) => setTeacherCanGrade(e.target.checked)} className="mr-3 h-4 w-4 text-authority-purple focus:ring-authority-purple border-gray-300 rounded" />
                        <label className="text-sm text-gray-700">Can enter and modify grades</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" checked={teacherCanEdit} onChange={(e) => setTeacherCanEdit(e.target.checked)} className="mr-3 h-4 w-4 text-authority-purple focus:ring-authority-purple border-gray-300 rounded" />
                        <label className="text-sm text-gray-700">Can edit student records</label>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Parent Permissions</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" checked={parentCanMessage} onChange={(e) => setParentCanMessage(e.target.checked)} className="mr-3 h-4 w-4 text-authority-purple focus:ring-authority-purple border-gray-300 rounded" />
                        <label className="text-sm text-gray-700">Can message teachers directly</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-200 flex justify-end space-x-3">
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={handleSave} className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">Save Changes</button>
                </div>
              </>
            )}

            {/* Notifications */}
            {activeSection === 'notifications' && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive updates via email</p>
                    </div>
                    <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} className="h-4 w-4 text-authority-purple focus:ring-authority-purple border-gray-300 rounded" />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">SMS Notifications</h3>
                      <p className="text-sm text-gray-600">Receive urgent alerts via SMS</p>
                    </div>
                    <input type="checkbox" checked={smsNotifications} onChange={(e) => setSmsNotifications(e.target.checked)} className="h-4 w-4 text-authority-purple focus:ring-authority-purple border-gray-300 rounded" />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">Grade Notifications</h3>
                      <p className="text-sm text-gray-600">Notify when new grades are posted</p>
                    </div>
                    <input type="checkbox" checked={gradeNotifications} onChange={(e) => setGradeNotifications(e.target.checked)} className="h-4 w-4 text-authority-purple focus:ring-authority-purple border-gray-300 rounded" />
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-200 flex justify-end space-x-3">
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={handleSave} className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">Save Changes</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add Department Modal */}
      {showDeptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add Department</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department Code *</label>
                <input type="text" value={deptFormData.code} onChange={(e) => setDeptFormData({...deptFormData, code: e.target.value})} placeholder="e.g., MATH" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department Name *</label>
                <input type="text" value={deptFormData.name} onChange={(e) => setDeptFormData({...deptFormData, name: e.target.value})} placeholder="e.g., Mathematics" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department Head</label>
                <input type="text" value={deptFormData.head} onChange={(e) => setDeptFormData({...deptFormData, head: e.target.value})} placeholder="e.g., Mr. John Smith" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Budget ($)</label>
                <input type="number" value={deptFormData.budget} onChange={(e) => setDeptFormData({...deptFormData, budget: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button onClick={() => setShowDeptModal(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={saveDept} className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">Add Department</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Department Modal */}
      {showEditDeptModal && selectedDept && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Edit Department</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department Code</label>
                <input type="text" value={deptFormData.code} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department Name *</label>
                <input type="text" value={deptFormData.name} onChange={(e) => setDeptFormData({...deptFormData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department Head</label>
                <input type="text" value={deptFormData.head} onChange={(e) => setDeptFormData({...deptFormData, head: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Budget ($)</label>
                <input type="number" value={deptFormData.budget} onChange={(e) => setDeptFormData({...deptFormData, budget: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple" />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button onClick={() => setShowEditDeptModal(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={saveEditDept} className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Save Success Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4 mx-auto">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Settings Saved!</h3>
            <p className="text-gray-600 text-center">Your changes have been saved successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
}
