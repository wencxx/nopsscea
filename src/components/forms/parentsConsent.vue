<template>
    <div class="flex items-center justify-center h-screen w-screen fixed -top-10 left-0 bg-black/10 z-10">
        <form @submit.prevent="submitForm" class="bg-white w-[30dvw] h-fit rounded-md grid grid-cols-2 gap-3 p-5 relative">
            <div class="top-1 right-1 absolute" @click="closeModal">
                <Icon icon="mdi:close" class="text-xl cursor-pointer" />
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Name</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.name">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>School Name</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.schoolName">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Sport</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.sport">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>2x2 Picture</label>
                <input type="file" accept=".jpg, .png, .jpeg" class="h-8" @change="handleImageUpload('2x2Picture')">
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
                <input type="file" accept=".jpg, .png, .jpeg" class="h-8" @change="handleImageUpload('fEsign')">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Mothers Name</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.mothersName">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>E-Signature</label>
                <input type="file" accept=".jpg, .png, .jpeg" class="h-8" @change="handleImageUpload('mEsign')">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>Guardians Name</label>
                <input type="text" class="border rounded h-8 pl-2" v-model="formData.guardianName">
            </div>
            <div class="flex flex-col h-fit gap-y-1">
                <label>E-Signature</label>
                <input type="file" accept=".jpg, .png, .jpeg" class="h-8" @change="handleImageUpload('gEsign')">
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
                <button class="bg-blue-900 text-white w-1/4 py-1 rounded">Submit</button>
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
            formData.value.sport = athleteData.value.sport
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

const handleImageUpload = (imageType) => {
    if(imageType === '2x2Picture'){
        picture2x2.value = event.target.files[0] 
    }else if(imageType === 'fEsign'){
        fESign.value = event.target.files[0] 
    }else if(imageType === 'mEsign'){
        mESign.value = event.target.files[0] 
    }else if(imageType === 'gEsign'){
        gESign.value = event.target.files[0] 
    }
}

const formRef = collection(db, 'forms')
const submittingForm = ref(false)

// submit form
const submitForm = async () => {
    
    const photo2x2Storage = storageRef(storage, `2x2picture/${picture2x2.value}`)
    const fESignStorage = storageRef(storage, `Esignature/${fESign.value}`)
    const mESignStorage = storageRef(storage, `Esignature/${mESign.value}`)
    const gESignStorage = storageRef(storage, `Esignature/${gESign.value}`)

    try {
        submittingForm.value = true
        if(picture2x2.value === null || fESign.value === null || mESign.value === null || gESign.value === null){
            $toast.error('Upload all images')
            return
        }

        if(Object.values(formData.value).some(field => field === !field)){
            $toast.error('Empy field')
            return
        }

        closeModal()
        $toast.success('Filled out form successfully')

        await uploadBytes(photo2x2Storage, picture2x2.value)
        await uploadBytes(fESignStorage, fESign.value)
        await uploadBytes(mESignStorage, mESign.value)
        await uploadBytes(gESignStorage, gESign.value)

        const picture2x2url = await getDownloadURL(photo2x2Storage)
        const fESignurl = await getDownloadURL(fESignStorage)
        const mESignurl = await getDownloadURL(mESignStorage)
        const gESignurl = await getDownloadURL(gESignStorage)



        const snapshot = await addDoc(formRef, {
            ...formData.value,
            picture2x2: picture2x2url,
            fEsign: fESignurl,
            mEsign: mESignurl,
            gEsign: gESignurl,
            userId: currentUser.value?.uid
        })

        submittingForm.value = false
    } catch (error) {
        $toast.error(error.message)
        console.log(error)
    }
}
</script>