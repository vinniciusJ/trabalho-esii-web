import {
	ForwardRefRenderFunction,
	ReactNode,
	forwardRef,
	useCallback,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

import { Popover as MuiPopover, Stack, StackProps, Typography } from '@mui/material'

import { theme } from '@/theme/index'

export interface PopoverProps extends StackProps {
	children: ReactNode
	title?: string
}

export interface PopoverOptions {
	openPopover: (element: HTMLElement) => void
	closePopover: () => void
}

export const Popover: ForwardRefRenderFunction<PopoverOptions, PopoverProps> = (
	{ children, title, ...otherProps },
	ref
) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

	const openPopover = useCallback((element: HTMLElement) => {
		setAnchorEl(element)
	}, [])

	const closePopover = useCallback(() => {
		setAnchorEl(null)
	}, [])

	const isOpened = !!anchorEl

	useImperativeHandle(ref, () => ({
		openPopover,
		closePopover,
	}))

	return (
		<MuiPopover
			open={isOpened}
			anchorEl={anchorEl}
			onClose={closePopover}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			sx={{
				'& .MuiPopover-paper': {
					borderRadius: 0,
				},
			}}
		>
			<Stack {...otherProps} padding={2}>
				{title && (
					<Typography
						sx={{
							fontSize: 18,
							fontWeight: theme.typography.fontWeightMedium,
						}}
					>
						{title}
					</Typography>
				)}
				{children}
			</Stack>
		</MuiPopover>
	)
}

export default forwardRef(Popover)

export const usePopover = () => useRef<PopoverOptions>(null)

export const openPopover = (ref: React.RefObject<PopoverOptions>) => (element: HTMLElement) =>
	ref.current?.openPopover(element)

export const closePopover = (ref: React.RefObject<PopoverOptions>) => () => ref.current?.closePopover()
