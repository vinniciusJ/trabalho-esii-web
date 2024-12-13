import { Warning as WarningIcon } from '@mui/icons-material'
import Warning, { WarningProps } from '..'
import { theme } from '@/theme/index'

export const InfoWarning = (props: Omit<WarningProps, 'icon'>) => {
	return <Warning {...props} icon={<WarningIcon sx={ { color: theme.palette.grey[700] } } />} />
}
