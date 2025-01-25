import { Box, Typography } from '@mui/material';
import logo from '@/assets/login.svg';
import { FONT_WEIGHTS } from '@/theme/fonts';
import LoginForm from '@/components/auth/login';

const LoginPage = () => {

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box
                sx={(theme) => ({
                    flex: 1,
                    backgroundColor: theme.palette.juicy.primary[60],
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                })}
            >
                <img src={logo} alt="Eventos +" style={{ width: '150px', marginBottom: '20px' }} />
                <Typography sx={(theme) => ({ color: theme.palette.juicy.neutral[10], fontSize: theme.spacing(3), fontWeight: FONT_WEIGHTS.extralight })}>
                    Eventos +
                </Typography>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                }}
            >
                <Box sx={{ maxWidth: 400, width: '100%' }}>
                    <Typography gutterBottom>
                        Acessar conta:
                    </Typography>
                   <LoginForm/>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginPage