<template>
  <div class="row justify-content-center ">
    <div class="col-md-8">
      <div class="row elevation-3 m-2 pb-2 bg-grey darken-30 rounded-3">
        <div class="col-md-12 text-end m-1 pe-3">Join the conversation</div>
        <form @submit.prevent="addComment">
          <div class="col-md-12 p-0 pe-2m-2 rounded-3">
            <textarea name="comment" required id="createComment" style="resize:none" class="form-control"
              v-model="newComment.body"></textarea>
            <button @click.prevent="addComment" :disabled="newComment.body===null" type="submit"
              aria-label="Add Comment" class="my-2">post
              comment</button>
          </div>
          <!-- <div class="col-md-3">
          </div> -->
        </form>
        <div class="col-md-12" v-for="c in comments" :comment="c" :key="c.id">
          <div class="row my-3">
            <div class="col-md-2 pe-0 mt-2">
              <img :src="c.creator.picture" height="60" alt="User Picture" class="rounded-circle">
            </div>
            <div class="col-md-9 bg-light rounded text-dark p-0 m-0">
              <div class="ms-2  py-1 px-3">
                <b>{{c.creator.name}}</b>
                <p>{{c.body}}</p>
                <i v-if="account.id == c.creatorId" class="mdi mdi-trash-can-outline text-danger selectable"
                  @click="remove(c.id)" title="delete comment"></i>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
  import { onMounted, ref } from "@vue/runtime-core"
  import { computed } from "@vue/reactivity"
  import { AppState } from "../AppState"
  import { commentsService } from "../services/CommentsService"
  import Pop from "../utils/Pop"
  import { logger } from "../utils/Logger"
  import { router } from "../router"
  import { useRoute } from "vue-router"
  export default {
    // props: {
    //   comment: {
    //     type: Object,
    //     required: true
    //   }
    // },
    setup() {
      const route = useRoute()
      const newComment = ref({})
      onMounted(async () => {

        try {
          await commentsService.getAll('api/events/' + route.params.id + '/comments')
        } catch (error) {
          logger.error(error)
        }
      })
      return {
        events: computed(() => AppState.events),
        account: computed(() => AppState.account),
        comments: computed(() => AppState.comments),
        newComment,

        async addComment() {
          try {
            logger.log('work!')
            newComment.value.eventId = route.params.id
            logger.log('comment', newComment.value)
            await commentsService.addComment(route.params.id, newComment.value)
            newComment.value = {}
          } catch (error) {

          }
        },

        async remove(id) {
          try {
            logger.log('Delete', id)
            // const commentId = props.comment.id
            await commentsService.remove(id)
          } catch (error) {
            logger.error(error)
            Pop.toast(error, 'error')
          }
        }
      }
    }
  }
</script>


<style lang="scss" scoped>

</style>