import { useCallback, useMemo } from 'react'

import { Divider, Tabs as MuiTabs, Stack, StackProps, Tab } from '@mui/material'

import NotFoundNavigation from '@/components/navigation/not-found'
import { useSectionNavigation } from '@/hooks/section-navigation'
import { LabelValue } from '@/types/label-value'

interface Props<T> extends StackProps {
	sections: LabelValue<T>[]
}

export const ViewLayoutSections = <T extends string>({ sections, ...props }: Props<T>) => {
	const { section, changeSection } = useSectionNavigation(sections[0].value)

	const navigate = useCallback(
		(_e: unknown, value: string) => {
			changeSection(value as T)
		},
		[section]
	)

	const isSectionValid = useMemo(() => sections.some((sub) => sub.value == section), [section])

	if (!isSectionValid) return <NotFoundNavigation />

	return (
		<Stack {...props}>
			<MuiTabs value={section} onChange={navigate}>
				{sections.map((section) => (
					<Tab label={section.label} value={section.value} key={section.value} />
				))}
			</MuiTabs>
			<Divider sx={{ marginTop: '-2px' }} />
		</Stack>
	)
}
