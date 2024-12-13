import { Stack, TableCell } from '@mui/material'
import { Header, flexRender } from '@tanstack/react-table'

import SortingButton from './sorting-button'

interface TableHeaderProps<T> {
	header: Header<T, unknown>
}

const TableHeader = <T extends object>({ header }: TableHeaderProps<T>) => {
	const column = header.column

	return (
		<TableCell>
			<Stack direction='row' alignItems='center'>
				{flexRender(column.columnDef.header, header.getContext())}
				{column.getCanSort() && <SortingButton column={column} />}
			</Stack>
		</TableCell>
	)
}

export default TableHeader
