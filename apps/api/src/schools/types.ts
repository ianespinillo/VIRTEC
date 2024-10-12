import type { UserDetail } from '@/users/types';

export interface FindCourse {
	year: number;
	division: number;
	speciallity_id: number;
	school_id: number;
}

export interface Student extends UserDetail {
	id_course: number;
	id_school_period: number;
	n_legajo: string;
	origin_school: string;
	id_next_course: number;
	partial_debt: boolean;
	equivalences: boolean;
	differenced_circuit: boolean;
	previa_1_id: string;
	previa_2_id: string;
	name_responsable: string;
	surname_responsable: string;
	cuil_responsable: string;
	phone_responsable: string;
}

export interface School {
	address: string;
	name: string;
	crest: Express.Multer.File;
}

export interface Subject {
	name: string;
	course_id: number;
	start_time: string;
	end_time: string;
	teacher_id?: number;
}
