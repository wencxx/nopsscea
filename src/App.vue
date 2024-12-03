<template>
  <div class="flex font-inter text-white-primary-text  dark:text-dark-primary-text">
      <sideBar v-if="isAuth" class="hidden lg:block" />
      <div class="w-full h-screen relative dark:bg-dark-bg">
        <headerComponent v-if="isAuth" />
        <!-- router views -->
        <router-view :class="{ 'py-[15dvh] !w-10/12 mx-auto': isAuth }" class="w-full duration-300 font-inter h-full dark:bg-custom-darker overflow-y-auto"  id="content" />
        <div class="absolute bottom-0 left-0 bg-white dark:bg-neutral-900 border-t h-[10dvh] w-full flex items-center justify-center gap-x-5 lg:hidden">
          <router-link :to="{ name: 'ongoingEvents' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'athleteNewsfeed' }">  
            <Icon icon="mdi:event" class="text-5xl" />
          </router-link>
          <router-link :to="{ name: 'athleteNewsfeed' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'athleteNewsfeed' }">  
            <Icon icon="mdi:home" class="text-5xl" />
          </router-link>
          <router-link :to="{ name: 'athleteProfile' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'athleteNewsfeed' }">  
            <Icon icon="mdi:user" class="text-5xl" />
          </router-link>
          <router-link :to="{ name: 'forms' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'forms' }">  
            <Icon icon="clarity:form-line" class="text-5xl" />
          </router-link>
          <router-link :to="{ name: 'filledOut' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'forms' }">  
            <Icon icon="clarity:form-line" class="text-5xl" />
          </router-link>
        </div>
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