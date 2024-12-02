<template>
    <div class="space-y-10">
        <div class="border dark:border-gray-100/10 h-[35dvh] rounded-md p-5 flex gap-x-5">
            <div class="flex flex-col w-1/5 items-center justify-center h-full gap-y-5 border-r dark:border-gray-100/10">
                <img v-if="athleteData.photoUrl" :src="athleteData.photoUrl" alt="profile picture" class="w-32 aspect-square rounded-full border">
                <div v-else class="w-32 aspect-square rounded-full bg-gray-300 animate-pulse border"></div>
                <div v-if="Object.keys(athleteData).length" class="flex flex-col items-center">
                    <h1 class="font-bold text-lg text-center">{{ athleteData.firstName }} {{ athleteData.middleName }} {{ athleteData.lastName }}</h1>
                    <p class="uppercase text-xs px-3 text-white rounded bg-orange-500" :class="{ '!bg-green-500': athleteData.status === 'Qualified', '!bg-red-500': athleteData.status === 'Not Qualified' }">{{ athleteData.status || 'Under Review' }}</p>
                    <p class="uppercase text-sm">{{ athleteData.sport }}</p>
                </div>
                <div v-else class="flex w-4/5 gap-y-1 flex-col items-center">
                    <div class="w-full h-6 bg-gray-300 animate-pulse rounded"></div>
                    <div class="w-1/2 h-4 bg-gray-300 animate-pulse rounded"></div>
                    <div class="w-1/2 h-5 bg-gray-300 animate-pulse rounded"></div>
                </div>
            </div>
            <div class="w-4/5 h-full grid grid-cols-2 items-center">
                <h1 class="text-lg"><span class="font-bold">School:</span> {{ school.schoolName }}</h1>
                <h1 class="text-lg"><span class="font-bold">School Abbreviation:</span> {{ school.schoolAbbreviation }}</h1>
                <h1 class="text-lg capitalize"><span class="font-bold capitalize">Course:</span> {{ athleteData.course }}</h1>
                <h1 class="text-lg"><span class="font-bold">Year:</span> {{ athleteData.year }}</h1>
                <h1 class="text-lg"><span class="font-bold">Email:</span> {{ athleteData.email }}</h1>
                <h1 class="text-lg"><span class="font-bold">Address:</span> {{ athleteData.address }}</h1>
                <h1 class="text-lg"><span class="font-bold">Gender:</span> {{ athleteData.gender }}</h1>
                <h1 class="text-lg"><span class="font-bold">Birthdate:</span> {{ formatData(athleteData.birthday) }}</h1>
                <div v-if="role === 'school'" class="col-span-2 flex justify-between">
                    <div class="flex items-center gap-x-2">
                        <div class="flex justify-center">
                            <Icon
                                v-for="star in 5"
                                :key="star"
                                :icon="average >= star ? 'mdi:star' : 'mdi:star-outline'"
                                class="text-2xl cursor-pointer"
                                :class="{ 'text-yellow-500': average >= star }"
                            />
                        </div>
                        <p class="mt-1">{{ average || 0 }}</p>
                    </div>
                    <div v-if="$route.query.status === 'pending'" class="flex justify-end gap-x-3 h-fit w-fit">
                        <button v-if="!deleting" class="w-36 h-fit py-1 rounded border bg-red-700 text-white" @click="showDeleteModal(athleteData.athleteId)">Decline</button>
                        <button v-else class="w-36 h-fit py-1 rounded border bg-red-700 text-white animate-pulse" disabled>Declining</button>
                        <button v-if="!acceptingAthlete" class="w-36 h-fit py-1 rounded border bg-blue-900 text-white" @click="acceptAthlete(athleteData.athleteId)">Accept</button>
                        <button v-else class="w-36 h-fit py-1 rounded border bg-blue-900 text-white animate-pulse" disabled>Accepting</button>
                    </div>
                    <div v-else class="flex justify-end gap-x-3 h-fit w-fit">
                        <button v-if="!deleting" class="w-36 h-fit py-1 rounded border bg-red-700 text-white" @click="showDeleteModal(athleteData.athleteId)">Remove</button>
                        <button v-else class="w-36 h-fit py-1 rounded border bg-red-700 text-white animate-pulse" disabled>Removing</button>
                    </div>
                </div>
                <div v-if="role === 'admin'" class="col-span-2 flex justify-between items-center">
                    <div class="flex items-center gap-x-2">
                        <div class="flex justify-center">
                            <Icon
                                v-for="star in 5"
                                :key="star"
                                :icon="average >= star ? 'mdi:star' : 'mdi:star-outline'"
                                class="text-2xl cursor-pointer"
                                :class="{ 'text-yellow-500': average >= star }"
                            />
                        </div>
                        <p class="mt-1">{{ average || 0 }}</p>
                    </div>
                    <div class="flex justify-end gap-x-3 h-fit border w-fit">
                        <button v-if="athleteData.status === 'Qualified' || athleteData.status === 'Under Review'" class="w-36 h-fit py-1 rounded border bg-red-700 text-white" @click="updateStatus(athleteData.athleteId, 'NQ')">Not Qualified</button>
                        <button v-if="athleteData.status === 'Not Qualified' || athleteData.status === 'Under Review'" class="w-36 h-fit py-1 rounded border bg-blue-900 text-white" @click="updateStatus(athleteData.athleteId, 'Q')">Qualified</button>
                    </div>
                </div>
            </div>  
        </div>
        <div class="border rounded-md p-5">
            <div class="flex justify-end gap-x-5">
                <select class="border rounded px-2" v-model="monthQuery">
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <select class="border rounded px-2" v-model="yearQuery">
                    <option>2023</option>
                    <option>2024</option>
                    <option>2025</option>
                    <option>2026</option>
                    <option>2027</option>
                    <option>2028</option>
                    <option>2029</option>
                    <option>2030</option>
                </select>
            </div>
            <lineChart :label="'Training Progress'" :data="trainingData" :labels="trainingLabels" class="!h-[40dvh] !w-full" />
        </div>
        <div class="border dark:border-gray-100/10 h-fit rounded-md p-5 flex flex-col gap-y-5">
            <h1 class="text-lg font-bold">Documents</h1>
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

                                    <a v-if="document.downloadUrl.includes('pdf') || document.downloadUrl.includes('docx')" :href="document.downloadUrl" download>
                                        <Icon icon="mdi:download" class="text-2xl text-blue-900 hover:scale-110" />
                                    </a>
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
            <div v-if="certificates.length" class="w-full grid grid-cols-4 gap-2">
                <img v-for="certificate in certificates" :key="certificate.id" :src="certificate.downloadUrl" alt="certificate" class="w-full aspect-square shadow rounded-md" @click="viewImages(certificates, index)">
            </div>
            <p v-else class="text-center">No certificates to show</p>
        </div>

        <deleteModal v-if="showModalDelete" @closeModal="showModalDelete = false" @acceptDelete="deleteAthlete()" :user="'athlete'" :type="'remove'" />
            <viewImagesModal v-if="showViewImagesModal" :images="imagesToView" :currentImage="currentImageViewing" @closeModal="showViewImagesModal = false" @deleteImage="deleteCert" />
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { db, storage } from '@config/firebaseConfig.js'
import { deleteObject } from 'firebase/storage'
import { doc, getDoc, collection, getDocs, query, where, limit, updateDoc, deleteDoc } from 'firebase/firestore'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { onMounted, ref, watch, watchEffect } from 'vue'
import moment from 'moment'
import lineChart from '@components/charts/lineChart.vue'
import axios from 'axios'
import deleteModal from '@components/deleteModal.vue'
import viewImagesModal from '@components/viewImages.vue'


