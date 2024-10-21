<template>
    <div class="flex items-center justify-center gap-x-5 dark:text-white">
        <form @submit.prevent="register" class="w-1/3 h-fit space-y-5 p-5 border dark:border-gray-100/10 shadow rounded-md">
            <h1 class="text-center uppercase font-medium text-xl">School Registration</h1>
            <p v-if="errorMessage" class="bg-red-500 text-white pl-2 py-1 rounded capitalize flex items-center gap-x-1">
                <Icon icon="bxs:error" class="text-lg" />
                <span>{{ errorMessage }}</span>
            </p>
            <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-y-2">
                    <label>School Name</label>
                    <input type="text" v-model="schoolData.schoolName" class="border h-8 rounded pl-2 focus:outline-custom-primary dark:bg-transparent dark:border-gray-100/10">
                </div>
                <div class="flex flex-col gap-y-2">
                    <label>School Abrreviation</label>
                    <input type="text" v-model="schoolData.schoolAbbreviation" class="border h-8 rounded pl-2 focus:outline-custom-primary dark:bg-transparent dark:border-gray-100/10">
                </div>
                <div class="flex flex-col gap-y-2">
                    <label>School Address</label>
                    <input type="text" v-model="schoolData.schoolAddress" class="border h-8 rounded pl-2 focus:outline-custom-primary dark:bg-transparent dark:border-gray-100/10">
                </div>
                <div class="flex flex-col gap-y-2">
                    <label>School Email</label>
                    <input type="text" v-model="schoolData.schoolEmail" class="border h-8 rounded pl-2 focus:outline-custom-primary dark:bg-transparent dark:border-gray-100/10">
                </div>
                <div class="flex flex-col gap-y-2">
                    <label>School Password</label>
                    <input type="password" v-model="schoolData.schoolPassword" class="border h-8 rounded pl-2 focus:outline-custom-primary dark:bg-transparent dark:border-gray-100/10">
                </div>
                <div class="flex flex-col gap-y-2">
                    <label>School Logo</label>
                    <div :class="{ '!border-red-500': noImage}" class="h-8 border rounded cursor-pointer pl-2 focus:outline-custom-primary flex items-center justify-center gap-x-2 dark:bg-transparent dark:border-gray-100/10" @click="toggleFileInput">
                        <Icon icon="mage:image-upload" class="text-xl"/>
                        <p class="line-clamp-1 text-sm">{{ imageName }}</p>
                    </div>
                    <input @change="handleImageUpload" type="file" accept=".jpg, .jpeg, .png" class="hidden" id="fileInput">
                </div>
            </div>
            <div class="flex items-center justify-end gap-x-5">
                <router-link :to="{ name: 'selectRole' }" class="border text-center border-blue-900 h-8 text-custom-primary py-1 w-1/5 rounded hover:shadow-md hover:dark:shadow dark:shadow-white">Back</router-link>
                <button v-if="!registering" class="bg-blue-900 h-8 text-white py-1 w-1/5 rounded hover:shadow-md hover:dark:shadow dark:shadow-white">Register</button>
                <button v-else class="bg-blue-900 h-8 text-white py-1 w-1/5 rounded hover:shadow-md hover:dark:shadow dark:shadow-white flex items-center justify-center gap-x-2 animate-pulse" disabled>
                    <svg class="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                        width="15" height="15">
                        <path
                        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path
                        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
                        </path>
                    </svg>
                    <span class="text-sm">Registering</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { db, auth, google, storage } from '@config/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const schoolData = ref({
    schoolName: '',
    schoolAbbreviation: '',
    schoolAddress: '',
    schoolEmail: '',
    schoolPassword: '',
})

const toggleFileInput = () => {
    const fileInput = document.getElementById('fileInput')

    fileInput.click()
}

const image = ref(null)
const imageName = ref('Choose a School logo')
const noImage = ref(false)

const handleImageUpload = () => {
    const uploadedImage = event.target.files[0]

    image.value = uploadedImage
    imageName.value = uploadedImage.name
    noImage.value = false
}

// user role reference
const userRoleRef = collection(db, 'userRole')
const schoolRef = collection(db, 'schools')

const errorMessage = ref('')
const registering = ref(false)

// register school
const register = async () => {

    if(image.value === null) {
        return noImage.value = true
    }

    const imageRef = storageRef(storage, `profilePictures/${image.value.name}`)

    try {
        registering.value = true
        const newUser = await createUserWithEmailAndPassword(auth, schoolData.value.schoolEmail, schoolData.value.schoolPassword)
        const user = newUser.user

        await uploadBytes(imageRef, image.value)

        const photoUrl = await getDownloadURL(imageRef)

        await updateProfile(user, {
            displayName: schoolData.value.schoolAbbreviation,
            photoURL: photoUrl
        })
        
        addDoc(userRoleRef, {
            userId: user.uid,
            role: 'school',
            isAccepted: false,
        })

        addDoc(schoolRef, {
            schoolName: schoolData.value.schoolName,
            schoolAbbreviation: schoolData.value.schoolAbbreviation,
            schoolAddress: schoolData.value.schoolAddress,
            schoolEmail: schoolData.value.schoolEmail,
            schoolLogo: photoUrl,
            schoolId: user.uid,
        })
        
        router.push({
            path: '/',
            query: {
                school: schoolData.value.schoolAbbreviation
            }
        })
    } catch (error) {
        console.log(error.message)
        errorMessage.value = error.message.split('/')[1].slice(0, -2).replaceAll('-', ' ')
    }finally {
        registering.value = false
    }
}

</script>