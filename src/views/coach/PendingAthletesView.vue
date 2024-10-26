<template>
    <div class="space-y-10">
        <div class="flex items-center gap-x-2 text-xl">
            <Icon icon="material-symbols:sports-martial-arts-rounded" class="text-2xl" />
            <h1>Pending Athletes</h1>
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
                        <th class="w-1/6 py-1 border border-gray-300 dark:border-gray-100/10">Action</th>
                    </tr>
                </thead>
                <tbody v-if="athletes.length > 0">
                    <tr class="text-md" v-for="(athlete, index) in athletes" :key="athlete.id">
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
                                <button class="bg-custom-primary w-fit text-green-500 hover:scale-110" @click="acceptAthlete(index, athlete.userRoleId)">
                                    <Icon icon="iconamoon:check-fill" class="text-2xl" />
                                </button>
                                <button class="bg-custom-secondary text-red-500 w-fit hover:scale-110" @click="removeSchool(school.id)">
                                    <Icon icon="mdi:trash" class="text-xl" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="!loading && athletes.length === 0">
                    <tr>
                        <td colspan="5" class="p-2 border dark:border-gray-100/10 text-center">No athletes to show</td>
                    </tr>
                </tbody>
                <tbody v-if="loading">
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
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useAuthStore, useDataStore } from '../../store'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import moment from 'moment'
import { db } from '@config/firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore'

const $toast = useToast()

const convertBirthday = (bday) => {
    return moment(bday).format('ll')
}

const authStore = useAuthStore()
const dataStore = useDataStore()

const currentUser = computed(() => authStore.user)

const athletes = computed(() => dataStore.pendingAthletesData)

// get athlete
const loading = ref(false)

const acceptAthlete = async (index, userId) => {
    const userRoleRef = doc(db, 'userRole', userId)
    try {
         await updateDoc(userRoleRef, {
            isAccepted: true
        })

        athletes.value.splice(index, 1)

        $toast.success('Athlete accepted successfully')
    } catch (error) {
        $toast.error(error.message)
        console.log(error)
    }
}

onMounted(() => {
    if(currentUser.value?.uid){
        dataStore.getCoachData(currentUser.value?.uid)
    }
    watch(() => currentUser.value, async () => {
        loading.value = true
        await dataStore.getCoachData(currentUser.value?.uid)
        loading.value = false
    })
})
</script>