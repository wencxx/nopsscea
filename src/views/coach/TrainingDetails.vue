<template>
    <div class="space-y-10">
        <div class="flex items-center gap-x-2 text-xl">
            <Icon icon="material-symbols:sports-martial-arts-rounded" class="text-2xl" />
            <h1>Athlete Attendance</h1>
        </div>
        <!-- table -->
        <div class="bg-gray-100 dark:bg-gray-100/10 p-5 rounded-md">
            <table class="min-w-[500px] md:w-full font-inter tracking-wide">
                <thead>
                    <tr>
                        <th class="w-2/6 py-1 border border-gray-300 dark:border-gray-100/10">Name</th>
                        <th class="w-2/6 py-1 border border-gray-300 dark:border-gray-100/10">Rating</th>
                        <th class="w-1/6 py-1 border border-gray-300 dark:border-gray-100/10">Attendance</th>
                    </tr>
                </thead>
                <tbody v-if="athletes.length > 0">
                    <tr class="text-md" v-for="(athlete, index) in athletes" :key="index">
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10">
                            <div class="flex gap-x-3">
                                <img :src="athlete?.photoUrl" alt="school logo" class="w-20 aspect-square bg-gray-200 dark:bg-gray-100/10 p-2 rounded">
                                <div class="flex flex-col justify-center">
                                    <h1 class="text-md capitalize">{{ athlete.firstName  }} {{ athlete.middleName  }} {{ athlete.lastName }}</h1>
                                    <p class="text-xs text-gray-500 font-semibold uppercase">{{ athlete.sport }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">
                            <div class="flex justify-center gap-x-3">
                            <Icon
                                v-for="star in 5"
                                :key="star"
                                :icon="ratings[athlete.athleteId] >= star ? 'mdi:star' : 'mdi:star-outline'"
                                class="text-2xl cursor-pointer"
                                :class="{ 'text-yellow-500': ratings[athlete.athleteId] >= star }"
                                @click="rateAthlete(star, athlete.athleteId, trainingDets.attendance?.findIndex(item => item.athlete === athlete.athleteId))"
                            />
                            </div>
                        </td>
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">
                            <div class="flex justify-center gap-x-3">
                            <input
                                type="checkbox"
                                class="w-5 aspect-square"
                                @change="attendedSession(athlete.athleteId, trainingDets.attendance?.findIndex(item => item.athlete === athlete.athleteId))"
                                :checked="trainingDets.attendance?.some(item => item.athlete === athlete.athleteId)"
                            />
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="!loading && athletes.length === 0">
                    <tr>
                        <td colspan="3" class="p-2 border dark:border-gray-100/10 text-center">No athletes to show</td>
                    </tr>
                </tbody>
                <tbody v-if="loading">
                    <tr v-for="i in 5" :key="i">
                        <td class="p-2 border dark:border-gray-100/10">
                            <div class="flex gap-x-3">
                                <div class="w-14 aspect-square animate-pulse bg-gray-200 dark:bg-gray-100/10 p-2 rounded"></div>
                                <div class="flex flex-col gap-y-1 justify-center">
                                    <div class="h-6 w-56 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                                    <div class="h-4 w-16 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </td>
                        <td class="p-2 border dark:border-gray-100/10">
                            <div class="flex gap-x-2 justify-center">
                                <div class="w-8 aspect-square bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                                <div class="w-8 aspect-square bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                                <div class="w-8 aspect-square bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                                <div class="w-8 aspect-square bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                                <div class="w-8 aspect-square bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                            </div>
                        </td>
                        <td class="p-2 border dark:border-gray-100/10">
                            <div class="w-8 aspect-square mx-auto bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore, useDataStore } from '../../store'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { db } from '@config/firebaseConfig'
import { getDocs, getDoc, collection, where, query, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import moment from 'moment'

const $toast = useToast()
const route = useRoute()

const convertBirthday = (bday) => {
    return moment(bday).format('ll')
}

const authStore = useAuthStore()
const dataStore = useDataStore()

const currentUser = computed(() => authStore.user)
const coachDetails = computed(() => dataStore.coachData)

const athletes = ref([])

// Get athlete
const loading = ref(false)

const getAthlete = async () => {
    try {
        dataStore.getCoachData(currentUser.value?.uid)
        
        loading.value = true
        const q = query(
            collection(db, 'userRole'),
            where('isAccepted', '==', true),
            where('role', '==', 'athlete')
        )

        const snapshots = await getDocs(q)

        const promises = snapshots.docs.map(doc => {
            const userDetails = doc.data()
            getAthletePersonalDetails(userDetails.userId)
        })

        await Promise.all(promises)
    } catch (error) {
        $toast.error(error.message)
    }
}

// Get athletes personal details
const getAthletePersonalDetails = async (athleteId) => {
    try {
        const q = query(
            collection(db, 'athletes'),
            where('athleteId', '==', athleteId),
            where('school', '==', coachDetails.value?.school),
            where('sport', '==', coachDetails.value?.sport)
        )

        const snapshots = await getDocs(q)

        snapshots.docs.forEach(doc => {
            athletes.value.push({
                id: doc.id,
                ...doc.data()
            })
        })
    } catch (error) {
        $toast.error(error.message)
    }finally{
        loading.value = false
    }
}

const trainingDets = ref({})
const trainingRef = doc(db, 'trainings', route.params.id)

// Get training details
const getDetails = async () => {
    try {
        const snapshot = await getDoc(trainingRef)
        trainingDets.value = snapshot.data() || {}
    } catch (error) {
        console.log(error)
    }
}

// Mark athlete's attendance
const attendedSession = async (athleteId, index) => {
    const athlete = trainingDets.value.attendance?.find(item => item.athlete === athleteId)
    try {
        if (athlete) {
            // Remove athlete from attendance
            await updateDoc(trainingRef, {
                attendance: arrayRemove(athlete)
            })
            trainingDets.value.attendance.splice(index, 1)
        } else {
            // Add athlete to attendance
            await updateDoc(trainingRef, {
                attendance: arrayUnion({ athlete: athleteId })
            })
            trainingDets.value.attendance?.push({ athlete: athleteId })
        }
    } catch (error) {
        console.log(error)
    }
}

const ratings = computed(() => {
  const ratingMap = {};
  trainingDets.value.attendance?.forEach(item => {
    ratingMap[item.athlete] = item.rating;
  });
  return ratingMap;
});
    
// Rate athlete
const rateAthlete = async (rating, athleteId, index) => {
    const athleteAttendance = trainingDets.value.attendance?.find(item => item.athlete === athleteId)

    try {
       if(!athleteAttendance){
            trainingDets.value.attendance = []

            trainingDets.value.attendance?.push({ athlete: athleteId, rating: rating });

            await updateDoc(trainingRef, {
                attendance: arrayUnion({ athlete: athleteId, rating })
            })
        }else{
            
            await updateDoc(trainingRef, {
                attendance: arrayRemove({ athlete: athleteId, rating: athleteAttendance.rating })
            })

            if (athleteAttendance.rating === rating) {
                athleteAttendance.rating = rating - 1
                trainingDets.value.attendance?.splice(index, 1)
                trainingDets.value.attendance?.push({ athlete: athleteId, rating: rating - 1 })
            } else {
                athleteAttendance.rating = rating
                trainingDets.value.attendance?.splice(index, 1)
                trainingDets.value.attendance?.push({ athlete: athleteId, rating })
            }
            
            await updateDoc(trainingRef, {
                attendance: arrayUnion({ athlete: athleteId, rating: athleteAttendance.rating })
            })
        }
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    getDetails()
    if (currentUser.value?.uid) {
        getAthlete()
    }
    watch(() => currentUser.value?.uid, () => {
        getAthlete()
    })
})
</script>
