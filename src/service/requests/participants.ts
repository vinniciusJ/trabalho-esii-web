import { EventParticipantForm } from "@/schemas/user"
import { eventosAPI } from "../eventos"

class EventParticipantService {
  private apiUrl: string

  constructor(apiUrl: string = `${eventosAPI.defaults.baseURL}/event-participant`) {
    this.apiUrl = apiUrl
  }

  async fetchTotalParticipants(): Promise<number> {
    const response = await eventosAPI.get(this.apiUrl)
    return response.data.length
  }

  async registerParticipant(payload: EventParticipantForm): Promise<void> {
    await eventosAPI.post(this.apiUrl, payload)
  }
}

export default EventParticipantService