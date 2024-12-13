import { ReactNode } from 'react'

import { Button, Stack, StackProps, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { theme } from '@/theme/index'

export interface WarningProps extends StackProps {
	code?: number
	title?: string
	description?: string
	icon?: ReactNode | true
	button?: boolean
}

const Warning = ({ code, title: title, description: description, icon, button, ...props }: WarningProps) => {
	const navigate = useNavigate()

	const handleRedirect = () => {
		navigate('/events')
	}

	return (
		<Stack alignItems='center' justifyContent='center' gap={1} {...props}>
			{icon}

			{code && (
				<Typography
					variant='h1'
					sx={{
						color: theme.palette.primary.main,
						fontSize: theme.spacing(10),
						marginY: theme.spacing(4),
					}}
				>
					{code}
				</Typography>
			)}

			{title && (
				<Typography
					variant='h2'
					sx={{ fontWeight: 'medium', fontSize: '1.5rem', textWrap: 'wrap', textAlign: 'center' }}
				>
					{title}
				</Typography>
			)}

			{description && (
				<Typography variant='h3' sx={{ color: theme.palette.grey[700], fontWeight: 400 }}>
					{description}
				</Typography>
			)}

			{button && (
				<Button
					variant='contained'
					onClick={handleRedirect}
					sx={{ marginY: theme.spacing(4) }}
				>
					Voltar
				</Button>
			)}
		</Stack>
	)
}

export default Warning
