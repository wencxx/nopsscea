<template>
    <div class="flex items-center justify-center gap-x-5 dark:text-white">
        <form @submit.prevent="register" class="w-1/3 h-fit space-y-5 p-5 border dark:border-gray-100/10 shadow rounded-md">
            <h1 class="text-center uppercase font-medium text-xl">Athlete Registration</h1>
            <p v-if="errorMessage" class="bg-red-500 text-white pl-2 py-1 rounded capitalize flex items-center gap-x-1">
                <Icon icon="bxs:error" class="text-lg" />
                <span>{{ errorMessage }}</span>
            </p>
            <div v-if="currentPage == 1" class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-y-2">
                    <label>First Name</label>
                    <input type="text" v-model="athleteData.firstName" class="border h-8 rounded pl-2 focus:outline-custom-primary dark:bg-transparent dark:border-gray-100/10">
                </div>
                <div class="flex flex-col gap-y-2">
                    <label>Middle Name</label>
                    <input type="text" v-model="athleteData.middleName" class="border h-8 rounded pl-2 focus:outline-custom-primary dark:bg-transparent dark:border-gray-100/10">
                </div>
                <div class="flex flex-col gap-y-2">
                    <label>Last Name</label>
                    <input type="text" v-model="athleteData.lastName" class="border h-8 rounded pl-2 focus:outline-custom-primary dark:bg-transparent dark:border-gray-100/10">
                </div>
                <div class="flex flex-col gap-y-2">
                    <label>Email</label>
                    <input type="email" v-model="athleteData.email" class="border h-8 rounded pl-2 focus:outline-custom-primary dark:bg-transparent dark:border-gray-100/10">
                </div>
                <div class="flex flex-col gap-y-2">
                    <label>Password</label>
                    <input type="password" v-model="athleteData.password" class="border h-8 rounded pl-2 focus:outline-custom-primary dark:bg-transparent dark:border-gray-100/10">
                </div>
                <div class="flex flex-col gap-y-2">
                    <label>Gender</label>
                    <select v-model="athleteData.gender" class="border h-8 rounded pl-2 focus:outline-custom-primary dark:bg-transparent dark:border-gray-100/10"> 
                        <!-- <option disabled :value="athleteData.gender">Select Gender</option> -->
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                <div class="flex flex-col gap-y-2">
                    <label>Birth date</label>
                    <input type="date" v-model="athleteData.birthday" class="border h-8 rounded pl-2 focus:outline-custom-primary dark:bg-transparent dark:border-gray-100/10">
                </div>
                <div class="flex flex-col gap-y-2">
                    <label>Address</label>
                    <input type="text" v-model="athleteData.address" class="border h-8 rounded pl-2 focus:outline-custom-primary dark:bg-transparent dark:border-gray-100/10">
                </div>
            </div>
            <div v-if="currentPage == 2" class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-y-2">
                    <label>School</label>
                    <select v-model="athleteData.school" class="border h-8 rounded pl-2 focus:outline-custom-primary dark:bg-transparent dark:border-gray-100/10">
                        <option v-for="school in schoolList" :key="school.schoolId" :value="school.schoolId">{{ school.schoolName }}</option>
                    </select>
                </div>
                <div class="flex flex-col gap-y-2">
                    <label>Year</label>
                    <select class="border h-8 rounded pl-2 focus:outline-custom-primary dark:bg-transparent dark:border-gray-100/10" v-model="athleteData.year">
                        <option value="" disabled>Select Year</option>
                        <option>1st year</option>
                        <option>2nd year</option>
                        <option>3rd year</option>
                        <option>4th year</option>
                        <option>5th year</option>
                        <option>6th year</option>
                    </select>
                </div>
                <div class="flex flex-col gap-y-2">
                    <label>Course</label>
                    <select v-model="athleteData.course" class="border h-8 rounded pl-2 focus:outline-custom-primary dark:bg-transparent dark:border-gray-100/10">
                        <option value="bs-accountancy">BS Accountancy</option>
                        <option value="bs-architecture">BS Architecture</option>
                        <option value="bs-business-administration">BS Business Administration</option>
                        <option value="bs-education">BS Education</option>
                        <option value="bs-computer-science">BS Computer Science</option>
                        <option value="bs-information-technology">BS Information Technology</option>
                        <option value="bs-hospitality-management">BS Hospitality Management</option>
                        <option value="bs-tourism-management">BS Tourism Management</option>
                        <option value="bs-psychology">BS Psychology</option>
                        <option value="bs-nursing">BS Nursing</option>
                        <option value="bs-pharmacy">BS Pharmacy</option>
                        <option value="bs-medical-technology">BS Medical Technology</option>
                        <option value="bs-physical-therapy">BS Physical Therapy</option>
                        <option value="bs-criminology">BS Criminology</option>
                        <option value="bs-engineering">BS Engineering (Various fields)</option>
                        <option value="bs-agriculture">BS Agriculture</option>
                        <option value="bs-communication">BS Communication</option>
                        <option value="bs-social-work">BS Social Work</option>
                        <option value="ba-political-science">BA Political Science</option>
                        <option value="ba-english">BA English</option>
                        <option value="ba-mass-communication">BA Mass Communication</option>
                        <option value="bs-accounting-information-system">BS Accounting Information System</option>
                        <option value="others">others</option>

                        <!-- Courses of VMA Global College -->
                        <option value="bs-marine-transportation">BS Marine Transportation (VMA)</option>
                        <option value="bs-marine-engineering">BS Marine Engineering (VMA)</option>
                        <option value="bs-customs-administration">BS Customs Administration (VMA)</option>
                        <option value="bs-hotel-and-restaurant-management">BS Hotel and Restaurant Management (VMA)</option>
                        <option value="bs-business-administration">BS Business Administration (VMA)</option>

                        <!-- Courses of John B. Lacson Colleges Foundation (JBLF) -->
                        <option value="bs-marine-transportation-jblf">BS Marine Transportation (JBLF)</option>
                        <option value="bs-marine-engineering-jblf">BS Marine Engineering (JBLF)</option>
                        <option value="bs-cruise-ship-management">BS Cruise Ship Management (JBLF)</option>
                        <option value="bs-customs-administration-jblf">BS Customs Administration (JBLF)</option>
                        <option value="bs-hotel-and-restaurant-management-jblf">BS Hotel and Restaurant Management (JBLF)</option>
                    </select>
                </div>
                <div class="flex flex-col gap-y-2">
                    <label>Sport</label>
                    <select v-model="athleteData.sport" class="border h-8 rounded pl-2 focus:outline-custom-primary dark:bg-transparent dark:border-gray-100/10">
                        <option value="basketball">Basketball</option>
                        <option value="volleyball">Volleyball</option>
                        <option value="football">Football</option>
                        <option value="badminton">Badminton</option>
                        <option value="table-tennis">Table Tennis</option>
                        <option value="lawn-tennis">Lawn Tennis</option>
                        <option value="swimming">Swimming</option>
                        <option value="athletics">Athletics</option>
                        <option value="chess">Chess</option>
                        <option value="taekwondo">Taekwondo</option>
                        <option value="karatedo">Karatedo</option>
                        <option value="archery">Archery</option>
                        <option value="softball">Softball</option>
                        <option value="baseball">Baseball</option>
                        <option value="table-tennis">Table Tennis</option>
                        <option value="futsal">Futsal</option>
                        <option value="dance-sports">Dance Sports</option>
                    </select>
                </div>
                <div class="flex flex-col gap-y-2">
                    <label>Athletes Photo</label>
                    <div :class="{ '!border-red-500': noImage}" class="h-8 border rounded cursor-pointer pl-2 focus:outline-custom-primary flex items-center justify-center gap-x-2 dark:bg-transparent dark:border-gray-100/10" @click="toggleFileInput">
                        <Icon icon="mage:image-upload" class="text-xl"/>
                        <p class="line-clamp-1 text-sm">{{ imageName }}</p>
                    </div>
                    <input @change="handleImageUploadPhoto" type="file" accept=".jpg, .jpeg, .png" class="hidden" id="fileInput">
                </div>
                <div class="flex flex-col gap-y-2">
                    <label>Mother's Fullname</label>
                    <input type="text" v-model="athleteData.mothersName" class="border h-8 rounded pl-2 focus:outline-custom-primary dark:bg-transparent dark:border-gray-100/10">
                </div>
                <div class="flex flex-col gap-y-2">
                    <label>Father's Fullname</label>
                    <input type="text" v-model="athleteData.fathersName" class="border h-8 rounded pl-2 focus:outline-custom-primary dark:bg-transparent dark:border-gray-100/10">
                </div>
                <div class="flex flex-col gap-y-2">
                    <label>Certificate</label>
                    <div :class="{ '!border-red-500': noImageCert}" class="h-8 border rounded cursor-pointer pl-2 focus:outline-custom-primary flex items-center justify-center gap-x-2 dark:bg-transparent dark:border-gray-100/10" @click="toggleFileInputCert">
                        <Icon icon="mage:image-upload" class="text-xl"/>
                        <p class="line-clamp-1 text-sm">{{ imageNameCert }}</p>
                    </div>
                    <input @change="handleImageUploadCert" type="file" accept=".jpg, .jpeg, .png" class="hidden" id="fileInputCert">
                </div>
            </div>
            <div class="flex items-center justify-end gap-x-5">
                <router-link v-if="currentPage === 1" :to="{ name: 'selectRole' }" class="border text-center border-blue-900 h-8 text-custom-primary py-1 w-1/5 rounded hover:shadow-md hover:dark:shadow dark:shadow-white">Back</router-link>
                <button v-else class="border text-center border-blue-900 h-8 text-custom-primary py-1 w-1/5 rounded hover:shadow-md hover:dark:shadow dark:shadow-white" type="button" @click="back()">Back</button>
                <div v-if="currentPage == 2 || $route.query.page === 2" class="w-1/5">
                    <button v-if="!registering" class="bg-blue-900 h-8 w-full text-white py-1 rounded hover:shadow-md hover:dark:shadow dark:shadow-white">Register</button>
                    <button v-else class="bg-blue-900 h-8 w-full text-white py-1 rounded hover:shadow-md hover:dark:shadow dark:shadow-white flex items-center justify-center gap-x-2 animate-pulse" disabled>
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
                <button v-else class="bg-blue-900 h-8 w-1/5 text-white py-1 rounded hover:shadow-md hover:dark:shadow dark:shadow-white" type="button" @click="next()">Next</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { db, auth, google, storage } from '@config/firebaseConfig'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// page next back
