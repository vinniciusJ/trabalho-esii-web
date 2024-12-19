import { EventsTable } from '@/components/event/table';
import { StyledContainer } from '@/components/ui/container';
import { ViewLayout } from '@/layouts/view';
import { Button, Box, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Modal, useModal } from '@/components/ui/modal';
import CreateEventForm from '@/components/forms/create-event';
import { FC } from 'react';

const EventsPage: FC = () => {
	const modalRef = useModal()

	const handleOpenModal = () => modalRef.current?.openModal()

	const handleCloseModal = () => modalRef.current?.closeModal();

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title>Eventos</ViewLayout.Header.Title>
				<ViewLayout.Header.RightElements>
					<Button
						variant="text"
						color="primary"
						startIcon={<Add />}
						onClick={handleOpenModal}
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
					<CreateEventForm onClose={handleCloseModal} />
				</Box>
			</Modal>
		</ViewLayout.Root>
	)
}

export default EventsPage