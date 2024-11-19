<template>
    <div class="flex items-center justify-center h-screen w-screen fixed -top-10 left-0 bg-black/10 z-10">
        <form @submit.prevent="submitForm" class="bg-white w-[40dvw] !h-[90dvh] overflow-auto rounded-md grid grid-cols-2 gap-3 p-5 relative">
            <div class="top-1 right-1 sticky col-span-2" @click="closeModal">
                <Icon icon="mdi:close" class="text-xl cursor-pointer ml-auto" />
            </div>
            <h1 class="text-center col-span-2 mb-2 text-lg">Parents Consent</h1>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Name</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.name">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>School Name</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.schoolName">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>2x2 Picture</label>
                <input type="file" accept=".jpg, .png, .jpeg" class="h-8" @change="handleImageUpload($event, '2x2Picture')">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Sports Event</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.sport">
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
                <label>Fathers Name</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.fathersName">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>E-Signature</label>
                <input type="file" accept=".jpg, .png, .jpeg" class="h-8" @change="handleImageUpload($event, 'fEsign')">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Mothers Name</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.mothersName">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>E-Signature</label>
                <input type="file" accept=".jpg, .png, .jpeg" class="h-8" @change="handleImageUpload($event, 'mEsign')">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Guardians Name</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.guardianName">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>E-Signature</label>
                <input type="file" accept=".jpg, .png, .jpeg" class="h-8" @change="handleImageUpload($event, 'gEsign')">
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
    schoolName: '',
    sport: '',
    provDate: '',
    provVenue: '',
    regDate: '',
    regVenue: '',
    natDate: '',
    natVenue: '',
    fathersName: '',
    mothersName: '',
    guardianName: '',
    semester: '',
    sy: '',
    formName: 'Parents Consent',
})

const picture2x2 = ref(null)
const fESign = ref(null)
const mESign = ref(null)
const gESign = ref(null)

const handleImageUpload = (event, imageType) => {
    if (event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (imageType === '2x2Picture') {
            picture2x2.value = file;
        } else if (imageType === 'fEsign') {
            fESign.value = file;
        } else if (imageType === 'mEsign') {
            mESign.value = file;
        } else if (imageType === 'gEsign') {
            gESign.value = file;
        }
    } else {
        console.error('No file selected');
    }
};





// submit form to database
const formRef = collection(db, 'forms')
const submittingForm = ref(false)

const loadImageAsArrayBuffer = async (file) => {
    try {
        if (file instanceof File) {
            return await file.arrayBuffer();
        }
        throw new Error('Invalid file type');
    } catch (error) {
        throw new Error('Failed to load image: ' + error.message);
    }
};




const submitForm = async () => {
    submittingForm.value = true;
    try {
        // Step 1: Fetch the DOCX template
        const response = await fetch('/PRISAA-FORM-2019-02-Parental-Consent-1.docx');
        if (!response.ok) throw new Error('Failed to fetch DOCX template');
        const docxArrayBuffer = await response.arrayBuffer();

        // Step 2: Load images as ArrayBuffer
        const picture2x2Buffer = picture2x2.value ? await loadImageAsArrayBuffer(picture2x2.value) : null;
        const fESignBuffer = fESign.value ? await loadImageAsArrayBuffer(fESign.value) : null;
        const mESignBuffer = mESign.value ? await loadImageAsArrayBuffer(mESign.value) : null;
        const gESignBuffer = gESign.value ? await loadImageAsArrayBuffer(gESign.value) : null;

        // Step 3: Configure ImageModule for Docxtemplater
        const imageModule = new ImageModule({
            centered: false,
            getImage: (tagValue) => {
                switch (tagValue) {
                    case 'image':
                        return picture2x2Buffer || new ArrayBuffer(0);
                    case 'fEsign':
                        return fESignBuffer || new ArrayBuffer(0);
                    case 'mEsign':
                        return mESignBuffer || new ArrayBuffer(0);
                    case 'gEsign':
                        return gESignBuffer || new ArrayBuffer(0);
                    default:
                        return new ArrayBuffer(0);
                }
            },
            getSize: (tagValue) => {
                // Set size based on the tag
                return [200, 200]; // Adjust image size if needed
            },
        });

        const zip = new PizZip(docxArrayBuffer);
        const doc = new Docxtemplater(zip, { modules: [imageModule] });

        // Step 4: Set template data
        doc.setData({
            image: 'image',
            name: formData.value.name,
            schoolname: formData.value.schoolName,
            sport: formData.value.sport,
            cluster: 'NOPSSCEA',
            provDate: moment(formData.value.provDate).format('LL'),
            provVenue: formData.value.provVenue,
            regDate: moment(formData.value.regDate).format('LL'),
            regVenue: formData.value.regVenue,
            natDate: moment(formData.value.natDate).format('LL'),
            natVenue: formData.value.natVenue,
            fathersName: formData.value.fathersName,
            mothersName: formData.value.mothersName,
            guardianName: formData.value.guardianName,
            fEsign: 'fEsign',
            mEsign: 'mEsign',
            gEsign: 'gEsign',
            semester: formData.value.semester,
            sy: formData.value.sy,
        });

        // Step 5: Render the document
        doc.render();

        // Step 6: Generate Blob from the rendered document
        const generatedDoc = doc.getZip().generate({ type: 'blob' });

        // Step 7: Upload generated document to Firebase Storage
        const docStorageRef = storageRef(storage, `forms/${formData.value.name}-consent.docx`);
        await uploadBytes(docStorageRef, generatedDoc);

        // Get the download URL
        const docDownloadUrl = await getDownloadURL(docStorageRef);

        // Step 8: Save form data along with the download URL to Firestore
        await addDoc(formRef, {
            ...formData.value,
            userId: currentUser.value.uid,
            documentUrl: docDownloadUrl,
            createdAt: new Date(),
        });

        $toast.success('Form submitted successfully!');
        closeModal();
    } catch (error) {
        console.error('Error submitting form:', error);
        $toast.error('Failed to submit form');
    } finally {
        submittingForm.value = false;
    }
};



</script>