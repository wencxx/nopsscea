<template>
    <div class="space-y-10">
        <div class="border dark:border-gray-100/10 h-[35dvh] rounded-md p-5 flex gap-x-5">
            <div class="flex flex-col w-1/5 items-center justify-center h-full gap-y-5 border-r dark:border-gray-100/10">
                <img v-if="coachData.photoUrl" :src="coachData.photoUrl" alt="profile picture" class="w-32 aspect-square rounded-full border">
                <div v-else class="w-32 aspect-square rounded-full bg-gray-300 animate-pulse border"></div>
                <div v-if="Object.keys(coachData)?.length" class="flex flex-col items-center">
                    <h1 class="font-bold text-lg text-center">{{ coachData.firstName }} {{ coachData.middleName }} {{ coachData.lastName }}</h1>
                    <p class="uppercase text-sm">{{ coachData.sport }}</p>
                </div>
                <div v-else class="flex w-4/5 gap-y-1 flex-col items-center">
                    <div class="w-full h-6 bg-gray-300 animate-pulse rounded"></div>
                    <div class="w-1/2 h-4 bg-gray-300 animate-pulse rounded"></div>
                    <div class="w-1/2 h-5 bg-gray-300 animate-pulse rounded"></div>
                </div>
            </div>
            <div class="w-4/5 h-full grid grid-cols-2 items-center">
                <h1 class="text-lg"><span class="font-bold">School:</span> {{ school.schoolName }}</h1>
                <h1 class="text-lg"><span class="font-bold">School Abbreviation:</span> {{ school.schoolAbbreviation }}</h1>
                <h1 class="text-lg"><span class="font-bold">Email:</span> {{ coachData.email }}</h1>
                <h1 class="text-lg"><span class="font-bold">Address:</span> {{ coachData.address }}</h1>
                <h1 class="text-lg"><span class="font-bold">Gender:</span> {{ coachData.gender }}</h1>
                <h1 class="text-lg"><span class="font-bold">Birthdate:</span> {{ formatData(coachData.birthday) }}</h1>
                <h1 class="text-lg"><span class="font-bold">Age:</span> {{ dobToAge(coachData.birthday)?.count }}</h1>
            </div>  
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { db, storage } from '@config/firebaseConfig.js'
import { deleteObject } from 'firebase/storage'
import { doc, getDoc, collection, getDocs, query, where, limit, updateDoc, deleteDoc } from 'firebase/firestore'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { onMounted, ref, watch, watchEffect } from 'vue'
import moment from 'moment'
import axios from 'axios'
import dobToAge from 'dob-to-age'


const role = localStorage.getItem('role')

const route = useRoute()
const router = useRouter()
const $toast = useToast()

const coachData = ref({})

// get athlete data
const getData = async () => {
    const athleteRef = doc(db, 'coaches', route.params.id)
    try {
        const snapshot = await getDoc(athleteRef)

        coachData.value = {
            id: snapshot.id,
            ...snapshot.data()
        }

        getSchool(snapshot.data().school)
    } catch (error) {
        $toast.error(error.message)
    }
}

const school = ref({})

const getSchool = async (schoolId) => {
    const schoolRef = collection(db, 'schools')
    try {
        const q = query(
            schoolRef,
            where('schoolId', '==', schoolId),
            limit(1)
        )
        const snapshot = await getDocs(q)

        school.value = {
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data()
        }
        
    } catch (error) {
        $toast.error(error.message)
    }
}

const formatData = (bday) => {
    return moment(bday).format('LL')
}

onMounted(() => {
    getData()
})
</script>