import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import { useGetPageable } from '@/hooks/get'
import { ENDPOINTS } from '@/constants/endpoints'
import { EventAction } from '@/schemas/event-action'
import { formatCurrency } from '@/utils/format-currency'
import { formatDateToString } from '@/utils/date'

interface Props {
	requestParams?: Record<string, unknown>
}

export const EventActionsTable = ({  requestParams }: Props) => {
	const {
		data: eventTypes,
		totalElements,
		isLoading,
	} = useGetPageable<EventAction>({
		endpoint: ENDPOINTS.EVENT_ACTION,
		requestParams: {
			...requestParams,
		},
	})

    const columnHelper = createColumnHelper<EventAction>()

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
        header: "Vagas disponíveis",
      })
	] as ColumnDef<EventAction>[]

	return <Table columns={columns} data={eventTypes} dataLength={totalElements} isLoading={isLoading} />
}
