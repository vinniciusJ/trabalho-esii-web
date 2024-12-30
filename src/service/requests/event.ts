import { EventForm } from "@/schemas/event";
import { eventosAPI } from "../eventos";

class EventService {
  private apiUrl: string;

  constructor(apiUrl: string = `${eventosAPI.defaults.baseURL}/main-event`) {
    this.apiUrl = apiUrl;
  }

  async createEvent(eventData: EventForm): Promise<void> {
    await eventosAPI.post(this.apiUrl, eventData)
  }
}

export default EventService
