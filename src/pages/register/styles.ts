import { styled, TextField as TextFieldMui } from "@mui/material";

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