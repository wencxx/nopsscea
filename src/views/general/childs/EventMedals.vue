<template>
    <div class="space-y-10">
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-x-2 text-2xl">
                <Icon icon="noto:1st-place-medal" />
                <h1>Medals</h1>
            </div>
            <!-- <div v-if="role === 'admin' && !$route.query.status" class="flex justify-end">
                <button class="border border-blue-900 px-3 py-1 text-blue-900 rounded" @click="addEventMedal = true">Add Medal</button>
            </div> -->
        </div>

        <!-- table -->
            <div class="col-span-3 bg-gray-100 dark:bg-neutral-800 border dark:border-gray-100/10 rounded-xl p-3">
                <table class="!w-full tracking-wide rounded overflow-hidden">
                    <thead>
                        <tr>
                            <th class="w-4/12 py-1 border dark:border-gray-100/10 font-medium">School</th>
                            <th class="w-1/12 py-1 border dark:border-gray-100/10 font-medium">Gold</th>
                            <th class="w-1/12 py-1 border dark:border-gray-100/10 font-medium">Silver</th>
                            <th class="w-1/12 py-1 border dark:border-gray-100/10 font-medium">Bronze</th>
                            <th class="w-1/12 py-1 border dark:border-gray-100/10 font-medium">Total</th>
                            <th class="w-1/12 py-1 border dark:border-gray-100/10 font-medium" v-if="role === 'admin'">Actions</th>
                        </tr>
                    </thead>
                    <tbody v-if="!loadingParticipants && participants.length">
                        <tr class="text-md" v-for="(participant, index) in participants" :key="index">
                            <td class="p-2 border dark:border-gray-100/10">
                                <div class="flex gap-x-3">
                                    <img :src="participant?.schoolLogo" alt="school logo" class="w-14 bg-gray-200 dark:bg-gray-100/10 p-2 rounded">
                                    <div class="flex flex-col justify-center">
                                        <h1 class="text-md capitalize">{{ participant.schoolName  }}</h1>
                                        <p class="text-xs text-gray-500 font-semibold uppercase">{{ participant.schoolAbbreviation  }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="p-2 border dark:border-gray-100/10 text-center">{{ getGold(participant.schoolId) || 0 }}</td>
                            <td class="p-2 border dark:border-gray-100/10 text-center">{{ getSilver(participant.schoolId) || 0 }}</td>
                            <td class="p-2 border dark:border-gray-100/10 text-center">{{ getBronze(participant.schoolId) || 0 }}</td>
                            <td class="p-2 border dark:border-gray-100/10 text-center">{{ (getBronze(participant.schoolId) + getGold(participant.schoolId) + getSilver(participant.schoolId) ) || 0 }}</td>
                            <td class="p-2 border dark:border-gray-100/10" v-if="role === 'admin'">
                                <div class="flex justify-center gap-x-3">
                                    <button class="bg-orange-500 p-1 rounded text-white hover:shadow" @click="toggleAddModal(participant.schoolId, 'minus')">
                                        <Icon icon="mdi:minus" />
                                    </button>
                                    <button class="bg-green-500 p-1 rounded text-white hover:shadow" @click="toggleAddModal(participant.schoolId, 'add')">
                                        <Icon icon="mdi:plus" />
                                    </button>
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
                                <div class="h-6 w-10 mx-auto bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                            </td>
                            <td class="p-2 border dark:border-gray-100/10">
                                <div class="h-6 w-10 mx-auto bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                            </td>
                            <td class="p-2 border dark:border-gray-100/10">
                                <div class="h-6 w-10 mx-auto bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                            </td>
                            <td class="p-2 border dark:border-gray-100/10">
                                <div class="h-6 w-10 mx-auto bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                            </td>
                            <td class="p-2 border dark:border-gray-100/10" v-if="role === 'admin'">
                                <div class="h-6 w-14 mx-auto bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-if="!loadingParticipants && !participants.length">
                        <tr class="text-md">
                            <td class="p-2 border dark:border-gray-100/10 text-center font-medium" colspan="5">No participants</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        <addMedal v-if="addEventMedal" @closeModal="addEventMedal = false" @addedNewMedal="addedNewMedal" class="!mt-0" :data="medalData" @click.self="addEventMedal = false" />
    </div>
</template>

<script setup>
import addMedal from '@components/addMedal.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '@config/firebaseConfig'
import { getDocs, where, query, collection, orderBy } from 'firebase/firestore'
import moment from 'moment'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()

const formatDate = (date) => {
    return moment(date).format('llll')
}

const route = useRoute()

const role = localStorage.getItem('role')

// add new medal
const medalData = ref({
    school: '',
    type: ''
})
const addEventMedal = ref(false)

const toggleAddModal = (schoolId, type) => {
    addEventMedal.value = true
    medalData.value.school = schoolId
    medalData.value.type = type
}

// participants ref
const participantsRef = collection(db, 'participants')

// count medals
const parti = ref([])

const getGold = (schoolId) => {
    const participant = parti.value.find(part => part.schoolId === schoolId)

    return participant.gold
}

const getSilver = (schoolId) => {
    const participant = parti.value.find(part => part.schoolId === schoolId)

    return participant.silver
}

const getBronze = (schoolId) => {
    const participant = parti.value.find(part => part.schoolId === schoolId)

    return participant.bronze
}

// get all participants
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

            parti.value.push({
                id: doc.id,
                ...doc.data()
            })

            if(participantsDetails.isAccepted){
                getParticipantsPersonalDetails(participantsDetails.schoolId)
            }


        })

        await Promise.all(promises)
    } catch (error) {
        $toast.error('Error getting participants')
        console.log(error)
    } finally {
        loadingParticipants.value = false
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


// added new medal
const addedNewMedal = (data) => {

    const part = parti.value.find(participant => participant.schoolId === data.school)

     if (part) {
        if(data.type === 'add'){
            part.gold += data.gold;
            part.silver += data.silver;
            part.bronze += data.bronze;
        }else{
            part.gold -= data.gold;
            part.silver -= data.silver;
            part.bronze -= data.bronze;
        }
    }
}

onMounted(() => {
    getParticipants(route.params.id)
})
</script>