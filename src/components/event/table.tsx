import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/ui/table";
import { useGetPageable } from "@/hooks/get";
import { ENDPOINTS } from "@/constants/endpoints";
import { Event, EventSubscriptionForm } from "@/schemas/event";
import { formatDateToString } from "@/utils/date";
import { useCallback } from "react";
import { formatCurrency } from "@/utils/format-currency";
import { Button, Typography } from "@mui/material";
import { useAuth } from "@/hooks/use-auth";
import { useMutate } from "@/hooks/mutate";

interface Props {
  requestParams?: Record<string, unknown>;
}

export const EventsTable = ({ requestParams }: Props) => {
  const { user } = useAuth();
  const { create } = useMutate<EventSubscriptionForm, EventSubscriptionForm>({
    endpoint: ENDPOINTS.EVENT_SUBSCRIPTION
  });

  const {
    data: events,
    totalElements,
    isLoading
  } = useGetPageable<Event>({
    endpoint: ENDPOINTS.EVENT,
    requestParams: {
      ...requestParams
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

  const getAction = useCallback((event: Event) => {
    const inscribed = event.participants?.some(
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
            create({
              body: {
                eventParticipantCpf: user?.cpfNumber ?? "",
                mainEventId: event.id,
                mainEventActionId: null
              },
              successMessage: "Inscrição realizada com sucesso"
            });
          }}
        >
          Inscrever-se
        </Button>
      );
    }
  }, []);

  return (
    <Table
      columns={columns}
      data={events}
      dataLength={totalElements}
      isLoading={isLoading}
      getRowLink={getRowLink}
      getAction={getAction}
    />
  );
};
