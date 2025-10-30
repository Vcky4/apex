import { Module } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { CoursesModule } from './courses/courses.module';
import { DepartmentsModule } from './departments/departments.module';

@Module({
  imports: [
    StudentsModule,
    TeachersModule,
    CoursesModule,
    DepartmentsModule,
  ],
})
export class EducationModule {}
