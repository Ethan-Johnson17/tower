import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class EventsService {
  async getAll(query = '') {
    const res = await api.get(query)
    AppState.events = res.data
  }
}

export const eventsService = new EventsService()