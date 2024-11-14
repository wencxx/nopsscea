<template>
    <div class="space-y-10">
        <div class="border dark:border-gray-100/10 h-fit rounded-md p-5 flex gap-x-5">
            <div class="flex flex-col w-1/5 items-center justify-center h-full gap-y-5 border-r dark:border-gray-100/10">
                <img v-if="schoolData.schoolLogo" :src="schoolData.schoolLogo" alt="profile picture" class="w-32 aspect-square rounded-full">
                <div v-else class="w-32 aspect-square rounded-full bg-gray-300 animate-pulse"></div>
                <div class="flex flex-col items-center">
                    <h1 class="font-bold text-center">{{ schoolData.schoolName }}</h1>
                    <p class="uppercase text-sm text-gray-500 dark:text-gray-100">{{ schoolData.schoolAbbreviation }}</p>
                </div>
            </div>
            <div class="w-4/5 h-full grid grid-cols-2 gap-y-3">
                <h1 class="text-lg"><span class="font-bold">School Head:</span> {{ schoolData.schoolHead }}</h1>
                <h1 class="text-lg"><span class="font-bold">School Classification:</span> {{ schoolData.schoolClassification }}</h1>
                <h1 class="text-lg"><span class="font-bold">School Address:</span> {{ schoolData.schoolAddress }}</h1>
                <h1 class="text-lg"><span class="font-bold">School Email:</span> {{ schoolData.schoolEmail }}</h1>
                <h1 class="text-lg"><span class="font-bold">No of Secondary Students:</span> {{ schoolData.noSecondary }}</h1>
                <h1 class="text-lg"><span class="font-bold">No of Tertiary Students:</span> {{ schoolData.noTertiary }}</h1>
             </div>
        </div>
        <!-- athletes list -->
        <div>

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

onMounted(() => {
    getData()
})
</script>