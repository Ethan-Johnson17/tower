import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class CommentsService {
  async getAll(query = '') {
    const res = await api.get(query)
    AppState.comments.res.data
    logger.log('Comments', res.data)
  }
}

export const commentsService = new CommentsService()