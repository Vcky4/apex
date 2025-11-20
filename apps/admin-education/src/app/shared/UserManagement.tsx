import { useState } from 'react';
import { Card } from '@apex-providers/ui-components';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Pending' | 'Inactive';
  createdAt: string;
  department?: string;
}

interface UserManagementProps {
  currentUserRole: string;
  onCreateUser: (userData: any) => void;
  managedUsers: User[];
}

export default function UserManagement({ currentUserRole, onCreateUser, managedUsers }: UserManagementProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    password: '',
  });

  // Define which roles can be created by each role
  const getAvailableRoles = (role: string): { value: string; label: string }[] => {
    switch (role) {
      case 'OWNER':
        return [
          { value: 'PRINCIPAL', label: 'Principal' },
        ];
      case 'PRINCIPAL':
        return [
          { value: 'TEACHER', label: 'Teacher' },
          { value: 'PARENT', label: 'Parent' },
          { value: 'STUDENT', label: 'Student' },
          { value: 'VICE_PRINCIPAL', label: 'Vice Principal' },
        ];
      case 'HR_EXECUTIVE':
        return [
          { value: 'TEACHER', label: 'Teacher' },
          { value: 'PARENT', label: 'Parent' },
          { value: 'STUDENT', label: 'Student' },
        ];
      case 'VICE_PRINCIPAL':
        return [
          { value: 'TEACHER', label: 'Teacher' },
        ];
      default:
        return [];
    }
  };

  const availableRoles = getAvailableRoles(currentUserRole);
  const departments = ['Science', 'Mathematics', 'English', 'Social Studies'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      // Update existing user
      onCreateUser({
        ...formData,
        id: editingUser.id,
        status: editingUser.status,
        createdAt: editingUser.createdAt,
      });
    } else {
      // Create new user
      const userData = {
        ...formData,
        id: `user-${Date.now()}`,
        status: 'Pending' as const,
        createdAt: new Date().toISOString(),
      };
      onCreateUser(userData);
    }
    setShowAddModal(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', role: '', department: '', password: '' });
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department || '',
      password: '',
    });
    setShowAddModal(true);
  };

  const getRoleColor = (role: string) => {
    const colors: { [key: string]: string } = {
      OWNER: 'bg-yellow-100 text-yellow-800',
      PRINCIPAL: 'bg-purple-100 text-purple-800',
      VICE_PRINCIPAL: 'bg-green-100 text-green-800',
      TEACHER: 'bg-cyan-100 text-cyan-800',
      PARENT: 'bg-orange-100 text-orange-800',
      STUDENT: 'bg-emerald-100 text-emerald-800',
      OPERATIONS_STAFF: 'bg-gray-100 text-gray-800',
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">User Management</h1>
          <p className="text-gray-600 mt-2">Add and manage users for your organization</p>
        </div>
        <button
          onClick={() => {
            setEditingUser(null);
            setFormData({ name: '', email: '', role: '', department: '', password: '' });
            setShowAddModal(true);
          }}
          className="px-4 py-2 bg-executive-gold text-white rounded-lg font-medium hover:bg-opacity-90 transition"
        >
          + Add User
        </button>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-sm text-gray-600 mb-1">Total Users</div>
          <div className="text-2xl font-bold text-charcoal-gray">{managedUsers.length}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Active Users</div>
          <div className="text-2xl font-bold text-green-600">
            {managedUsers.filter(u => u.status === 'Active').length}
          </div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">
            {managedUsers.filter(u => u.status === 'Pending').length}
          </div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Inactive</div>
          <div className="text-2xl font-bold text-gray-600">
            {managedUsers.filter(u => u.status === 'Inactive').length}
          </div>
        </Card>
      </div>

      {/* Users List */}
      <Card>
        <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Managed Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Department</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Actions</th>
              </tr>
            </thead>
            <tbody>
              {managedUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">{user.department || '-'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' :
                      user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to ${user.status === 'Active' ? 'deactivate' : 'activate'} ${user.name}?`)) {
                            // In real app, this would make an API call
                            alert(`User ${user.name} ${user.status === 'Active' ? 'deactivated' : 'activated'}`);
                          }
                        }}
                        className="px-2 py-1 text-xs bg-gray-50 text-gray-700 rounded hover:bg-gray-100"
                      >
                        {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {managedUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No users found. Click "Add User" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add/Edit User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-charcoal-gray mb-4">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-gold"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-gold"
                    placeholder="john.doe@school.edu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <select
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-gold"
                  >
                    <option value="">Select Role</option>
                    {availableRoles.map(role => (
                      <option key={role.value} value={role.value}>{role.label}</option>
                    ))}
                  </select>
                </div>
                {formData.role === 'TEACHER' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                    <select
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-gold"
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                )}
                {!editingUser && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password *</label>
                    <input
                      type="password"
                      required={!editingUser}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-gold"
                      placeholder="User will be asked to change on first login"
                    />
                    <p className="text-xs text-gray-500 mt-1">User will be required to change password on first login</p>
                  </div>
                )}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-executive-gold text-white rounded-lg font-medium hover:bg-opacity-90"
                  >
                    {editingUser ? 'Update User' : 'Create User'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingUser(null);
                      setFormData({ name: '', email: '', role: '', department: '', password: '' });
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-charcoal-gray rounded-lg font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

