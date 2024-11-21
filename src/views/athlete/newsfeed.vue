<template>
    <div>
        <div class="flex flex-col items-center gap-y-5" v-if="!loading">
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
        <div class="flex flex-col items-center gap-y-5" v-else>
            <div v-for="i in 5" :key="i" class="bg-white dark:bg-neutral-700 rounded-lg border dark:border-gray-100/10 w-2/3 p-5">
                <!-- header -->
                 <div class="flex items-center gap-x-3 border-b dark:border-gray-100/10 pb-4">
                    <div class="w-12 rounded-full bg-gray-200 aspect-square p-2 animate-pulse"></div>
                    <div class="space-y-1">
                        <div class="h-5 w-24 bg-gray-200 animate-pulse rounded"></div>
                        <div class="h-3 w-32 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                 </div>
                 <!-- body -->
                <div class="pt-3 space-y-3">
                    <div class="h-7 w-72 rounded bg-gray-200 animate-pulse mb-5"></div>
                    <div v-for="(i, index) in 5" :key="index" class="h-5 bg-gray-200 animate-pulse rounded" :class="{ 'w-1/2': index === 4 }"></div>                  
                    <div class="w-full aspect-video rounded object-cover bg-gray-200 animate-pulse"></div>
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
const firstMounted = ref(true)
const loading = ref(false)

const getAnnouncements = () => {
    if(firstMounted.value) {
        loading.value = true
        firstMounted.value = false
    }
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
                loading.value = false
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