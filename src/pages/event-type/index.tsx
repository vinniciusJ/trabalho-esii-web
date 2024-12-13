import { EventTypesTable } from '@/components/event-type/table'
import { StyledContainer } from '@/components/ui/container'
import { ViewLayout } from '@/layouts/view'

const EventTypesPage = () => {
	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title>Tipos de evento</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<StyledContainer>
					<EventTypesTable />
				</StyledContainer>
			</ViewLayout.Content>    
		</ViewLayout.Root>
	)
}

export default EventTypesPage
