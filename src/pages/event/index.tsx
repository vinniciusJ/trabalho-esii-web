import { EventsTable } from '@/components/event/table'
import { StyledContainer } from '@/components/ui/container'
import { ViewLayout } from '@/layouts/view'

const EventTypesPage = () => {
	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title>Eventos</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<StyledContainer>
					<EventsTable />
				</StyledContainer>
			</ViewLayout.Content>    
		</ViewLayout.Root>
	)
}

export default EventTypesPage
