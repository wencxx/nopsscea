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
            <tbody v-if="schools.length > 0">
                <tr class="text-md" v-for="(school, index) in schools" :key="index">
                    <td class="p-2 border dark:border-gray-100/10">
                        <div class="flex gap-x-3">
                            <img :src="school?.schoolLogo" alt="school logo" class="w-14 bg-gray-200 dark:bg-gray-100/10 p-2 rounded">
                            <div class="flex flex-col justify-center">
                                <h1 class="text-md capitalize">{{ school.schoolName  }}</h1>
                                <p class="text-xs text-gray-500 font-semibold uppercase">{{ school.schoolAbbreviation }}</p>
                            </div>
                        </div>
                    </td>
                    <td class="p-2 border dark:border-gray-100/10 text-center">{{ school.schoolAddress }}</td>
                    <td class="p-2 border dark:border-gray-100/10 text-center">{{ school.schoolEmail }}</td>
                    <td class="p-2 border dark:border-gray-100/10 text-center">Wency Baterna</td>
                    <td class="p-2 border dark:border-gray-100/10">
                        <div class="flex justify-center gap-x-3">
                            <button class="bg-custom-primary w-fit text-orange-500 text-xl hover:shadow">
                                <Icon icon="mdi:file-pdf-box" class="text-2xl" />
                            </button>
                            <button class="bg-custom-primary w-fit text-green-500 text-xl hover:shadow" @click="acceptSchool(school.schoolId, index)">
                                <Icon icon="mdi:check" class="text-2xl" />
                            </button>
                            <button class="bg-custom-secondary text-red-500 w-fit text-xl hover:shadow">
                                <Icon icon="mdi:trash" class="text-2xl" />
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tbody v-if="!loading && schools.length === 0">
                <tr class="text-md">
                    <td class="p-2 border dark:border-gray-100/10 text-center font-medium" colspan="5">No applications</td>
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
</template>

<script setup>
import { db } from '@config/firebaseConfig'
import { collection, getDocs, query, where, updateDoc, doc, addDoc, Timestamp } from 'firebase/firestore'
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@store'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css';

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
            return console.log('no applications')
        }

        const promises = snapshots.docs.map(doc => {
            const { userId } = doc.data()
            getSchoolApplications(userId)
            return
        })

        await Promise.all(promises)
        loading.value = false
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

onMounted(() => {
    getIsAccepted()
})
</script>