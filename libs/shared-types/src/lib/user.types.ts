export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  PLATFORM_ADMINISTRATOR = 'PLATFORM_ADMINISTRATOR',
  CUSTOMER_SUCCESS_MANAGER = 'CUSTOMER_SUCCESS_MANAGER',
  TECHNICAL_SUPPORT_ADMIN = 'TECHNICAL_SUPPORT_ADMIN',
  BILLING_ADMINISTRATOR = 'BILLING_ADMINISTRATOR',
  ORGANIZATION_OWNER = 'ORGANIZATION_OWNER',
  VERTICAL_ADMIN = 'VERTICAL_ADMIN',
  DEPARTMENT_ADMIN = 'DEPARTMENT_ADMIN',
  TEAM_ADMIN = 'TEAM_ADMIN',
  END_USER = 'END_USER',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: Date;
  organizationId?: string;
  permissions?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  organizationId?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  accessToken: string;
  refreshToken?: string;
}
