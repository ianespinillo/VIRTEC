'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { DniForm } from './dni-form';
import { EmailForm } from './email-form';
type loginType = 'email' | 'dni';

export const LoginForm = () => {
	const [activeTab, setActiveTab] = useState<loginType>('email');
	const variants = {
		hidden: { opacity: 0, x: -50 },
		visible: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: 50 },
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-background">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">
						Iniciar sesión
					</CardTitle>
					<CardDescription className="text-center">
						Seleccione su método para iniciar sesión
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs value={activeTab} className="space-y-4">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger
								onClick={() => setActiveTab('email')}
								value="email"
								className={`${activeTab === 'email' && 'bg-primary text-primary-foreground'} p-1 rounded-lg`}
							>
								Email
							</TabsTrigger>
							<TabsTrigger
								onClick={() => setActiveTab('dni')}
								className={`${activeTab === 'dni' && 'bg-primary text-primary-foreground'} p-1 rounded-lg`}
								value="dni"
							>
								DNI
							</TabsTrigger>
						</TabsList>
						<AnimatePresence mode="wait">
							<motion.div
								key={activeTab}
								initial="hidden"
								animate="visible"
								exit="exit"
								variants={variants}
								transition={{ duration: 0.3 }}
							>
								<TabsContent value="email" className="transition-all duration-300">
									<EmailForm />
								</TabsContent>
								<TabsContent value="dni">
									<DniForm />
								</TabsContent>
							</motion.div>
						</AnimatePresence>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
};
