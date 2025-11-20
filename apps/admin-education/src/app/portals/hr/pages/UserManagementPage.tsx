import { useState } from 'react';
import UserManagement from '../../../shared/UserManagement';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Pending' | 'Inactive';
  createdAt: string;
  department?: string;
}

export default function HRUserManagementPage() {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Teacher Johnson', email: 'teacher.johnson@school.edu', role: 'TEACHER', status: 'Active', createdAt: '2024-01-15' },
    { id: '2', name: 'John Parent', email: 'john.parent@email.com', role: 'PARENT', status: 'Active', createdAt: '2024-02-10' },
    { id: '3', name: 'Sarah Student', email: 'sarah.student@school.edu', role: 'STUDENT', status: 'Active', createdAt: '2024-02-15' },
  ]);

  const handleCreateUser = (userData: any) => {
    const existingIndex = users.findIndex(u => u.id === userData.id);
    
    if (existingIndex >= 0) {
      // Update existing user
      const updatedUsers = [...users];
      updatedUsers[existingIndex] = {
        ...updatedUsers[existingIndex],
        name: userData.name,
        email: userData.email,
        role: userData.role,
        department: userData.department,
      };
      setUsers(updatedUsers);
    } else {
      // Create new user
      const newUser: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        status: userData.status,
        createdAt: userData.createdAt,
        department: userData.department,
      };
      setUsers([...users, newUser]);
    }
  };

  return (
    <UserManagement
      currentUserRole="HR_EXECUTIVE"
      onCreateUser={handleCreateUser}
      managedUsers={users}
    />
  );
}

