import { Stack, StackProps, styled } from '@mui/material'
import ToggleButtonGroup, { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup'

import { HEADER_HEIGHT, SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '@/constants/layout'

export interface SidebarContainerProps extends StackProps {
	iscollapsed: 1 | 0
}

export const SidebarContainer = styled(Stack)<SidebarContainerProps>(({ theme, iscollapsed }) => ({
	background: theme.palette.juicy.primary[50],
	height: '100vh',
	width: SIDEBAR_WIDTH,
	...(iscollapsed && { width: SIDEBAR_COLLAPSED_WIDTH }),
	position: 'fixed',
	top: 0,
	bottom: 0,
	left: 0,
	flexDirection: 'column',
	justifyContent: 'space-between',
	alignItems: 'center',
}))

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)<ToggleButtonGroupProps>(({ theme }) => ({
	marginTop: HEADER_HEIGHT,
	paddingTop: theme.spacing(3),
}))
