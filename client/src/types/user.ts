// User & Auth types
export interface TUser {
    id: number;
    name: string;
    email: string;
}

export type TLoginCredentials = {
    email?: string;
    password?: string;
};
