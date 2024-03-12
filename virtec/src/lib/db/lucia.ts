import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "./db";
import { Lucia, TimeSpan } from "lucia";
import { cache } from "react";
import { User } from "lucia";
import { Session } from "lucia";
import { cookies } from "next/headers";



const adapter = new PrismaAdapter(prisma.session, prisma.user)

export const lucia = new Lucia(adapter,{
    sessionCookie:{
        attributes:{
            secure: process.env.NODE_ENV === "production"
        }
    },
    sessionExpiresIn: new TimeSpan(4, 'h'),
    getUserAttributes: (attributes) =>{
        return{
            apellido: attributes.apellido,
            nombre: attributes.nombre,
            email: attributes.email,
            password: attributes.password,
            rol: attributes.rol,
            dni: attributes.dni,
            year: attributes.year,
            division: attributes.division,
            comision: attributes.comision 
        }
    },

})
export const validateRequest = cache(
	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null
			};
		}

		const result = await lucia.validateSession(sessionId);
		// next.js throws when you attempt to set cookie when rendering page
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch {}
		return result;
	}
);

declare module "lucia"{
    interface Register{
        Lucia: typeof lucia,
        DatabaseUserAttributes: DatabaseUserAttributes
    }
}

interface DatabaseUserAttributes{
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    rol: string;
    dni?: number;
    year: number;
    division: number;
    comision?: number; 
}