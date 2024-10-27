<template>
    <div class="space-y-10">
        <div v-if="role === 'admin'" class="flex justify-end">
            <button class="border border-blue-900 px-3 py-1 text-blue-900 rounded" @click="addScheduleModal = true">Add Schedule</button>
        </div>

        <div v-for="(sport, index) in sports" :key="index" class="space-y-2">
            <div class="space-y-2" v-if="filteredSchedule(sport).length">
                <h1 class="text-lg uppercase">{{ sport }}</h1>
                <div class="grid grid-cols-2 gap-x-4">
                    <div v-for="schedule in filteredSchedule(sport)" :key="schedule.id" :class="{ '!bg-blue-900': index / 2 === 0 }" class="bg-red-600 h-16 py-9 px-5 rounded flex justify-between items-center">
                        <div class="flex items-center h-full gap-x-5">
                            <div class="flex items-center gap-x-2">
                                <img :src="getSchoolDetails(schedule.participant1)?.schoolLogo" alt="School logo" class="h-12 object-cover aspect-square bg-gray-100 rounded-full">
                                <p class="font-bold text-white">{{ getSchoolDetails(schedule.participant1)?.schoolAbbreviation }}</p>
                            </div>
                            <p class="font-bold text-xl text-white">VS.</p>
                            <div class="flex items-center gap-x-2">
                                <img :src="getSchoolDetails(schedule.participant2)?.schoolLogo" alt="School logo" class="h-12 object-cover aspect-square bg-gray-100 rounded-full">
                                <p class="font-bold text-white">{{ getSchoolDetails(schedule.participant2)?.schoolAbbreviation }}</p>
                            </div>
                        </div>
                        <div class="flex flex-col items-end !w-1/4 xl:w-full">
                            <p class="text-white text-end text-xs">{{ formatDate(schedule.dateTime) }}</p>
                            <p class="text-white text-[0.65rem] uppercase">{{ schedule.venue }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!schedules.length">
            <p class="text-center">No schedules to show</p>
        </div>

        <addSchedule v-if="addScheduleModal" @closeModal="addScheduleModal = false" @addedNewSchedule="addedNewSchedule" />
    </div>
</template>

<script setup>
import addSchedule from '@components/addSchedule.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '@config/firebaseConfig'
import { getDocs, where, query, collection, orderBy } from 'firebase/firestore'
import moment from 'moment'

const formatDate = (date) => {
    return moment(date).format('llll')
}

// list of all sports
const sports = [
    "Athletics", "Badminton", "Baseball", "Basketball", 
    "Chess", "Dance Sports", "Football", "Futsal", 
    "Karatedo", "Lawn Tennis", "Softball", "Swimming", 
    "Table Tennis", "Taekwondo", "Volleyball"
];

const route = useRoute()

const role = localStorage.getItem('role')

const addScheduleModal = ref(false)

const schedules = ref([])

// get schedules
const schedRef = collection(db, 'schedules')

const getSchedules = async () => {
    try {
        const q = query(
            schedRef,
            where('eventId', '==', route.params.id),
            orderBy('dateTime', 'asc')
        )

        const snapshots = await getDocs(q)

        snapshots.docs.forEach(doc => {
            schedules.value.push({
                id: doc.id,
                ...doc.data()
            })
        })

        getSchools()
    } catch (error) {
        console.log(error)
    }
} 

// get schools
const schools = ref([])

const schoolRef = collection(db, 'schools')

const getSchools = async () => {
    try {
        const snapshots = await getDocs(schoolRef)

        snapshots.docs.forEach(doc => {
            schools.value.push({
                id: doc.id,
                ...doc.data()
            })
        })
    } catch (error) {
        console.log(error)
    }
} 

// get school/participants details
const getSchoolDetails = (schoolId) => {
    const details = schools.value.filter(school => school.schoolId === schoolId)

    return details[0]
}

// filter schedule by sport
const filteredSchedule = (sport) => {
    const filteredSched = schedules.value.filter(schedule => schedule.sport === sport.toLowerCase())

    return filteredSched
}


const addedNewSchedule = (data) => {
    schedules.value.unshift(data)
}

onMounted(() => {
    getSchedules()
})
</script>