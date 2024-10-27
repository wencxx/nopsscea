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
        <!-- form table -->
        <div class="border dark:border-gray-100/10 h-fit rounded-md p-5 flex flex-col gap-y-5">
            <h1 class="text-lg font-bold">Filled Out Forms</h1>
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
                    <tbody>
                        <tr v-for="(form, index) in forms" :key="index">
                            <td class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">{{ form.formName }}</td>
                            <td class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">{{ form.semester }}</td>
                            <td class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">{{ form.sy }}</td>
                            <td class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">
                                <div class="flex justify-center gap-x-2">
                                    <button @click="downloadForm(index)">
                                        <Icon icon="mdi:eye" class="text-2xl text-green-500 hover:scale-110" />
                                    </button>
                                    <button @click="deleteForm(form.id, index)">
                                        <Icon icon="mdi:trash" class="text-2xl text-red-500 hover:scale-110" />
                                    </button>
                                </div>
                            </td>
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
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { db } from '@config/firebaseConfig.js'
import { doc, getDoc, collection, getDocs, query, where, limit } from 'firebase/firestore'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { onMounted, ref } from 'vue'
import moment from 'moment'
import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import { saveAs } from 'file-saver'
import ImageModule from 'docxtemplater-image-module-free'

const route = useRoute()
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
        getForms()
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

// generate form docx
const loadImageAsArrayBuffer = async (imageUrl) => {
  const response = await fetch(imageUrl)
  if (!response.ok) throw new Error('Network response was not ok')
  return await response.arrayBuffer()
}

const downloadForm = async (index) => {
    const formData = forms.value[index]

    try {
        const response = await fetch('/PRISAA-FORM-2019-02-Parental-Consent-1.docx')

        if (!response.ok) throw new Error('Failed to fetch DOCX template')

        const docxArrayBuffer = await response.arrayBuffer()

        const imageArrayBuffer = await loadImageAsArrayBuffer(formData.picture2x2)

        const zip = new PizZip(docxArrayBuffer)

        const imageModule = new ImageModule({
            centered: false,
            getImage: function () {
                return imageArrayBuffer
            },
            getSize: function () {
                return [200, 200]
            },
        })

        const doc = new Docxtemplater(zip, {
            modules: [imageModule],
        })

        doc.setData({
            image: formData.picture2x2,
            name: formData.name,
            schoolname: formData.schoolName,
            cluster: 'NOPSSCEA',
            provDate: moment(formData.provDate).format('LL'),
            provVenue: formData.provVenue,
            regDate: moment(formData.regDate).format('LL'),
            regVenue: formData.regVenue,
            natDate: moment(formData.natDate).format('LL'),
            natVenue: formData.natVenue,
            fathersName: formData.fathersName,
            mothersName: formData.mothersName,
            guardiansName: formData.guardianName,
        })

        doc.render()

        const output = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        })

        saveAs(output, 'parents-consent.docx')
    } catch (error) {
        console.error('Error generating document:', error)
    }
}

// delete form
const deleteForm = async (formId, index) => {
    const docRef = doc(db, 'forms', formId)
    try {
        await deleteDoc(docRef)
        forms.value.splice(index, 1)

        $toast.success('Form deleted successfully')
    } catch (error) {
        $toast.error('Failed to deleted docs')
    }
}

onMounted(() => {
    getData()
})
</script>