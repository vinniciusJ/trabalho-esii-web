import { EventsTable } from '@/components/event/table'
import { StyledContainer } from '@/components/ui/container'
import { ViewLayout } from '@/layouts/view'
import { Button, Box, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { closeModal, Modal, openModal, useModal } from '@/components/ui/modal'
import CreateEventForm from '@/components/forms/create-event'
import { FC } from 'react';
import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'
import { withAuthentication } from '@/hocs'
import { allRoles } from '@/utils/auth'

const EventsPage: FC = () => {
	const { user } = useAuth()
	const navigate = useNavigate()

	if (!user) navigate('/login')

	const modalRef = useModal()

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title>Eventos</ViewLayout.Header.Title>
				<ViewLayout.Header.RightElements>
					<Button
						variant="text"
						color="primary"
						startIcon={<Add />}
						onClick={openModal(modalRef)}
					>
						Adicionar Evento
					</Button>
				</ViewLayout.Header.RightElements>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<StyledContainer>
					<EventsTable />
				</StyledContainer>
			</ViewLayout.Content>

			<Modal ref={modalRef}>
				<Box
					sx={{
						p: 3,
						backgroundColor: 'white',
						borderRadius: 2,
						maxWidth: 600,
						width: '100%',
					}}
				>
					<Typography >Criar Evento</Typography>
					<CreateEventForm onClose={closeModal(modalRef)} />
				</Box>
			</Modal>
		</ViewLayout.Root>
	)
}

export default withAuthentication(EventsPage, allRoles)