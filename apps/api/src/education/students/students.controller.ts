import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('education/students')
@UseGuards(JwtAuthGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  findAll(@Query('educationOrgId') educationOrgId: string) {
    return this.studentsService.findAll(educationOrgId);
  }

  @Get('stats')
  getStats(@Query('educationOrgId') educationOrgId: string) {
    return this.studentsService.getStats(educationOrgId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Post()
  create(@Query('educationOrgId') educationOrgId: string, @Body() createStudentDto: any) {
    return this.studentsService.create(educationOrgId, createStudentDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: any) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
