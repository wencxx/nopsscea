<template>
    <div class="space-y-10">
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-x-2 text-2xl">
                <Icon icon="healthicons:i-schedule-school-date-time" class="text-3xl" />
                <h1>Schedules</h1>
            </div>
            <div v-if="role === 'admin' && !$route.query.status" class="flex justify-end">
                <button class="border border-blue-900 px-3 py-1 text-blue-900 rounded" @click="addScheduleModal = true">Add Schedule</button>
            </div>
        </div>

        <div v-for="(sport, index) in sports.filter(s => filteredSchedule(s).length)" :key="index" class="space-y-2">
            <div class="space-y-2">
                <h1 class="text-lg uppercase">{{ sport }}</h1>
                <div class="grid grid-cols-2 gap-x-4">
                    <div v-for="schedule in filteredSchedule(sport)" :key="schedule.id" :class="{ '!bg-blue-900': index % 2 === 0 }" class="bg-red-600 h-16 py-9 px-5 rounded-lg flex justify-between items-center cursor-pointer" @click="openScoreboard(schedule)">
                        <div class="flex items-center h-full gap-x-5">
                            <div class="flex items-center gap-x-2">
                                <img v-if="getSchoolDetails(schedule.participant1)?.schoolLogo" :src="getSchoolDetails(schedule.participant1)?.schoolLogo" alt="School logo" class="h-12 object-cover aspect-square bg-gray-100 rounded-full">
                                <div v-else class="h-12 object-cover aspect-square bg-gray-100 rounded-full animate-pulse"></div>
                                <p class="font-bold text-white">{{ getSchoolDetails(schedule.participant1)?.schoolAbbreviation }}</p>
                            </div>
                            <p class="font-bold text-xl text-white">VS.</p>
                            <div class="flex items-center gap-x-2">
                                <img v-if="getSchoolDetails(schedule.participant1)?.schoolLogo" :src="getSchoolDetails(schedule.participant2)?.schoolLogo" alt="School logo" class="h-12 object-cover aspect-square bg-gray-100 rounded-full">
                                <div v-else class="h-12 object-cover aspect-square bg-gray-100 rounded-full animate-pulse"></div>
                                <p class="font-bold text-white">{{ getSchoolDetails(schedule.participant2)?.schoolAbbreviation }}</p>
                            </div>
                        </div>
                        <div class="flex flex-col items-end !w-1/4 xl:w-full">
                            <p class="text-white text-end text-xs">{{ formatDate(schedule.dateTime) }}</p>
                            <p class="text-white text-[0.65rem] uppercase">{{ schedule.venue }}</p>
                            <p class="uppercase text-xs px-2 rounded bg-orange-500 text-white" :class="{ '!bg-green-500': schedule.status === 'started', '!bg-red-500': schedule.status === 'ended' }">
                                {{ schedule.status }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!schedules.length">
            <p class="text-center">No schedules to show</p>
        </div>

        <addSchedule v-if="addScheduleModal" @closeModal="addScheduleModal = false" @addedNewSchedule="addedNewSchedule" class="!-mt-0" />
        <scoreBoard v-if="showScoreboard" class="!-mt-0" :scheduleDetails="schedDetsToShow" @closeScoreboard="showScoreboard = false" />
    </div>
</template>

<script setup>
import addSchedule from '@components/addSchedule.vue'
import scoreBoard from '@components/scoreBoard.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '@config/firebaseConfig'
import { getDocs, where, query, collection, orderBy, onSnapshot } from 'firebase/firestore'
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

        onSnapshot(
            q,
            (snapshots) => {
                schedules.value = []
                snapshots.forEach(doc => {
                    schedules.value.push({
                        id: doc.id,
                        ...doc.data()
                    })

                    if(schedId.value && schedId.value === doc.id){
                        const data = {
                            id: doc.id,
                            ...doc.data()
                        }
                        openScoreboard(data)
                    }
                })
            }
        )

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

// add new schedule
// const addedNewSchedule = (data) => {
//     schedules.value.unshift(data)
// }

// open score board
const schedId= ref({})
const schedDetsToShow = ref({})
const showScoreboard = ref(false)

const openScoreboard  = (schedule) => {
    const scheduleData = {
        ...schedule,
        part1ABBR: getSchoolDetails(schedule.participant1)?.schoolAbbreviation,
        part2ABBR: getSchoolDetails(schedule.participant2)?.schoolAbbreviation
    }

    schedId.value = schedule.id
    schedDetsToShow.value = scheduleData
    showScoreboard.value = true
}

onMounted(() => {
    getSchedules()
})
</script>