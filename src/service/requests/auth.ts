import axios from 'axios'
import { toast } from 'react-toastify'
import { API_BASE_URL } from '../../shared/api'

export type LoginResponse = {
    token: string
}

export const login = async (email: string, password: string): Promise<string> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_BASE_URL}/authentication/login`, {
            email,
            password,
        });
        toast.success('Login realizado com sucesso!')
        return response.data.token
    } catch (error) {
        toast.error('Erro ao realizar login. Verifique suas credenciais.')
        console.error('Erro no login:', error)
        throw error
    }
}