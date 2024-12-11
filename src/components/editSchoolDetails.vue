<template>
    <div class="w-screen h-screen fixed top-0 left-0 bg-black/10 !mt-0 flex items-center justify-center">
        <form @submit.prevent="updateSchoolDetails" class="bg-white w-full max-w-lg h-fit rounded-md flex flex-col items-center gap-y-5 p-5">
            <h1 class="text-lg">Update Details</h1>
            <div class="w-full grid grid-cols-2 gap-3">
                <div class="flex flex-col">
                    <label>School Name</label>
                    <input type="text" class="border h-8 pl-2 rounded" v-model="schoolData.schoolName">
                </div>
                <div class="flex flex-col">
                    <label>School Abbreviation</label>
                    <input type="text" class="border h-8 pl-2 rounded" v-model="schoolData.schoolAbbreviation">
                </div>
                <div class="flex flex-col">
                    <label>School Head</label>
                    <input type="text" class="border h-8 pl-2 rounded" v-model="schoolData.schoolHead">
                </div>
                <div class="flex flex-col">
                    <label>Head Title</label>
                    <input type="text" class="border h-8 pl-2 rounded" v-model="schoolData.headTitle">
                </div>
                <div class="flex flex-col">
                    <label>School ID</label>
                    <input type="text" class="border h-8 pl-2 rounded" v-model="schoolData.schoolCode">
                </div>
                <div class="flex flex-col">
                    <label>School Classification</label>
                    <select class="border h-8 pl-2 rounded" v-model="schoolData.schoolClassification">
                        <option>Non-Sectarian</option>
                        <option>Sectarian</option>
                    </select>
                </div>
                <div class="flex flex-col">
                    <label>School Address</label>
                    <input type="text" class="border h-8 pl-2 rounded" v-model="schoolData.schoolAddress">
                </div>
                <div class="flex flex-col">
                    <label>School Email</label>
                    <input type="email" class="border h-8 pl-2 rounded" v-model="schoolData.schoolEmail">
                </div>
                <div class="flex flex-col">
                    <label>Secondary Students</label>
                    <input type="number" class="border h-8 pl-2 rounded" v-model="schoolData.noSecondary">
                </div>
                <div class="flex flex-col">
                    <label>Tertiary Students</label>
                    <input type="number" class="border h-8 pl-2 rounded" v-model="schoolData.noTertiary">
                </div>
            </div>
            <div class="flex justify-end gap-x-2 w-full">
                <button class="bg-red-500 w-1/5 rounded text-white" type="button" @click="emit('closeModal')">Close</button>
                <button v-if="!updating" class="bg-green-500 w-1/5 rounded text-white">Update</button>
                <button v-else class="bg-green-500 w-1/5 rounded text-white animate-pulse" disabled>Updating</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@config/firebaseConfig.js'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()

const emit = defineEmits(['closeModal', 'updated'])

const { schoolDetails } = defineProps({
    schoolDetails: Object
})

const schoolData = ref({
    id: schoolDetails.id,
    schoolLogo: schoolDetails.schoolLogo,
    schoolName: schoolDetails.schoolName || '',
    schoolAbbreviation: schoolDetails.schoolAbbreviation || '',
    schoolHead: schoolDetails.schoolHead || '',
    headTitle: schoolDetails.headTitle || '',
    schoolCode: schoolDetails.schoolCode || '',
    schoolClassification: schoolDetails.schoolClassification || '',
    schoolAddress: schoolDetails.schoolAddress || '',
    schoolEmail: schoolDetails.schoolEmail || '',
    noSecondary: schoolDetails.noSecondary || '',
    noTertiary: schoolDetails.noTertiary || '',
})

const updating = ref(false)
const updateSchoolDetails = async () => {
    try {
        updating.value = true
        const docRef = doc(db, 'schools', schoolDetails.id)

        await updateDoc(docRef, schoolData.value)

        emit('updated', schoolData.value)
    } catch (error) {
        emit('closeModal')
        $toast.error('Failed updating details')
        console.log(error)
    } finally {
        updating.value = false
    }
}
</script>