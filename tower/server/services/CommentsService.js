import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'

class CommentsService {
  async getAll(query = {}) {
    const comments = await dbContext.Comment.find(query).populate('creator', 'name picture')
    return comments
  }

  async getById(id) {
    const comment = await dbContext.Comment.findById(id).populate('creator', 'name picture')
    if (!comment) {
      throw new BadRequest('Invalid comment Id')
    }
    return comment
  }

  async getByEventId(eventId) {
    return await dbContext.Comment.find({ eventId }).populate('creator')
  }

  async create(body) {
    const newComment = await dbContext.Comment.create(body)
    return newComment.populate('creator', 'name picture')
  }

  async remove(commentId, userId) {
    const comment = await this.getById(commentId)
    if (comment.creatorId.toString() !== userId) {
      throw new Forbidden('ACCESS DENIED')
    }
    await dbContext.Comment.findByIdAndDelete(commentId)
  }
}

export const commentsService = new CommentsService()
