export enum Vertical {
  EDUCATION = 'EDUCATION',
  HEALTHCARE = 'HEALTHCARE',
  MANUFACTURING = 'MANUFACTURING',
}

export enum OrganizationStatus {
  ACTIVE = 'ACTIVE',
  TRIAL = 'TRIAL',
  SUSPENDED = 'SUSPENDED',
  INACTIVE = 'INACTIVE',
}

export interface Organization {
  id: string;
  name: string;
  legalName?: string;
  vertical: Vertical;
  status: OrganizationStatus;
  size?: string;
  subdomain: string;
  customDomain?: string;
  logo?: string;
  brandingSettings?: Record<string, any>;
  primaryEmail: string;
  primaryPhone?: string;
  address?: string;
  city?: string;
  state?: string;
  country: string;
  postalCode?: string;
  healthScore: number;
  lastActivityAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrganizationDto {
  name: string;
  legalName?: string;
  vertical: Vertical;
  primaryEmail: string;
  country: string;
  subdomain: string;
}
