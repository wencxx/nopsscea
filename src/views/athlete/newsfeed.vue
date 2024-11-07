<template>
    <div>
        <div class="flex flex-col items-center gap-y-5">
            <div v-for="(announcement, index) in announcements" :key="index" class="bg-white rounded-lg border w-2/3 p-3">
                <!-- header -->
                 <div class="flex items-center gap-x-3 border-b pb-4">
                    <div class="w-12 border rounded-full bg-gray-100 aspect-square p-2">
                        <img src="../../assets/images/logo.png" alt="logo" class="w-full aspect-square">
                    </div>
                    <div>
                        <h1 class="uppercase text-black">Nopsscea</h1>
                        <p class="text-sm -mt-1 text-gray-500">{{ formatDate(announcement.dateAdded) }}</p>
                    </div>
                 </div>
                 <!-- body -->
                <div class="pt-3 space-y-3">
                    <h1 class="text-lg uppercase text-black">{{ announcement.heading }}</h1>
                    <p class="text-gray-500">{{ announcement.details }}</p>
                    <img :src="announcement.coverPhoto" alt="cover photot" class="w-full aspect-video rounded object-cover">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { db } from '@config/firebaseConfig'
import { collection, onSnapshot } from 'firebase/firestore'
import { onMounted, ref } from 'vue'
import moment from 'moment'

const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000)

    return moment(date).calendar()
}


const announcements = ref([])
const loading = ref(false)

const getAnnouncements = () => {
    try {
        onSnapshot(
            collection(db, 'announcements'),
            (snapshot) => {
                announcements.value = []
                snapshot.docs.forEach(doc => {
                    announcements.value.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
            }
        )
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    getAnnouncements()
})
</script>