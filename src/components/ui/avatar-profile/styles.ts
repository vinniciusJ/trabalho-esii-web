import { FONT_WEIGHTS } from '@/theme/fonts'
import { Avatar, AvatarProps, styled } from '@mui/material'

export const AvatarIcon = styled(Avatar)<AvatarProps>(({ theme }) => ({
	background: theme.palette.juicy.primary[10],
	color: theme.palette.juicy.primary[60],
	alignSelf: 'center',
	fontSize: theme.spacing(1.5),
	fontWeight: FONT_WEIGHTS.regular,
	height: theme.spacing(3.75),
	width: theme.spacing(3.75),
	borderRadius: theme.spacing(0.25),
}))
