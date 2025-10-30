import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('education/teachers')
@UseGuards(JwtAuthGuard)
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  findAll(@Query('educationOrgId') educationOrgId: string) {
    return this.teachersService.findAll(educationOrgId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Post()
  create(@Query('educationOrgId') educationOrgId: string, @Body() createTeacherDto: any) {
    return this.teachersService.create(educationOrgId, createTeacherDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: any) {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}
