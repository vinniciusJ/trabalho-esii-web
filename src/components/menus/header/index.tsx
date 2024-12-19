import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Tooltip from '@mui/material/Tooltip';
import { useAtom } from 'jotai';
import { useCallback, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { HeaderContainer } from './style';
import { isSidebarCollapsedAtom } from '@/atoms/sidebar';
import { generateNamedAvatarIcon } from '@/utils/generate-named-avatar';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { AvatarIcon } from '@/components/ui/avatar-profile/styles';
import Popover, { PopoverOptions } from '@/components/ui/popover';
import { tranformRoleToPortuguese } from '@/utils/auth';

export const Header = () => {
	const { user, logout } = useAuth();
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useAtom(isSidebarCollapsedAtom);
	const popoverRef = useRef<PopoverOptions>(null);

	const handleSidebarCollapse = useCallback(() => {
		setIsSidebarCollapsed((prev) => !prev);
	}, []);

	const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		popoverRef.current?.openPopover(event.currentTarget);
	};

	const handleLogout = () => {
		logout();
		popoverRef.current?.closePopover();
	};

	return (
		<HeaderContainer>
			<Stack direction="row" gap={2} alignItems="center">
				<IconButton onClick={handleSidebarCollapse}>
					{isSidebarCollapsed ? (
						<ChevronRightIcon sx={{ color: (theme) => theme.palette.juicy.neutral[10] }} />
					) : (
						<ChevronLeftIcon sx={{ color: (theme) => theme.palette.juicy.neutral[10] }} />
					)}
				</IconButton>
				<Typography
					fontWeight="light"
					sx={(theme) => ({ color: theme.palette.juicy.neutral[10] })}
				>
					Eventos +
				</Typography>
			</Stack>
			{user && (
				<>
					<Tooltip title="Conta">
						<IconButton onClick={handleAvatarClick}>
							<AvatarIcon>{generateNamedAvatarIcon(user.name)}</AvatarIcon>
						</IconButton>
					</Tooltip>
					<Popover ref={popoverRef}>
						<Box sx={{ p: 2, minWidth: 200 }}>
							<Typography variant="body1" fontWeight="bold">
								{user.name}
							</Typography>
							<Typography variant="body2" color="textSecondary">
								{user.email}
							</Typography>
							<Typography variant="body2" fontWeight="light" sx={{ mt: 1 }}>
								{tranformRoleToPortuguese(user.personRole)}
							</Typography>
							<Button
								variant="text"
								color="primary"
								onClick={handleLogout}
								startIcon={<ChevronRightIcon />}
								sx={{ mt: 2, width: '100%' }}
							>
								Sair
							</Button>
						</Box>
					</Popover>
				</>
			)}
		</HeaderContainer>
	);
};
