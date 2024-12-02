<template>
  <div class="flex font-inter text-white-primary-text  dark:text-dark-primary-text">
      <sideBar v-if="isAuth" class="hidden lg:block" />
      <div class="w-full h-screen relative dark:bg-dark-bg">
        <headerComponent v-if="isAuth" />
        <!-- router views -->
        <router-view :class="{ 'py-[15dvh] !w-10/12 mx-auto': isAuth }" class="w-full duration-300 font-inter h-full dark:bg-custom-darker overflow-y-auto"  id="content" />
      </div>
  </div>
</template>

<script setup>
// import components
import sideBar from '@components/sideBar.vue'
import headerComponent from '@components/header.vue'

import { computed, ref } from "vue"
import { useRouter } from 'vue-router'
import { auth } from '@config/firebaseConfig'
import { signOut } from 'firebase/auth'
import { useAuthStore } from '@store'

const router = useRouter()
const authStore = useAuthStore()

const isAuth = computed(() => authStore.isAuthenticated) 

const role = ref('')
const currentUser = ref({})

const unSubscribe = auth.onAuthStateChanged(user => {
    if (user) {
        authStore.user = user
        currentUser.value = user
        role.value = localStorage.getItem('role')
    } else {
        authStore.user = null
        authStore.isAuthenticated = false
        currentUser.value = null
    }
})
</script>

<style scoped>
#content::-webkit-scrollbar {
  display: none;
}
</style>