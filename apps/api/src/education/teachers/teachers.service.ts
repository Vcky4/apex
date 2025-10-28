import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  async findAll(educationOrgId: string) {
    return this.prisma.teacher.findMany({
      where: { educationOrgId },
      include: {
        department: true,
        classes: {
          include: {
            course: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.teacher.findUnique({
      where: { id },
      include: {
        department: true,
        classes: {
          include: {
            course: true,
            enrollments: {
              include: {
                student: true,
              },
            },
          },
        },
      },
    });
  }

  async create(educationOrgId: string, data: any) {
    return this.prisma.teacher.create({
      data: {
        ...data,
        educationOrgId,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.teacher.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.teacher.delete({
      where: { id },
    });
  }
}
