import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { EducationModule } from '../education/education.module';
import { HealthcareModule } from '../healthcare/healthcare.module';
import { ManufacturingModule } from '../manufacturing/manufacturing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    OrganizationsModule,
    EducationModule,
    HealthcareModule,
    ManufacturingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
