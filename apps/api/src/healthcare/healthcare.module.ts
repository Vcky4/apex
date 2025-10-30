import { Module } from '@nestjs/common';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [PatientsModule, DoctorsModule, AppointmentsModule],
})
export class HealthcareModule {}
