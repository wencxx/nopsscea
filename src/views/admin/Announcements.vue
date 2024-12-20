<template>
    <div class="space-y-10">
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-x-2 text-2xl">
                <Icon icon="mdi:announcement-outline" class="text-3xl" />
                <h1>Announcements</h1>
            </div>
            <div class="flex justify-end">
                <button class="border border-blue-900 px-3 py-1 text-blue-900 rounded" @click="addAnnouncement = true">Add announcement</button>
            </div>
        </div>
        <!-- table -->
        <div class="rounded overflow-hidden">
            <table class="min-w-[500px] md:w-full tracking-wide">
                <thead>
                    <tr>
                        <th class="w-1/5 py-1 border dark:border-gray-100/10 font-medium">Heading</th>
                        <th class="w-2/5 py-1 border dark:border-gray-100/10 font-medium">Details</th>
                        <th class="w-1/5 py-1 border dark:border-gray-100/10 font-medium">Action</th>
                    </tr>
                </thead>
                <tbody v-if="!loading && announcements.length">
                    <tr v-for="(announcement, index) in announcements" :key="index">
                        <td class="p-2 border dark:border-gray-100/10 text-center">{{ announcement.heading }}</td>
                        <td class="p-2 border dark:border-gray-100/10 text-center">
                            <p class="line-clamp-3">{{ announcement.details }}</p>
                        </td>
                        <td class="p-2 border dark:border-gray-100/10 text-center">
                            <div class="flex items-center justify-center gap-x-2">
                                <Icon class="text-xl cursor-pointer text-blue-900" icon="mdi:pencil" /> 
                                <Icon class="text-xl cursor-pointer text-red-500  " icon="mdi:trash" @click="deleteAnnouncement(announcement.id, index)" /> 
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="!loading && !announcements.length">
                    <tr class="text-md">
                        <td class="p-2 border dark:border-gray-100/10 text-center font-medium" colspan="4">No announcements</td>
                    </tr>
                </tbody>
                <tbody v-if="loading">
                    <tr v-for="l in 5" :key="l">
                        <td class="p-2 border space-y-1 dark:border-gray-100/10">
                            <div class="h-6 w-50 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                        </td>
                        <td class="p-2 border dark:border-gray-100/10">
                            <div class="h-6 w-50 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                        </td>
                        <td class="p-2 border dark:border-gray-100/10">
                            <div class="h-6 w-14 mx-auto bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <addAnnouncements class="!my-0" v-if="addAnnouncement" @addedAnnouncementDetails="getAddedAnnouncement" @closeModal="addAnnouncement = false" />
        <deleteModal v-if="showDeleteModal" @closeModal="showDeleteModal = false" user="announcement" type="delete" @acceptDelete="proceedDelete" />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import addAnnouncements from '../../components/addAnnouncements.vue'
import deleteModal from '@components/deleteModal.vue'
import { db } from '@config/firebaseConfig'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()

const addAnnouncement = ref(false)

const announcements = ref([])
// get announcements
const loading = ref(false)

// announcements reference
const annRef = collection(db, 'announcements')
const getAnnouncements = async () => {
    try {
        loading.value = true
        const snapshots = await getDocs(annRef)

        snapshots.docs.forEach(doc => {
            announcements.value.push({
                id: doc.id,
                ...doc.data()
            })
        })
    } catch (error) {
        console.log(error)
    }finally{
        loading.value = false
    }
}

// get added announcement from child component
const getAddedAnnouncement = (data) => {
    announcements.value.unshift(data)
}

// delete announcement
const showDeleteModal = ref(false)
const annToDeleteId = ref('')
const annToDeleteIndex = ref('')

const deleteAnnouncement = (annId, index) => {
    annToDeleteId.value = annId
    annToDeleteIndex.value = index
    showDeleteModal.value = true
}

const proceedDelete = async () => {
    try {
        const docRef = doc(db, 'announcements', annToDeleteId.value)

        await deleteDoc(docRef)
        showDeleteModal.value = false
        announcements.value.splice(annToDeleteIndex.value, 1)
        $toast.success('Successfully deleted announcement')
    } catch (error) {
        $toast.error(error)
    }
}

onMounted(() => {
    getAnnouncements()
})
</script>
