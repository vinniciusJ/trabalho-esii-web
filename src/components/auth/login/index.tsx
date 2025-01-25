import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Tooltip,
    Typography,
    Link,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { AuthCredentials, credentialsSchema } from '@/schemas/credentials'
import { useAuth } from '@/hooks/use-auth'

const LoginForm = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthCredentials>({
        resolver: zodResolver(credentialsSchema),
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const onSubmit = async (data: AuthCredentials) => {
        const success = await login(data)
        if (success) navigate('/')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                {...register('email')}
                label="Usuário"
                variant="filled"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
            />
            <TextField
                {...register('password', { required: 'Senha é obrigatória' })}
                id="password"
                label="Senha"
                variant="filled"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Tooltip
                                title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                                placement="top"
                            >
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    ),
                }}
            />
            <Typography sx={(theme) => ({ mt: 2, fontSize: theme.spacing(1.5) })}>
                Não tem conta?{' '}
                <Link href="/register" style={{ color: '#1976d2', textDecoration: 'none' }}>
                    Registre-se
                </Link>
            </Typography>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Entrar
            </Button>
        </form>
    )
}

export default LoginForm
