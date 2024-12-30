import { AuthCredentials } from '@/schemas/credentials'
import { eventosAPI } from '../eventos'

export type LoginResponse = {
    token: string
}

class AuthService {
    private apiUrl: string

    constructor() {
        this.apiUrl = '/authentication/login'
    }

    public async login(credentials: AuthCredentials): Promise<string> {
        const response = await eventosAPI.post<LoginResponse>(this.apiUrl, {
           email: credentials.email,
           password: credentials.password
        })
        return response.data.token
    }
}

export default AuthService