<template>
    <div class="grid grid-cols-3 gap-5">
        <div class="bg-gray-100 dark:bg-gray-100/10 col-span-3 h-[25dvh] border dark:border-gray-100/10 rounded-xl grid grid-cols-4 p-5 gap-x-5">
            <div class="border rounded-xl bg-gray-200 dark:bg-neutral-800 dark:border-gray-100/10 p-5 flex flex-col justify-between">
                <div>
                    <Icon icon="fluent-emoji-high-contrast:person-running" class="text-4xl text-blue-900" />
                </div>
                <div>
                    <h1 class="text-2xl font-bold">{{ athletes.length }}</h1>
                </div>
                <div>
                    <h3 class="capitalize text-lg">Total Athletes</h3>
                </div>
            </div>
            <div class="border rounded-xl bg-gray-200 dark:bg-neutral-800 dark:border-gray-100/10 p-5 flex flex-col justify-between">
                <div>
                    <Icon icon="material-symbols:person-apron-outline" class="text-4xl text-red-700" />
                </div>
                <div>
                    <h1 class="text-2xl font-bold">{{ coaches.length }}</h1>
                </div>
                <div>
                    <h3 class="capitalize text-lg">Total Coaches</h3>
                </div>
            </div>
            <div class="border rounded-xl bg-gray-200 dark:bg-neutral-800 dark:border-gray-100/10 p-5 flex flex-col justify-between">
                <div>
                    <Icon icon="fluent-emoji-high-contrast:person-running" class="text-4xl text-blue-900" />
                </div>
                <div>
                    <h1 class="text-2xl font-bold">{{ athleteApplicants.length }}</h1>
                </div>
                <div>
                    <h3 class="capitalize text-lg">Athletes Applicants</h3>
                </div>
            </div>
            <div class="border rounded-xl bg-gray-200 dark:bg-neutral-800 dark:border-gray-100/10 p-5 flex flex-col justify-between">
                <div>
                    <Icon icon="mdi:event-outline" class="text-4xl text-red-900" />
                </div>
                <div>
                    <h1 class="text-2xl font-bold">{{ eventCounts }}</h1>
                </div>
                <div>
                    <h3 class="capitalize text-lg">Total Events Joined</h3>
                </div>
            </div>
        </div>
        <div class="bg-gray-100 dark:bg-gray-100/10 col-span-1 border dark:border-gray-100/10 rounded-md p-3 flex justify-center items-center">
            <doughnutChart :labels="doughNutLabels" :data="doughNutDatasets" :label="doughNutLabel" />
        </div>
        <div class="bg-gray-100 dark:bg-gray-100/10 col-span-2 p-3 border dark:border-gray-100/10 rounded-md">
            <h1 class="mb-2 capitalize font-bold flex items-center gap-x-1"><Icon icon="noto:1st-place-medal" class="text-3xl" />Events joined lists</h1>
            <table class="min-w-[500px] md:w-full tracking-wide rounded overflow-hidden">
                <thead>
                    <tr>
                        <th class="w-2/6 py-1 border dark:border-gray-100/10">Event Name</th>
                        <th class="w-1/6 py-1 border dark:border-gray-100/10">Gold</th>
                        <th class="w-1/6 py-1 border dark:border-gray-100/10">Silver</th>
                        <th class="w-1/6 py-1 border dark:border-gray-100/10">Bronze</th>
                        <th class="w-1/6 py-1 border dark:border-gray-100/10">Total</th>
                    </tr>
                </thead>
                <tbody v-if="!loadingEvents && eventsJoined.length">
                    <tr v-for="event in eventsJoined" :key="event.id" class="text-md">
                        <td class="p-2 border dark:border-gray-100/10 text-center">{{ event.title }}</td>
                        <td class="p-2 border dark:border-gray-100/10 text-center">{{ event.gold || 0 }}</td>
                        <td class="p-2 border dark:border-gray-100/10 text-center">{{ event.silver || 0 }}</td>
                        <td class="p-2 border dark:border-gray-100/10 text-center">{{ event.bronze || 0 }}</td>
                        <td class="p-2 border dark:border-gray-100/10 text-center">{{ event.gold + event.silver + event.bronze || 0 }}</td>
                    </tr>
                </tbody>
                <tbody v-if="!loadingEvents && !eventsJoined.length">
                    <tr class="text-md">
                        <td class="p-2 border dark:border-gray-100/10 text-center" colspan="6">No events joined yet</td>
                    </tr>
                </tbody>
                <tbody v-if="loadingEvents">
                    <tr v-for="i in 5" :key="i">
                        <td class="p-2 border">
                            <div class="w-3/4 h-7 mx-auto rounded bg-gray-200 animate-pulse"></div>
                        </td>
                        <td class="p-2 border">
                            <div class="w-1/2 h-7 mx-auto rounded bg-gray-200 animate-pulse"></div>
                        </td>
                        <td class="p-2 border">
                            <div class="w-1/2 h-7 mx-auto rounded bg-gray-200 animate-pulse"></div>
                        </td>
                        <td class="p-2 border">
                            <div class="w-1/2 h-7 mx-auto rounded bg-gray-200 animate-pulse"></div>
                        </td>
                        <td class="p-2 border">
                            <div class="w-1/2 h-7 mx-auto rounded bg-gray-200 animate-pulse"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- <div class="bg-gray-100 dark:bg-gray-100/10 col-span-3 h-[50dvh] border dark:border-gray-100/10 rounded-md p-3">
            <barChart :labels="chartLabels" :data="chartDatasets" :label="chartLabel" class="!w-full" />
        </div> -->
        <div class="bg-gray-100 dark:bg-gray-100/10 col-span-3 h-fit p-3 border dark:border-gray-100/10 rounded-md">
            <h1 class="mb-2 capitalize font-bold flex items-center gap-x-1"><Icon icon="fluent-emoji-high-contrast:person-running" class="text-2xl -mt-1"/>Athletes applicants</h1>
            <table class="min-w-[500px] md:w-full font-inter tracking-wide">
                <thead>
                    <tr>
                        <th class="w-2/6 py-1 border border-gray-300 dark:border-gray-100/10">Name</th>
                        <th class="w-1/6 py-1 border border-gray-300 dark:border-gray-100/10">Address</th>
                        <th class="w-1/6 py-1 border border-gray-300 dark:border-gray-100/10">Email</th>
                        <th class="w-1/6 py-1 border border-gray-300 dark:border-gray-100/10">Birthday</th>
                        <th class="w-1/6 py-1 border border-gray-300 dark:border-gray-100/10">Action</th>
                    </tr>
                </thead>
                <tbody v-if="athleteApplicants.length > 0">
                    <tr class="text-md" v-for="(athlete, index) in athleteApplicants" :key="athlete.id">
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10">
                            <div class="flex gap-x-3">
                                <img :src="athlete?.photoUrl" alt="school logo" class="w-20 aspect-square bg-gray-200 dark:bg-gray-100/10 p-2 rounded">
                                <div class="flex flex-col justify-center">
                                    <h1 class="text-md capitalize">{{ athlete.firstName  }} {{ athlete.middleName  }} {{ athlete.lastName }}</h1>
                                    <p class="text-xs text-gray-500 font-semibold uppercase">{{ athlete.sport }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">{{ athlete.address }}</td>
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">{{ athlete.email }}</td>
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">{{ convertBirthday(athlete.birthday) }}</td>
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">
                            <div class="flex justify-center gap-x-3">
                                <router-link :to="{ name: 'athleteDetails', params: { id: athlete.id }, query: { status: 'pending' } }" class="bg-custom-primary w-fit text-green-500 hover:scale-110">
                                    <Icon icon="mdi:eye" class="text-2xl" />
                                </router-link>
                                <button class="bg-custom-primary w-fit text-green-500 hover:scale-110" @click="acceptAthlete(athlete.athleteId, index)">
                                    <Icon icon="iconamoon:check-fill" class="text-2xl" />
                                </button>
                                <button class="bg-custom-secondary text-red-500 w-fit hover:scale-110" @click="showDeleteModal(athlete.athleteId, index)">
                                    <Icon icon="mdi:trash" class="text-xl" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="!athleteApplicants.length">
                    <tr>
                        <td colspan="5" class="p-2 border dark:border-gray-100/10 text-center">No athletes to show</td>
                    </tr>
                </tbody>
                <!-- <tbody v-if="loading">
                    <tr>
                        <td class="p-2 border dark:border-gray-100/10">
                            <div class="flex gap-x-3">
                                <div class="w-14 aspect-square animate-pulse bg-gray-200 dark:bg-gray-100/10 p-2 rounded"></div>
                                <div class="flex flex-col gap-y-1 justify-center">
                                    <div class="h-6 w-56 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                                    <div class="h-4 w-16 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </td>
                        <td class="p-2 border space-y-1 dark:border-gray-100/10">
                            <div class="h-6 w-50 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                            <div class="h-6 w-32 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                        </td>
                        <td class="p-2 border dark:border-gray-100/10">
                            <div class="h-6 w-50 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                        </td>
                        <td class="p-2 border dark:border-gray-100/10">
                            <div class="h-6 w-50 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                        </td>
                        <td class="p-2 border dark:border-gray-100/10">
                            <div class="flex justify-center gap-x-3">
                                <div class="h-6 w-6 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                                <div class="h-6 w-6 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-2 border dark:border-gray-100/10">
                            <div class="flex gap-x-3">
                                <div class="w-14 aspect-square animate-pulse bg-gray-200 dark:bg-gray-100/10 p-2 rounded"></div>
                                <div class="flex flex-col gap-y-1 justify-center">
                                    <div class="h-6 w-56 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                                    <div class="h-4 w-16 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </td>
                        <td class="p-2 border space-y-1 dark:border-gray-100/10">
                            <div class="h-6 w-50 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                            <div class="h-6 w-32 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                        </td>
                        <td class="p-2 border dark:border-gray-100/10">
                            <div class="h-6 w-50 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                        </td>
                        <td class="p-2 border dark:border-gray-100/10">
                            <div class="h-6 w-50 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                        </td>
                        <td class="p-2 border dark:border-gray-100/10">
                            <div class="flex justify-center gap-x-3">
                                <div class="h-6 w-6 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                                <div class="h-6 w-6 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-2 border dark:border-gray-100/10">
                            <div class="flex gap-x-3">
                                <div class="w-14 aspect-square animate-pulse bg-gray-200 dark:bg-gray-100/10 p-2 rounded"></div>
                                <div class="flex flex-col gap-y-1 justify-center">
                                    <div class="h-6 w-56 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                                    <div class="h-4 w-16 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </td>
                        <td class="p-2 border space-y-1 dark:border-gray-100/10">
                            <div class="h-6 w-50 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                            <div class="h-6 w-32 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                        </td>
                        <td class="p-2 border dark:border-gray-100/10">
                            <div class="h-6 w-50 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                        </td>
                        <td class="p-2 border dark:border-gray-100/10">
                            <div class="h-6 w-50 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                        </td>
                        <td class="p-2 border dark:border-gray-100/10">
                            <div class="flex justify-center gap-x-3">
                                <div class="h-6 w-6 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                                <div class="h-6 w-6 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                            </div>
                        </td>
                    </tr>
                </tbody> -->
            </table>
        </div>

        <deleteModal v-if="showModalDelete" @closeModal="showModalDelete = false" @acceptDelete="deleteAthlete()" :user="'athlete'" :type="'decline'" />
    </div>
</template>

<script setup>
import doughnutChart from '../../components/charts/doughnutChart.vue'
import barChart from '../../components/charts/barChart.vue'
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore, useSchoolDataStore } from '@store'
import { db } from '@config/firebaseConfig' 
import { collection, query, where, getDocs, getDoc, and, onSnapshot, getCountFromServer, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import moment from 'moment'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import deleteModal from '@components/deleteModal.vue'
import axios from 'axios'

const $toast = useToast()
const authStore = useAuthStore()
const schoolDataStore = useSchoolDataStore()

const currentUser = computed(() => authStore.user)

const users = ref([])
const coaches = ref([])
const athletes = ref([])

const usersRef = collection(db, 'userRole')
const athletesRef = collection(db, 'athletes')
const coachesRef = collection(db, 'coaches')

const getCoachAndAthlete = async () => {
    try {
        const usersQuery = query(
            usersRef,
            and(
                where('isAccepted', '==', true),
                where('role', '!=', 'school')
            )
        )
        const usersSnapshot = await getDocs(usersQuery)

        coaches.value = []
        athletes.value = []
        schoolDataStore.athletes = []
        schoolDataStore.coaches = []

        const coachPromises = []
        const athletePromises = []

        for (const doc of usersSnapshot.docs) {
            const userData = doc.data()
            if (userData.role === 'coach') {
                const qCoach = query(
                    coachesRef,
                    and(
                        where('school', '==', currentUser.value?.uid),
                        where('coachId', '==', userData.userId)
                    )
                )
                coachPromises.push(getDocs(qCoach))
            } else if (userData.role === 'athlete') {
                const qAthlete = query(
                    athletesRef,
                    and(
                        where('school', '==', currentUser.value?.uid),
                        where('athleteId', '==', userData.userId)
                    )
                )
                athletePromises.push(getDocs(qAthlete))
            }
        }

        const coachResults = await Promise.all(coachPromises)
        coachResults.forEach(snapshot => {
            snapshot.docs.forEach(doc => {
                coaches.value.push({
                    id: doc.id,
                    ...doc.data()
                })
                schoolDataStore.coaches.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
        })

        const athleteResults = await Promise.all(athletePromises)
        athleteResults.forEach(snapshot => {
            snapshot.docs.forEach(doc => {
                athletes.value.push({
                    id: doc.id,
                    ...doc.data()
                })
                schoolDataStore.athletes.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
        })

        getAthletesByGender()
    } catch (error) {
        console.log(error)
    }
}

// events joined storage
const eventsJoined = ref([])
const loadingEvents = ref(false)

// count joineds event
const eventCounts = ref(0)
const partRefs = collection(db, 'participants')
const countEventsJoined = async () => {
    try {
        loadingEvents.value = true
        const q = query(
            partRefs,
            where('schoolId', '==', currentUser.value?.uid)
        )

        const snapshots = await getDocs(q)

        eventCounts.value = snapshots.docs.length

        for(const doc of snapshots.docs){
            eventsJoined.value.push({
                ...doc.data(),
                ...await getJoinedEvents(doc.data().eventId)
            })
        }
        loadingEvents.value = false
    } catch (error) {
        console.log(error)   
    }
}

// get joined events

const getJoinedEvents = async (eventId) => {
    const eventsRef = doc(db, 'events', eventId)
    try {
        const snapshot = await getDoc(eventsRef)

        return {
            id: snapshot.id,
            ...snapshot.data()
        }
    } catch (error) {
        console.log(error)
    }
}

// const get athlete applicants
const athleteApplicants = ref([])

const getAthleteApplicants  = async () => {
    try {
        onSnapshot(
            query(
                usersRef,
                and(
                    where('isAccepted', '==', false),
                    where('role', '==', 'athlete')
                )
            ),
            async (snapshots) => {
                athleteApplicants.value = []

                const athletePromises = []

                for (const doc of snapshots.docs) {
                    const qAthlete = query(
                        athletesRef,
                        and(
                            where('school', '==', currentUser.value?.uid),
                            where('athleteId', '==', doc.data().userId)
                        )
                    )
                    athletePromises.push(getDocs(qAthlete))
                }

                const athleteResults = await Promise.all(athletePromises)
                athleteResults.forEach(snapshot => {
                    snapshot.docs.forEach(doc => {
                        athleteApplicants.value.push({
                            id: doc.id,
                            ...doc.data()
                        })
                        schoolDataStore.pendingAthletes.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    })
                })

                getCoachAndAthlete()
                countEventsJoined()
            }
        )
    } catch (error) {
        console.log(error)
    }
} 

// convert athletes birthday
const convertBirthday = (bday) => {
    return moment(bday).format('ll')
}

// get athletes by gender
const getAthletesByGender = () => {
    const femaleAthletes =  athletes.value.filter(athlete => athlete.gender === 'Female') 
    const maleAthletes =  athletes.value.filter(athlete => athlete.gender === 'Male')

    doughNutDatasets.value = [maleAthletes.length, femaleAthletes.length]
}

// charts
const doughNutLabel = ref('Total # of athletes by gender')
const doughNutLabels = ref([ 'Male', 'Female' ])
const doughNutDatasets = ref([0, 0])

const chartLabel = ref('Events participants every year')
const chartLabels = ref([ '2023', '2024', '2025', '2026', '2027' ])
const chartDatasets = ref([ 20, 50, 30, 20, 25 ])

// delete athlete
const deleting = ref(false)
const athleteIdToDelete = ref('')
const athleteIndexToDelete = ref('')
const showModalDelete = ref(false)

const showDeleteModal = (uid, index) => {
    showModalDelete.value = true
    athleteIdToDelete.value = uid
    athleteIndexToDelete.value = index
}

const deleteAthlete = async () => {
    const userRoleRef = collection(db, 'userRole')
    const docRef = collection(db, 'athletes')
    const docsRef = collection(db, 'documents')
    const certsRef = collection(db, 'certificates')
    try {
        showModalDelete.value = false
        deleting.value = true
        const res = await axios.delete(`https://nopsscea-server.vercel.app/delete-user/${athleteIdToDelete.value}`)
        console.log(res.data)

        if(res.data === 'successfully deleted'){
            const q = query(
                docRef,
                where('athleteId', '==', athleteIdToDelete.value)
            )
            const q2 = query(
                docsRef,
                where('userId', '==', athleteIdToDelete.value)
            )
            const q3 = query(
                certsRef,
                where('userId', '==', athleteIdToDelete.value)
            )

            const q4 = query(
                userRoleRef,
                where('userId', '==', athleteIdToDelete.value)
            )

            const snapshots = await getDocs(q)
            const snapshots2 = await getDocs(q2)
            const snapshots3 = await getDocs(q3)
            const snapshots4 = await getDocs(q4)

            for(const snapshot of snapshots.docs){
                const docRef = doc(db, 'athletes', snapshot.id)
                await deleteDoc(docRef)
            }

            for(const snapshot of snapshots2.docs){
                const docRef = doc(db, 'documents', snapshot.id)
                const fileRef = storageRef(storage, `documents/${snapshot.docs().file}`)

                await Promise.all([deleteObject(fileRef), deleteDoc(docRef)])
            }

            for(const snapshot of snapshots3.docs){
                const docRef = doc(db, 'certificates', snapshot.id)
                const fileRef = storageRef(storage, `certs/${snapshot.docs().file}`)

                await Promise.all([deleteObject(fileRef), deleteDoc(docRef)])
            }

            for(const snapshot of snapshots4.docs){
                const docRef = doc(db, 'userRole', snapshot.id)
                await deleteDoc(docRef)
            }

            athletes.value.splice(athleteIndexToDelete.value, 1)
            $toast.success('Athlete successfully declined')
        }
    } catch (error) {
        console.log(error)
        $toast.error('Failed to delete athlete')
    } finally {
        deleting.value = false
    }
}

// accept athlete
const acceptAthlete = async (athleteId, index) => {
    const userRoleRef = collection(db, 'userRole')
    const today = moment(new Date()).format('L')
    try {
        const q = query(
            userRoleRef,
            where('userId','==', athleteId)
        )
        const snapshots = await getDocs(q)

        for(const snapshot of snapshots.docs){
            const docRef = doc(db, 'userRole', snapshot.id)
             await updateDoc(docRef, {
                isAccepted: true,
                dateAccepted: today
            })
        }
        athletes.value.splice(index, 1)

        $toast.success('Athlete accepted successfully')
    } catch (error) {
        $toast.error(error.message)
        console.log(error)
    }
}

onMounted(() => {
    getAthleteApplicants()
})


</script>

<style scoped>

</style>
