<template>
    <div class="space-y-10">
        <div class="border dark:border-gray-100/10 h-fit rounded-md p-5 flex gap-x-5">
            <div class="flex flex-col w-1/5 items-center justify-center h-full gap-y-5 border-r dark:border-gray-100/10">
                <img v-if="schoolData.schoolLogo" :src="schoolData.schoolLogo" alt="profile picture" class="w-32 aspect-square rounded-full">
                <div v-else class="w-32 aspect-square rounded-full bg-gray-300 animate-pulse"></div>
                <div class="flex flex-col items-center">
                    <h1 class="font-bold text-center capitalize">{{ schoolData.schoolName }}</h1>
                    <p class="uppercase text-sm text-gray-500 dark:text-gray-100">{{ schoolData.schoolAbbreviation }}</p>
                </div>
            </div>
            <div class="w-4/5 h-full grid grid-cols-2 gap-y-3">
                <h1 class="text-lg capitalize"><span class="font-bold">School Head:</span> {{ schoolData.schoolHead }}, {{ schoolData.headTitle }}</h1>
                <h1 class="text-lg"><span class="font-bold">School ID:</span> {{ schoolData.schoolCode }}</h1>
                <h1 class="text-lg"><span class="font-bold">School Classification:</span> {{ schoolData.schoolClassification }}</h1>
                <h1 class="text-lg"><span class="font-bold capitalize">School Address:</span> {{ schoolData.schoolAddress }}</h1>
                <h1 class="text-lg"><span class="font-bold">School Email:</span> {{ schoolData.schoolEmail }}</h1>
                <h1 class="text-lg"><span class="font-bold">No. of Secondary Students:</span> {{ schoolData.noSecondary }}</h1>
                <h1 class="text-lg"><span class="font-bold">No. of Tertiary Students:</span> {{ schoolData.noTertiary }}</h1>
             </div>
        </div>
        <!-- athletes list -->
        <div class="border dark:border-gray-100/10 h-fit rounded-md p-5 flex flex-col gap-y-5">
            <h1 class="text-lg font-bold">Athlete lists</h1>
            <div class="bg-gray-100 dark:bg-gray-100/10 p-5 rounded-md">
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
                        <tbody v-if="athletes.length">
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
                                        <button class="bg-custom-secondary text-red-500 w-fit hover:scale-110" @click="removeSchool(school.id)">
                                            <Icon icon="mdi:trash" class="text-xl" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-if="!loading && !athletes.length">
                            <tr>
                                <td colspan="5" class="p-2 border dark:border-gray-100/10 text-center">No athletes to show</td>
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
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { db } from '@config/firebaseConfig.js'
import { doc, getDoc, collection, getDocs, query, where, limit } from 'firebase/firestore'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { onMounted, ref } from 'vue'
import moment from 'moment'
import lineChart from '@components/charts/lineChart.vue'

const route = useRoute()
const $toast = useToast()

const schoolData = ref({})

// get athlete data
const schoolRef = collection(db, 'schools')
const getData = async () => {
    try {
        const q = query(
            schoolRef,
            where('schoolId', '==', route.params.id),
            limit(1)
        )

        const snapshot = await getDocs(q)

        schoolData.value = {
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data()
        }
    } catch (error) {
        $toast.error(error.message)
    }
}

// get athletes
const athletes = ref([])
const loading = ref(false)

const athleteRef = collection(db, 'athletes')

const getAthletedData = async () => {
    try {
        loading.value = true
        const q = query(
            athleteRef,
            where('school', '==', route.params.id)
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
    } finally {
        loading.value = false
    }
}

const convertBirthday = (bday) => {
    return moment(bday).format('ll')
}

onMounted(() => {
    getData()
    getAthletedData()
})
</script>
