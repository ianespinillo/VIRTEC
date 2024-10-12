import { Test, TestingModule } from '@nestjs/testing';
import { SchoolAdminService } from './school-admin.service';
import { PrismaService } from '@/db/prisma.service';
import { UsersService } from '@/users/users.service';

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

const prismaMock = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  user_role: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  user_roles: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
  },
  $transaction: jest.fn((fn) =>
    fn({
      user: prismaMock.user,
      user_role: prismaMock.user_role,
    }),
  ),
};

const userSMock = {
  findByEmail: jest.fn(),
  findByDni: jest.fn(),
  createUser: jest.fn(),
};

describe('SchoolAdminService', () => {
  let service: SchoolAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolAdminService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: UsersService,
          useValue: userSMock,
        },
      ],
    }).compile();

    service = module.get<SchoolAdminService>(SchoolAdminService);
  });

  describe('School admin tests', () => {
    it('should create a new school admin', async () => {
      userSMock.findByDni.mockResolvedValue(null);
      userSMock.findByEmail.mockResolvedValue(null);
      userSMock.createUser.mockResolvedValue({
        id: '1',
        email: userMock.email,
        password: 'password',
        school_id: userMock.school_id,
      });

      prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));
      const admin = await service.create(userMock);
      expect(prismaMock.$transaction).toHaveBeenCalled();
      expect(admin).toEqual({
        id: '1',
      });
    });
    it('should find all active school admins', async () => {
      prismaMock.user_roles.findMany.mockResolvedValue([userMock]);
      const result = await service.findAllActiveAdmins();
      expect(result).toEqual([userMock]);
    });

    it('should find a school admin by id', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: '1',
        
      });
      const result = await service.findAdminById('1');
      expect(result).toEqual({
        id: 1,
        user_id: '1',
        rol_id: 1,
      });
    });

    it('should delete a school admin', async () => {
      prismaMock.user.update.mockResolvedValue({
        id: '1',
        email: userMock.email,
        password: 'password',
        deleted_at: expect.any(Date),
      });
      const result = await service.deleteAdmin('1');
      expect(result).toEqual({
        id: '1',
        email: userMock.email,
        password: 'password',
        deleted_at: expect.any(Date),
      });
    });
    it('should find school admins by school id', async () => {
      prismaMock.user_roles.findMany.mockResolvedValue([userMock]);
      const result = await service.findAdminsBySchool(1);
      expect(result).toEqual([userMock]);
    });
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
