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

export default function VicePrincipalUserManagementPage() {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Teacher Williams', email: 'teacher.williams@school.edu', role: 'TEACHER', status: 'Active', createdAt: '2024-03-10' },
    { id: '2', name: 'Teacher Davis', email: 'teacher.davis@school.edu', role: 'TEACHER', status: 'Active', createdAt: '2024-03-15' },
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
      currentUserRole="VICE_PRINCIPAL"
      onCreateUser={handleCreateUser}
      managedUsers={users}
    />
  );
}

