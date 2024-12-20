<template>
    <div class="space-y-10">
        <div class="flex items-center gap-x-2 text-xl">
            <Icon icon="material-symbols:sports-martial-arts-rounded" class="text-2xl" />
            <h1>Athlete Lists</h1>
        </div>
        <!-- table -->
        <div class="bg-gray-100 dark:bg-gray-100/10 p-5 rounded-md">
            <table class="min-w-[500px] md:w-full font-inter tracking-wide">
                <thead>
                    <tr>
                        <th class="w-2/6 py-1 border border-gray-300 dark:border-gray-100/10">Name</th>
                        <th class="w-1/6 py-1 border border-gray-300 dark:border-gray-100/10">Address</th>
                        <th class="w-1/6 py-1 border border-gray-300 dark:border-gray-100/10">Email</th>
                        <th class="w-1/6 py-1 border border-gray-300 dark:border-gray-100/10">Birthday</th>
                        <th class="w-1/6 py-1 border border-gray-300 dark:border-gray-100/10">Status</th>
                        <th class="w-1/6 py-1 border border-gray-300 dark:border-gray-100/10">Action</th>
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
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">{{ athlete.address }}</td>
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">{{ athlete.email }}</td>
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">{{ convertBirthday(athlete.birthday) }}</td>
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">
                            <div class="w-full bg-orange-500 py-1 text-sm rounded text-white" :class="{ '!bg-green-500': athlete.status === 'Qualified', '!bg-red-500': athlete.status === 'Not Qualified' }">
                                {{ athlete.status || 'Under Review' }}
                            </div>
                        </td>
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">
                            <div class="flex justify-center gap-x-3">
                                <router-link :to="{ name: 'athleteDetails', params: { id: athlete.id } }" class="bg-custom-primary w-fit text-green-500 hover:scale-110">
                                    <Icon icon="mdi:eye" class="text-2xl" />
                                </router-link>
                                <button class="bg-custom-secondary text-red-500 w-fit hover:scale-110" @click="undoAthlete(athlete.athleteId, index)">
                                    <Icon icon="mdi:restore" class="text-xl" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="!loading && athletes.length === 0">
                    <tr>
                        <td colspan="6" class="p-2 border dark:border-gray-100/10 text-center">No athletes to show</td>
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
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAuthStore, useSchoolDataStore } from '../../store'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { db, storage } from '@config/firebaseConfig'
import { getDocs, collection, where, query, queryEqual, and, doc, updateDoc } from 'firebase/firestore'
import moment from 'moment'

const convertBirthday = (bday) => {
    return moment(bday).format('ll')
}

const $toast = useToast()

const authStore = useAuthStore()
const schoolDataStore = useSchoolDataStore()

const currentUser = computed(() => authStore.user)

const athletes = ref([])
// const athletes = computed(() => schoolDataStore.athletes)

// users ref
const userRef = collection(db, 'userRole')
const userRoleDocId = ref([])

// get athlete
const loading = ref(false)

const getAthlete = async () => {
    try {
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
                where('school', '==', currentUser.value?.uid),
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

const undoAthlete = async (athleteId, index) => {
    const userRoleRef = collection(db, 'userRole')
    try {
        const q = query(
            userRoleRef,
            where('userId','==', athleteId)
        )
        const snapshots = await getDocs(q)

        for(const snapshot of snapshots.docs){
            const docRef = doc(db, 'userRole', snapshot.id)
             await updateDoc(docRef, {
                isAccepted: false,
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
    getAthlete()
})
</script>