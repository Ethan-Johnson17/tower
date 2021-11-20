import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'
import { eventsService } from './EventsService'

class AttendeesService {
  // async getAll(query = {}) {
  //   const res = await dbContext.Attendees.find({}).populate('creator', 'name picture')
  //   return res
  // }

  async getById(id) {
    const attendees = await dbContext.Attendees.findById(id).populate('account', 'name picture')
    if (!attendees) {
      throw new BadRequest('Invalid id')
    }
    return attendees
  }

  async getEventAttendees(eventId) {
    return await dbContext.Attendees.find({ eventId }).populate('event', 'name, description').populate('account')
  }

  async getAttendance(accountId) {
    return await dbContext.Attendees.find({ accountId }).populate('event')
  }

  async create(body) {
    const event = await eventsService.getById(body.eventId)
    if (event.capacity === 0) {
      throw new BadRequest('No tickets left')
    }
    const found = await dbContext.Attendees.findOne({ eventId: body.eventId, accountId: body.accountId })
    logger.log('event check', found)
    if (found) {
      throw new BadRequest('You already RSVP`d')
    }
    event.capacity -= 1
    await event.save()
    const newAttendee = await dbContext.Attendees.create(body)
    return await newAttendee.populate('event account')
  }

  async remove(attendeeId, userId) {
    const attendee = await this.getById(attendeeId)
    const event = await eventsService.getById(attendee.eventId)
    if (attendee.accountId.toString() !== userId) {
      throw new Forbidden('ACCESS DENIED')
    }
    event.capacity += 1
    await event.save()
    await dbContext.Attendees.findByIdAndDelete(attendeeId)
  }
}

export const attendeesService = new AttendeesService()
