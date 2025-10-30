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

interface UserManagementPageProps {
  deptName?: string;
}

export default function DepartmentUserManagementPage({ deptName = 'science' }: UserManagementPageProps) {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Teacher Brown', email: 'teacher.brown@school.edu', role: 'TEACHER', status: 'Active', createdAt: '2024-03-01', department: deptName },
    { id: '2', name: 'Teacher Green', email: 'teacher.green@school.edu', role: 'TEACHER', status: 'Active', createdAt: '2024-03-05', department: deptName },
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
        department: deptName,
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
        department: deptName,
      };
      setUsers([...users, newUser]);
    }
  };

  return (
    <UserManagement
      currentUserRole="DEPARTMENT_HEAD"
      onCreateUser={handleCreateUser}
      managedUsers={users}
    />
  );
}

