<template>
    <div class="grid grid-cols-3 gap-5">
        <div class="bg-gray-100 dark:bg-gray-100/10 col-span-3 h-[25dvh] border dark:border-gray-100/10 rounded-xl grid grid-cols-4 p-5 gap-x-5">
            <div class="border rounded-xl bg-gray-200 dark:bg-neutral-800 dark:border-gray-100/10 p-5 flex flex-col justify-between">
                <div>
                    <Icon icon="fluent-emoji-high-contrast:person-running" class="text-4xl text-blue-900" />
                </div>
                <div>
                    <h1 class="text-2xl font-bold">15</h1>
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
                    <h1 class="text-2xl font-bold">10</h1>
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
                    <h1 class="text-2xl font-bold">15</h1>
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
                    <h1 class="text-2xl font-bold">100</h1>
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
            <h1 class="mb-2 capitalize font-bold flex items-center gap-x-1"><Icon icon="noto:1st-place-medal" class="text-3xl" /> Top 5 most medals won all time</h1>
            <table class="min-w-[500px] md:w-full tracking-wide rounded overflow-hidden">
                <thead>
                    <tr>
                        <th class="w-2/6 py-1 border dark:border-gray-100/10 font-medium">School</th>
                        <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Gold</th>
                        <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Silver</th>
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
        <div class="bg-gray-100 dark:bg-gray-100/10 col-span-3 h-[50dvh] border dark:border-gray-100/10 rounded-md p-3">
            <barChart :labels="chartLabels" :data="chartDatasets" :label="chartLabel" class="!w-full" />
        </div>
        <div class="bg-gray-100 dark:bg-gray-100/10 col-span-3 h-fit p-3 border dark:border-gray-100/10 rounded-md">
            <h1 class="mb-2 capitalize font-bold flex items-center gap-x-1"><Icon icon="fluent-emoji-high-contrast:person-running" class="text-2xl -mt-1"/>Athletes applicants</h1>
            <table class="min-w-[500px] md:w-full tracking-wide rounded overflow-hidden">
                <thead>
                    <tr>
                        <th class="w-2/6 py-1 border dark:border-gray-100/10 font-medium">School</th>
                        <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Address</th>
                        <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Email</th>
                        <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Sports director</th>
                        <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Action</th>
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
                        <td class="p-2 border dark:border-gray-100/10 text-center">Address</td>
                        <td class="p-2 border dark:border-gray-100/10 text-center">chmsu@chmsu.edu.ph</td>
                        <td class="p-2 border dark:border-gray-100/10 text-center">Wency Baterna</td>
                        <td class="p-2 border dark:border-gray-100/10">
                        <div class="flex justify-center gap-x-3">
                            <button class="bg-custom-primary w-fit text-green-500 text-xl hover:shadow">
                                <Icon icon="mdi:file-pdf-box" class="text-2xl" />
                            </button>
                            <button class="bg-custom-secondary text-red-500 w-fit text-xl hover:shadow" @click="removeSchool(school.id)">
                                <Icon icon="mdi:trash" class="text-2xl" />
                            </button>
                        </div>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import doughnutChart from '../../components/charts/doughnutChart.vue'
import barChart from '../../components/charts/barChart.vue'
import { ref } from 'vue'

const doughNutLabel = ref('Total # of athletes by gender')
const doughNutLabels = ref([ 'Male', 'Female' ])
const doughNutDatasets = ref([ 20, 50 ])



const chartLabel = ref('Events participants every year')
const chartLabels = ref([ '2023', '2024', '2025', '2026', '2027' ])
const chartDatasets = ref([ 20, 50, 30, 20, 25 ])
</script>

<style scoped>

</style>
