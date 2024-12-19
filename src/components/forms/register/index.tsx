import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Link, Typography } from '@mui/material'
import { EventParticipantForm, eventParticipantFormSchema } from '@/schemas/user'
import { useEventParticipantsMutations } from '@/hooks/use-event-participant-mutations'
import {  useNavigate } from 'react-router-dom'
import logo from '@/assets/logo-register.svg'
import { Form, Logo, TextField } from './styles'

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EventParticipantForm>({
        resolver: zodResolver(eventParticipantFormSchema),
    });

    const { registerParticipant } = useEventParticipantsMutations();
    const navigate = useNavigate();

    const onSubmit = async (data: EventParticipantForm) => {
        try {
            registerParticipant(data)
            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }

    return (
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Logo src={logo} alt="Logo de registro" />
                <Typography>Cadastrar nova conta:</Typography>
                <TextField
                    {...register('name')}
                    label="Nome"
                    variant="filled"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <TextField
                    {...register('cpfNumber')}
                    label="CPF"
                    variant="filled"
                    fullWidth
                    error={!!errors.cpfNumber}
                    helperText={errors.cpfNumber?.message}
                />
                <TextField
                    {...register('phone')}
                    label="Telefone"
                    variant="filled"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                />
                <TextField
                    {...register('email')}
                    label="Email"
                    variant="filled"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    {...register('password')}
                    label="Senha"
                    type="password"
                    variant="filled"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <Typography sx={(theme) => ({ fontSize: theme.spacing(1.5) })}>
                    Já possui uma conta?{' '}
                    <Link href="/login" underline="hover">
                        Faça login
                    </Link>
                </Typography>
                <Button type="submit" variant="contained" fullWidth>
                    Cadastrar
                </Button>
            </Form>
    )
}

export default RegisterForm
