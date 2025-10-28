import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('organizations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  @Roles('SUPER_ADMIN', 'PLATFORM_ADMINISTRATOR')
  findAll(@Query() filters: any) {
    return this.organizationsService.findAll(filters);
  }

  @Get('stats')
  @Roles('SUPER_ADMIN', 'PLATFORM_ADMINISTRATOR')
  getStats() {
    return this.organizationsService.getStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationsService.findOne(id);
  }

  @Post()
  @Roles('SUPER_ADMIN', 'PLATFORM_ADMINISTRATOR')
  create(@Body() createOrganizationDto: any) {
    return this.organizationsService.create(createOrganizationDto);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN', 'PLATFORM_ADMINISTRATOR', 'ORGANIZATION_OWNER')
  update(@Param('id') id: string, @Body() updateOrganizationDto: any) {
    return this.organizationsService.update(id, updateOrganizationDto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN', 'PLATFORM_ADMINISTRATOR')
  remove(@Param('id') id: string) {
    return this.organizationsService.remove(id);
  }
}
