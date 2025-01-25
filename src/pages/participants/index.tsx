import { StyledContainer } from '@/components/ui/container'
import { ViewLayout } from '@/layouts/view'
import { FC } from 'react';
import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'
import { withAuthentication } from '@/hocs'
import { allRoles } from '@/utils/auth'
import { ParticipantsTable } from '@/components/participant/table'

const ParticipantsPage: FC = () => {
	const { user } = useAuth()
	const navigate = useNavigate()

	if (!user) navigate('/login')

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title>Participantes</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<StyledContainer>
					<ParticipantsTable />
				</StyledContainer>
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default withAuthentication(ParticipantsPage, allRoles)