import { EventForm } from "@/schemas/event";
import { eventosAPI } from "../eventos";

class EventService {
  private apiUrl: string;

  constructor(apiUrl: string = `${eventosAPI.defaults.baseURL}/main-event`) {
    this.apiUrl = apiUrl;
  }

  async createEvent(eventData: EventForm): Promise<void> {
    try {
      await eventosAPI.post(this.apiUrl, eventData)
    } catch (error) {
      console.error("Erro ao criar evento:", error)
      throw error
    }
  }
}

export default EventService
