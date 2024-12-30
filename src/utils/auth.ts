import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/endpoints'
import { atomWithStorage } from 'jotai/utils'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../hooks/use-auth'
import { Role, User } from '@/schemas/user';
import { AccessToken, DecodedToken } from '@/types/auth';

export const accessTokenAtom = atomWithStorage<string | null>(
    ACCESS_TOKEN_KEY,
    localStorage.getItem(ACCESS_TOKEN_KEY) ?? null
)

export const refreshTokenAtom = atomWithStorage<string>(
    REFRESH_TOKEN_KEY,
    localStorage.getItem(REFRESH_TOKEN_KEY) ?? ''
)

export const decodeToken = (token: string) => jwtDecode<AccessToken>(token)

export const getUserFromToken = (token?: string | null): User | null => {
    if (!token) return null

    const decodedToken = decodeToken(token)

    const user: User = {
        id: 0,
        name: decodedToken.name ?? 'Unknown',
        cpfNumber: decodedToken.cpf ?? 'Unknown',
        email: decodedToken.email ?? 'Unknown',
        password: '',
        phone: '',
        isEmailVerified: false,
        personRole: decodedToken.role,
    }

    return user
}

export const getExpirationTime = (token: string | null): number => {
    if (!token) return 0
    const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token)
    return decodedToken.exp * 1000
}

export function getCpf(): string {
    const { user } = useAuth()
    if (user && user.cpfNumber) return user.cpfNumber
    return ''
}

export const tranformRoleToPortuguese = (role: Role) => {
    if (role === 'ROLE_ADMIN') return 'ADMINISTRADOR'
    if (role === 'ROLE_EVENT_MANAGER') return 'GERENCIADOR'
    return 'PARTICIPANTE'
}

export const allRoles: Role[] = ["ROLE_ADMIN", "ROLE_EVENT_PARTICIPANT", "ROLE_EVENT_MANAGER"]