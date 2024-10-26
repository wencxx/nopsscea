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
                        <th class="w-1/6 py-1 border border-gray-300 dark:border-gray-100/10">Action</th>
                    </tr>
                </thead>
                <tbody v-if="athletes.length > 0">
                    <tr class="text-md" v-for="(athlete, index) in athletes" :key="index">
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">{{ athlete.firstName }} {{ athlete.middleName }} {{ athlete.lastName }}</td>
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">
                            <div class="flex justify-center gap-x-3">
                                <input type="checkbox" class="w-5 aspect-square" @change="attendedSession(athlete.athleteId)" :checked="trainingDets.attendance?.includes(athlete.athleteId)" />
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="!loading && athletes.length === 0">
                    <tr>
                        <td colspan="2" class="p-2 border dark:border-gray-100/10 text-center">No athletes to show</td>
                    </tr>
                </tbody>
                <tbody v-if="loading">
                    <tr v-for="i in 3" :key="i">
                        <td class="p-2 border space-y-1 dark:border-gray-100/10">
                            <div class="h-6 w-96 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse mx-auto"></div>
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
import { getDocs, getDoc, collection, where, query, queryEqual, and, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
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

// users ref
const userRef = collection(db, 'userRole')
const userRoleDocId = ref([])

// get athlete
const loading = ref(false)

const getAthlete = async () => {
    try {
        dataStore.getCoachData(currentUser.value?.uid)
        
        loading.value = true
        const q = query(
            userRef,
            and(
                where('isAccepted', '==', true),
                where('role', '==', 'athlete'),
            )
        )

        const snapshots = await getDocs(q)

        const promises = snapshots.docs.map(doc => {
            const userDetails = doc.data()
            userRoleDocId.value.push(doc.id)

            getAthletePersonalDetails(userDetails.userId)
        })

        await Promise.all(promises)
        loading.value = false
    } catch (error) {
        $toast.error(error.message)
    }
}

// atheletes details reference
const athleteRef = collection(db, 'athletes')

// get athletes personal details
const getAthletePersonalDetails = async (athleteId) => {
    try {
        const q = query(
            athleteRef,
            and(
                where('athleteId', '==', athleteId),
                where('school', '==', coachDetails.value?.school),
                where('sport', '==', coachDetails.value?.sport),
            )
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
        console.log(error)
    }
}

// training reference
const trainingRef = doc(db, 'trainings', route.params.id)

// checkAthlete
const attendedSession = async (athleteId) => {
    const index = trainingDets.value.attendance?.indexOf(athleteId)
    try {
        if(index > -1){
            await updateDoc(trainingRef, {
                attendance: arrayRemove(athleteId)
            })
            trainingDets.value.attendance.splice(index, 1)
        }else{
            await updateDoc(trainingRef, {
                attendance: arrayUnion(athleteId)
            })
            trainingDets.value.attendance.push(athleteId)
        }        
    } catch (error) {
        console.log(error)
    }
}

const trainingDets = ref({})

// get training details
const getDetails = async () => {
    try {
        const snapshot = await getDoc(trainingRef)

        trainingDets.value = {
            ...snapshot.data()
        }
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    getDetails()
    if(currentUser.value?.uid){
        getAthlete()
    }
    watch(() => currentUser.value?.uid, () => {
        getAthlete()
    })
})
</script>