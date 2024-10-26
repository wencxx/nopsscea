<template>
    <div class="space-y-10">
        <div>
            <button class="float-end bg-blue-900 text-white px-4 py-1 rounded" @click="addSession = true">Add Session</button>
        </div>
        <div v-if="sessions.length" class="grid md:grid-cols-3 xl:grid-cols-5 gap-3">
            <div v-for="(session, index) in sessions" :key="index" class="flex flex-col gap-y-2 border rounded p-2">
                <h1 class="text-xs mb-1">Training</h1>
                <div>
                    <p class="text-sm flex items-center gap-x-1"><Icon icon="mdi:location" class="text-lg" />{{ session.location }}</p>
                    <p class="text-sm flex items-center gap-x-1"><Icon icon="mdi:event-outline" class="text-lg" /> {{ formatDate(session.date) }}</p>
                </div>
                <router-link :to="{ name: 'trainingDetails', params: { id: session.id } }" class="text-xs text-center w-1/2 bg-blue-900 text-white px-2 py-[3px] ml-auto mt-2 rounded">Details</router-link>
            </div>
        </div>
        <p v-else class="text-center">No training sessions to show</p>

        <!-- add training component -->
        <addTrainingSession @click.self="addSession = false" v-if="addSession" @addedData="addedSession" />
    </div>
</template>
<script setup>
import addTrainingSession from '@components/addTrainingSession.vue'
import { useDataStore, useAuthStore } from '@store'
import { ref, computed, onMounted, watch } from 'vue'
import { db } from '@config/firebaseConfig'
import { collection, where, query, and, getDocs } from 'firebase/firestore'
import moment from 'moment'

const authStore = useAuthStore()
const dataStore = useDataStore()
const currentUser = computed(() => authStore.user)
const coachDetails = computed(() => dataStore.coachData)

const addSession = ref(false)

const sessions = ref([])

const addedSession = (data) => {
    sessions.value.unshift(data)
    addSession.value = false
}

const formatDate = (date) => {
    return moment(date).format('lll')
}

const trainingRef = collection(db, 'trainings')

// get trainings
const getSessions = async () => {
    try {
        const q = query(
            trainingRef,
            and(
                where('sport', '==', coachDetails.value?.sport), 
                where('school', '==', coachDetails.value?.school), 
            )
        )

        const snapshots = await getDocs(q)

        snapshots.docs.forEach(doc => {
            sessions.value.push({
                id: doc.id,
                ...doc.data()
            })
        })
    } catch (error) {
        console.log(error)
    }
}

// get coach data
const getCoachData = async () => {
    await dataStore.getCoachData(currentUser.value?.uid)
    getSessions()
}

onMounted(() => {
    getCoachData()
    watch(() => currentUser.value, () => {
        getCoachData()
    })
})
</script>