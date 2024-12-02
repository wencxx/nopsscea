<template>
    <div class="fixed top-0 left-0 h-screen w-screen bg-black/10 flex items-center justify-center">
        <form @submit.prevent="addEvent" class="min-w-96 w-1/4 h-fit bg-white rounded-md flex flex-col items-center p-8 gap-y-5 relative">
            <Icon icon="mdi:close" class="absolute top-3 right-3 text-lg" @click="closeModal" />
            <h1 class="text-xl uppercase">Add event</h1>
            <div v-if="errorAddingEvent" class="bg-red-500 pl-3 py-1 rounded w-full flex items-center gap-x-2 text-white">
                <Icon icon="bxs:error" class="inline text-xl" />
                <p class="inline">Error adding event</p>
            </div>
            <div class="w-full space-y-3">
                <div class="flex flex-col gap-y-2">
                    <label class="text-lg capitalize">Event title</label>
                    <input type="text" class="border h-9 rounded pl-2" v-model="eventDetails.title">
                </div>
                <div class="flex flex-col gap-y-2">
                    <label class="text-lg capitalize">Event Description</label>
                    <input type="text" class="border h-9 rounded pl-2" v-model="eventDetails.description">
                </div>  
                <div class="flex gap-x-2">
                    <div class="flex flex-col gap-y-2 w-1/2">
                        <label class="text-lg capitalize">Start date</label>
                        <input type="date" class="border h-9 rounded pl-2" :min="today()" v-model="eventDetails.startDate">
                    </div>
                    <div class="flex flex-col gap-y-2 w-1/2">
                        <label class="text-lg capitalize">End Date</label>
                        <input type="date" class="border h-9 rounded pl-2" :min="today()" v-model="eventDetails.endDate">
                    </div>
                </div>
                <div class="flex flex-col gap-y-2">
                    <label class="text-lg capitalize">Event Description</label>
                    <div class="h-9 border rounded flex items-center justify-center gap-x-2 cursor-pointer" @click="toggleFileInput">
                        <Icon icon="mage:image-upload" class="text-xl"/>
                        <p>{{ imageName }}</p>
                    </div>
                    <input type="file" accepts=".jpg, .png, .jpeg" class="hidden" ref="fileInputRef" @change="handleImageUpload">
                </div>
                <button v-if="!loading" class="bg-blue-900 text-white rounded px-3 py-1 float-right !mt-5">Add event</button>
                <button v-else class="bg-blue-900 text-white rounded px-3 py-1 float-right !mt-5 animate-pulse" type="button" disabled>Adding event</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue'
import { db, storage } from '@config/firebaseConfig'
import { collection, addDoc }  from 'firebase/firestore'
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'

const emits = defineEmits(['closeModal'])

const today = () => {
    return new Date().toISOString().split('T')[0];
}

const closeModal = () => {
    emits('closeModal', 'addedEventDetails')
}

const eventDetails = ref({
    title: '',
    description: '',
    startDate: '',
    endDate: ''
})

// add image
const fileInputRef = ref(null)

const imageName = ref('Choose event cover photo')
const coverImage = ref(null)

const toggleFileInput = () => {
    fileInputRef.value.click()
}

const handleImageUpload = () => {
    const image = event.target.files[0]

    coverImage.value = image
    imageName.value = image.name
}

// add event to database
const errorAddingEvent = ref(false)
const loading = ref(false)

const eventRef = collection(db, 'events')

const addEvent = async () => {
    const imageref = storageRef(storage, `eventCover/${coverImage.value.name}`)
    try {
        loading.value = true
        await uploadBytes(imageref, coverImage.value)

        const coverPhotoUrl = await getDownloadURL(imageref)

        const snapshot = await addDoc(eventRef, { 
            title: eventDetails.value.title,
            description: eventDetails.value.description,
            startDate: eventDetails.value.startDate,
            endDate: eventDetails.value.endDate,
            coverPhoto: coverPhotoUrl
        })

        const eventData = {
            id: snapshot.id,
            ...eventDetails.value,
            coverPhoto: coverPhotoUrl
        }


        closeModal()
        loading.value = false

        emits('addedEventDetails', eventData)
        Object.keys(eventDetails.value).forEach(key => {
            eventDetails.value[key] = ''
        })
    } catch (error) {
        console.log(error)
        errorAddingEvent.value = true
    }
}


</script>

<style scoped>

</style>