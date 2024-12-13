import { useMemo } from 'react'

import { CircularProgress, Stack, StackProps } from '@mui/material'

import { theme } from '@/theme/index'

interface Props extends StackProps {
	size?: 'small' | 'medium' | 'large'
	color?: 'blue' | 'white'
}

const Loading = ({ size = 'medium', color = 'blue', ...props }: Props) => {
	const loadingSize = useMemo(() => {
		if (size == 'small') {
			return theme.spacing(2)
		}

		if (size == 'medium') {
			return theme.spacing(4)
		}

		return theme.spacing(6)
	}, [theme, size])

	return (
		<Stack width='100%' alignItems='center' mt={2} {...props}>
			<CircularProgress
				size={loadingSize}
				sx={{
					color: (theme) =>
						color == 'blue' ? theme.palette.primary.main : theme.palette.grey[900],
				}}
			/>
		</Stack>
	)
}

export default Loading
