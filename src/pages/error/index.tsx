import { Stack } from '@mui/material'

import Warning, { WarningProps } from '@/components/ui/feedback/warning'

const ErrorPage = (props: Omit<WarningProps, 'button'>) => {
	return (
		<Stack justifyContent='center' minWidth='100vw' minHeight='100vh' alignItems='center'>
			<Warning {...props} button />
		</Stack>
	)
}

export default ErrorPage
