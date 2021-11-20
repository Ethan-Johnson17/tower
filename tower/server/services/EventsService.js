import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'

class EventsService {
  async getAll(query = {}) {
    const res = await dbContext.Events.find({}).populate('creator', 'name picture')
    logger.log(res)
    return res
  }

  async getById(id) {
    const found = await dbContext.Events.findById(id).populate('creator', 'name picture')
    if (!found) {
      throw new BadRequest('Invalid ID')
    }
    return found
  }

  async create(body) {
    const newEvent = await dbContext.Events.create(body)
    logger.log('Events Service', newEvent)
    return await this.getById(newEvent.id)
  }

  async edit(eventId, body) {
    const foundEvent = await this.getById(eventId)
    if (foundEvent.isCanceled === true) {
      throw new BadRequest('this event is canceled')
    }
    const updatedEvent = await dbContext.Events.findByIdAndUpdate(eventId, body, { new: true })
    return updatedEvent
  }
}

export const eventsService = new EventsService()
