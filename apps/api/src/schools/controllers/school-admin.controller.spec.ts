import { Test, TestingModule } from '@nestjs/testing';
import { SchoolAdminController } from './school-admin.controller';
import { SchoolAdminService } from '../services/school-admin.service';
import { DbModule } from '@/db/db.module';

const userMock = {
  email: 'email@test.com',
  name: 'test',
  surname: 'test',
  dni: '11111111',
  address: 'test',
  birthdate: 'test',
  cuil: 'test',
  school_id: 1,
};

const serviceMock = {
  create: jest.fn(),
  findAllActiveAdmins: jest.fn(),
  findAdminById: jest.fn(),
  findAdminsBySchool: jest.fn(),
  deleteAdmin: jest.fn(),
};

describe('SchoolAdminController', () => {
  let controller: SchoolAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolAdminController],
      providers: [{ provide: SchoolAdminService, useValue: serviceMock }],
      imports: [DbModule],
    }).compile();

    controller = module.get<SchoolAdminController>(SchoolAdminController);
  });
  describe('SchoolAdminController tests', () => {
    it('should create a school admin', async () => {
      serviceMock.create.mockResolvedValue({ id: '1' });
      const result = await controller.createSchoolAdmin(userMock);
      expect(result).toEqual({ id: '1' });
    });

    it('should find all active school admins', async () => {
      serviceMock.findAllActiveAdmins.mockResolvedValue([userMock]);
      const result = await controller.getSchoolAdmins();
      expect(result).toEqual([userMock]);
    });

    it('should find a school admin by id', async () => {
      serviceMock.findAdminById.mockResolvedValue({
        id: '1',
        email: userMock.email,
        rol_id: 1,
        rol_name: 'admin',
        school_id: userMock.school_id,
        school_name: 'test',
      });
      const result = await controller.getSchoolAdmin('1');
      expect(result).toEqual({
        id: '1',
        email: userMock.email,
        rol_id: 1,
        rol_name: 'admin',
        school_id: userMock.school_id,
        school_name: 'test',
      });
    });

    it('should find school admins by school id', async () => {
      serviceMock.findAdminsBySchool.mockResolvedValue([
        {
          id: '1',
          email: userMock.email,
          rol_id: 1,
          rol_name: 'admin',
          school_id: userMock.school_id,
          school_name: 'test',
        },
      ]);
      const result = await controller.getSchoolAdminsBySchool(1);
      expect(result).toEqual([
        {
          id: '1',
          email: userMock.email,
          rol_id: 1,
          rol_name: 'admin',
          school_id: userMock.school_id,
          school_name: 'test',
        },
      ]);
    });

    it('should delete a school admin', async () => {
      serviceMock.deleteAdmin.mockResolvedValue({
        ...userMock,
        deleted_at: expect.any(Date),
      });
      const result = await controller.deleteSchoolAdmin('1');
      expect(result).toEqual({ ...userMock, deleted_at: expect.any(Date) });
    });
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
