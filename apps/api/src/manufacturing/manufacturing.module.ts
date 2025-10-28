import { Module } from '@nestjs/common';
import { WorkersModule } from './workers/workers.module';
import { EquipmentModule } from './equipment/equipment.module';
import { ProductionModule } from './production/production.module';

@Module({
  imports: [WorkersModule, EquipmentModule, ProductionModule],
})
export class ManufacturingModule {}
