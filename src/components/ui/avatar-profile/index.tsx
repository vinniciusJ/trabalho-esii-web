import Tooltip from '@mui/material/Tooltip'
import { AvatarIcon } from './styles'
import { useAuth } from '@/hooks/use-auth'
import generateNamedAvatarIcon from '@/utils/generate-named-avatar'
import { FC } from 'react'

export const AvatarProfile: FC = () => {
	const { user } = useAuth()
	if (!user) return null
	return (
		<Tooltip key="conta" title="Conta">
			<AvatarIcon>{generateNamedAvatarIcon(user.name)}</AvatarIcon>
		</Tooltip>
	)
}