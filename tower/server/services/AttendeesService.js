import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'

class AttendeesService {
  async getAll(query = {}) {
    const res = await dbContext.Attendees.find({}).populate('creator', 'name picture')
    return res
  }

  async getById(id) {
    const attendees = await dbContext.Attendees.findById(id).populate('creator', 'name picture')
    if (!attendees) {
      throw new BadRequest('Invalid id')
    }
    return attendees
  }

  async getEventAttendees(eventId) {
    return await dbContext.Attendees.find({ eventId })
  }

  async create(body) {
    const newAttendee = await dbContext.Attendees.create(body)
    return await this.getById(newAttendee)
  }
}

export const attendeesService = new AttendeesService()
