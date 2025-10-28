import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters?: any) {
    return this.prisma.organization.findMany({
      where: filters,
      include: {
        subscription: true,
        users: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.organization.findUnique({
      where: { id },
      include: {
        subscription: true,
        users: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            isActive: true,
          },
        },
        educationOrg: true,
        healthcareOrg: true,
        manufacturingOrg: true,
      },
    });
  }

  async create(data: any) {
    // Check if subdomain is already taken
    const existing = await this.prisma.organization.findUnique({
      where: { subdomain: data.subdomain },
    });

    if (existing) {
      throw new ConflictException('Subdomain already taken');
    }

    // Create organization with vertical-specific organization
    const organization = await this.prisma.organization.create({
      data: {
        ...data,
        healthScore: 5,
      },
      include: {
        subscription: true,
      },
    });

    // Create vertical-specific organization
    if (data.vertical === 'EDUCATION') {
      await this.prisma.educationOrganization.create({
        data: {
          organizationId: organization.id,
          schoolType: data.schoolType || 'MIXED',
        },
      });
    } else if (data.vertical === 'HEALTHCARE') {
      await this.prisma.healthcareOrganization.create({
        data: {
          organizationId: organization.id,
          facilityType: data.facilityType || 'CLINIC',
        },
      });
    } else if (data.vertical === 'MANUFACTURING') {
      await this.prisma.manufacturingOrganization.create({
        data: {
          organizationId: organization.id,
          plantType: data.plantType || 'GENERAL',
        },
      });
    }

    return organization;
  }

  async update(id: string, data: any) {
    return this.prisma.organization.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.organization.delete({
      where: { id },
    });
  }

  async getStats() {
    const total = await this.prisma.organization.count();
    const active = await this.prisma.organization.count({
      where: { status: 'ACTIVE' },
    });
    const trial = await this.prisma.organization.count({
      where: { status: 'TRIAL' },
    });
    
    const byVertical = await this.prisma.organization.groupBy({
      by: ['vertical'],
      _count: true,
    });

    return {
      total,
      active,
      trial,
      byVertical,
    };
  }
}
