import {
	ExecutionContext,
	SetMetadata,
	createParamDecorator,
} from '@nestjs/common';
import { AuthUser } from '@repo/common';

export const User = createParamDecorator((_, ctx: ExecutionContext) => {
	const req = ctx.switchToHttp().getRequest();
	return req.user as AuthUser;
});
