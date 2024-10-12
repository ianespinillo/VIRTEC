import { PermissionsNeeded } from '@/auth/decorators/permissions.decorator';
import { PERMISSIONS } from '@repo/common/src/permissions';
import { CreateUserDTO } from '@/users/dtos/user.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SchoolAdminService } from '../services/school-admin.service';

@Controller('school-admin')
export class SchoolAdminController {
  constructor(private schoolAdminService: SchoolAdminService) {}

  @Post()
  @PermissionsNeeded(PERMISSIONS.CREATE_SCHOOL_ADMINS)
  async createSchoolAdmin(@Body() body: CreateUserDTO) {
    return await this.schoolAdminService.create(body);
  }

  @Get()
  @PermissionsNeeded(PERMISSIONS.READ_SCHOOL_ADMINS)
  async getSchoolAdmins() {
    return await this.schoolAdminService.findAllActiveAdmins();
  }

  @Get(':id')
  @PermissionsNeeded(PERMISSIONS.READ_SCHOOL_ADMINS)
  async getSchoolAdmin(@Param('id') id: string) {
    return await this.schoolAdminService.findAdminById(id);
  }

  @Get('school/:id')
  @PermissionsNeeded(PERMISSIONS.READ_SCHOOL_ADMINS)
  async getSchoolAdminsBySchool(@Param('id') id: number) {
    return await this.schoolAdminService.findAdminsBySchool(id);
  }
  
  @Delete(':id')
  @PermissionsNeeded(PERMISSIONS.DELETE_SCHOOL_ADMINS)
  async deleteSchoolAdmin(@Param('id') id: string) {
    return await this.schoolAdminService.deleteAdmin(id);
  }

  @Put(':id')
  @PermissionsNeeded(PERMISSIONS.UPDATE_SCHOOL_ADMIN)
  async updateSchoolAdmin(@Param('id') id: string, @Body() body: CreateUserDTO) {
    return await this.schoolAdminService.updateAdmin(id, body);
  }
}
