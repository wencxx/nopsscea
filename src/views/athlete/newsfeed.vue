<template>
    <div>
        <div class="flex flex-col items-center gap-y-5">
            <div v-for="(announcement, index) in announcements" :key="index" class="bg-white dark:bg-neutral-700 rounded-lg border dark:border-gray-100/10 w-2/3 p-5">
                <!-- header -->
                 <div class="flex items-center gap-x-3 border-b dark:border-gray-100/10 pb-4">
                    <div class="w-12 border rounded-full bg-gray-100 aspect-square p-2">
                        <img src="../../assets/images/logo.png" alt="logo" class="w-full aspect-square">
                    </div>
                    <div>
                        <h1 class="uppercase text-black dark:text-white">Nopsscea</h1>
                        <p class="text-xs -mt-1 text-gray-500 dark:text-white/75">{{ formatDate(announcement.dateAdded) }}</p>
                    </div>
                 </div>
                 <!-- body -->
                <div class="pt-3 space-y-3">
                    <h1 class="text-lg uppercase text-black dark:text-white">{{ announcement.heading }}</h1>
                    <p class="text-gray-500 dark:text-white/65">{{ announcement.details }}</p>
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

    return moment(date).format('lll')
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