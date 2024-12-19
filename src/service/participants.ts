import { EventParticipantForm } from "@/schemas/user"
import apiInstance from "@/shared/api"

class EventParticipantService {
  private apiUrl: string

  constructor(apiUrl: string = `${apiInstance.defaults.baseURL}/event-participant`) {
    this.apiUrl = apiUrl
  }

  async fetchTotalParticipants(): Promise<number> {
    const response = await apiInstance.get(this.apiUrl)
    return response.data.length
  }

  async registerParticipant(payload: EventParticipantForm): Promise<void> {
    await apiInstance.post(this.apiUrl, payload)
  }
  
}

export default EventParticipantService;
