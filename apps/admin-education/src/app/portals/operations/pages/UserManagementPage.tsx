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

export default function OperationsUserManagementPage() {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Operations Staff A', email: 'ops.staff1@school.edu', role: 'OPERATIONS_STAFF', status: 'Active', createdAt: '2024-03-20' },
    { id: '2', name: 'Operations Staff B', email: 'ops.staff2@school.edu', role: 'OPERATIONS_STAFF', status: 'Active', createdAt: '2024-03-25' },
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
      currentUserRole="OPERATIONS_MANAGER"
      onCreateUser={handleCreateUser}
      managedUsers={users}
    />
  );
}

