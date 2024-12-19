import { Box, styled, TextField as TextFieldMui } from "@mui/material";

export const TextField = styled(TextFieldMui)(({ theme }) => ({
	'& .MuiFilledInput-root': {
		backgroundColor: theme.palette.juicy.neutral[30],
		'&:hover': {
			backgroundColor: theme.palette.juicy.neutral[30],
		},
		'&.Mui-focused': {
			backgroundColor: theme.palette.juicy.neutral[30],
		},
	},
	'& .MuiFilledInput-underline:before': {
		borderBottomColor: theme.palette.juicy.neutral[60],
	},
	'& .MuiFilledInput-underline:after': {
		borderBottomColor: theme.palette.juicy.primary[60],
	},
	'& .MuiFormLabel-root': {
		color: theme.palette.juicy.neutral[70],
	},
}))

export const FormContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
}))

export const Form = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    width: '100%',
    maxWidth: 400,
    padding: theme.spacing(3),
}))

export const Logo = styled('img')(({ theme }) => ({
    width: theme.spacing(18.75),
    height: 'auto',
    marginLeft: theme.spacing(11),
    marginBottom: theme.spacing(2),
}))
