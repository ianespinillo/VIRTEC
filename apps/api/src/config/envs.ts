import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
	PORT: get('PORT').required().asPortNumber(),
	JWT_SECRET: get('JWT_SECRET').required().asString(),
	API_URL: get('API_URL').required().asString(),
} as const;
