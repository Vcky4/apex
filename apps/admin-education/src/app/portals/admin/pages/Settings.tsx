import { useState } from 'react';

export default function Settings() {
  const [activeSection, setActiveSection] = useState('school');
  const [schoolName, setSchoolName] = useState('Springfield Elementary');
  const [schoolEmail, setSchoolEmail] = useState('admin@springfield.edu');
  const [schoolPhone, setSchoolPhone] = useState('555-1234');
  const [principalName, setPrincipalName] = useState('Dr. Johnson');
  const [schoolType, setSchoolType] = useState('secondary');
  const [capacity, setCapacity] = useState('1500');
  const [address, setAddress] = useState('123 Education Street, Springfield, IL 62701');
  const [showSaveModal, setShowSaveModal] = useState(false);

  const sections = [
    { id: 'school', label: 'School Information', icon: '🏫' },
    { id: 'calendar', label: 'Academic Calendar', icon: '📅' },
    { id: 'grading', label: 'Grading System', icon: '📝' },
    { id: 'attendance', label: 'Attendance Rules', icon: '✅' },
    { id: 'permissions', label: 'User Permissions', icon: '🔐' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'integrations', label: 'Integrations', icon: '🔌' },
  ];

  const handleSave = () => {
    setShowSaveModal(true);
    setTimeout(() => {
      setShowSaveModal(false);
    }, 2000);
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
            {activeSection === 'school' && (
              <>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">School Information</h2>
                  <p className="text-sm text-gray-600 mb-6">Update your school's basic information and contact details</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
                    <input
                      type="text"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">School Email</label>
                    <input
                      type="email"
                      value={schoolEmail}
                      onChange={(e) => setSchoolEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={schoolPhone}
                      onChange={(e) => setSchoolPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Principal Name</label>
                    <input
                      type="text"
                      value={principalName}
                      onChange={(e) => setPrincipalName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">School Type</label>
                    <select 
                      value={schoolType}
                      onChange={(e) => setSchoolType(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    >
                      <option value="secondary">Secondary School</option>
                      <option value="primary">Primary School</option>
                      <option value="mixed">Mixed</option>
                      <option value="tertiary">Tertiary</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Student Capacity</label>
                    <input
                      type="number"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                    />
                  </div>
                </div>
              </>
            )}

            {activeSection === 'calendar' && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Academic Calendar</h2>
                <p className="text-gray-600">Academic calendar settings coming soon...</p>
              </>
            )}

            {activeSection === 'grading' && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Grading System</h2>
                <p className="text-gray-600">Grading system configuration coming soon...</p>
              </>
            )}

            {activeSection === 'attendance' && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Attendance Rules</h2>
                <p className="text-gray-600">Attendance rules configuration coming soon...</p>
              </>
            )}

            {activeSection === 'permissions' && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">User Permissions</h2>
                <p className="text-gray-600">Permission settings coming soon...</p>
              </>
            )}

            {activeSection === 'notifications' && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Notifications</h2>
                <p className="text-gray-600">Notification preferences coming soon...</p>
              </>
            )}

            {activeSection === 'integrations' && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Integrations</h2>
                <p className="text-gray-600">Third-party integrations coming soon...</p>
              </>
            )}

            {activeSection === 'school' && (
              <div className="pt-6 border-t border-gray-200 flex justify-end space-x-3">
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

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
