import { Stack, styled } from '@mui/material'

import { HEADER_HEIGHT } from '@/constants/layout'

export const HeaderContainer = styled(Stack)(({ theme }) => ({
	background: theme.palette.juicy.primary[50],
	height: HEADER_HEIGHT,
	position: 'fixed',
	width: '100%',
	zIndex: 1,
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: `0 ${theme.spacing(3)}`,
	flexDirection: 'row',
}))
