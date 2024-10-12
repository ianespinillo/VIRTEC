import { DbModule } from '@/db/db.module';
import { Test, type TestingModule } from '@nestjs/testing';
import { fakeUserMock } from '../../test-utils/fake-user';
import { SubjectsService } from '../services/subjects.service';
import { SubjectsController } from './subjects.controller';

const serviceMock = {
	createSubject: jest.fn(),
	findSubject: jest.fn(),
	findAll: jest.fn(),
	findAllBySchool: jest.fn(),
};

const subject = {
	name: 'Matematicas',
	start_time: '08:00',
	end_time: '09:00',
	course_id: 1,
	teacher_id: 1,
};

describe('SubjectsController', () => {
	let controller: SubjectsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SubjectsController],
			providers: [{ provide: SubjectsService, useValue: serviceMock }],
			imports: [DbModule],
		}).compile();

		controller = module.get<SubjectsController>(SubjectsController);
	});

	describe('SubjectsController tests', () => {
		it('should create a subject', () => {
			serviceMock.createSubject.mockResolvedValue({ id: 1, ...subject });
			serviceMock.findSubject.mockResolvedValue(null);
			expect(controller.create(subject)).resolves.toEqual({
				id: 1,
				...subject,
			});
		});
		it('should find a subjects from a school', () => {
			serviceMock.findAllBySchool.mockResolvedValue([{ id: 1, ...subject }]);
			expect(controller.findAll(fakeUserMock)).resolves.toEqual([
				{
					id: 1,
					...subject,
				},
			]);
		});
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
