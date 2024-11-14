<template>
    <div class="space-y-10">
        <div class="border dark:border-gray-100/10 h-[30dvh] rounded-md p-5 flex gap-x-5">
            <div class="flex flex-col w-1/5 items-center justify-center h-full gap-y-5 border-r dark:border-gray-100/10">
                <img v-if="athleteData.photoUrl" :src="athleteData.photoUrl" alt="profile picture" class="w-32 aspect-square rounded-full">
                <div v-else class="w-32 aspect-square rounded-full bg-gray-300 animate-pulse"></div>
                <div class="flex flex-col items-center">
                    <h1 class="font-bold text-lg">{{ athleteData.firstName }} {{ athleteData.middleName }} {{ athleteData.lastName }}</h1>
                    <p class="uppercase text-sm">{{ athleteData.sport }}</p>
                </div>
            </div>
            <div class="w-4/5 h-full grid grid-cols-2">
                <h1 class="text-lg"><span class="font-bold">School:</span> {{ school.schoolName }}</h1>
                <h1 class="text-lg"><span class="font-bold">School Abbreviation:</span> {{ school.schoolAbbreviation }}</h1>
                <h1 class="text-lg capitalize"><span class="font-bold">Course:</span> {{ athleteData.course }}</h1>
                <h1 class="text-lg"><span class="font-bold">Year:</span> {{ athleteData.year }}</h1>
                <h1 class="text-lg"><span class="font-bold">Email:</span> {{ athleteData.email }}</h1>
                <h1 class="text-lg"><span class="font-bold">Address:</span> {{ athleteData.address }}</h1>
                <h1 class="text-lg"><span class="font-bold">Gender:</span> {{ athleteData.gender }}</h1>
                <h1 class="text-lg"><span class="font-bold">Birthdate:</span> {{ formatData(athleteData.birthday) }}</h1>
            </div>
        </div>
        <div>
            <lineChart :label="'Training Progress'" :data="trainingData" :labels="trainingLabels" class="!h-[40dvh] !w-full" />
        </div>
        <div class="border dark:border-gray-100/10 h-fit rounded-md p-5 flex flex-col gap-y-5">
            <div class="flex justify-between">
                <h1 class="text-lg font-bold">Documents</h1>
                <button class="border border-blue-900 rounded px-3 text-blue-900" @click="addDocumentModal = true">Add Document</button>
            </div>
            <div class="bg-gray-100 dark:bg-gray-100/10 p-5 rounded-md">
                <table class="w-full">
                    <thead>
                        <tr>
                            <th class="w-2/5 py-1 border border-gray-300 dark:border-gray-100/10">Document</th>
                            <th class="w-2/5 py-1 border border-gray-300 dark:border-gray-100/10">File</th>
                            <th class="w-1/5 py-1 border border-gray-300 dark:border-gray-100/10">Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="documents.length">
                        <tr v-for="(document, index) in documents" :key="index">
                            <td class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">{{ document.documentType }}</td>
                            <td class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">{{ document.file }}</td>
                            <td class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">
                                <div class="flex justify-center gap-x-2">
                                    <a v-if="document.downloadUrl.includes('docx')"
                                        :href="`https://docs.google.com/viewer?url=${encodeURIComponent(document.downloadUrl)}&embedded=true`"
                                        target="_blank"
                                        >
                                        <Icon icon="bxs:file-doc" class="text-2xl text-green-500 hover:scale-110" />
                                    </a>
                                    <a v-else-if="document.downloadUrl.includes('pdf')"
                                        :href="document.downloadUrl"
                                        target="_blank"
                                        >
                                        <Icon icon="bxs:file-pdf" class="text-2xl text-green-500 hover:scale-110" />
                                    </a>
                                    <a v-else 
                                        :href="document.downloadUrl"
                                        target="_blank"
                                        >
                                        <Icon icon="material-symbols:image-outline" class="text-2xl text-green-500 hover:scale-110" />
                                    </a>

                                    <button @click="deleteForm(form.id, index)">
                                        <Icon icon="mdi:trash" class="text-2xl text-red-500 hover:scale-110" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="3" class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">No documents available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- form table -->
        <div class="border dark:border-gray-100/10 h-fit rounded-md p-5 flex flex-col gap-y-5">
            <h1 class="text-lg font-bold">Forms</h1>
            <div class="bg-gray-100 dark:bg-gray-100/10 p-5 rounded-md">
                <table class="min-w-[500px] md:w-full font-inter tracking-wide">
                    <thead>
                        <tr>
                            <th class="w-1/4 py-1 border border-gray-300 dark:border-gray-100/10">Form</th>
                            <th class="w-1/4 py-1 border border-gray-300 dark:border-gray-100/10">Semester</th>
                            <th class="w-1/4 py-1 border border-gray-300 dark:border-gray-100/10">School Year</th>
                            <th class="w-1/4 py-1 border border-gray-300 dark:border-gray-100/10">Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="forms.length">
                        <tr v-for="(form, index) in forms" :key="index">
                            <td class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">{{ form.formName }}</td>
                            <td class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">{{ form.semester }}</td>
                            <td class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">{{ form.sy }}</td>
                            <td class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">
                                <div class="flex justify-center gap-x-2">
                                    <a :href="form.storagePath">
                                        <Icon icon="mdi:download" class="text-2xl text-green-500 hover:scale-110" />
                                    </a>
                                    <button @click="deleteForm(form.id, index)">
                                        <Icon icon="mdi:trash" class="text-2xl text-red-500 hover:scale-110" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="4" class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">No forms available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- certificates -->
        <div class="border dark:border-gray-100/10 h-fit rounded-md p-5 flex flex-col gap-y-5">
            <h1 class="text-lg font-bold">Certificates</h1>
            <div>
                <img :src="athleteData.certUrl" alt="certificate" class="w-1/4 aspect-square">
            </div>
        </div>

        <!-- add new document -->
         <addDocument v-if="addDocumentModal" @closeModal="closeModal" />
    </div>
