import { NavigationItem } from "../types"

export const manufacturingNavigation: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/admin/manufacturing/dashboard',
    icon: '🏭',
    roles: ['plant-manager', 'production-manager', 'quality-manager', 'maintenance-manager', 'shift-supervisor']
  },
  {
    id: 'production',
    label: 'Production Management',
    href: '/admin/manufacturing/production',
    icon: '⚙️',
    roles: ['plant-manager', 'production-manager', 'shift-supervisor'],
    children: [
      {
        id: 'production-planning',
        label: 'Production Planning',
        href: '/admin/manufacturing/production/planning',
        roles: ['plant-manager', 'production-manager']
      },
      {
        id: 'shift-management',
        label: 'Shift Management',
        href: '/admin/manufacturing/production/shifts',
        roles: ['plant-manager', 'production-manager', 'shift-supervisor']
      },
      {
        id: 'line-performance',
        label: 'Line Performance',
        href: '/admin/manufacturing/production/lines',
        roles: ['plant-manager', 'production-manager', 'shift-supervisor']
      }
    ]
  },
  {
    id: 'quality',
    label: 'Quality Control',
    href: '/admin/manufacturing/quality',
    icon: '🔍',
    roles: ['plant-manager', 'quality-manager'],
    children: [
      {
        id: 'quality-control',
        label: 'Quality Control',
        href: '/admin/manufacturing/quality/control',
        roles: ['plant-manager', 'quality-manager']
      },
      {
        id: 'audits',
        label: 'Audits & Inspections',
        href: '/admin/manufacturing/quality/audits',
        roles: ['plant-manager', 'quality-manager']
      },
      {
        id: 'continuous-improvement',
        label: 'Continuous Improvement',
        href: '/admin/manufacturing/quality/improvement',
        roles: ['plant-manager', 'quality-manager']
      }
    ]
  },
  {
    id: 'maintenance',
    label: 'Maintenance',
    href: '/admin/manufacturing/maintenance',
    icon: '🔧',
    roles: ['plant-manager', 'maintenance-manager'],
    children: [
      {
        id: 'work-orders',
        label: 'Work Orders',
        href: '/admin/manufacturing/maintenance/work-orders',
        roles: ['plant-manager', 'maintenance-manager']
      },
      {
        id: 'preventive-maintenance',
        label: 'Preventive Maintenance',
        href: '/admin/manufacturing/maintenance/pm',
        roles: ['plant-manager', 'maintenance-manager']
      },
      {
        id: 'inventory',
        label: 'Parts Inventory',
        href: '/admin/manufacturing/maintenance/inventory',
        roles: ['plant-manager', 'maintenance-manager']
      }
    ]
  },
  {
    id: 'workforce',
    label: 'Workforce Management',
    href: '/admin/manufacturing/workforce',
    icon: '👷',
    roles: ['plant-manager', 'production-manager', 'shift-supervisor'],
    children: [
      {
        id: 'employees',
        label: 'Employee Management',
        href: '/admin/manufacturing/workforce/employees',
        roles: ['plant-manager', 'production-manager']
      },
      {
        id: 'training',
        label: 'Training & Development',
        href: '/admin/manufacturing/workforce/training',
        roles: ['plant-manager', 'production-manager']
      },
      {
        id: 'safety',
        label: 'Safety Management',
        href: '/admin/manufacturing/workforce/safety',
        roles: ['plant-manager', 'production-manager', 'shift-supervisor']
      }
    ]
  },
  {
    id: 'supply-chain',
    label: 'Supply Chain',
    href: '/admin/manufacturing/supply-chain',
    icon: '📦',
    roles: ['plant-manager', 'production-manager'],
    children: [
      {
        id: 'inventory',
        label: 'Inventory Management',
        href: '/admin/manufacturing/supply-chain/inventory',
        roles: ['plant-manager', 'production-manager']
      },
      {
        id: 'suppliers',
        label: 'Supplier Management',
        href: '/admin/manufacturing/supply-chain/suppliers',
        roles: ['plant-manager', 'production-manager']
      },
      {
        id: 'logistics',
        label: 'Logistics & Shipping',
        href: '/admin/manufacturing/supply-chain/logistics',
        roles: ['plant-manager', 'production-manager']
      }
    ]
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    href: '/admin/manufacturing/reports',
    icon: '📊',
    roles: ['plant-manager', 'production-manager', 'quality-manager', 'maintenance-manager', 'shift-supervisor']
  }
]