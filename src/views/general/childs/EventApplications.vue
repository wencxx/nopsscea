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
                        <img :src="participant?.schoolLogo" alt="school logo" class="w-14 bg-gray-200 dark:bg-gray-100/10 p-2 rounded">
                        <div class="flex flex-col justify-center">
                            <h1 class="text-md capitalize">{{ participant.schoolName  }}</h1>
                            <p class="text-xs text-gray-500 font-semibold uppercase">{{ participant.schoolAbbreviation }}</p>
                        </div>
                    </div>
                </td>
                <td class="p-2 border dark:border-gray-100/10 text-center">{{ participant.schoolAddress }}</td>
                <td class="p-2 border dark:border-gray-100/10 text-center">{{ participant.schoolEmail }}</td>
                <td class="p-2 border dark:border-gray-100/10 text-center">10</td>
                <td class="p-2 border dark:border-gray-100/10 text-center">
                    <div class="flex justify-center">
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
import { db } from '@config/firebaseconfig'
import { getDoc, doc, addDoc, collection, getDocs, where, query, updateDoc, Timestamp } from 'firebase/firestore'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { onMounted, ref, defineEmits } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const emit = defineEmits(['acceptedApplicant'])

const eventId = route.params.id

const $toast = useToast()

// participants ref
const participantsRef = collection(db, 'participants')

// get all participants
const pendingParticipants = ref([])
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

            if(!participantsDetails.isAccepted){
                getParticipantsPersonalDetails(participantsDetails.schoolId, participantsDetails.id)
            }

        })

        await Promise.all(promises)
        loadingParticipants.value = false
    } catch (error) {
        $toast.error('Error getting applicants')
        console.log(error)
    }
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

onMounted(() => {
    getParticipants(eventId)
})
</script>
