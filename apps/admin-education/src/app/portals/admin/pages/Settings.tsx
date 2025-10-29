import { useState } from 'react';

export default function Settings() {
  const [schoolName, setSchoolName] = useState('Springfield Elementary');
  const [schoolEmail, setSchoolEmail] = useState('admin@springfield.edu');
  const [schoolPhone, setSchoolPhone] = useState('555-1234');
  const [principalName, setPrincipalName] = useState('Dr. Johnson');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage school configuration and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Nav */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <nav className="space-y-1">
              <button className="w-full text-left px-4 py-3 rounded-lg bg-authority-purple bg-opacity-10 text-authority-purple font-medium">
                School Information
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
                Academic Calendar
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
                Grading System
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
                Attendance Rules
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
                User Permissions
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
                Notifications
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
                Integrations
              </button>
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
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
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple">
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
                  defaultValue="1500"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  rows={3}
                  defaultValue="123 Education Street, Springfield, IL 62701"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 flex justify-end space-x-3">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
