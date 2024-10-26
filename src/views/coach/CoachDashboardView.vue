<template>
    <div class="grid grid-cols-3 gap-5">
        <div class="bg-gray-100 dark:bg-gray-100/10 col-span-3 h-[25dvh] border dark:border-gray-100/10 rounded-xl grid grid-cols-3 p-5 gap-x-5">
            <div class="border rounded-xl bg-gray-200 dark:bg-neutral-800 dark:border-gray-100/10 p-5 flex flex-col justify-between">
                <div>
                    <Icon icon="ic:round-sports-gymnastics" class="text-4xl text-blue-900" />
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
                    <Icon icon="guidance:personal-training" class="text-4xl text-red-700" />
                </div>
                <div>
                    <h1 class="text-2xl font-bold">{{ trainings.length }}</h1>
                </div>
                <div>
                    <h3 class="capitalize text-lg">Total Trainings</h3>
                </div>
            </div>
            <div class="border rounded-xl bg-gray-200 dark:bg-neutral-800 dark:border-gray-100/10 p-5 flex flex-col justify-between">
                <div>
                    <Icon icon="ic:round-sports-gymnastics" class="text-4xl text-blue-900" />
                </div>
                <div>
                    <h1 class="text-2xl font-bold">15</h1>
                </div>
                <div>
                    <h3 class="capitalize text-lg">Athletes Applicants</h3>
                </div>
            </div>
        </div>
        <div class="bg-gray-100 dark:bg-gray-100/10 col-span-3 p-3 border dark:border-gray-100/10 rounded-md">
            <h1 class="mb-2 capitalize font-bold flex items-center gap-x-1"><Icon icon="ph:ranking" class="text-3xl" />Top active players</h1>
            <table class="min-w-[500px] md:w-full tracking-wide rounded overflow-hidden">
                <thead>
                    <tr>
                        <th class="w-2/6 py-1 border dark:border-gray-100/10 font-medium">Name</th>
                        <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Gender</th>
                        <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Trained days</th>
                        <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Bronze</th>
                        <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Total</th>
                    </tr>
                </thead>
                <tbody >
                    <tr v-for="i in 5" :key="i" class="text-md">
                        <td class="p-2 border dark:border-gray-100/10">
                            <div class="flex gap-x-3">
                                <!-- <img :src="school?.schoolLogo" alt="school logo" class="w-14 bg-gray-200 dark:bg-gray-100/10 p-2 rounded"> -->
                                <div class="w-16 aspect-square bg-gray-200 dark:bg-gray-100/10 p-2 rounded"></div>
                                <div class="flex flex-col justify-center">
                                    <h1 class="text-sm capitalize">Carlos Hilado Memorial State University</h1>
                                    <p class="text-xs text-gray-500 font-semibold uppercase">CHMSU</p>
                                </div>
                            </div>
                        </td>
                        <td class="p-2 border dark:border-gray-100/10 text-center">32</td>
                        <td class="p-2 border dark:border-gray-100/10 text-center">12</td>
                        <td class="p-2 border dark:border-gray-100/10 text-center">18</td>
                        <td class="p-2 border dark:border-gray-100/10 text-center">62</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useDataStore, useAuthStore } from '@store'

const authStore = useAuthStore()
const dataStore = useDataStore()

const currentUser = computed(() => authStore.user)

const athletes = computed(() => dataStore.athletesData)
const trainings = computed(() => dataStore.trainingData)

onMounted(() => {
    watch(() => currentUser.value?.uid, () => {
        dataStore.getCoachData(currentUser.value?.uid)
    })
})
</script>
