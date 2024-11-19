<template>
    <div class="space-y-10">
        <div class="flex items-center gap-x-2 text-xl">
            <Icon icon="lucide:school-2" class="text-2xl" />
            <h1>School Application</h1>
        </div>
        <div class="flex">
            <button class="ml-auto border px-3 py-1 rounded bg-blue-900 text-white hover:shadow" @click="getIsAccepted">Refresh</button>
        </div>
        <!-- table -->
        <table class="min-w-[500px] md:w-full tracking-wide rounded overflow-hidden">
            <thead>
                <tr>
                    <th class="w-2/6 py-1 border dark:border-gray-100/10 font-medium">School</th>
                    <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Address</th>
                    <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Email</th>
                    <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Sports Director</th>
                    <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Action</th>
                </tr>
            </thead>
            <tbody v-if="!loading && schools.length">
                <tr class="text-md" v-for="(school, index) in schools" :key="index">
                    <td class="p-2 border dark:border-gray-100/10">
                        <div class="flex gap-x-3">
                            <img :src="school?.schoolLogo" alt="school logo" class="w-14 bg-gray-200 dark:bg-gray-100/10 p-2 rounded">
                            <div class="flex flex-col justify-center">
                                <router-link :to="{ name: 'schoolDetails', params: { id: school.schoolId} }" class="text-md capitalize">{{ school.schoolName  }}</router-link>
                                <p class="text-xs text-gray-500 font-semibold uppercase">{{ school.schoolAbbreviation }}</p>
                            </div>
                        </div>
                    </td>
                    <td class="p-2 border dark:border-gray-100/10 text-center">{{ school.schoolAddress }}</td>
                    <td class="p-2 border dark:border-gray-100/10 text-center">{{ school.schoolEmail }}</td>
                    <td class="p-2 border dark:border-gray-100/10 text-center">Wency Baterna</td>
                    <td class="p-2 border dark:border-gray-100/10">
                        <div class="flex justify-center gap-x-3">
                            <a
                                :href="`https://docs.google.com/viewer?url=${encodeURIComponent(school.applicationForm)}&embedded=true`"
                                target="_blank"
                            >
                                <Icon icon="bxs:file-doc" class="text-2xl text-green-500 hover:scale-110" />
                            </a>
                            <a
                                :href="school.applicationForm"
                                download
                            >
                                <Icon icon="mdi:download" class="text-2xl text-blue-900 hover:scale-110" />
                            </a>
                            <button class="bg-custom-primary w-fit text-green-500 text-xl" @click="acceptSchool(school.schoolId, index)">
                                <Icon icon="mdi:check" class="text-2xl" />
                            </button>
                            <button class="bg-custom-secondary text-red-500 w-fit text-xl">
                                <Icon icon="mdi:trash" class="text-2xl" @click="showDeleteModal(school.schoolId, index)" />
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tbody v-if="!loading && !schools.length">
                <tr class="text-md">
                    <td class="p-2 border dark:border-gray-100/10 text-center font-medium" colspan="5">No applications</td>
                </tr>
            </tbody>
            <tbody v-if="loading">
                <tr v-for="i in 5" :key="i">
                    <td class="p-2 border dark:border-gray-100/10">
                        <div class="flex gap-x-3">
                            <div class="w-14 aspect-square animate-pulse bg-gray-200 dark:bg-gray-100/10 p-2 rounded"></div>
                            <div class="flex flex-col gap-y-1 justify-center">
                                <div class="h-6 w-56 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                                <div class="h-4 w-16 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </td>
                    <td class="p-2 border space-y-1 dark:border-gray-100/10">
                        <div class="h-6 w-50 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                        <div class="h-6 w-32 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                    </td>
                    <td class="p-2 border dark:border-gray-100/10">
                        <div class="h-6 w-50 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                    </td>
                    <td class="p-2 border dark:border-gray-100/10">
                        <div class="h-6 w-50 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                    </td>
                    <td class="p-2 border dark:border-gray-100/10">
                        <div class="flex justify-center gap-x-3">
                            <div class="h-6 w-6 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                            <div class="h-6 w-6 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <deleteModal v-if="showModalDelete" @closeModal="showModalDelete = false" @acceptDelete="deleteSchool()" :user="'school'" :type="'delete'" />
    </div>
</template>

<script setup>
import { db } from '@config/firebaseConfig'
import { collection, getDocs, query, where, updateDoc, doc, addDoc, Timestamp, deleteDoc } from 'firebase/firestore'
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@store'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import ImageModule from 'docxtemplater-image-module-free';
import deleteModal from '@components/deleteModal.vue'
import axios from 'axios'

