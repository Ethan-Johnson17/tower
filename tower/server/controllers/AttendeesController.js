import { Auth0Provider } from '@bcwdev/auth0provider'
import { dbContext } from '../db/DbContext'
import { attendeesService } from '../services/AttendeesService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class AttendeesController extends BaseController {
  constructor() {
    super('api/attendees')
    this.router
      // .get('', this.getAll)
      // .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.remove)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.accountId = req.userInfo.id
      logger.log('body', req.body)
      const newAttendee = await attendeesService.create(req.body)
      // let cap = await dbContext.Events.findById(req.body.eventId)
      return res.send(newAttendee)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const userId = req.userInfo.id
      const attendeeId = req.params.id
      await attendeesService.remove(attendeeId, userId)
      res.send('Deleted')
    } catch (error) {
      next(error)
    }
  }
}
