<template>
    <div class="fixed !mt-0 top-0 left-0 bg-black/25 w-screen h-screen flex items-center justify-center">
        <form @submit.prevent="addSession" class="bg-white rounded shadow border w-fit h-fit p-5 space-y-2 dark:text-black">
            <h1 class="text-center text-lg">Add Training Session</h1>
            <p v-if="invalidDate" class="bg-red-500 text-white pl-2 rounded py-[1px]">Invalid Date</p>
            <div class="flex flex-col !mt-5">
                <label>Location</label>
                <input type="text" class="border w-60 h-8 rounded pl-2" v-model="sessionData.location">
            </div>
            <div class="flex flex-col">
                <label>Date</label>
                <input type="datetime-local" class="border w-60 h-8 rounded pl-2" v-model="sessionData.date">
            </div>
            <div>
                <button class="bg-green-500 hover:bg-green-600 float-end mt-5 rounded w-1/4 text-white">Add</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, computed } from 'vue'
import { useDataStore } from '@store'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { db } from '@config/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

const $toast = useToast() 

const dataStore = useDataStore()
const coachDetails = computed(() => dataStore.coachData)

const sessionData = ref({
    location: '',
    date: ''
})

const emit = defineEmits(['addedData'])

const invalidDate = ref(false)

// training reference
const trainingRef = collection(db, 'trainings')

// add training
const addSession = async () => {
    const today = new Date()
    const sessionDate = new Date(sessionData.value.date)

    try {
        if(sessionDate < today) return invalidDate.value = true

        const snapshot = await addDoc(trainingRef,{
            ...sessionData.value,
            school: coachDetails.value.school,
            sport: coachDetails.value.sport
        }) 

        emit('addedData', {
            id: snapshot.id,
            ...sessionData.value,
            school: coachDetails.value.school,
            sport: coachDetails.value.sport
        })
        $toast.success('Added session')
        invalidDate.value = false
    } catch (error) {
        $toast.error('Failed to add session')
    }

}
</script>