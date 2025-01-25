import { StyledContainer } from "@/components/ui/container";
import { ViewLayout } from "@/layouts/view";
import { FC } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate, useParams } from "react-router-dom";
import { withAuthentication } from "@/hocs";
import { allRoles } from "@/utils/auth";
import { useGetBy } from "@/hooks/get-by";
import { ENDPOINTS } from "@/constants/endpoints";
import { Event } from "@/schemas/event";
import { Field } from "@/components/ui/field";
import { formatDateToString } from "@/utils/date";
import { formatCurrency } from "@/utils/format-currency";
import { Box, Button, Stack, Typography } from "@mui/material";
import { EventActionsTable } from "@/components/event-action/table";
import EventActionForm from "@/components/event-action/form";
import { closeModal, Modal, openModal, useModal } from "@/components/ui/modal";
import { Add } from "@mui/icons-material";
import EventForm from "@/components/event/form";

const EventPage: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) navigate("/login");

  const { eventId } = useParams();
  const actionModalRef = useModal();
  const editModalRef = useModal();

  const { data: event } = useGetBy<Event>({
    endpoint: ENDPOINTS.EVENT,
    id: eventId ?? ""
  });

  if (!event) return null;

  return (
    <ViewLayout.Root>
      <ViewLayout.Header.Root>
        <ViewLayout.Header.Title
          goBack
        >{`Evento ${event.title}`}</ViewLayout.Header.Title>
        <ViewLayout.Header.RightElements>
          {user?.personRole != 'ROLE_EVENT_PARTICIPANT' && (
            <Button variant="outlined" onClick={openModal(editModalRef)}>Editar</Button>
          )}
        </ViewLayout.Header.RightElements>
      </ViewLayout.Header.Root>

      <ViewLayout.Content>
        <StyledContainer>
          <Stack
            gap={3}
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            <Field label="Tipo de evento">
              {event.mainEventTypeDetailsDTO.name}
            </Field>
            <Field label="Data de início">
              {formatDateToString(event.startDateTime)}
            </Field>
            <Field label="Data de término">
              {formatDateToString(event.endDateTime)}
            </Field>
            <Field label="Endereço">{event.address}</Field>
            <Field label="Reponsável">
              {event.eventManagerDetailsDTO.name}
            </Field>
            <Field label="Taxa de inscrição">
              {formatCurrency(event.registrationPrice)}
            </Field>
          </Stack>

          <Stack justifyContent="space-between" direction="row">
            <Typography variant="h2">Ações</Typography>
            <Button startIcon={<Add />} onClick={openModal(actionModalRef)}>
              Cadastrar Ação
            </Button>
          </Stack>

          <EventActionsTable eventId={Number(eventId)} />
        </StyledContainer>
      </ViewLayout.Content>

      <Modal ref={editModalRef}>
        <Box
          sx={{
            p: 3,
            backgroundColor: "white",
            borderRadius: 2,
            maxWidth: 600,
            width: "100%"
          }}
        >
          <Typography>Editar Evento</Typography>
          <EventForm onClose={closeModal(editModalRef)} event={event} />
        </Box>
      </Modal>

      <Modal ref={actionModalRef}>
        <EventActionForm onClose={closeModal(actionModalRef)} eventId={event.id} />
      </Modal>
    </ViewLayout.Root>
  );
};

export default withAuthentication(EventPage, allRoles);
