import { IconButton, Skeleton, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { theme } from '@/theme/index'
import { ArrowLeft } from '@mui/icons-material'

interface Props {
	children?: string
	goBack?: true
	isLoading?: boolean
}

export const ViewLayoutHeaderTitle = ({ children, goBack, isLoading = false }: Props) => {
	const navigate = useNavigate()

	return (
		<Stack direction='row' alignItems='center' gap={1}>
			{goBack && (
				<IconButton onClick={() => navigate(-1)} disabled={isLoading}>
					<ArrowLeft />
				</IconButton>
			)}
			<Typography variant='h1'>
				{isLoading ? <Skeleton width={theme.spacing(48)} height={theme.spacing(5)} /> : children}
			</Typography>
		</Stack>
	)
}
