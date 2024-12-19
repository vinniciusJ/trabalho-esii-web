import { EventTypesTable } from '@/components/event-type/table';
import { StyledContainer } from '@/components/ui/container'
import { ViewLayout } from '@/layouts/view'
import { Box, Button, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { Modal, useModal } from '@/components/ui/modal'
import CreateEventTypeForm from '@/components/forms/create-event-type'

export const EventTypesPage = () => {
	const modalRef = useModal()
	const handleOpenModal = () => modalRef.current?.openModal()
	const handleCloseModal = () => modalRef.current?.closeModal()

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title>Tipos de evento</ViewLayout.Header.Title>
				<ViewLayout.Header.RightElements>
					<Button
						variant="text"
						color="primary"
						onClick={handleOpenModal}
						startIcon={<Add />}
					>
						Adicionar Tipo de Evento
					</Button>
				</ViewLayout.Header.RightElements>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<StyledContainer>
					<EventTypesTable />
				</StyledContainer>
			</ViewLayout.Content>

			<Modal ref={modalRef}>
				<Box sx={{ p: 3, backgroundColor: 'white', borderRadius: '8px', width: '100%', maxWidth: 500 }}>
					<Typography sx={(theme) => ({ fontSize: theme.spacing(2.25) })}>
						Criar Tipo de Evento
					</Typography>
					<CreateEventTypeForm onClose={handleCloseModal} />
				</Box>
			</Modal>
		</ViewLayout.Root>
	)
}

export default EventTypesPage
