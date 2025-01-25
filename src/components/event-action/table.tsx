import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import Table from "@/components/ui/table";
import { useGetPageable } from "@/hooks/get";
import { ENDPOINTS } from "@/constants/endpoints";
import { EventAction } from "@/schemas/event-action";
import { formatCurrency } from "@/utils/format-currency";
import { formatDateToString } from "@/utils/date";
import { useAuth } from "@/hooks/use-auth";
import { useMutate } from "@/hooks/mutate";
import { EventSubscriptionForm } from "@/schemas/event";
import { Button, Typography } from "@mui/material";
import { useCallback } from "react";

interface Props {
  requestParams?: Record<string, unknown>;
  eventId: number
}

export const EventActionsTable = ({ requestParams, eventId }: Props) => {
  const { user } = useAuth();
  const { patch } = useMutate<EventSubscriptionForm, EventSubscriptionForm>({
    endpoint: ''
  });

  const {
    data: eventTypes,
    totalElements,
    isLoading
  } = useGetPageable<EventAction>({
    endpoint: ENDPOINTS.EVENT_ACTION,
    requestParams: {
      ...requestParams,
      eventId //TODO
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
      header: "Vagas disponíveis"
    })
  ] as ColumnDef<EventAction>[];

  const getAction = useCallback((eventAction: EventAction) => {
    const inscribed = eventAction.participants?.some(
      (participant) => participant.cpfNumber == user?.cpfNumber
    );

    if (inscribed) {
      return (
        <Typography color="primary" fontWeight={600}>
          Inscrito
        </Typography>
      );
    } else {
      return (
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            patch({
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
  }, [eventId]);

  return (
    <Table
      columns={columns}
      data={eventTypes}
      dataLength={totalElements}
      isLoading={isLoading}
      getAction={user?.personRole != "ROLE_ADMIN" ? getAction : undefined}
    />
  );
};
