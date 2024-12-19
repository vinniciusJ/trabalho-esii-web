import { EventType } from "react-hook-form"
import { eventosAPI } from "../eventos"
import { EventTypeForm } from "@/schemas/event-type"

class EventTypeService {
  private apiUrl: string

  constructor(apiUrl: string = `${eventosAPI.defaults.baseURL}/main-event-type`) {
    this.apiUrl = apiUrl
  }

  async createEventType(eventType: EventTypeForm): Promise<EventType> {
    const response = await eventosAPI.post<EventType>(this.apiUrl, eventType)
    return response.data
  }
}

export default EventTypeService
