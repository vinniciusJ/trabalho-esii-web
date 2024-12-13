import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import { useGetPageable } from '@/hooks/get'
import { ENDPOINTS } from '@/constants/endpoints'
import { Event } from '@/schemas/event'
import { formatDateToString } from '@/utils/date'

interface Props {
	requestParams?: Record<string, unknown>
}

export const EventsTable = ({  requestParams }: Props) => {
	const {
		data: events,
		totalElements,
		isLoading,
	} = useGetPageable<Event>({
		endpoint: ENDPOINTS.EVENT,
		requestParams: {
			...requestParams,
		},
	})

    const columnHelper = createColumnHelper<Event>()

	const columns: ColumnDef<Event>[] = [
		columnHelper.accessor('title', {
			id: 'title',
			header: 'Título',
		}),
		columnHelper.accessor('eventType.name', {
			id: 'eventType.name',
			header: 'Tipo de evento',
		}),
		columnHelper.accessor('startDate', {
			id: 'startDate',
			header: 'Data de início',
			cell: (cell) => formatDateToString(cell.getValue())
		}),
		columnHelper.accessor('endDate', {
			id: 'endDate',
			header: 'Data de término',
			cell: (cell) => formatDateToString(cell.getValue())
		}),
		columnHelper.accessor('responsible.name', {
			id: 'responsible.name',
			header: 'Responsável',
		}),
		columnHelper.accessor('availablePositions', {
			id: 'availablePositions',
			header: 'Vagas disponíveis',
		}),
		columnHelper.accessor('registrationFee', {
			id: 'registrationFee',
			header: 'Taxa de inscrição',
		}),
	] as ColumnDef<Event>[]

	return <Table columns={columns} data={events} dataLength={totalElements} isLoading={isLoading} />
}
