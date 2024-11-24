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
                <input type="number" class="border rounded h-8 pl-2" v-model="formData.age">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Address</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.address">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>2x2 Picture</label>
                <input type="file" accept=".jpg, .png, .jpeg" class="h-8" @change="handleImageUpload($event, '2x2Picture')">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Date Examined</label>
                <input type="date" class="border rounded h-8 pl-2" v-model="formData.dateExamined">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Remarks</label>
                <select class="border rounded h-8 pl-2" v-model="formData.remarks">
                    <option value="fit">Physically fit to participate</option>
                    <option value="unfit">Unfit to participate</option>
                </select>
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Physician Name</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.physician">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>License Number</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.license">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Physician E-Signature</label>
                <input type="file" accept=".jpg, .png, .jpeg" class="h-8" @change="handleImageUpload($event, 'Esign')">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Sports Event</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.sportsEvent">
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

            const today = new Date


            formData.value.name = `${athleteData.value.firstName} ${athleteData.value.middleName} ${athleteData.value.lastName}`
            formData.value.schoolName = await getSchool(athleteData.value.school)
            formData.value.address = athleteData.value.address
            formData.value.age = today.getFullYear() - athleteData.value.birthday.split('-')[0]    
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
    address: '',
    schoolName: '',
    dateExamined: '',
    remarks: '',
    physician: '',
    license: '',
    sportsEvent: '',
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
const Esign = ref(null)


const handleImageUpload = (event, imageType) => {
    if (event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0]
        if (imageType === '2x2Picture') {
            picture2x2.value = file
        } else if (imageType === 'Esign') {
            Esign.value = file
        }
    } else {
        console.error('No file selected')
    }
}



// submit form to database
const formRef = collection(db, 'forms')
const submittingForm = ref(false)

const loadImageAsArrayBuffer = async (file) => {
    try {
        if (file instanceof File) {
            return await file.arrayBuffer()
        }
        throw new Error('Invalid file type')
    } catch (error) {
        throw new Error('Failed to load image: ' + error.message)
    }
}

const submitForm = async (index) => {
    try {
        const response = await fetch('/PRISAA-FORM-2016-03-MEDICAL-CERTIFICATE-3.docx')

        if (!response.ok) throw new Error('Failed to fetch DOCX template')
        const docxArrayBuffer = await response.arrayBuffer()

        const picture2x2Buffer = picture2x2.value ? await loadImageAsArrayBuffer(picture2x2.value) : null;
        const ESignBuffer = Esign.value ? await loadImageAsArrayBuffer(Esign.value) : null;

        const zip = new PizZip(docxArrayBuffer)

        const imageModule = new ImageModule({
            centered: true,
            getImage: (tagValue) => {
                switch (tagValue) {
                    case 'image': return picture2x2Buffer || new ArrayBuffer(0);
                    case 'Esign': return ESignBuffer || new ArrayBuffer(0);
                    default: return new ArrayBuffer(0);
                }
            },
            getSize: function (tagValue) {
                if (tagValue === 'Esign') {
                    return [300, 150]; 
                } else {
                    return [200, 200]; 
                }
            },
        });


        const doc = new Docxtemplater(zip, {
            modules: [imageModule],
        })

        doc.setData({
            image: 'image',
            signature: 'Esign',
            name: formData.value.name,
            age: formData.value.age,
            school: formData.value.schoolName,
            fit: formData.value.remarks === 'fit' ? '✔' : '',
            un: formData.value.remarks === 'unfit' ? '✔' : '',
            un: formData.value.remarks === 'unfit' ? '✔' : '',
            dateExamined: formData.value.dateExamined,
            physicianName: formData.value.physician,
            license: formData.value.license,
            sportsEvent: formData.value.sportsEvent,
            provDate: moment(formData.value.provDate).format('LL') || '',
            provVenue: formData.value.provVenue,
            regDate: moment(formData.value.regDate).format('LL') || '',
            regVenue: formData.value.regVenue,
            natDate: moment(formData.value.natDate).format('LL') || '',
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

        const fileResponse = await fetch(downloadURL);  
        if (!fileResponse.ok) throw new Error("Failed to fetch DOCX file");

        const docBlob = await fileResponse.blob();

        const formData2 = new FormData();
        formData2.append("file", docBlob, "document.docx");

        const uploadResponse = await fetch("https://api.pdf.co/v1/file/upload", {
            method: "POST",
            headers: {
                "x-api-key": "wncbtrn@gmail.com_xTAaBkXRa6Bax84AsEmaF49ilnMoB5pIurbompilEmvjqWVVdmrFQw9GbqytWZ2E", 
            },
            body: formData2
        });

        if (!uploadResponse.ok) {
            const errorDetails = await uploadResponse.text();
            console.error("Failed to upload file:", errorDetails);
            throw new Error("Failed to upload DOCX file");
        }

        const uploadResult = await uploadResponse.json();
        const uploadedFileUrl = uploadResult.url;

        const pdfResponse = await fetch("https://api.pdf.co/v1/pdf/convert/from/doc", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "wncbtrn@gmail.com_xTAaBkXRa6Bax84AsEmaF49ilnMoB5pIurbompilEmvjqWVVdmrFQw9GbqytWZ2E", 
            },
            body: JSON.stringify({
                url: uploadedFileUrl,
            }),
        });

        if (!pdfResponse.ok) {
            const errorDetails = await pdfResponse.text();
            console.error("Failed to convert DOCX to PDF:", errorDetails);
            throw new Error("Failed to convert DOCX to PDF");
        }

        const pdfResult = await pdfResponse.json();
        const pdfUrl = pdfResult.url;

        const pdfBlob = await (await fetch(pdfUrl)).blob();
        const pdfStorageRef = storageRef(storage, `forms/${formData.value.name}-parents-consent.pdf`);
        await uploadBytes(pdfStorageRef, pdfBlob);
        const pdfDownloadUrl = await getDownloadURL(pdfStorageRef);

        await addDoc(formRef, {
            sy: formData.value.sy,
            semester: formData.value.semester,
            formName: 'Medical Certificate',
            documentUrl: downloadURL,
            pdfUrl: pdfDownloadUrl,
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