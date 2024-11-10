<template>
    <div class="flex items-center justify-center dark:text-white">
        <form @submit.prevent="login" class="w-4/5  md:w-2/5 xl:w-1/5 h-fit rounded p-5 space-y-5">
            <h1 class="text-center text-xl font-semibold font uppercase">Welcome</h1>
            <!-- message indicator -->
            <div v-if="errorMessage" class="bg-red-500 pl-3 py-1 rounded space-x-2 text-white !-mb-3">
                <Icon icon="bxs:error" class="inline text-xl" />
                <p class="inline">{{ errorMessage }}</p>
            </div>
            <div v-if="invalidCred" class="bg-red-500 pl-3 py-1 rounded space-x-2 text-white !-mb-3">
                <Icon icon="bxs:error" class="inline text-xl" />
                <p class="inline">Invalid Credentials</p>
            </div>
            <div v-if="$route.query.school" class="bg-green-500 pl-3 py-1 rounded space-x-2 text-white !-mb-3">
                <Icon icon="fluent:hand-wave-16-regular" class="inline text-xl" />
                <p class="inline">Hooray, <span class="uppercase">{{ $route.query.school }}</span>! You are successfully registered!</p>
            </div>
            <div v-if="$route.query.athlete" class="bg-green-500 pl-3 py-1 rounded space-x-2 text-white !-mb-3">
                <Icon icon="fluent:hand-wave-16-regular" class="inline text-xl" />
                <p class="inline">Hooray, <span class="uppercase">{{ $route.query.athlete }}</span>! You are successfully registered!</p>
            </div>
            <div v-if="$route.query.coach" class="bg-green-500 pl-3 py-1 rounded space-x-2 text-white !-mb-3">
                <Icon icon="fluent:hand-wave-16-regular" class="inline text-xl" />
                <p class="inline">Hooray, <span class="uppercase">{{ $route.query.coach }}</span>! You are successfully registered!</p>
            </div>
            <div v-if="userNotAccepted" class="bg-green-500 pl-3 py-1 rounded space-x-2 text-white !-mb-3">
                <Icon icon="material-symbols-light:notifications-active-outline" class="inline text-xl" />
                <p class="inline">{{ userNotAccepted }}</p>
            </div>
            <!-- end -->
            <div class="space-y-3">
                <div class="flex flex-col">
                    <label class="text-lg">Email</label>
                    <input type="email" v-model="email" class="border h-10 pl-2 rounded dark:bg-transparent dark:border-gray-100/25">
                </div>
                <div class="flex flex-col">
                    <label class="text-lg">Password</label>
                    <input type="password" v-model="password" class="border h-10 pl-2 rounded dark:bg-transparent dark:border-gray-100/25">
                </div>
            </div>
            <div class="flex justify-between items-center !m-0 !mt-2">
                <div class="flex items-center gap-x-1">
                    <input type="checkbox" class="border h-4 aspect-square">
                    <label class="text-sm">Remember me</label>
                </div>
                <p class="text-sm hover:underline hover:text-custom-primary hover:dark:text-blue-500 cursor-pointer">Forgot password</p>
            </div>
            <button v-if="!signingIn" class="w-full bg-blue-900 text-white rounded py-1 hover:bg-blue-950">Sign in</button>
            <button v-else class="w-full h-10 bg-blue-900 text-white rounded py-1 hover:bg-blue-950 flex items-center justify-center gap-x-2 animate-pulse" disabled>
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
                <span class="text-sm">Signing in</span>
            </button>
            <p class="!mt-10 text-center text-md">Not registered? <router-link :to="{ name: 'selectRole' }" class="hover:text-custom-primary hover:dark:text-blue-500 hover:underline cursor-pointer">Sign up</router-link></p>
        </form>
    </div>
</template>

<script setup>
import { auth, db } from '@config/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getDocs, collection, query, where, limit } from 'firebase/firestore'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@store'

const router = useRouter()
const route = useRoute()

// pinia store
const authStore = useAuthStore()

// login credentials
const email = ref('')
const password = ref('')

// userRole reference
const userRoleRef = collection(db, 'userRole')

// error messages
const errorMessage = ref('')
const userNotAccepted = ref('')
const invalidCred = ref(false)

const signingIn = ref(false)

// login function
const login = async () => {
    errorMessage.value = ''
    userNotAccepted.value = ''
    router.push({
        query: {}
    })

    try {
        signingIn.value = true

        const userCredential  = await signInWithEmailAndPassword(auth, email.value, password.value )
        const user = userCredential.user

        const q = query(
            userRoleRef,
            where("userId", "==", user.uid),
            limit(1)
        )

        const roleSnapShot = await getDocs(q)

        if(roleSnapShot.empty){
            errorMessage.value = 'Failed to login. Contact admin'
            console.log('Not enough information')
            return 
        }

        const roleDocs = roleSnapShot.docs[0]
        const userRole = roleDocs.data()

        // remove query from the route
        // router.replace('/')

        if (userRole.isDeleted) {
            invalidCred.value = true
        }

        // show message base on user role if user is not accepted
        if (!userRole.isAccepted) {
            userNotAccepted.value = userRole.role === 'school'
                ? 'Wait for the admin to accept your registration.'
                : 'Wait for your school to accept your registration.'
            return
        }

        // call pinia login action
        authStore.login(user.accessToken, userRole.role)

        // if accepted logic
        if(userRole.role === 'school'){
            router.push('/school')
        }else if(userRole.role === 'athlete'){
            router.push('/athlete')
        }else if(userRole.role === 'coach'){
            router.push('/coach')
        }else{
            router.push('/admin')
        }
        
    } catch (error) {
        console.log(error.message)

        errorMessage.value = error.code
    }finally{
        signingIn.value = false
    }
}
</script>

<style scoped>

</style>