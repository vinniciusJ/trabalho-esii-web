import { EventParticipantForm } from "@/schemas/user"
import { eventosAPI } from "../eventos"

class EventParticipantService {
  async fetchTotalParticipants(): Promise<number> {
    const response = await eventosAPI.get('/event-participant')
    return response.data.length
  }

  async registerParticipant(payload: EventParticipantForm): Promise<void> {
    await eventosAPI.post('/event-participant', payload)
  }
}

export default EventParticipantService