<template>
    <div class="space-y-10">
        <div class="flex items-center gap-x-2 text-xl">
            <Icon icon="material-symbols:sports-kabaddi-rounded" class="text-2xl" />
            <h1>Pending Coaches</h1>
        </div>
        <!-- table -->
        <div class="bg-gray-100 dark:bg-gray-100/10 p-5 rounded-md">
            <table class="min-w-[500px] md:w-full font-inter tracking-wide">
                <thead>
                    <tr>
                        <th class="w-2/6 py-1 border border-gray-300 dark:border-gray-100/10">Name</th>
                        <th class="w-1/6 py-1 border border-gray-300 dark:border-gray-100/10">Address</th>
                        <th class="w-1/6 py-1 border border-gray-300 dark:border-gray-100/10">Email</th>
                        <th class="w-1/6 py-1 border border-gray-300 dark:border-gray-100/10">Birthday</th>
                        <th class="w-1/6 py-1 border border-gray-300 dark:border-gray-100/10">Action</th>
                    </tr>
                </thead>
                <tbody v-if="coaches.length > 0">
                    <tr class="text-md" v-for="(coach, index) in coaches" :key="coach.id">
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10">
                            <div class="flex gap-x-3">
                                <img :src="coach?.photoUrl" alt="school logo" class="w-20 aspect-square object-cover bg-gray-200 dark:bg-gray-100/10 p-2 rounded">
                                <div class="flex flex-col justify-center">
                                    <h1 class="text-md capitalize">{{ coach.firstName  }} {{ coach.middleName  }} {{ coach.lastName }}</h1>
                                    <p class="text-xs text-gray-500 font-semibold uppercase">{{ coach.sport }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">{{ coach.address }}</td>
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">{{ coach.email }}</td>
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">{{ convertBirthday(coach.birthday) }}</td>
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">
                            <div class="flex justify-center gap-x-3">
                                <button class="bg-custom-primary w-fit text-green-500 hover:scale-110" @click="acceptCoach(coach.coachId, index)">
                                    <Icon icon="iconamoon:check-fill" class="text-2xl" />
                                </button>
                                <button class="bg-custom-secondary text-red-500 w-fit hover:scale-110" :disabled="deleting && athleteIndexToDelete === index" @click="showDeleteModal(coach.coachId, index)">
                                    <Icon icon="mdi:trash" class="text-xl" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="!loading && coaches.length === 0">
                    <tr>
                        <td colspan="5" class="p-2 border dark:border-gray-100/10 text-center">No coaches to show</td>
                    </tr>
                </tbody>
                <tbody v-if="loading">
                    <tr>
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
                    <tr>
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
                    <tr>
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
        </div>

        <deleteModal v-if="showModalDelete" @closeModal="showModalDelete = false" @acceptDelete="deleteCoach()" :user="'athlete'" :type="'decline'" />
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '../../store'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { db } from '@config/firebaseConfig'
import { getDocs, collection, where, query, queryEqual, and, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import moment from 'moment'
import deleteModal from '@components/deleteModal.vue'
import axios from 'axios'

const convertBirthday = (bday) => {
    return moment(bday).format('ll')
}

const $toast = useToast()

const authStore = useAuthStore()

const currentUser = computed(() => authStore.user)

const coaches = ref([])

// users ref
const userRef = collection(db, 'userRole')
const userRoleDocId = ref([])

// get athlete
const loading = ref(false)

const getCoaches = async () => {
    try {
        loading.value = true
        const q = query(
            userRef,
            and(
                where('isAccepted', '==', false),
                where('role', '==', 'coach'),
            )
        )

        const snapshots = await getDocs(q)

        const promises = snapshots.docs.map(doc => {
            const userDetails = doc.data()
            userRoleDocId.value.push(doc.id)

            getCoachPersonalDetails(userDetails.userId)
        })

        await Promise.all(promises)
        loading.value = false
    } catch (error) {
        $toast.error(error.message)
    }
}

// atheletes details reference
const coachRef = collection(db, 'coaches')

// get coaches personal details
const getCoachPersonalDetails = async (coachId) => {
    try {
        const q = query(
            coachRef,
            and(
                where('coachId', '==', coachId),
                where('school', '==', currentUser.value?.uid),
            )
        )

        const snapshots = await getDocs(q)

        snapshots.docs.forEach(doc => {
            coaches.value.push({
                id: doc.id,
                ...doc.data()
            })
        })

    } catch (error) {
        $toast.error(error.message)
        console.log(error)
    }
}

const acceptCoach = async (userId, index) => {
    const docRef = collection(db, 'userRole')
    try {
        const q = query(
            docRef,
            where('userId', '==', userId)
        )

        const snapshots = await getDocs(q)


        for(const snapshot of snapshots.docs){
            const docRef = doc(db, 'userRole', snapshot.id)

            await updateDoc(docRef, {
                isAccepted: true
            })
        }

        coaches.value.splice(index, 1)
        $toast.success('Coach accepted successfully')
    } catch (error) {
        $toast.error('Failed to accept coach')
        console.log(error)
    }
}

// delete athlete
const deleting = ref(false)
const athleteIdToDelete = ref('')
const athleteIndexToDelete = ref('')
const showModalDelete = ref(false)

const showDeleteModal = (uid, index) => {
    showModalDelete.value = true
    athleteIdToDelete.value = uid
    athleteIndexToDelete.value = index
}

const deleteCoach = async () => {
    const userRoleRef = collection(db, 'userRole')
    const docRef = collection(db, 'coaches')
    try {
        showModalDelete.value = false
        deleting.value = true
        const res = await axios.delete(`https://nopsscea-server.vercel.app/delete-user/${athleteIdToDelete.value}`)
        console.log(res.data)

        if(res.data === 'successfully deleted'){
            const q = query(
                docRef,
                where('coachId', '==', athleteIdToDelete.value)
            )

            const q4 = query(
                userRoleRef,
                where('userId', '==', athleteIdToDelete.value)
            )

            const snapshots = await getDocs(q)
            const snapshots4 = await getDocs(q4)

            for(const snapshot of snapshots.docs){
                const docRef = doc(db, 'coaches', snapshot.id)
                await deleteDoc(docRef)
            }

            for(const snapshot of snapshots4.docs){
                const docRef = doc(db, 'userRole', snapshot.id)
                await deleteDoc(docRef)
            }

            coaches.value.splice(athleteIndexToDelete.value, 1)
            $toast.success('Coach successfully declined')
        }
    } catch (error) {
        console.log(error)
        $toast.error('Failed to delete athlete')
    } finally {
        deleting.value = false
    }
}

onMounted(() => {
    getCoaches()
})
</script>