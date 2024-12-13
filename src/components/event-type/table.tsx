import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import Table from '@/components/ui/table'
import { useGetPageable } from '@/hooks/get'
import { EventType } from '@/schemas/event-type'
import { ENDPOINTS } from '@/constants/endpoints'

interface Props {
	requestParams?: Record<string, unknown>
}

export const EventTypesTable = ({  requestParams }: Props) => {
	const {
		data: eventTypes,
		totalElements,
		isLoading,
	} = useGetPageable<EventType>({
		endpoint: ENDPOINTS.EVENT_TYPE,
		requestParams: {
			...requestParams,
		},
	})

    const columnHelper = createColumnHelper<EventType>()

	const columns: ColumnDef<EventType>[] = [
		columnHelper.accessor('name', {
			id: 'name',
			header: 'Nome',
		}),
	] as ColumnDef<EventType>[]

	return <Table columns={columns} data={eventTypes} dataLength={totalElements} isLoading={isLoading} />
}
