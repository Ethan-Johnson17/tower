import { Auth0Provider } from '@bcwdev/auth0provider'
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
      // .delete('/:id', this.remove)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newAttendee = await attendeesService.create(req.body)
      return res.send(newAttendee)
    } catch (error) {
      next(error)
    }
  }
}
