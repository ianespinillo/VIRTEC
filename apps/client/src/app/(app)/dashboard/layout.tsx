import { useProfile } from '@repo/hooks';
import { cookies } from 'next/headers';
import React, { ReactNode } from 'react';

export default async function Dashlayout({
	superadmin,
	schooladmin,
	student,
	children,
}: {
	children: ReactNode;
	superadmin: ReactNode;
	schooladmin: ReactNode;
	student: ReactNode;
}) {
	const token = cookies().get('token');
	const { getRoles } = useProfile();
	const roles = await getRoles(token?.value as string);
	console.log(roles);
	return (
		<div>
			<div>Superadmin</div>
			{superadmin}
			<div>Schooladmin</div>
			{schooladmin}
			<div>Student</div>
			{student}
		</div>
	);
}
