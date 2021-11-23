<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <h3>My Reservations</h3>
    <div class="row">
      <div class="col-md-3" v-for="event in myAttendance" key="event.id">
        <Event :eventProp="event" />
      </div>
    </div>
    <h3>My Events</h3>
    <div class="row justify-content-center">
      <div class="col-md-8 " v-for="event in myEvents" key="event.id">
        <Event :eventProp="event" />
      </div>
    </div>
  </div>
</template>

<script>
  import { computed, onMounted } from 'vue'
  import { AppState } from '../AppState'
  import { eventsService } from "../services/EventsService"
  import { attendeesService } from "../services/AttendeesService"
  import Pop from "../utils/Pop"
  import { logger } from "../utils/Logger"
  import { router } from "../router"
  import { useRouter } from "vue-router"
  import { AuthService } from '../services/AuthService'
  export default {
    name: 'Account',
    props: {
      eventProp: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      const account = computed(() => AppState.account)

      onMounted(() => {
        eventsService.getAll('?creatorId=' + AuthService.userInfo.id)
        attendeesService.getEventsForAccount()
      })
      return {
        account: computed(() => AppState.account),
        myEvents: computed(() => AppState.myEvents),
        myAttendance: computed(() => AppState.myAttendance)
      }
    }
  }
</script>

<style scoped>
  img {
    max-width: 100px;
  }
</style>