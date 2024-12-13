import { Stack } from '@mui/material'
import { Header, flexRender } from '@tanstack/react-table'

import SortingButton from './sorting-button'

interface TableHeaderProps<T> {
	header: Header<T, unknown>
}

const TableHeader = <T extends object>({ header }: TableHeaderProps<T>) => {
	const column = header.column

	return (
		<Stack direction='row' alignItems='center'>
			{flexRender(column.columnDef.header, header.getContext())}
			{column.getCanSort() && <SortingButton column={column} />}
		</Stack>
	)
}

export default TableHeader
