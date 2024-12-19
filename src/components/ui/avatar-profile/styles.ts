import { FONT_WEIGHTS } from '@/themes/fonts'
import { Avatar, AvatarProps, styled } from '@mui/material'

export const AvatarIcon = styled(Avatar)<AvatarProps>(({ theme }) => ({
	background: theme.palette.pti.primary.p10,
	color: theme.palette.pti.primary.p60,
	alignSelf: 'center',
	fontSize: theme.spacing(1.5),
	fontWeight: FONT_WEIGHTS.regular,
	height: theme.spacing(3.75),
	width: theme.spacing(3.75),
	borderRadius: theme.spacing(0.25),
}))
