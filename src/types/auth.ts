import { Role } from "@/schemas/user";

export type AccessToken = {
    exp: number;
    name?: string;
    email?: string;
    cpf?: string;
    role: Role;
}

export type DecodedToken = {
    exp: number
}