import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class AttendeesService {
  async getEventAttendees(eventId) {
    const res = await api.get('api/events/' + eventId + '/attendees')
    logger.log('event attendees', res.data)
    AppState.attendees = res.data
  }

  async attendEvent(body) {
    const res = await api.post('api/attendees', body)
  }

  async getEventsForAccount() {
    const res = await api.get('account/attendees')
    logger.log('accountAttend', res.data)
    AppState.myEvents = res.data
  }
}

export const attendeesService = new AttendeesService