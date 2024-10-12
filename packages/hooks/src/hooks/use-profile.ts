
import { useMutation, useQuery } from "@tanstack/react-query"
import { AuthResponse, LoginWithDni, LoginWithEmail } from '@repo/types/auth/types.js';

export const useProfile = () => {
    const loginWithEmail = async (data: LoginWithEmail) => {
        const req = await fetch(process.env.API_URL + 'auth/login/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        return await req.json() as AuthResponse
    }
    const loginWithDni = async (data: LoginWithDni) => {
        const req = await fetch(process.env.API_URL + 'auth/login/dni', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        return await req.json() as AuthResponse
    }
    return {
        loginWithEmail,
        loginWithDni,
    }
}