import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Label } from '@radix-ui/react-label';
import { LoginEmailDTO } from '@repo/common';
import { useProfile } from '@repo/hooks';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
export const EmailForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: classValidatorResolver(LoginEmailDTO),
	});
	const [error, setError] = useState<null | string>(null);
	const { loginWithEmail } = useProfile();
	const onSubmit = handleSubmit(async (data) => {
		const req = await loginWithEmail(data as LoginEmailDTO);
		console.log(req);
		if (req?.message) {
			setError(req.message);
			setTimeout(() => {
				setError(null);
			}, 2000);
		}
		// localStorage.setItem('x-token', req!.acces_token)
		// document.location.replace('/dashboard')
	});
	return (
		<form onSubmit={onSubmit}>
			{error && (
				<div className="flex items-center justify-center rounded-md bg-red-500 px-4 py-3 text-white">
					{error}
				</div>
			)}
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						placeholder="Ingrese su e-mail"
						{...register('email')}
					/>
					<p className="text-red-500 text-sm">{errors.email?.message as string}</p>
				</div>
				<div className="space-y-2">
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						type="password"
						placeholder="Ingrese su contraseña"
						{...register('password')}
					/>
					<p className="text-red-500 text-sm">
						{errors.password?.message as string}
					</p>
				</div>
			</div>
			<Button type="submit" className="w-full mt-6">
				Iniciar sesión
			</Button>
		</form>
	);
};
