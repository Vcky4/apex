import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(educationOrgId: string) {
    return this.prisma.student.findMany({
      where: { educationOrgId },
      include: {
        enrollments: {
          include: {
            class: {
              include: {
                course: true,
                teacher: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.student.findUnique({
      where: { id },
      include: {
        enrollments: {
          include: {
            class: {
              include: {
                course: true,
                teacher: true,
              },
            },
          },
        },
        grades: {
          include: {
            class: {
              include: {
                course: true,
              },
            },
            teacher: true,
          },
        },
        attendance: {
          include: {
            class: {
              include: {
                course: true,
              },
            },
          },
        },
      },
    });
  }

  async create(educationOrgId: string, data: any) {
    return this.prisma.student.create({
      data: {
        ...data,
        educationOrgId,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.student.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.student.delete({
      where: { id },
    });
  }

  async getStats(educationOrgId: string) {
    const total = await this.prisma.student.count({
      where: { educationOrgId },
    });
    
    const active = await this.prisma.student.count({
      where: { educationOrgId, status: 'ACTIVE' },
    });

    const byGrade = await this.prisma.student.groupBy({
      by: ['gradeLevel'],
      where: { educationOrgId },
      _count: true,
    });

    return { total, active, byGrade };
  }
}
