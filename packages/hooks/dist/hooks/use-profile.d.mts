import { LoginWithEmail, AuthResponse, LoginWithDni } from '@repo/common';

declare const useProfile: () => {
    loginWithEmail: (data: LoginWithEmail) => Promise<AuthResponse | undefined>;
    loginWithDni: (data: LoginWithDni) => Promise<AuthResponse | undefined>;
    getRoles: (token: string) => Promise<any>;
};

export { useProfile };
