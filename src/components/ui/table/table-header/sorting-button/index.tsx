import { useMemo } from 'react'

import { IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Column } from '@tanstack/react-table'

import Popover, { openPopover, usePopover } from '@/components/ui/popover'
import { ASC, DESC, useSorting } from '@/hooks/sorting'
import { ArrowDownward, ArrowUpward, SwapVert } from '@mui/icons-material'

export interface HeaderButtonProps<T> {
	column: Column<T, unknown>
}

const SortingButton = <T extends object>({ column }: HeaderButtonProps<T>) => {
	const sortingPopover = usePopover()
	const { changeSorting, getIsSortedBy, sortingType } = useSorting()

	const isSortedByThisColumn = useMemo(() => getIsSortedBy(column.id), [getIsSortedBy, column])

	return (
		<>
			<IconButton size='small' onClick={(e) => openPopover(sortingPopover)(e.currentTarget)}>
				{isSortedByThisColumn && (
					<>
						{sortingType == 'ASC' && <ArrowDownward color='primary' />}
						{sortingType == 'DESC' && <ArrowUpward color='primary' />}
					</>
				)}

				{!isSortedByThisColumn && <SwapVert />}
			</IconButton>
			<Popover ref={sortingPopover} title='table.sorting.sorting'>
				{
					<ToggleButtonGroup
						orientation='vertical'
						value={isSortedByThisColumn && sortingType}
						onChange={(_, value) => {
							changeSorting(column.id, value)
						}}
						exclusive
					>
						<ToggleButton value={ASC}>
							<ArrowDownward />
							Crescente
						</ToggleButton>
						<ToggleButton value={DESC}>
							<ArrowUpward />
							Decrescente
						</ToggleButton>
					</ToggleButtonGroup>
				}
			</Popover>
		</>
	)
}

export default SortingButton