</template>

<script setup>
import addDocument from '@components/addDocument.vue'
import { useRoute } from 'vue-router'
import { db } from '@config/firebaseConfig.js'
import { doc, getDoc, collection, getDocs, query, where, limit } from 'firebase/firestore'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { computed, onMounted, ref, watch } from 'vue'
import moment from 'moment'
import lineChart from '@components/charts/lineChart.vue'
import { useAuthStore } from '@store'

const authStore = useAuthStore()

const currentUser = computed(() => authStore.user)

const route = useRoute()

const $toast = useToast()

const athleteData = ref({})

// get athlete data
const getData = async () => {
    if (!currentUser.value?.uid) {
        console.error("User not authenticated");
        return;
    }

    const athleteRef = collection(db, 'athletes')
    try {
        const q = query(
            athleteRef,
            where('athleteId', '==', currentUser.value?.uid),
            limit(1)
        )
        const snapshot = await getDocs(q)

        athleteData.value = {
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data()
        }

        getSchool(snapshot.docs[0].data().school)
        getForms()
        getTrainingDetails()
        getDocuments()
    } catch (error) {
        $toast.error(error.message)
        console.log(error)
    }
}

const school = ref({})

const getSchool = async (schoolId) => {
    const schoolRef = collection(db, 'schools')
    try {
        const q = query(
            schoolRef,
            where('schoolId', '==', schoolId),
            limit(1)
        )
        const snapshot = await getDocs(q)

        school.value = {
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data()
        }
    } catch (error) {
        $toast.error(error.message)
    }
}

const formatData = (bday) => {
    return moment(bday).format('LL')
}

// get athleteforms 
const forms = ref([])
const formRef = collection(db, 'forms')

const getForms = async () => {
    try {
        const q = query(
            formRef,
            where('userId', '==', athleteData.value.athleteId)
        )

        const snapshots = await getDocs(q) 

        snapshots.docs.forEach(doc => {
            forms.value.push({
                id: doc.id,
                ...doc.data()
            })
        })
        
    } catch (error) {
        $toast.error('Error fetching forms')
    }
}

// get training details
const trainingData = ref(null)
const trainingLabels = ref(null)

const detsRef = collection(db, 'trainings')

const getTrainingDetails = async () => {
  try {
    const snapshot = await getDocs(detsRef)

    const allAttendance = snapshot.docs.flatMap((doc) => {
        const data = doc.data()

        return Array.isArray(data.attendance)
        ? data.attendance
            .filter((entry) => entry.athlete === currentUser.value?.uid)
            .map((entry) => ({
                ...entry, 
                docId: doc.id, 
                ...data
            }))
        : []
    })

    trainingData.value = allAttendance.map(attendance => attendance.rating)
    trainingLabels.value = allAttendance
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(attendance => moment(new Date(attendance.date)).format('l'))
  } catch (error) {
    console.log(error)
  }
}

const addDocumentModal = ref(false)

// get documents
const documents = ref([])
const docRef = collection(db, 'documents')

const getDocuments = async () => {
    try {
        const q = query(
            docRef,
            where('userId', '==', currentUser.value?.uid)
        )
        const snapshots = await getDocs(q)

        snapshots.docs.forEach(doc => {
            documents.value.push({
                id: doc.id,
                ...doc.data()
            })
        })
    } catch (error) {
        console.log(error)
    }
}

// close add docs modal insert data if exists
const closeModal = (data) => {
    console.log(data)
    documents.value.push(data)

    addDocumentModal.value = false
}


onMounted(() => {
    watch(currentUser, () => {
        getData()
    })
    if(currentUser.value?.uid){
        getData()
    }
})
</script>