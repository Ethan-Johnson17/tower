<template>
  <div class="row border-primary bg-primary justify-content-around">
    <div class="col-md-4"><img :src="eventDetails.coverImg" alt="Event Cover image" width="400" class="mt-3 img-fluid">
    </div>
    <div class="col-md-7 ms-3">
      <div class="row justify-content-between my-3">
        <div class="col-md-8 f-20">{{eventDetails.name}}</div>
        <div class="col-md-3">{{eventDetails.startDate}} DAY</div>
      </div>
      <div class="row justify-content-between my-3">
        <div class="col-md-3">{{eventDetails.location}}</div>
        <div class="col-md-3">{{eventDetails.startDate}} TIME</div>
      </div>
      <div class="row justify-content-between my-3">
        <div class="col-md-12">{{eventDetails.description}}</div>
      </div>
      <div class="row justify-content-between mt-auto" v-if="eventDetails.isCanceled===false">
        <div class="col-md-3">{{eventDetails.capacity}} Spots left</div>
        <div class="col-md-3" v-if="!account.id"><button class="btn btn-warning"
            :disabled="!account.id || attending">Sign in to reserve your spot</button>
        </div>
        <div v-else-if="attending" class="col-md-3"><button class="btn btn-warning"
            :disabled="!account.id || attending">Your spot is saved!</button>
        </div>
        <div v-else class="col-md-3"><button class="btn btn-warning" @click="attendEvent"
            :disabled="!account.id || eventDetails.capacity === 0">Attend</button>
        </div>
        <div class="col-md-5 mt-5 text-end">
          <button class="btn btn-danger m-3" title="Cancel Event" @click="cancel"><i class="mdi mdi-cancel"></i>
          </button>
          <button class="btn btn-warning m-3" title="Edit Event" data-bs-toggle="modal" data-bs-target="#create">
            <i class="mdi mdi-pencil"></i> </button>
        </div>
      </div>
      <div class="row justify-content-center me-2 mb-2" v-else>
        <div class="col-md-10 text-center f-20 text-light bg-danger lighten-20 border border-light">Event Canceled</div>
      </div>
      <div class="row justify-content-end me-3">
      </div>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-md-10 my-2 bg-grey darken-20 rounded-3 py-1">
      <img :src="a.account.picture" alt="Account pic" class="rounded-circle" v-for="a in attendees" :key="a.accountId"
        height="35" :title="a.account.name">
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-md-8 text-start">What people are saying about <b>{{eventDetails.name}}</b></div>
    <Comment />

  </div>
</template>

<script>
  import { computed } from "@vue/reactivity"
  import { AppState } from "../AppState"
  import { eventsService } from "../services/EventsService"
  import { attendeesService } from "../services/AttendeesService"
  import Pop from "../utils/Pop"
  import { logger } from "../utils/Logger"
  import { router } from "../router"
  import { onMounted, ref } from "@vue/runtime-core"
  import { useRoute, useRouter } from "vue-router"
  export default {
    name: 'EventDetails',
    // props: { event: { type: Object, required: true } },

    setup() {
      const route = useRoute()
      const router = useRouter()
      const newAttendee = ref({})
      onMounted(async () => {
        try {
          logger.log(route.params.id)
          await eventsService.getById(route.params.id)
          await attendeesService.getEventAttendees(route.params.id)
        } catch (error) {
          logger.error(error)
          Pop.toast('Could not get that event', 'error')
          // router.push({ name: 'Home' })
        }
      })
      return {
        eventDetails: computed(() => AppState.activeEvent),
        account: computed(() => AppState.account),
        attendees: computed(() => AppState.attendees),
        attending: computed(() => {
          const found = AppState.attendees.find(b => b.accountId === AppState.account.id)
          return found ? true : false
        }),



        async attendEvent() {
          try {
            newAttendee.value.accountId = AppState.account.id
            newAttendee.value.eventId = route.params.id
            logger.log('attendee', newAttendee.value)
            await attendeesService.attendEvent(newAttendee.value)
            Pop.toast('Spot Reserved!', 'success')
          } catch (error) {
            logger.error(error)
            Pop.toast('We already saved you a spot!', 'warning')
          }
        },

        async cancel() {
          try {
            const yes = await Pop.confirm('Cancel Event?')
            if (!yes) { return }
            const id = route.params.id
            const update = AppState.activeEvent
            update.isCanceled = true
            logger.log('body', update)
            await eventsService.cancel(id, { update })
          } catch (error) {
            logger.error(error)
            Pop.toast('Event Canceled', 'warning')

          }
        }

      }
    }
  }
</script>