const role = localStorage.getItem('role')

const route = useRoute()
const router = useRouter()
const $toast = useToast()

const athleteData = ref({})

// get athlete data
const getData = async () => {
    const athleteRef = doc(db, 'athletes', route.params.id)
    try {
        const snapshot = await getDoc(athleteRef)

        athleteData.value = {
            id: snapshot.id,
            ...snapshot.data()
        }

        getSchool(snapshot.data().school)
        getDocuments()
        getCertificates()
        getForms()
        getTrainingDetails()
    } catch (error) {
        $toast.error(error.message)
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

// get documents
const documents = ref([])
const docRef = collection(db, 'documents')

const getDocuments = async () => {
    try {
        const q = query(
            docRef,
            where('userId', '==', athleteData.value.athleteId)
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

// get documents
const certificates = ref([])
const certRef = collection(db, 'certificates')

const getCertificates = async () => {
    try {
        const q = query(
            certRef,
            where('userId', '==', athleteData.value.athleteId)
        )
        const snapshots = await getDocs(q)

        snapshots.docs.forEach(doc => {
            certificates.value.push({
                id: doc.id,
                ...doc.data()
            })
        })
    } catch (error) {
        console.log(error)
    }
}

// get training details
const trainingData = ref([])
const allTrainingData = ref([])
const trainingLabels = ref([])
const allAttendance = ref([]) 
const detsRef = collection(db, 'trainings')

const getTrainingDetails = async () => {
  try {
    const snapshot = await getDocs(detsRef)

    const attendanceRecords = snapshot.docs.flatMap((doc) => {
      const data = doc.data()

      return Array.isArray(data.attendance)
        ? data.attendance
            .filter((entry) => entry.athlete === athleteData.value.athleteId)
            .map((entry) => ({
              ...entry,
              docId: doc.id,
              ...data,
            }))
        : []
    })

    allAttendance.value = attendanceRecords
    allTrainingData.value = attendanceRecords.map((attendance) => attendance.rating)

    filterAttendance()
  } catch (error) {
    console.log(error)
  }
}

const filterAttendance = () => {
  const filteredAttendance = allAttendance.value.filter((entry) => {
    const entryDate = new Date(entry.date)
    const entryMonth = String(entryDate.getMonth() + 1).padStart(2, '0')
    const entryYear = entryDate.getFullYear().toString()

    return (
      (!monthQuery.value || entryMonth === monthQuery.value) &&
      (!yearQuery.value || entryYear === yearQuery.value)
    )
  })

  trainingData.value = filteredAttendance.map((attendance) => attendance.rating)
  trainingLabels.value = filteredAttendance
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((attendance) => moment(new Date(attendance.date)).format('ll').split(',')[0])
}

const todaysDate = new Date().toISOString().split('-')
const monthQuery = ref(todaysDate[1]) 
const yearQuery = ref(todaysDate[0]) 

watch([monthQuery, yearQuery], filterAttendance)

// get average training data 

const average = ref(0)

watchEffect(() => {
    const sum = allTrainingData.value.reduce((acc, data) => acc + data, 0)
    average.value = parseFloat((sum / allTrainingData.value.length).toFixed(1))
})


// accept athlete
const userRoleRef = collection(db, 'userRole')

const acceptingAthlete = ref(false)

const acceptAthlete = async (athleteId) => {
    try {
        acceptingAthlete.value = true
        const q = query(
            userRoleRef,
            where('userId', '==', athleteId),
            limit(1)
        )

        const snapshot = await getDocs(q)
        
        await updateDoc(doc(db, 'userRole', snapshot.docs[0].id), {
            isAccepted: true
        })

        router.push({
            path: '',
            query: {}
        })
    } catch (error) {
        console.log('error')
        $toast.error('Failed to accept athlete')
    } finally {
        acceptingAthlete.value = false
    }
}

// delete athlete
const deleting = ref(false)
const athleteIdToDelete = ref('')
const showModalDelete = ref(false)

const showDeleteModal = (uid) => {
    showModalDelete.value = true
    athleteIdToDelete.value = uid
}

const deleteAthlete = async () => {
    const userRoleRef = collection(db, 'userRole')
    const docRef = collection(db, 'athletes')
    const docsRef = collection(db, 'documents')
    const certsRef = collection(db, 'certificates')
    try {
        deleting.value = true
        const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}delete-user/${athleteIdToDelete.value}`)
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
                const fileRef = ref(storage, `documents/${snapshot.docs().file}`)

                await Promise.all([deleteObject(fileRef), deleteDoc(docRef)])
            }

            for(const snapshot of snapshots3.docs){
                const docRef = doc(db, 'certificates', snapshot.id)
                const fileRef = ref(storage, `certs/${snapshot.docs().file}`)

                await Promise.all([deleteObject(fileRef), deleteDoc(docRef)])
            }

            for(const snapshot of snapshots4.docs){
                const docRef = doc(db, 'userRole', snapshot.id)
                await deleteDoc(docRef)
            }

            router.push('/pending-athletes')
        }
    } catch (error) {
        console.log(error)
        $toast.error('Failed to delete athlete')
    } finally {
        deleting.value = false
    }
}

// change athlete status
const updateStatus = async (athleteId, status) => {
     try {
        if(status === 'Q'){
            const q = query(
                collection(db, 'athletes'),
                where('athleteId', '==', athleteId),
                limit(1)
            )

            const snapshot = await getDocs(q)

            await updateDoc(doc(db, 'athletes', snapshot.docs[0].id), {
                status: 'Qualified'
            })

            athleteData.value.status = 'Qualified'

            $toast.success('Updated athlete status successfully')
        }else{
            const q = query(
                collection(db, 'athletes'),
                where('athleteId', '==', athleteId),
                limit(1)
            )

            const snapshot = await getDocs(q)

            await updateDoc(doc(db, 'athletes', snapshot.docs[0].id), {
                status: 'Not Qualified'
            })

            athleteData.value.status = 'Not Qualified'

            $toast.success('Updated athlete status successfully')
        }
     } catch (error) {
        console.log(error)
        $toast.success('Failed to update athlete status')
     }
}

// view images
const showViewImagesModal = ref(false)

const imagesToView = ref(null)
const currentImageViewing = ref(0)

const viewImages = (images, index) => {
    showViewImagesModal.value = true
    imagesToView.value = images
    currentImageViewing.value = index
}

onMounted(() => {
    getData()
})
</script>