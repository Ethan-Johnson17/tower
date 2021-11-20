import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeesService } from '../services/AttendeesService'
import { eventsService } from '../services/EventsService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.isCanceled)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const events = await eventsService.getAll(query)
      logger.log(events)
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const eventsResult = await eventsService.getById(req.params.id)
      return res.send(eventsResult)
    } catch (error) {
      next(error)
    }
  }

  async getEventAttendees(req, res, next) {
    try {
      const attendees = await attendeesService.getEventAttendees(req.params.id)
      return res.send(attendees)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newEvent = await eventsService.create(req.body)
      logger.log('Events service', newEvent)
      return res.send(newEvent)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const id = req.params.id
      const event = req.body
      event._id = id
      delete event.isCanceled
      const updatedEvent = await eventsService.edit(id, event)
      return res.send(updatedEvent)
    } catch (error) {
      next(error)
    }
  }

  async isCanceled(req, res, next) {
    try {
      const id = req.params.id
      const canceledEvent = await eventsService.edit(id, { isCanceled: true })
      return res.send(canceledEvent)
    } catch (error) {
      next(error)
    }
  }
}
