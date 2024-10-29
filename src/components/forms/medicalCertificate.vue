<template>
    <div class="flex items-center justify-center h-screen w-screen fixed -top-10 left-0 bg-black/10 z-10">
        <form @submit.prevent="submitForm" class="bg-white w-[40dvw] !h-[90dvh] overflow-auto rounded-md grid grid-cols-2 gap-3 p-5 relative">
            <div class="top-1 right-1 sticky col-span-2" @click="closeModal">
                <Icon icon="mdi:close" class="text-xl cursor-pointer ml-auto" />
            </div>
            <h1 class="text-center col-span-2 mb-2 text-lg">Medical Certificate</h1>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Name</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.name">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Age</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.age">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>2x2 Picture</label>
                <input type="file" accept=".jpg, .png, .jpeg" class="h-8" @change="handleImageUpload('2x2Picture')">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Remarks</label>
                <select class="border rounded h-8 pl-2" v-model="formData.remarks">
                    <option value="fit">Physically fit</option>
                    <option value="unfit">Unfit</option>
                </select>
            </div>
            <h1 class="col-span-2">Provincial/Cluster Meet</h1>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Date</label>
                <input type="date" class="border rounded h-8 pl-2" v-model="formData.provDate">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Venue</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.provVenue">
            </div>
            <h1 class="col-span-2">Regional Meet</h1>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Date</label>
                <input type="date" class="border rounded h-8 pl-2" v-model="formData.regDate">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Venue</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.regVenue">
            </div>
            <h1 class="col-span-2">National Games</h1>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Date</label>
                <input type="date" class="border rounded h-8 pl-2" v-model="formData.natDate">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Venue</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.natVenue">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Semester</label>
                <select v-model="formData.semester" class="border rounded h-8 pl-2">
                    <option>1st Semester</option>
                    <option>2nd Semester</option>
                </select>
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>School Year</label>
                <select v-model="formData.sy" class="border rounded h-8 pl-2">
                    <option>2024-2025</option>
                    <option>2025-2026</option>
                    <option>2026-2027</option>
                    <option>2027-2028</option>
                    <option>2028-2029</option>
                    <option>2029-2030</option>
                </select>
            </div>
            <div class="flex justify-end col-span-2 gap-x-5 h-fit mt-5">
                <button class="border border-blue-900 w-1/4 py-1 rounded text-blue-900" type="button" @click="closeModal">Cancel</button>
                <button v-if="!submittingForm" class="bg-blue-900 text-white w-1/4 py-1 rounded">Submit</button>
                <button v-else class="bg-blue-900 text-white w-1/4 py-1 rounded animate-pulse" disabled>Submitting</button>
            </div>  
        </form>
    </div>
</template>

<script setup>
import { computed, defineEmits, onMounted, ref } from 'vue'
import { db, storage } from '@config/firebaseConfig.js'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { collection, addDoc, where, query, getDocs, limit } from 'firebase/firestore'
import { ref as storageRef, getDownloadURL, uploadBytes } from 'firebase/storage'
import { useAuthStore } from '@store'
import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import { saveAs } from 'file-saver'
import ImageModule from 'docxtemplater-image-module-free'
import moment from 'moment'

onMounted(() => {
    getAthleteData()
})

const $toast = useToast()
const authStore  = useAuthStore()

const currentUser = computed(() => authStore.user)

const emit = defineEmits(['closeModal'])

const closeModal = () => {
    emit('closeModal')
}

// get athlete data
const athleteRef = collection(db, 'athletes')
const athleteData = ref({})

const getAthleteData = async () => {
    if(currentUser.value?.uid){
        try {
            const q = query(
                athleteRef,
                where('athleteId', '==', currentUser.value?.uid),
                limit(1)
            )

            const snapshot = await getDocs(q)

            snapshot.docs.forEach(doc => (
                athleteData.value = {
                    id: doc.id,
                    ...doc.data()
                }
            ))

            getSchool(athleteData.value.school)


            formData.value.name = `${athleteData.value.firstName} ${athleteData.value.middleName} ${athleteData.value.lastName}`
            formData.value.schoolName = await getSchool(athleteData.value.school)
            formData.value.fathersName = athleteData.value.fathersName
            formData.value.mothersName = athleteData.value.mothersName

            
        } catch (error) {
            console.log(error)
            $toast.error('Server error')
        }
    }
}

// get user school
const schoolRef = collection(db, 'schools')

const getSchool = async (schoolId) => {
    try {
        const q = query(
            schoolRef,
            where('schoolId', '==', schoolId),
            limit(1)
        )
        
        const snapshot = await getDocs(q)

        if (!snapshot.empty) {
            const doc = snapshot.docs[0]
            const data = doc.data()
            return data.schoolName
        }
    } catch (error) {
        $toast.error('Server error')
    }
}


// data to submit
const formData = ref({
    name: '',
    age: '',
    remarks: '',
    provDate: '',
    provVenue: '',
    regDate: '',
    regVenue: '',
    natDate: '',
    natVenue: '',
    semester: '',
    sy: '',
    formName: 'Parents Consent',
})

const picture2x2 = ref(null)
const fESign = ref(null)
const mESign = ref(null)
const gESign = ref(null)

const handleImageUpload = (imageType) => {
    if(imageType === '2x2Picture'){
        picture2x2.value = event.target.files[0] 
    }
}



// submit form to database
const formRef = collection(db, 'forms')
const submittingForm = ref(false)

const loadImageAsArrayBuffer = async (imageUrl) => {
  const response = await fetch(imageUrl)
  if (!response.ok) throw new Error('Network response was not ok')
  return await response.arrayBuffer()
}

const submitForm = async (index) => {
    try {
        const response = await fetch('/PRISAA-FORM-2016-03-MEDICAL-CERTIFICATE-3.docx')

        if (!response.ok) throw new Error('Failed to fetch DOCX template')

        const docxArrayBuffer = await response.arrayBuffer()

        const imageArrayBuffer = await loadImageAsArrayBuffer(picture2x2.value)

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
            // image: picture2x2.value,
            name: formData.value.name,
            age: formData.value.age,
            fit: formData.value.remarks === 'fit' ? '✔' : '',
            un: formData.value.remarks === 'unfit' ? '✔' : '',
            provDate: moment(formData.value.provDate).format('LL'),
            provVenue: formData.value.provVenue,
            regDate: moment(formData.value.regDate).format('LL'),
            regVenue: formData.value.regVenue,
            natDate: moment(formData.value.natDate).format('LL'),
            natVenue: formData.value.natVenue,
        })

        doc.render()

        submittingForm.value = true

        const output = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        })

        const storagePath = `forms/${formData.value.name}-medical-certificate.docx`
        const storageReference = storageRef(storage, storagePath);
        
        await uploadBytes(storageReference, output);

        const downloadURL = await getDownloadURL(storageReference)

        await addDoc(formRef, {
            sy: formData.value.sy,
            semester: formData.value.semester,
            formName: 'Medical Certificate',
            storagePath: downloadURL,
            userId: currentUser.value?.uid,
            createdAt: new Date(),
        });

        closeModal()

        submittingForm.value = false
        $toast.success('Filled out form successfully')
    } catch (error) {
        $toast.error(error.message)
    }
}
</script>