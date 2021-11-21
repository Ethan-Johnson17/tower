<template>
  <div class="row">
    <div class="col-md-3">What people are saying about THIS EVENT</div>
  </div>
  <div class="col-md-8">
    <div class="row elevation-3 m-2 pb-2 bg-grey darken-30 rounded-3">
      <div class="col-md-9"></div>
      <div class="col-md-3">Join the conversation</div>
      <form>
        <div class="col-md-12 p-0 m-0 rounded-3">
          <textarea name="comment" id="createComment" cols="30" rows="10"></textarea>
        </div>
        <div class="col-md-3">
          <button @click="addComment">post comment</button>
        </div>
      </form>
      <div class="col-md-12" v-for="c in comments" :key="c.id"><img src="creator.picture" alt="User Picture">
        <div>
          <b>{{creator.name}}</b>
          <p>{{comment.body}}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import { onMounted } from "@vue/runtime-core"
  import { computed } from "@vue/reactivity"
  import { AppState } from "../AppState"
  import { commentsService } from "../services/CommentsService"
  import Pop from "../utils/Pop"
  import { logger } from "../utils/Logger"
  import { router } from "../router"
  import { useRoute } from "vue-router"
  export default {
    props: {
      event: {
        type: Object,
        required: true
      }
    },
    setup() {
      onMounted(async () => {

        try {
          await commentsService.getAll('api/comments')
          logger.log()
        } catch (error) {
          logger.error(error)
        }
      })
      return {
        events: computed(() => AppState.events)

      }
    }
  }
</script>


<style lang="scss" scoped>

</style>