<template>
    <div class="space-y-10">
        <div class="flex items-center gap-x-2 text-xl">
            <Icon icon="material-symbols:sports-martial-arts-rounded" class="text-2xl" />
            <h1>Pending Athletes</h1>
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
                <tbody v-if="athletes.length > 0">
                    <tr class="text-md" v-for="(athlete, index) in athletes" :class="{ 'bg-gray-100 animate-pulse': deleting && athleteIndexToDelete === index }" :key="athlete.id">
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10">
                            <div class="flex gap-x-3">
                                <img :src="athlete?.photoUrl" alt="school logo" class="w-20 aspect-square bg-gray-200 dark:bg-gray-100/10 p-2 rounded">
                                <div class="flex flex-col justify-center">
                                    <h1 class="text-md capitalize">{{ athlete.firstName  }} {{ athlete.middleName  }} {{ athlete.lastName }}</h1>
                                    <p class="text-xs text-gray-500 font-semibold uppercase">{{ athlete.sport }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">{{ athlete.address }}</td>
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">{{ athlete.email }}</td>
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">{{ convertBirthday(athlete.birthday) }}</td>
                        <td class="p-2 border border-gray-300 dark:border-gray-100/10 text-center">
                            <div class="flex justify-center gap-x-3">
                                <router-link :to="{ name: 'athleteDetails', params: { id: athlete.id }, query: { status: 'pending' } }" class="bg-custom-primary w-fit text-green-500 hover:scale-110">
                                    <Icon icon="mdi:eye" class="text-2xl" />
                                </router-link>
                                <button class="bg-custom-primary w-fit text-green-500 hover:scale-110" :disabled="deleting && athleteIndexToDelete === index" @click="acceptAthlete(athlete.athleteId, index)">
                                    <Icon icon="iconamoon:check-fill" class="text-2xl" />
                                </button>
                                <button class="bg-custom-secondary text-red-500 w-fit hover:scale-110" :disabled="deleting && athleteIndexToDelete === index" @click="showDeleteModal(athlete.athleteId, index)">
                                    <Icon icon="mdi:trash" class="text-xl" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="!loading && athletes.length === 0">
                    <tr>
                        <td colspan="5" class="p-2 border dark:border-gray-100/10 text-center">No athletes to show</td>
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

        <deleteModal v-if="showModalDelete" @closeModal="showModalDelete = false" @acceptDelete="deleteAthlete()" :user="'athlete'" :type="'decline'" />
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '../../store'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { db, storage } from '@config/firebaseConfig'
import { getDocs, collection, where, query, queryEqual, and, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { deleteObject, ref as storageRef } from 'firebase/storage'
import moment from 'moment'
import axios from 'axios'
import deleteModal from '@components/deleteModal.vue'

const convertBirthday = (bday) => {
    return moment(bday).format('ll')
}

const $toast = useToast()

const authStore = useAuthStore()

const currentUser = computed(() => authStore.user)

const athletes = ref([])

// users ref
const userRef = collection(db, 'userRole')
const userRoleDocId = ref([])

// get athlete
const loading = ref(false)

const getAthlete = async () => {
    try {
        loading.value = true
        const q = query(
            userRef,
            and(
                where('isAccepted', '==', false),
                where('role', '==', 'athlete'),
            )
        )

        const snapshots = await getDocs(q)

        const promises = snapshots.docs.map(doc => {
            const userDetails = doc.data()
            userRoleDocId.value.push(doc.id)

            getAthletePersonalDetails(userDetails.userId)
        })

        await Promise.all(promises)
        loading.value = false
    } catch (error) {
        $toast.error(error.message)
    }
}

// atheletes details reference
const athleteRef = collection(db, 'athletes')

// get athletes personal details
const getAthletePersonalDetails = async (athleteId) => {
    try {
        const q = query(
            athleteRef,
            and(
                where('athleteId', '==', athleteId),
                where('school', '==', currentUser.value?.uid),
            )
        )

        const snapshots = await getDocs(q)

        snapshots.docs.forEach(doc => {
            athletes.value.push({
                id: doc.id,
                ...doc.data()
            })
        })

    } catch (error) {
        $toast.error(error.message)
        console.log(error)
    }
}

// accept athlete
const acceptAthlete = async (athleteId, index) => {
    const userRoleRef = collection(db, 'userRole')
    const today = moment(new Date()).format('L')
    try {
        const q = query(
            userRoleRef,
            where('userId','==', athleteId)
        )
        const snapshots = await getDocs(q)

        for(const snapshot of snapshots.docs){
            const docRef = doc(db, 'userRole', snapshot.id)
             await updateDoc(docRef, {
                isAccepted: true,
                dateAccepted: today
            })
        }
        athletes.value.splice(index, 1)

        $toast.success('Athlete accepted successfully')
    } catch (error) {
        $toast.error(error.message)
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

const deleteAthlete = async () => {
    const userRoleRef = collection(db, 'userRole')
    const docRef = collection(db, 'athletes')
    const docsRef = collection(db, 'documents')
    const certsRef = collection(db, 'certificates')
    try {
        showModalDelete.value = false
        deleting.value = true
        const res = await axios.delete(`https://nopsscea-server.vercel.app/delete-user/${athleteIdToDelete.value}`)
        console.log(res.data)

        if(res.data === 'successfully deleted'){
            const q = query(
                docRef,
                where('athleteId', '==', athleteIdToDelete.value)
            )
            const q2 = query(
                docsRef,
                where('userId', '==', athleteIdToDelete.value)
            )
            const q3 = query(
                certsRef,
                where('userId', '==', athleteIdToDelete.value)
            )

            const q4 = query(
                userRoleRef,
                where('userId', '==', athleteIdToDelete.value)
            )

            const snapshots = await getDocs(q)
            const snapshots2 = await getDocs(q2)
            const snapshots3 = await getDocs(q3)
            const snapshots4 = await getDocs(q4)

            for(const snapshot of snapshots.docs){
                const docRef = doc(db, 'athletes', snapshot.id)
                await deleteDoc(docRef)
            }

            for(const snapshot of snapshots2.docs){
                const docRef = doc(db, 'documents', snapshot.id)
                const fileRef = storageRef(storage, `documents/${snapshot.docs().file}`)

                await Promise.all([deleteObject(fileRef), deleteDoc(docRef)])
            }

            for(const snapshot of snapshots3.docs){
                const docRef = doc(db, 'certificates', snapshot.id)
                const fileRef = storageRef(storage, `certs/${snapshot.docs().file}`)

                await Promise.all([deleteObject(fileRef), deleteDoc(docRef)])
            }

            for(const snapshot of snapshots4.docs){
                const docRef = doc(db, 'userRole', snapshot.id)
                await deleteDoc(docRef)
            }

            athletes.value.splice(athleteIndexToDelete.value, 1)
            $toast.success('Athlete successfully declined')
        }
    } catch (error) {
        console.log(error)
        $toast.error('Failed to delete athlete')
    } finally {
        deleting.value = false
    }
}

onMounted(() => {
    getAthlete()
})
</script>