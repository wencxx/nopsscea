<template>
    <div class="flex flex-col gap-y-10">
        <div v-if="fetchingEvents" class="w-full grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
            <div v-for="i in 3" :key="i" class="border h-fit rounded shadow dark:border-gray-100/10 overflow-hidden">
                <div class="w-full aspect-video bg-gray-300 animate-pulse">
                    
                </div>
                <div class="p-4 space-y-1">
                    <div class="space-y-1">
                        <div class="h-6 w-28 rounded bg-gray-300 animate-pulse"></div>
                        <div class="h-3 w-20 rounded bg-gray-300 animate-pulse"></div>
                    </div>
                    <div class="space-y-1">
                        <div class="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
                        <div class="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
                        <div class="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                    <div class="w-1/4 bg-gray-300 animate-pulse h-8 rounded !mt-2"></div>
                </div>
            </div>
        </div>

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
                        <router-link :to="{ name: 'eventDashboard', params: { id: event.id }, query: { status: 'finished' } }" class="border border-blue-900 dark:border-gray-100/10 bg-blue-100/45 dark:bg-transparent text-blue-900 dark:text-dark-secondary-text hover:shadow-md rounded py-1 px-3">Details</router-link>
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="text-center">No finished events to show</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { db } from '@config/firebaseConfig'
import { collection, where, getDocs, query, and } from 'firebase/firestore'

const events = ref([])

// get all events
const fetchingEvents = ref(false)

const  eventsRef = collection(db, 'events')

const getAllEvents = async () => {
    const dateNow = new Date()
    const dateStringNow = dateNow.toISOString().split('T')[0]

    const q = query(
        eventsRef,
        where("endDate", "<", dateStringNow)
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