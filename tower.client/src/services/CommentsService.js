import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class CommentsService {
  async getAll(query = '') {
    const res = await api.get(query)
    logger.log('Comments', res.data)
    AppState.comments = res.data
  }

  async addComment(eventId, commentData) {
    const res = await api.post('api/comments', commentData)
    logger.log(res.data)
    AppState.comments.unshift(res.data)
  }

  async remove(commentId) {
    const yes = await Pop.confirm('Delete Comment?')
    if (!yes) { return }
    await api.delete('api/comments/' + commentId)
    AppState.comments = AppState.comments.filter(c => c.id !== commentId)
  }
}

export const commentsService = new CommentsService()