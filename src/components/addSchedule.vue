<template>
    <div class="h-screen w-screen bg-black/10 fixed top-0 left-0 flex items-center justify-center">
        <form @submit.prevent="addSchedule" class="bg-white p-4 rounded shadow space-y-5 dark:text-black">
            <h1 class="text-center text-lg">Add Schedule</h1>
            <p v-if="hasEmptyField" class="!-mb-3 bg-red-500 pl-2 text-white rounded">All fields are required</p>
            <div class="flex flex-col gap-y-2">
                <label>Date and Time</label>
                <input type="datetime-local" class="border rounded h-8 pl-2" v-model="scheduleData.dateTime">
            </div>
            <div class="flex flex-col gap-y-2">
                <label>Venue</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="scheduleData.venue">
            </div>
            <div class="flex flex-col gap-y-2">
                    <label>Sport</label>
                    <select v-model="scheduleData.sport" class="border rounded h-8">
                        <option value="" disabled>Select sport</option>
                        <option value="basketball">Basketball</option>
                        <option value="volleyball">Volleyball</option>
                        <option value="football">Football</option>
                        <option value="badminton">Badminton</option>
                        <option value="table-tennis">Table Tennis</option>
                        <option value="lawn-tennis">Lawn Tennis</option>
                        <option value="swimming">Swimming</option>
                        <option value="athletics">Athletics</option>
                        <option value="chess">Chess</option>
                        <option value="taekwondo">Taekwondo</option>
                        <option value="karatedo">Karatedo</option>
                        <option value="archery">Archery</option>
                        <option value="softball">Softball</option>
                        <option value="baseball">Baseball</option>
                        <option value="table-tennis">Table Tennis</option>
                        <option value="futsal">Futsal</option>
                        <option value="dance-sports">Dance Sports</option>
                    </select>
                </div>
            <div class="flex flex-col gap-y-2">
                <label>Select Participant</label>
                <select class="border rounded h-8 pl-2" v-model="scheduleData.participant1">
                    <option value="" disabled>Select school</option>
                    <option v-for="school in schools" :key="school.id" :value="school.schoolId" :disabled="school.schoolId == scheduleData.participant2">{{ school.schoolName }}</option>
                </select>
            </div>
            <p class="!my-2 text-center font-bold text-lg">Vs.</p>
            <div class="flex flex-col gap-y-2">
                <label>Select Participant</label>
                <select class="border rounded h-8 pl-2" v-model="scheduleData.participant2">
                    <option value="" disabled>Select school</option>
                    <option v-for="school in schools" :key="school.id" :value="school.schoolId" :disabled="school.schoolId == scheduleData.participant1">{{ school.schoolName }}</option>
                </select>
            </div>
            <div class="flex justify-end gap-x-2">
                <button class="text-sm border border-blue-900 text-blue-900 w-1/4 py-1 rounded" type="button" @click="closeModal">Cancel</button>
                <button v-if="!adding" class="text-sm border border-transparent bg-blue-900 text-white w-1/4 py-1 rounded">Add</button>
                <button v-else class="text-sm border border-transparent bg-blue-900 text-white w-1/4 py-1 rounded animate-pulse" disabled>Adding</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { db } from '@config/firebaseConfig.js'
import { getDocs, addDoc, Timestamp, collection, query, where, limit } from 'firebase/firestore'
import { ref, onMounted, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()
const route = useRoute()

const emit = defineEmits(['closeModal', 'addedNewSchedule'])

const closeModal = () => {
    scheduleData.value = {
        participant1: '',
        participant2: '',
        dateTime: '',
        sport: '',
    }
    emit('closeModal')
}

// get participants
const partRef = collection(db, 'participants')

const getParticipants = async () => {
    try {
        const q = query(
            partRef,
            where('eventId', '==', route.params.id)
        )

        const snapshot = await getDocs(q)

        const promises = snapshot.docs.map(async (doc) => {
            await getSchools(doc.data().schoolId)
        })

        await Promise.all(promises)
    } catch (error) {
        console.log(error)
    }
}
// get schools
const schools = ref([])
const schoolRef = collection(db, 'schools')

const getSchools = async (schoolId) => {
    try {
        const q2 = query(
            schoolRef,
            where('schoolId', '==', schoolId),
            limit(1)
        )

        const snapshot = await getDocs(q2)

        if(!snapshot.empty){
            schools.value.push({
                id: snapshot.docs[0].id,
                ...snapshot.docs[0].data(),
            })
        }
    } catch (error) {
        console.log(error)
    }
}

// add schedule
const scheduleData = ref({
    participant1: '',
    participant2: '',
    dateTime: '',
    venue: '',
    sport: ''
})

const scheduleRef = collection(db, 'schedules')

const adding = ref(false)
const hasEmptyField = ref(false)

const addSchedule = async () => {
    hasEmptyField.value = false
    try {
        adding.value = true
        if(Object.values(scheduleData.value).some(field => !field)) return hasEmptyField.value = true

        await addDoc(scheduleRef, {
            ...scheduleData.value,
            eventId: route.params.id,
            ended: false,
            addedAt: Timestamp.now()
        })
        emit('addedNewSchedule', scheduleData.value)
        closeModal()
        $toast.success('Added schedule successfully')
    } catch (error) {
        console.log(error)
    } finally {
        adding.value = false
    }
}

onMounted(() => {
    getParticipants()
})
</script>