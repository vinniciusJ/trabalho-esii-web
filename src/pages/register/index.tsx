import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, styled, Typography } from '@mui/material';
import { EventParticipantForm, eventParticipantFormSchema } from '@/schemas/user';
import { useEventParticipantsMutations } from '@/hooks/event-participant';
import { useNavigate } from 'react-router-dom';
import { TextField } from './styles';
import logo from '@/assets/logo-register.svg'

const FormContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
}))

const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    width: '100%',
    maxWidth: 400,
    padding: theme.spacing(3),
}))

const Logo = styled('img')(({ theme }) => ({
    width: theme.spacing(18.75),
    height: 'auto',
    marginLeft: theme.spacing(11),
    marginBottom: theme.spacing(2),
}))

const Title = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    fontWeight: 'regular',
    textAlign: 'center',
    fontSize: theme.spacing(2),
}))

const SubmitButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.juicy.primary[60],
    color: theme.palette.juicy.neutral[10],
    fontWeight: 'regular',
    '&:hover': {
        backgroundColor: theme.palette.juicy.primary[70],
    },
}))

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
            await registerParticipant(data);
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FormContainer>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <Logo src={logo} alt="Logo de registro" />
                <Title>Cadastrar nova conta:</Title>
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
                <SubmitButton type="submit" variant="contained" fullWidth>
                    Cadastrar
                </SubmitButton>
            </StyledForm>
        </FormContainer>
    )
}

export default RegisterForm
