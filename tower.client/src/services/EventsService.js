import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class EventsService {
  async getAll(query = '') {
    const res = await api.get(query)
    AppState.events = res.data
  }

  async getById(id) {
    const res = await api.get('api/events/' + id)
    logger.log('get event by id', res.data)
    AppState.activeEvent = res.data
  }

  async createEvent(eventData) {
    const res = await api.post('api/events', eventData)
    logger.log("create", res)
    AppState.events.unshift(res.data)
    AppState.activeEvent = res.data
    Pop.toast('created', 'success')
  }

  async edit(id, event) {
    const res = await api.put('api/events/' + id, event)
    logger.log('edit', res.data)
    AppState.activeEvent = res.data
    Pop.toast('Edited', 'success')

    const index = AppState.events.findIndex(e => e.id === AppState.activeEvent.id)
    if (index === -1) {
      AppState.events.push(AppState.activeEvent)
      return
    }
    AppState.events.splice(index, 1, AppState.activeEvent)
  }

  async cancel(id) {
    await api.delete('api/events/' + id)
    AppState.projects = AppState.projects.filter(p => p.id !== id)
  }
}

export const eventsService = new EventsService()