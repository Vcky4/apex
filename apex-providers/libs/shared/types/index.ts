// User and Role Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  organizationId: string
  vertical: Vertical
  isActive: boolean
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date
}

export type Vertical = 'education' | 'healthcare' | 'manufacturing'

export type UserRole = 
  // Platform Level
  | 'super-admin' | 'platform-admin' | 'customer-success' | 'technical-support' | 'billing-admin'
  // Education Vertical
  | 'school-owner' | 'principal' | 'department-head' | 'vice-principal' | 'operations-manager'
  // Healthcare Vertical  
  | 'hospital-ceo' | 'medical-director' | 'department-chief' | 'nursing-supervisor' | 'patient-care-admin'
  // Manufacturing Vertical
  | 'plant-manager' | 'production-manager' | 'quality-manager' | 'maintenance-manager' | 'shift-supervisor'
  // End Users
  | 'teacher' | 'student' | 'parent' | 'doctor' | 'nurse' | 'patient' | 'worker' | 'operator'

export interface Organization {
  id: string
  name: string
  vertical: Vertical
  domain?: string
  isActive: boolean
  subscriptionPlan: SubscriptionPlan
  createdAt: Date
  updatedAt: Date
}

export interface SubscriptionPlan {
  id: string
  name: string
  vertical: Vertical
  features: string[]
  userLimit: number
  price: number
  billingCycle: 'monthly' | 'yearly'
}

// Dashboard Types
export interface DashboardMetrics {
  totalUsers: number
  activeUsers: number
  revenue: number
  growthRate: number
  uptime: number
  performance: number
}

// Navigation Types
export interface NavigationItem {
  id: string
  label: string
  href: string
  icon?: string
  children?: NavigationItem[]
  roles?: UserRole[]
  verticals?: Vertical[]
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}