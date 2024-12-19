import { Box, BoxProps, styled } from '@mui/material'

export const BoxModal = styled(Box)<BoxProps>(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: theme.spacing(69.125),
	height: theme.spacing(73.375),
	backgroundColor: theme.palette.pti.primary.p10,
	boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
	p: theme.spacing(0.5),
}))
