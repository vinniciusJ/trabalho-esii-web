import { useCallback, useMemo } from 'react'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { RESET } from 'jotai/utils'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_BASE_URL } from '../shared/api'
import { Role } from '@/schemas/user'
import { AuthCredentials } from '@/schemas/credentials'
import { accessTokenAtom, getExpirationTime, getUserFromToken, refreshTokenAtom } from '@/utils/auth'

export const useAuth = () => {
    const [accessToken, setAccessToken] = useAtom(accessTokenAtom)
    const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom)
    const expirationTime = getExpirationTime(accessToken)
    const navigate = useNavigate()
    const user = useMemo(() => getUserFromToken(accessToken), [accessToken])

    const updateTokens = (accessToken: string, refreshToken: string) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    }

    const login = useCallback(async (credentials: AuthCredentials) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/authentication/login`, credentials)
            const { token } = response.data
            updateTokens(token, token)
            toast.success('Login feito com sucesso!')
            return true;
        } catch (error) {
            toast.error('Erro ao fazer login. Por favor, cheque as suas credenciais.')
            console.error('Erro de login:', error)
            return false
        }
    }, [])


    const logout = useCallback(async () => {
        try {
            setAccessToken(RESET);
            setRefreshToken(RESET);
            delete axios.defaults.headers.common['Authorization'];
            toast.info('Logout feito com sucesso.');
            navigate('/login');
        } catch (error) {
            toast.error('Erro ao fazer logout.');
            console.error('Erro ao fazer logout:', error);
        }
    }, [navigate, setAccessToken, setRefreshToken]);

    const hasSomeRole = useCallback(
        (requiredRoles: Role[]) => {
            return user ? requiredRoles.includes(user.personRole) : false;
        },
        [user]
    );

    const isAuthenticated = useCallback(() => {
        return accessToken && !isAccessTokenExpired();
    }, [accessToken]);

    const isAccessTokenExpired = useCallback(() => {
        return Date.now() > expirationTime;
    }, [expirationTime]);

    const isRefreshTokenExpired = useCallback(() => {
        return Date.now() > expirationTime;
    }, [expirationTime]);

    const isTokenAboutToExpire = useCallback(() => {
        const currentTime = Date.now();
        return !isAccessTokenExpired() && currentTime > expirationTime - 30000;
    }, [expirationTime, isAccessTokenExpired]);

    return {
        token: accessToken,
        accessToken,
        refreshToken,
        user,
        login,
        logout,
        isAuthenticated,
        isRefreshTokenExpired,
        isTokenAboutToExpire,
        hasSomeRole,
    }
}