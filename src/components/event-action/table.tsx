import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import Table from "@/components/ui/table";
import { useGetPageable } from "@/hooks/get";
import { ENDPOINTS } from "@/constants/endpoints";
import { EventAction } from "@/schemas/event-action";
import { formatCurrency } from "@/utils/format-currency";
import { formatDateToString } from "@/utils/date";
import { useAuth } from "@/hooks/use-auth";
import { useMutate } from "@/hooks/mutate";
import { Event, EventSubscriptionForm } from "@/schemas/event";
import { Button } from "@mui/material";
import { useCallback } from "react";

interface Props {
  requestParams?: Record<string, unknown>;
  event: Event
}

export const EventActionsTable = ({ requestParams, event }: Props) => {
  const { user } = useAuth();
  const { create, remove } = useMutate<EventSubscriptionForm, EventSubscriptionForm>({
    endpoint: '',
    invalidateQueries: [[ENDPOINTS.EVENT_ACTION]]
  });

  const {
    data: eventTypes,
    totalElements,
    isLoading
  } = useGetPageable<EventAction>({
    endpoint: ENDPOINTS.EVENT_ACTION,
    requestParams: {
      ...requestParams,
      eventId: event.id
    }
  });

  const columnHelper = createColumnHelper<EventAction>();

  const columns: ColumnDef<EventAction>[] = [
    columnHelper.accessor("title", {
      id: "title",
      header: "Título"
    }),

    columnHelper.accessor("startDateTime", {
      id: "startDateTime",
      header: "Data de início",
      cell: (cell) => formatDateToString(cell.getValue())
    }),
    columnHelper.accessor("endDateTime", {
      id: "endDateTime",
      header: "Data de término",
      cell: (cell) => formatDateToString(cell.getValue())
    }),
    columnHelper.accessor("eventManagerDetailsDTO.name", {
      id: "eventManagerDetailsDTO.name",
      header: "Responsável"
    }),
    columnHelper.accessor("registrationPrice", {
      id: "registrationPrice",
      header: "Taxa de inscrição",
      cell: (cell) => formatCurrency(cell.getValue())
    }),
    columnHelper.accessor("quantityVacancies", {
      id: "quantityVacancies",
      header: "Total de vagas"
    }),
    columnHelper.accessor("quantityVacancies", {
      id: "quantityVacancies",
      header: "Vagas disponíveis",
      cell: (cell) => cell.getValue() - cell.row.original.participants?.length
    })
  ] as ColumnDef<EventAction>[];

  const getAction = useCallback((eventAction: EventAction) => {
    const inscribed = eventAction.participants?.some(
      (participant) => participant.cpfNumber == user?.cpfNumber
    );

    if (inscribed) {
      return (
        <Button
        variant="outlined"
        color="warning"
        onClick={(e) => {
          e.preventDefault();
          remove({
            customEnpoint: `${ENDPOINTS.EVENT_ACTION}/${eventAction.id}/${ENDPOINTS.PARTICIPANT}/${Number(user?.id)}`,
            id: Number(user?.id),
            successMessage: "Inscrição em cancelada!"
          });
        }}
      >
        Cancelar inscrição
      </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            create({
              customEnpoint: `${ENDPOINTS.EVENT_ACTION}/${eventAction.id}/${ENDPOINTS.PARTICIPANT}`, 
              body: {
                participantId: Number(user?.id),
              },
              successMessage: "Inscrição em ação realizada com sucesso!"
            });
          }}
        >
          Inscrever-se
        </Button>
      );
    }
  }, [event]);

  const inscribed = event.eventParticipants.some(p => p.id == user?.id)

  return (
    <Table
      columns={columns}
      data={eventTypes}
      dataLength={totalElements}
      isLoading={isLoading}
      getAction={user?.personRole == "ROLE_EVENT_PARTICIPANT" && inscribed ? getAction : undefined}
    />
  );
};