const $toast = useToast();

const authStore = useAuthStore()
const currentUser = computed(() => authStore.user)

const loading = ref(false)

// roleRef reference
const roleRef = collection(db, 'userRole')

const getIsAccepted = async () => {
    schools.value = []
    const q = query(
        roleRef,
        where("isAccepted", "==", false),
    )

    try {
        loading.value = true
        const snapshots = await getDocs(q)

        if(snapshots.empty){
            loading.value = false
            return
        }

        const promises = snapshots.docs.map(doc => {
            const { userId } = doc.data()
            getSchoolApplications(userId)
            return
        })

        await Promise.all(promises)
    } catch (error) {
        console.log(error)
        errorFetching.value = true
    }
}

// // school collection
const schools = ref([])

// // school reference
const schoolRef = collection(db, 'schools')

const getSchoolApplications = async (schoolId) => {
    const q = query(
        schoolRef,
        where('schoolId', '==', schoolId)
    )

    try {
        const snapshot = await getDocs(q)

        snapshot.docs.forEach(doc => {
            schools.value.push({
                id: doc.id,
                ...doc.data()
            })
        })

        loading.value = false
    } catch (error) {
        $toast.error(error.message)
    }
}

// notificationsRef
const notificationRef = collection(db, 'notifications')

const acceptSchool = async (schoolId, index) => {
    try {
        const q = query(
            roleRef,
            where('userId', '==', schoolId)
        )

        const snapshots = await getDocs(q)

        const promises = snapshots.docs.map(async (docs) => {
            const docRef = doc(roleRef, docs.id)

            await updateDoc(docRef, {
                isAccepted: true,
                acceptedAt: Timestamp.now()
            })

            await addDoc(notificationRef, {
                from: 'admin',
                to: schoolId,
                message: 'Membership Application Accepted!',
                content: 'Congratulations! Your membership application to Nopsscea has been successfully accepted. We are thrilled to welcome you aboard!',
                isSeen: false,
                isRead: false,
                notifiedAt: Timestamp.now()
            })

            schools.value.splice(index, 1)
        })

        await Promise.all(promises)

        $toast.success('School accepted successfully')
    } catch (error) {
        $toast.error(error.message)
    }
}

// delete school
const deleting = ref(false)
const schoolIdToDelete = ref('')
const schoolIndexToDelete = ref('')
const showModalDelete = ref(false)

const showDeleteModal = (uid, index) => {
    showModalDelete.value = true
    schoolIdToDelete.value = uid
    schoolIndexToDelete.value = index
}

const deleteSchool = async () => {
    const userRoleRef = collection(db, 'userRole')
    const schoolRef = collection(db, 'schools')
    const athleteRef = collection(db, 'athletes')
    const coachRef = collection(db, 'coaches')
    try {
        deleting.value = true
        const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}delete-user/${schoolIdToDelete.value}`)
        console.log(res.data)

        if(res.data === 'successfully deleted'){
            const q = query(
                schoolRef,
                where('schoolId', '==', schoolIdToDelete.value)
            )

            const q2 = query(
                userRoleRef,
                where('userId', '==', schoolIdToDelete.value)
            )

            const q3 = query(
                athleteRef,
                where('school', '==', schoolIdToDelete.value)
            )

            const q4 = query(
                coachRef,
                where('school', '==', schoolIdToDelete.value)
            )

            const snapshots = await getDocs(q)
            const snapshots2 = await getDocs(q2)
            const snapshots3 = await getDocs(q3)
            const snapshots4 = await getDocs(q4)
         
            for(const snapshot of snapshots.docs){
                const docRef = doc(db, 'schools', snapshot.id)
                await deleteDoc(docRef)
            }

            for(const snapshot of snapshots2.docs){
                const docRef = doc(db, 'userRole', snapshot.id)
                await deleteDoc(docRef)
            }

            for(const snapshot of snapshots3.docs){
                const docRef = doc(db, 'athletes', snapshot.id)
                await deleteDoc(docRef)
            }

            for(const snapshot of snapshots4.docs){
                const docRef = doc(db, 'coaches', snapshot.id)
                await deleteDoc(docRef)
            }
            showModalDelete.value = false

            schools.value.splice(schoolIndexToDelete.value, 1)
            
            $toast.success('Deleted school successfully.')
        }
    } catch (error) {
        console.log(error)
        $toast.error('Failed to delete school')
    } finally {
        deleting.value = false
        showModalDelete.value = false
    }
}

onMounted(() => {
    getIsAccepted()
})
</script>