<template>
    <div class="flex flex-col gap-y-5">
        <!-- header -->
        <div class="flex gap-x-20">
            <div class="w-full flex flex-col lg:flex-row gap-x-5">
                <img v-if="eventDetails.coverPhoto" :src="eventDetails.coverPhoto" alt="event cover photo" class="lg:w-3/4 h-96 rounded-xl">
                <div v-else class="lg:w-3/4 h-96 rounded bg-gray-100 dark:bg-gray-100/10 animate-pulse"></div>
                <div class="flex flex-col justify-between lg:w-1/4">
                    <h1 class="text-lg font-semibold">Event: <span class="font-medium">{{ eventDetails.title }}</span></h1>
                    <h1 class="text-lg font-semibold line-clamp-4">Description: <span class="font-medium">{{ eventDetails.description }}</span></h1>
                    <h1 class="text-lg font-semibold">Status: <span class="font-medium">Upcoming</span></h1>
                    <h1 class="text-lg font-semibold">Start date: <span class="font-medium">{{ convertDate(eventDetails.startDate) }}</span></h1>
                    <h1 class="text-lg font-semibold">End date: <span class="font-medium">{{ convertDate(eventDetails.endDate) }}</span></h1>
                    <div v-if="role == 'school' && eventDetails.id" class="w-full flex flex-col">
                        <button v-if="isWaitingApproval" class="border border-blue-900 py-1 rounded text-blue-900 dark:border-red-900 dark:text-red-900">Pending approval</button>
                        <button v-else-if="isParticipant" class="border border-blue-900 py-1 rounded text-blue-900 dark:border-red-900 dark:text-red-900">Joined</button>
                        <button v-else-if="!isParticipant && !isWaitingApproval" class="bg-blue-900 hover:bg-blue-950 py-1 rounded text-white dark:border border-gray-100/25" @click="showEntryForm = true" :class="{ '!bg-gray-200 animate-pulse text-gray-200': !eventDetails.id }">Join event</button>
                    </div>
                    <div v-if="role == 'admin' && eventDetails.id" class="w-full flex flex-col">
                        <button v-if="!deleting" class="bg-red-800 text-white py-1 rounded" @click="showDeleteModal(eventDetails.id)">Delete event</button>
                        <button v-else class="bg-red-800 text-white py-1 rounded animate-pulse" disabled>Deleting event</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- charts -->
        <div class="grid grid-cols-3 gap-4">
            <div class="col-span-3 grid lg:grid-cols-4 gap-4 bg-gray-100 dark:bg-neutral-800 border dark:border-gray-100/10 rounded-xl p-3">
                <div class="border rounded-xl bg-gray-200 dark:bg-neutral-800 dark:border-gray-100/10 p-5 flex items-center justify-between h-36">
                    <div>
                        <h1 class="text-4xl font-bold">{{ participants.length }}</h1>
                    </div>
                    <div class="flex flex-col items-end">
                        <Icon icon="lucide:school-2" class="text-4xl text-red-700" />
                        <h3 class="capitalize text-end">Registered Participants</h3>
                    </div>
                </div>
                <div class="border rounded-xl bg-gray-200 dark:bg-neutral-800 dark:border-gray-100/10 p-5 flex items-center justify-between h-36">
                    <div>
                        <h1 class="text-4xl font-bold">{{ athletes.length }}</h1>
                    </div>
                    <div class="flex flex-col items-end">
                        <Icon icon="material-symbols:sports-martial-arts-rounded" class="text-4xl text-blue-900" />
                        <h3 class="capitalize text-end">Registered Athletes</h3>
                    </div>
                </div>
                <div class="border rounded-xl bg-gray-200 dark:bg-neutral-800 dark:border-gray-100/10 p-5 flex items-center justify-between h-36">
                    <div>
                        <h1 class="text-4xl font-bold">{{ coaches.length }}</h1>
                    </div>
                    <div class="flex flex-col items-end">
                        <Icon icon="material-symbols:sports-kabaddi-rounded" class="text-4xl text-red-700" />
                        <h3 class="capitalize text-end">Registered Coaches</h3>
                    </div>
                </div>
                <div class="border rounded-xl bg-gray-200 dark:bg-neutral-800 dark:border-gray-100/10 p-5 flex items-center justify-between h-36">
                    <div>
                        <h1 class="text-4xl font-bold">{{ pendingParticipants.length }}</h1>
                    </div>
                    <div class="flex flex-col items-end">
                        <Icon icon="mdi:account-pending-outline" class="text-4xl text-blue-900" />
                        <h3 class="capitalize text-end">Waiting Approval</h3>
                    </div>
                </div>
            </div>
            <!-- table -->
            <div v-if="role == 'admin'" class="w-2/3 flex flex-col">
                <div class="!w-full flex relative border dark:border-gray-100/10 rounded-md overflow-hidden">
                    <router-link :to="{ name: 'upcomingEventDetails' }" class="!w-1/2 z-10 text-center py-1 rounded-md text-white" :class="{ '!text-black': $route.name === 'eventApplicants' }">Registered</router-link>
                    <router-link :to="{ name: 'eventApplicants' }" class="!w-1/2 z-10 text-center py-1 rounded-md" :class="{ '!text-white': $route.name === 'eventApplicants' }">Applicants</router-link>
                    <div class="w-1/2 h-full absolute left-0  bg-blue-900 duration-200" :class="{ 'left-1/2': $route.name === 'eventApplicants' }">

                    </div>
                </div>
            </div>
            <div class="col-span-3 bg-gray-100 dark:bg-neutral-800 border dark:border-gray-100/10 rounded-xl p-3 overflow-x-auto">
                <router-view @acceptedApplicant="acceptedApplicant" />
                <table v-if="$route.name !== 'eventApplicants'" class="w-[200%] lg:!w-full tracking-wide rounded overflow-hidden">
                    <thead>
                        <tr>
                            <th class="w-2/6 py-1 border dark:border-gray-100/10 font-medium">School</th>
                            <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Address</th>
                            <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Email</th>
                            <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Athletes</th>
                        </tr>
                    </thead>
                    <tbody v-if="!loadingParticipants && participants.length > 0">
                        <tr class="text-md" v-for="(participant, index) in participants" :key="index">
                            <td class="p-2 border dark:border-gray-100/10">
                                <div class="flex gap-x-3">
                                    <img :src="participant?.schoolLogo" alt="school logo" class="w-14 rounded">
                                    <div class="flex flex-col justify-center">
                                        <h1 class="text-md capitalize">{{ participant.schoolName  }}</h1>
                                        <p class="text-xs text-gray-500 font-semibold uppercase">{{ participant.schoolAbbreviation }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="p-2 border dark:border-gray-100/10 text-center">{{ participant.schoolAddress }}</td>
                            <td class="p-2 border dark:border-gray-100/10 text-center">{{ participant.schoolEmail }}</td>
                            <td class="p-2 border dark:border-gray-100/10 text-center">{{ countSchoolAthletes(participant.schoolId) }}</td>
                        </tr>
                    </tbody>
                    <tbody v-if="loadingDetails || loadingParticipants">
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
                        </tr>
                    </tbody>
                    <tbody v-if="!loadingDetails && !loadingParticipants && participants.length == 0">
                        <tr class="text-md">
                            <td class="p-2 border dark:border-gray-100/10 text-center font-medium" colspan="5">No participants</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- eventEntry Form -->
        <eventEntryForm  v-if="showEntryForm" @joinedEvent="joinEvent" @closeModal="showEntryForm = false" />
        <deleteModal v-if="willDelete" user="event" type="delete" @closeModal="willDelete = false" @acceptDelete="deleteEvent()" />
    </div>
</template>

<script setup>
import eventEntryForm from '@components/forms/eventEntryForm.vue'
import deleteModal from '@components/deleteModal.vue'
import { db } from '@config/firebaseConfig'
import { getDoc, doc, addDoc, collection, Timestamp, getDocs, where, query, deleteDoc } from 'firebase/firestore'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@store'
import { scales } from 'chart.js'
import moment from 'moment'

const convertDate = (date) => {
    return moment(date).format('ll')
}

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// userRole and details
const role = localStorage.getItem('role')
const currentUser = computed(() => authStore.user)

// check if already joined event
const isWaitingApproval = computed(() => pendingParticipants.value.some(participant => participant == currentUser.value.uid))
const isParticipant = computed(() => participants.value.some(participant => participant.schoolId == currentUser.value.uid))

const $toast = useToast()

// gete event details
const eventDetails = ref({})
const loadingDetails = ref(false)

const getEventDetails = async () => {
    try {
        loadingDetails.value = true
        const docRef = doc(db, 'events', route.params.id)

        const snapshot = await getDoc(docRef)
        
        if(!snapshot.exists()) return console.log('No data availalble')
        
        eventDetails.value = {
            id: snapshot.id,
            ...snapshot.data()
        }
        loadingDetails.value = false
        getParticipants(snapshot.id)
    } catch (error) {
        $toast.error(error.message)
    }
}

// participants ref
const participantsRef = collection(db, 'participants')

// get all participants
const pendingParticipants = ref([])
const participants = ref([])
const loadingParticipants = ref(false)

const getParticipants = async (eventId) => {
    try {
        loadingParticipants.value = true
        const q = query(
            participantsRef,
            where('eventId', '==', eventId)
        )
        const snapshot = await getDocs(q)

        const promises = snapshot.docs.map(async (doc) => {
            const participantsDetails = {
                id: doc.id,
                ...doc.data()
            }

            if(participantsDetails.isAccepted){
                getParticipantsPersonalDetails(participantsDetails.schoolId)
                getSchoolAthletes(participantsDetails.schoolId)
                getSchoolCoaches(participantsDetails.schoolId)
            }else{
                pendingParticipants.value.push(participantsDetails.schoolId)
            }


        })

        await Promise.all(promises)
        loadingParticipants.value = false
    } catch (error) {
        $toast.error('Error getting participants')
    }
}

//school reference 
const schoolRef = collection(db, 'schools')


// get participants personal details
const getParticipantsPersonalDetails = async (participantsId) => {    
    try {
        const q = query(
            schoolRef,
            where('schoolId', '==', participantsId)
        )
        
        const snapshots = await getDocs(q)

        snapshots.docs.forEach(doc => {
            participants.value.push({
                id: doc.id,
                ...doc.data()
            })
        })
    } catch (error) {
        $toast.error(error.message)
    }
}

// athletes reference
const athleteRef = collection(db, 'athletes')

// get school athletes
const athletes = ref([])

const getSchoolAthletes = async (schoolId) => {    
    try {
        const q = query(
            athleteRef,
            where('school', '==', schoolId)
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
    }
}

// count school athletes
const countSchoolAthletes = (schoolId) => {
    const count = athletes.value.filter(athlete => athlete.school === schoolId)

    return count.length
}

// athletes reference
const coachRef = collection(db, 'coaches')

// get school athletes
const coaches = ref([])

const getSchoolCoaches = async (schoolId) => {    
    try {
        const q = query(
            coachRef,
            where('school', '==', schoolId)
        )
        
        const snapshots = await getDocs(q)

        snapshots.docs.forEach(doc => {
            coaches.value.push({
                id: doc.id,
                ...doc.data()
            })
        })
    } catch (error) {
        $toast.error(error.message)
    }
}

const showEntryForm = ref(false)

// join to event for school users only
const joinEvent = async (data) => {
    showEntryForm.value = false
    try {
        const snapshot = await addDoc(participantsRef, {
            ...data,
            eventId: eventDetails.value?.id,
            schoolId: currentUser.value?.uid,
            isAccepted: false,
            joinedAt: Timestamp.now() 
        })      

        const q = query(
            schoolRef,
            where('schoolId', '==', currentUser.value?.uid)
        )
        
        const snapshots = await getDocs(q)

        snapshots.docs.forEach(doc => {
            const schoolData = doc.data()
            pendingParticipants.value.push(schoolData.schoolId)
        })

        $toast.success('Joined event successfully')
    } catch (error) {
        $toast.error('Failed to join event')
        console.log(error)
    }
}

// accept applicants for admin only
const acceptedApplicant = async (data) => {
    pendingParticipants.value.splice(data.index, 1)

    const q = query(
        schoolRef,
        where('schoolId', '==', data.schoolId)
    )
    
    const snapshots = await getDocs(q)

    snapshots.docs.forEach(doc => {
        participants.value.push({
            id: doc.id,
            ...doc.data()
        })
    })
}

// delete event
const willDelete = ref(false)
const eventToDeleteId = ref('')
const deleting = ref(false)

const showDeleteModal = (eventId) => {
    eventToDeleteId.value = eventId
    willDelete.value = true
}

const deleteEvent = async () => {
    const participantRef = collection(db, 'participants')
    try {
        deleting.value = true
        willDelete.value = false
        const docRef = doc(db, 'events',  eventToDeleteId.value)
        await deleteDoc(docRef)

        const q = query(
            participantRef,
            where('eventId', '==', eventToDeleteId.value)
        )
        const snapshots = await getDocs(q)

        for(const participant of snapshots.docs){
            const id = participant.id

            const docRef = doc(db, 'participants', id)
            await deleteDoc(docRef)
        }


        $toast.success('Delete event successfully')
        router.push('/upcoming-events')
    } catch (error) {
        console.log(error)
        $toast.error('Failed deleting event')
    } finally {
        willDelete.value = false
        deleting.value = false
    }
}

onMounted(() => {
    getEventDetails()
})
</script>
