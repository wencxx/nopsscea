<template>
    <table class="!w-full tracking-wide rounded overflow-hidden">
        <thead>
            <tr>
                <th class="w-2/6 py-1 border dark:border-gray-100/10 font-medium">School</th>
                <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Address</th>
                <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Email</th>
                <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Athletes</th>
                <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Actions</th>
            </tr>
        </thead>
        <tbody v-if="pendingParticipants.length > 0">
            <tr class="text-md" v-for="(participant, index) in pendingParticipants" :key="index">
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
                <td class="p-2 border dark:border-gray-100/10 text-center">
                    <div class="flex justify-center gap-x-2">
                        <a :href="getParticipantsPDF(index)" target="_blank">
                            <Icon icon="bxs:file-pdf" class="cursor-pointer text-gray-500 text-2xl"/>
                        </a>
                        <a
                                :href="getParticipantsDOCX(index)"
                            >
                            <Icon icon="mdi:download" class="text-2xl text-orange-500 hover:scale-110" />
                        </a>
                        <Icon icon="tabler:check" class="cursor-pointer text-green-500 text-2xl" @click="acceptApplicant(participant.participantsId, participant.schoolId, index)"/>
                    </div>
                </td>
            </tr>
        </tbody>
        <tbody v-if="loadingParticipants">
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
                <td class="p-2 border dark:border-gray-100/10">
                    <div class="h-6 w-50 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                </td>
            </tr>
        </tbody>
        <tbody v-if="!loadingParticipants && pendingParticipants.length == 0">
            <tr class="text-md">
                <td class="p-2 border dark:border-gray-100/10 text-center font-medium" colspan="6">No participants</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { db } from '@config/firebaseConfig'
import { getDoc, doc, addDoc, collection, getDocs, where, query, updateDoc, Timestamp, and, limit } from 'firebase/firestore'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { onMounted, ref, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import { saveAs } from 'file-saver'
import ImageModule from 'docxtemplater-image-module-free'
import moment from 'moment'

const route = useRoute()
const emit = defineEmits(['acceptedApplicant'])

const eventId = route.params.id

const $toast = useToast()

// get event details
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
    } catch (error) {
        $toast.error(error.message)
    }finally{
        loadingDetails.value = false
    }
}

// participants ref
const participantsRef = collection(db, 'participants')

// get all participants
const pendingParticipants = ref([])
const loadingParticipants = ref(false)
const participants = ref([])

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

            participants.value.push(participantsDetails)

            if(!participantsDetails.isAccepted){
                getParticipantsPersonalDetails(participantsDetails.schoolId, participantsDetails.id)
                getSchoolAthletes(participantsDetails.schoolId)
            }

        })

        await Promise.all(promises)
        loadingParticipants.value = false
    } catch (error) {
        $toast.error('Error getting applicants')
        console.log(error)
    }
}

const getParticipantsPDF = (index) => {
    const participant = participants.value[index]
    return participant.pdfURL
}

const getParticipantsDOCX = (index) => {
    const participant = participants.value[index]
    return participant.documentURL
}

//school reference 
const schoolRef = collection(db, 'schools')

// get participants personal details
const getParticipantsPersonalDetails = async (schoolId, participantsId) => {    
    try {
        const q = query(
            schoolRef,
            where('schoolId', '==', schoolId)
        )
        
        const snapshots = await getDocs(q)

        snapshots.docs.forEach(doc => {
            pendingParticipants.value.push({
                id: doc.id,
                ...doc.data(),
                participantsId: participantsId
            })
        })
    } catch (error) {
        $toast.error(error.message)
    }
}

const acceptApplicant = async (participantsId, schoolId, index) => {
    const docRef = doc(db, 'participants', participantsId)
    try {
        const snapshot = await updateDoc(docRef, {
            isAccepted: true,
            acceptedAt: Timestamp.now()
        })
        
        const dataToPass = {
            schoolId: schoolId,
            index: index
        }
        emit('acceptedApplicant', dataToPass)
        pendingParticipants.value.splice(index, 1)

        $toast.success('Accepted participants successfully')
    } catch (error) {
        $toast.error(error.message)
    }
}

//get accpeted athletes
const athletesId = ref([])
const roleRef = collection(db, 'userRole') 

const getAcceptedAthletes = async () => {
    try {
        const q = query(
            roleRef,
            and(
                where('isAccepted', '==', true),
                where('role', '==', 'athlete'),
            )
        );

        const snapshots = await getDocs(q);

        snapshots.docs.forEach(doc => {
            const eventStartDate = moment(eventDetails.value.startDate).startOf('day');
            const acceptedDate = moment(doc.data().dateAccepted).startOf('day');

            if (acceptedDate.isBefore(eventStartDate)) {
                athletesId.value.push(doc.data().userId);
            }
        });

        await getParticipants(eventId);
    } catch (error) {
        console.log(error);
    }
};


// athletes reference
const athleteRef = collection(db, 'athletes')

// get school athletes
const athletes = ref([])

const getSchoolAthletes = async (schoolId) => {    
    try {
        if(athletesId.value.length){
            console.log(athletesId.value)
            const q = query(
                athleteRef,
                and(
                    where('school', '==', schoolId)
                )
            )
            
            const snapshots = await getDocs(q)

            snapshots.docs.forEach(doc => {
                athletes.value.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
        }
    } catch (error) {
        $toast.error(error.message)
    }
}


// count school athletes
const countSchoolAthletes = (schoolId) => {
    return athletes.value.filter(athlete => athlete.school === schoolId).length;
};


onMounted(() => {
    getAcceptedAthletes()
    getEventDetails()
})
</script>
