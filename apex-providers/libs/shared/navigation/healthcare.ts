import { NavigationItem } from "../types"

export const healthcareNavigation: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/admin/healthcare/dashboard',
    icon: '🏥',
    roles: ['hospital-ceo', 'medical-director', 'department-chief', 'nursing-supervisor', 'patient-care-admin']
  },
  {
    id: 'clinical',
    label: 'Clinical Operations',
    href: '/admin/healthcare/clinical',
    icon: '🩺',
    roles: ['hospital-ceo', 'medical-director', 'department-chief', 'nursing-supervisor'],
    children: [
      {
        id: 'patient-care',
        label: 'Patient Care',
        href: '/admin/healthcare/clinical/patient-care',
        roles: ['hospital-ceo', 'medical-director', 'department-chief', 'nursing-supervisor']
      },
      {
        id: 'quality-assurance',
        label: 'Quality Assurance',
        href: '/admin/healthcare/clinical/quality',
        roles: ['hospital-ceo', 'medical-director', 'department-chief']
      },
      {
        id: 'medical-education',
        label: 'Medical Education',
        href: '/admin/healthcare/clinical/education',
        roles: ['hospital-ceo', 'medical-director', 'department-chief']
      }
    ]
  },
  {
    id: 'staff',
    label: 'Staff Management',
    href: '/admin/healthcare/staff',
    icon: '👨‍⚕️',
    roles: ['hospital-ceo', 'medical-director', 'nursing-supervisor'],
    children: [
      {
        id: 'physicians',
        label: 'Physicians',
        href: '/admin/healthcare/staff/physicians',
        roles: ['hospital-ceo', 'medical-director']
      },
      {
        id: 'nursing',
        label: 'Nursing Staff',
        href: '/admin/healthcare/staff/nursing',
        roles: ['hospital-ceo', 'medical-director', 'nursing-supervisor']
      },
      {
        id: 'support-staff',
        label: 'Support Staff',
        href: '/admin/healthcare/staff/support',
        roles: ['hospital-ceo', 'patient-care-admin']
      }
    ]
  },
  {
    id: 'patients',
    label: 'Patient Management',
    href: '/admin/healthcare/patients',
    icon: '👥',
    roles: ['hospital-ceo', 'medical-director', 'department-chief', 'nursing-supervisor', 'patient-care-admin'],
    children: [
      {
        id: 'admissions',
        label: 'Admissions',
        href: '/admin/healthcare/patients/admissions',
        roles: ['hospital-ceo', 'patient-care-admin']
      },
      {
        id: 'patient-records',
        label: 'Patient Records',
        href: '/admin/healthcare/patients/records',
        roles: ['hospital-ceo', 'medical-director', 'department-chief', 'nursing-supervisor']
      },
      {
        id: 'billing',
        label: 'Billing & Insurance',
        href: '/admin/healthcare/patients/billing',
        roles: ['hospital-ceo', 'patient-care-admin']
      }
    ]
  },
  {
    id: 'operations',
    label: 'Hospital Operations',
    href: '/admin/healthcare/operations',
    icon: '⚙️',
    roles: ['hospital-ceo', 'patient-care-admin'],
    children: [
      {
        id: 'facilities',
        label: 'Facilities Management',
        href: '/admin/healthcare/operations/facilities',
        roles: ['hospital-ceo', 'patient-care-admin']
      },
      {
        id: 'equipment',
        label: 'Medical Equipment',
        href: '/admin/healthcare/operations/equipment',
        roles: ['hospital-ceo', 'medical-director', 'patient-care-admin']
      },
      {
        id: 'supplies',
        label: 'Medical Supplies',
        href: '/admin/healthcare/operations/supplies',
        roles: ['hospital-ceo', 'patient-care-admin']
      }
    ]
  },
  {
    id: 'compliance',
    label: 'Compliance & Safety',
    href: '/admin/healthcare/compliance',
    icon: '🛡️',
    roles: ['hospital-ceo', 'medical-director', 'department-chief'],
    children: [
      {
        id: 'regulatory',
        label: 'Regulatory Compliance',
        href: '/admin/healthcare/compliance/regulatory',
        roles: ['hospital-ceo', 'medical-director']
      },
      {
        id: 'safety',
        label: 'Patient Safety',
        href: '/admin/healthcare/compliance/safety',
        roles: ['hospital-ceo', 'medical-director', 'department-chief']
      },
      {
        id: 'audits',
        label: 'Audits & Inspections',
        href: '/admin/healthcare/compliance/audits',
        roles: ['hospital-ceo', 'medical-director']
      }
    ]
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    href: '/admin/healthcare/reports',
    icon: '📊',
    roles: ['hospital-ceo', 'medical-director', 'department-chief', 'nursing-supervisor', 'patient-care-admin']
  }
]