let currentPage = ref(route.query.page || 1)

const back = () => {
    currentPage.value -= 1
    router.push({
        query: {}
    })
    localStorage.setItem('data', JSON.stringify(athleteData.value))
}

const next = () => {
    currentPage.value += 1
    router.push({
        query: {
            page: 2
        }
    })
    localStorage.setItem('data', JSON.stringify(athleteData.value))
}

// athletes details storage
const athleteData = ref({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    school: '',
    year: '',
    course: '',
    sport: '',
    gender: '',
    birthday: '',
    address: '',
    mothersName: '',
    fathersName: '',
    password: '',
})

// upload image
const toggleFileInput = () => {
    const fileInput = document.getElementById('fileInput')

    fileInput.click()
}

const toggleFileInputCert = () => {
    const fileInput = document.getElementById('fileInputCert')

    fileInput.click()
}

// handle image upload for profile picture
const image = ref(null)
const imageName = ref('Choose a photo')
const noImage = ref(false)

const handleImageUploadPhoto = () => {
    const uploadedImage = event.target.files[0]

    image.value = uploadedImage
    imageName.value = uploadedImage.name
    noImage.value = false
}

// handle image upload for certificate
const imageCert = ref(null)
const imageNameCert = ref('Choose a photo')
const noImageCert = ref(false)

