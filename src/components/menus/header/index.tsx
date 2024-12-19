import { useCallback } from 'react'
import { IconButton, Stack, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { HeaderContainer } from './style'
import { isSidebarCollapsedAtom } from '@/atoms/sidebar'

export const Header = () => {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useAtom(isSidebarCollapsedAtom)

	const handleSidebarCollapse = useCallback(() => {
		setIsSidebarCollapsed((prev) => !prev)
	}, [])

	return (
		<HeaderContainer>
			<Stack direction='row' gap={2} alignItems='center'>
				<IconButton onClick={handleSidebarCollapse}>
					{isSidebarCollapsed ? (
						<ChevronRightIcon sx={{ color: theme => theme.palette.juicy.neutral[10] }} />
					) : (
						<ChevronLeftIcon sx={{ color: theme => theme.palette.juicy.neutral[10] }} />
					)}
				</IconButton>
				<Typography fontWeight={'light'} sx={(theme) => ({color: theme.palette.juicy.neutral[10]})}>Eventos +</Typography>
			</Stack>
		</HeaderContainer>
	)
}
