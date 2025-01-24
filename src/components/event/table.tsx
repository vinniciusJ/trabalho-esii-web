import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/ui/table";
import { useGetPageable } from "@/hooks/get";
import { ENDPOINTS } from "@/constants/endpoints";
import { Event } from "@/schemas/event";
import { formatDateToString } from "@/utils/date";
import { useCallback } from "react";
import { formatCurrency } from "@/utils/format-currency";

interface Props {
  requestParams?: Record<string, unknown>;
}

export const EventsTable = ({ requestParams }: Props) => {
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

  return (
    <Table
      columns={columns}
      data={events}
      dataLength={totalElements}
      isLoading={isLoading}
      getRowLink={getRowLink}
    />
  );
};