const handleImageUploadCert = () => {
    const uploadedImage = event.target.files[0]

    imageCert.value = uploadedImage
    imageNameCert.value = uploadedImage.name
    noImageCert.value = false
}

// check age base on birthday
const checkAge = () => {
    const birthday = new Date(athleteData.value.birthday);
    const today = new Date();

    let age = today.getFullYear() - birthday.getFullYear();
    const monthDifference = today.getMonth() - birthday.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }

    if (age >= 14) {
        return "Old enough.";
    } else {
        return "age restriction";
    }
}

// check if theres a empty fied
const checkFields = () => {
    for(const key in athleteData.value){
        if(athleteData.value[key] === ''){
            return 'fill out all fields'
        }
    }
}

// user role reference
const userRoleRef = collection(db, 'userRole')
const athletesRef = collection(db, 'athletes')

const errorMessage = ref('')
const registering = ref(false)

// register school
const register = async () => {

    if(checkFields() === 'fill out all fields'){
        errorMessage.value = 'Fill out all fields'
        return
    }

    if(checkAge() === 'age restriction'){
        errorMessage.value = 'Age Restriction'
        return
    }

    if(image.value === null) {
        noImage.value = true
        errorMessage.value = 'Upload picture'
        return 
    }
    
    if(imageCert.value === null) {
        noImageCert.value = true
        errorMessage.value = 'Upload certificate'
        return 
    }

    const imageRef = storageRef(storage, `profilePictures/${image.value.name}`)
    const certRef = storageRef(storage, `certs/${imageCert.value.name}`)

    try {
        registering.value = true
        const newUser = await createUserWithEmailAndPassword(auth, athleteData.value.email, athleteData.value.password)

        const user = newUser.user

        await uploadBytes(imageRef, image.value)
        await uploadBytes(certRef, imageCert.value)

        const photoUrl = await getDownloadURL(imageRef)
        const certUrl = await getDownloadURL(certRef)

        await updateProfile(user, {
            displayName: `${athleteData.value.firstName} ${athleteData.value.middleName} ${athleteData.value.lastName}`,
            photoURL: photoUrl
        })
        
        addDoc(userRoleRef, {
            userId: user.uid,
            role: 'athlete',
            isAccepted: false,
        })
        
        addDoc(athletesRef, {
            firstName: athleteData.value.firstName,
            middleName: athleteData.value.middleName,
            lastName: athleteData.value.lastName,
            email: athleteData.value.email,
            gender: athleteData.value.gender,
            birthday: athleteData.value.birthday,
            address: athleteData.value.address,
            school: athleteData.value.school,
            year: athleteData.value.year,
            course: athleteData.value.course,
            sport: athleteData.value.sport,
            photoUrl: photoUrl,
            certUrl: certUrl,
            mothersName: athleteData.value.mothersName,
            fathersName: athleteData.value.fathersName,
            athleteId: user.uid,
        })

        router.push({
            path: '/',
            query: {
                athlete: athleteData.value.firstName
            }
        })
    } catch (error) {
        console.log(error.message)
        errorMessage.value = error.message.split('/')[1].slice(0, -2).replaceAll('-', ' ')
    }finally {
        registering.value = false
    }
}


// get school list
const schoolRef = collection(db, 'schools')
const schoolList = ref([])

const getSchoolList = async () => {
    try {
        const snapshot = await getDocs(schoolRef)

        snapshot.docs.forEach(doc => {
            schoolList.value.push({
                id: doc.id,
                ...doc.data()
            })
        })
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    getSchoolList()

    if(localStorage.getItem('data')){
        const data = localStorage.getItem('data')
        athleteData.value = JSON.parse(data)
    }
}) 
</script>