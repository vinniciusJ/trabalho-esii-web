import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/ui/table";
import { useGetPageable } from "@/hooks/get";
import { ENDPOINTS } from "@/constants/endpoints";
import { Event, EventSubscriptionForm } from "@/schemas/event";
import { formatDateToString } from "@/utils/date";
import { useCallback } from "react";
import { formatCurrency } from "@/utils/format-currency";
import { Button } from "@mui/material";
import { useAuth } from "@/hooks/use-auth";
import { useMutate } from "@/hooks/mutate";

interface Props {
  requestParams?: Record<string, unknown>;
}

export const EventsTable = ({ requestParams }: Props) => {
  const { user } = useAuth();
  const { create, remove } = useMutate<
    EventSubscriptionForm,
    EventSubscriptionForm
  >({
    endpoint: "",
    invalidateQueries: [[ENDPOINTS.EVENT]]
  });

  const {
    data: events,
    totalElements,
    isLoading
  } = useGetPageable<Event>({
    endpoint: ENDPOINTS.EVENT,
    requestParams: {
      ...requestParams,
      ...(user?.personRole == "ROLE_EVENT_MANAGER" && {
        eventManagerId: Number(user?.id)
      })
    }
  });

  const columnHelper = createColumnHelper<Event>();

  const columns: ColumnDef<Event>[] = [
    columnHelper.accessor("title", {
      id: "title",
      header: "Título"
    }),
    columnHelper.accessor("mainEventTypeDetailsDTO.name", {
      id: "mainEventTypeDetailsDTO.name",
      header: "Tipo de evento"
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
    })
  ] as ColumnDef<Event>[];

  const getRowLink = useCallback((event: Event) => `${event.id}`, []);

  const getAction = useCallback(
    (event: Event) => {
      const inscribed = event.eventParticipants?.some(
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
                customEnpoint: `${ENDPOINTS.EVENT}/${event.id}/${ENDPOINTS.PARTICIPANT}/${Number(user?.id)}`,
                id: Number(user?.id),
                successMessage: "Inscrição em cancelada!",
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
                customEnpoint: `${ENDPOINTS.EVENT}/${event.id}/${ENDPOINTS.PARTICIPANT}`,
                body: {
                  participantId: Number(user?.id)
                },
                successMessage: "Inscrição em evento realizada com sucesso!"
              });
            }}
          >
            Inscrever-se
          </Button>
        );
      }
    },
    [user, events]
  );

  return (
    <Table
      columns={columns}
      data={events}
      dataLength={totalElements}
      isLoading={isLoading}
      getRowLink={getRowLink}
      getAction={
        user?.personRole == "ROLE_EVENT_PARTICIPANT" ? getAction : undefined
      }
    />
  );
};
