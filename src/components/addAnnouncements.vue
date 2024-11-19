<template>
    <div class="fixed top-0 left-0 h-screen w-screen bg-black/10 flex items-center justify-center">
        <form @submit.prevent="addEvent" class="min-w-96 w-1/4 h-fit bg-white rounded-md flex flex-col items-center p-8 gap-y-5 relative">
            <Icon icon="mdi:close" class="absolute top-3 right-3 text-lg" @click="closeModal" />
            <h1 class="text-xl uppercase">Add announcement</h1>
            <div v-if="errorAddingAnnouncement" class="bg-red-500 pl-3 py-1 rounded w-full flex items-center gap-x-2 text-white">
                <Icon icon="bxs:error" class="inline text-xl" />
                <p class="inline">Error adding announcement</p>
            </div>
            <div class="w-full space-y-3">
                <div class="flex flex-col gap-y-2">
                    <label class="text-lg capitalize">Heading</label>
                    <input type="text" class="border h-9 rounded pl-2" v-model="announcementDetails.heading">
                </div>
                <div class="flex flex-col gap-y-2">
                    <label class="text-lg capitalize">Details</label>
                    <textarea class="border h-9 rounded p-2 min-h-32" v-model="announcementDetails.details"></textarea>
                </div>  
                <div class="flex flex-col gap-y-2">
                    <label class="text-lg capitalize">Event Description</label>
                    <div class="h-9 border rounded flex items-center justify-center gap-x-2 cursor-pointer" @click="toggleFileInput">
                        <Icon icon="mage:image-upload" class="text-xl"/>
                        <p>{{ imageName }}</p>
                    </div>
                    <input type="file" accept=".jpg, .png, .jpeg" class="hidden" ref="fileInputRef" @change="handleImageUpload">
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

const closeModal = () => {
    emits('closeModal', 'addedAnnouncementDetails')
}

const announcementDetails = ref({
    heading: '',
    details: '',
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
const errorAddingAnnouncement = ref(false)
const loading = ref(false)

const announcementRef = collection(db, 'announcements')

const addEvent = async () => {
    const imageref = storageRef(storage, `announcementCover/${coverImage.value.name}`)
    try {
        loading.value = true
        await uploadBytes(imageref, coverImage.value)

        const coverPhotoUrl = await getDownloadURL(imageref)

        const snapshot = await addDoc(announcementRef, { 
            heading: announcementDetails.value.heading,
            details: announcementDetails.value.details,
            coverPhoto: coverPhotoUrl,
            dateAdded: new Date()
        })

        const eventData = {
            id: snapshot.id,
            ...announcementDetails.value,
            coverPhoto: coverPhotoUrl
        }


        closeModal()
        loading.value = false

        emits('addedAnnouncementDetails', eventData)

        Object.keys(announcementDetails.value).forEach(key => {
            announcementDetails.value[key] = ''
        })
    } catch (error) {
        console.log(error)
        errorAddingAnnouncement.value = true
    }
}


</script>

<style scoped>

</style>