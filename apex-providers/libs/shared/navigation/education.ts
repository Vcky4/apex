import { NavigationItem } from "../types"

export const educationNavigation: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/admin/education/dashboard',
    icon: '🏠',
    roles: ['school-owner', 'principal', 'department-head', 'vice-principal', 'operations-manager']
  },
  {
    id: 'academics',
    label: 'Academics',
    href: '/admin/education/academics',
    icon: '📚',
    roles: ['school-owner', 'principal', 'department-head'],
    children: [
      {
        id: 'curriculum',
        label: 'Curriculum Management',
        href: '/admin/education/academics/curriculum',
        roles: ['school-owner', 'principal', 'department-head']
      },
      {
        id: 'performance',
        label: 'Performance Analytics',
        href: '/admin/education/academics/performance',
        roles: ['school-owner', 'principal', 'department-head']
      },
      {
        id: 'calendar',
        label: 'Academic Calendar',
        href: '/admin/education/academics/calendar',
        roles: ['school-owner', 'principal', 'department-head']
      }
    ]
  },
  {
    id: 'students',
    label: 'Student Management',
    href: '/admin/education/students',
    icon: '👥',
    roles: ['school-owner', 'principal', 'vice-principal'],
    children: [
      {
        id: 'enrollment',
        label: 'Enrollment',
        href: '/admin/education/students/enrollment',
        roles: ['school-owner', 'principal', 'vice-principal']
      },
      {
        id: 'attendance',
        label: 'Attendance',
        href: '/admin/education/students/attendance',
        roles: ['school-owner', 'principal', 'vice-principal']
      },
      {
        id: 'discipline',
        label: 'Discipline',
        href: '/admin/education/students/discipline',
        roles: ['school-owner', 'principal', 'vice-principal']
      }
    ]
  },
  {
    id: 'staff',
    label: 'Staff Management',
    href: '/admin/education/staff',
    icon: '👨‍🏫',
    roles: ['school-owner', 'principal', 'operations-manager'],
    children: [
      {
        id: 'teachers',
        label: 'Teachers',
        href: '/admin/education/staff/teachers',
        roles: ['school-owner', 'principal', 'operations-manager']
      },
      {
        id: 'non-teaching',
        label: 'Non-Teaching Staff',
        href: '/admin/education/staff/non-teaching',
        roles: ['school-owner', 'principal', 'operations-manager']
      },
      {
        id: 'payroll',
        label: 'Payroll',
        href: '/admin/education/staff/payroll',
        roles: ['school-owner', 'operations-manager']
      }
    ]
  },
  {
    id: 'finance',
    label: 'Finance',
    href: '/admin/education/finance',
    icon: '💰',
    roles: ['school-owner', 'operations-manager'],
    children: [
      {
        id: 'budget',
        label: 'Budget Planning',
        href: '/admin/education/finance/budget',
        roles: ['school-owner', 'operations-manager']
      },
      {
        id: 'revenue',
        label: 'Revenue Analytics',
        href: '/admin/education/finance/revenue',
        roles: ['school-owner', 'operations-manager']
      },
      {
        id: 'expenses',
        label: 'Expense Tracking',
        href: '/admin/education/finance/expenses',
        roles: ['school-owner', 'operations-manager']
      }
    ]
  },
  {
    id: 'operations',
    label: 'Operations',
    href: '/admin/education/operations',
    icon: '⚙️',
    roles: ['school-owner', 'operations-manager'],
    children: [
      {
        id: 'facilities',
        label: 'Facilities',
        href: '/admin/education/operations/facilities',
        roles: ['school-owner', 'operations-manager']
      },
      {
        id: 'transport',
        label: 'Transport',
        href: '/admin/education/operations/transport',
        roles: ['school-owner', 'operations-manager']
      },
      {
        id: 'maintenance',
        label: 'Maintenance',
        href: '/admin/education/operations/maintenance',
        roles: ['school-owner', 'operations-manager']
      }
    ]
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    href: '/admin/education/reports',
    icon: '📊',
    roles: ['school-owner', 'principal', 'department-head', 'vice-principal', 'operations-manager']
  }
]