'use client';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Label } from '@radix-ui/react-label';
import { LoginDniDTO } from '@repo/common';
import { useProfile } from '@repo/hooks';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
export const DniForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: classValidatorResolver(LoginDniDTO) });
	const [error, setError] = useState<null | string>(null);
	const { loginWithDni } = useProfile();
	const onSubmit = handleSubmit(async (data) => {
		const req = await loginWithDni(data as LoginDniDTO);
		console.log(req);
		if (req?.message) {
			setError(req.message);
			setTimeout(() => {
				setError(null);
			}, 2000);
		}
	});
	return (
		<form onSubmit={onSubmit}>
			{error && (
				<div className="flex items-center justify-center rounded-md bg-red-500 px-4 py-3 text-white">
					<p>{error}</p>
				</div>
			)}
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="dni">DNI</Label>
					<Input
						id="dni"
						type="text"
						placeholder="Ingrese su DNI"
						{...register('dni')}
					/>
					<p className="text-red-500 text-sm">{errors.dni?.message as string}</p>
				</div>
				<div className="space-y-2">
					<Label htmlFor="password-dni">Password</Label>
					<Input
						id="password-dni"
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
