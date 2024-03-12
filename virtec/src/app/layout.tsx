import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { validateRequest } from "@/lib/db/lucia";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session= await validateRequest();
  console.log(session)
  return (
    <html lang="en" className="dark:virtec-blue-dark bg-virtec-blue-light">
      <body >
        <main>{children}</main>
      </body>
    </html>
  );
}
