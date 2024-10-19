'use client';

import '@repo/ui/globals.css';
import { TanstackProvider } from '@repo/hooks';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<TanstackProvider>{children}</TanstackProvider>
			</body>
		</html>
	);
}
