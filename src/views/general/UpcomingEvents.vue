<template>
    <div class="flex flex-col gap-y-10">
        <button v-if="userRole === 'admin'" class="self-end w-fit px-3 py-1 border border-transparent bg-blue-900 dark:bg-transparent dark:border-gray-100/10 dark:bg-neutral-900 text-white hover:bg-blue-950 hover:dark:bg-neutral-800 rounded" @click="isAddEvent = true">Add event</button>

        <!-- skeleton -->
        <eventsSkeleton v-if="fetchingEvents" />

        <div v-else>
            <div v-if="events.length > 0" class="w-full grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
                <div v-for="event in events" :key="event.id" class="border h-fit rounded shadow dark:border-gray-100/10 overflow-hidden">
                    <div class="w-full aspect-video">
                        <img :src="event.coverPhoto" alt="event cover photo" class="h-full w-full">
                    </div>
                    <div class="p-4 space-y-1">
                        <div>
                            <h1 class="uppercase dark:text-dark-primary-text font-semibold">{{ event.title }}</h1>
                            <div>
                                <p class="text-[.7rem] text-white-secondary-text dark:text-dark-secondary-text">{{ event.startDate }} | {{  event.endDate }}</p>
                            </div>
                        </div>
                        <p class="capitalize text-sm text-white-secondary-text dark:text-dark-secondary-text line-clamp-3">{{ event.description }}</p>
                    </div>
                    <div class="p-4 !pt-0">
                        <router-link :to="{ name: 'upcomingEventDetails', params: { id: event.id } }" class="border border-blue-900 dark:border-gray-100/10 bg-blue-100/45 dark:bg-transparent text-blue-900 dark:text-dark-secondary-text hover:shadow-md rounded py-1 px-3">Details</router-link>
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="text-center">No upcoming events to show</p>
            </div>
        </div>
        <addEvent @click.self="isAddEvent = false" v-if="isAddEvent" @closeModal="isAddEvent = false" @addedEventDetails="getAddedEvent" />
    </div>
</template>

<script setup>
import addEvent from '@components/addEvent.vue';
import eventsSkeleton from '@components/skeletons/eventsSkeleton.vue';
import { onMounted, ref } from 'vue'
import { db } from '@config/firebaseConfig'
import { collection, where, getDocs, query } from 'firebase/firestore'

const isAddEvent = ref(false)

const userRole = localStorage.getItem('role')

const events = ref([])

// get added event from child component
const getAddedEvent = (data) => {
    events.value.unshift(data)
}

// get all events
const fetchingEvents = ref(false)
const eventsRef = collection(db, 'events')

const getAllEvents = async () => {
    const dateNow = new Date()
    const dateStringNow = dateNow.toISOString().split('T')[0]

    const q = query(
        eventsRef,
        where("startDate", "<", dateStringNow)
    )

    try {
        fetchingEvents.value = true
        const snapshots = await getDocs(q)

        snapshots.docs.forEach(doc => {
            events.value.push({
                id: doc.id,
                ...doc.data()
            })
        })
        fetchingEvents.value = false
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    getAllEvents()
})
</script>

<style scoped>

</style>