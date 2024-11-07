<template>
    <header class="bg-white/55 backdrop-blur-sm dark:bg-dark-bg/85 absolute w-10/12 h-[6dvh] left-1/2 -translate-x-1/2 top-5 rounded-md border dark:border-gray-100/10">
        <div class="flex items-center justify-between h-full w-full px-8">
            <div class="flex items-center space-x-4">
              <Icon icon="carbon:search" class="dark:text-dark-primary-text text-2xl" />
              <p class="text-md dark:text-dark-primary-text cursor-pointer">Search</p>
            </div>
            <div class="flex items-center gap-x-3">
              <Icon icon="line-md:moon-alt-loop" class="text-2xl cursor-pointer hidden dark:block dark:text-dark-primary-text" @click="toggleDarkmode" />
              <Icon icon="line-md:sun-rising-loop" class="text-2xl cursor-pointer text-yellow-500 block dark:hidden" @click="toggleDarkmode"/>
              <div class="relative">
                  <Icon @click="toggleNotifications = !toggleNotifications" icon="ion:notifications-outline" class="text-2xl dark:text-dark-primary-text cursor-pointer" />
                  <div v-if="hasNotSeenNotifications" class="h-2 aspect-square bg-red-500 rounded-full absolute right-[2px] top-0"></div>
                  <div v-if="toggleNotifications" class="border absolute right-0 top-[120%] h-40 w-44 bg-gray-100 dark:bg-neutral-800 dark:border-gray-100/10 rounded p-2">
                    <h1 class="text-sm">Notifications</h1>
                    <div class="flex flex-col gap-y-2 h-[6.8rem] overflow-y-hidden">
                        <div v-for="notif in notifications" :key="notif.id" class="bg-gray-200 p-2 rounded flex items-center gap-x-2" :class="{ '!bg-white': !notif.isRead }">
                            <img src="../assets/images/logo.png" class="w-5 aspect-square">
                            <p class="text-xs line-clamp-1">{{ notif.message }}</p>
                        </div>
                    </div>
                    <p class="text-xs text-center mt-auto cursor-pointer">View all</p>
                  </div>
              </div>
              <div class="h-[4dvh] aspect-square rounded-full relative">
                  <img @click="toggleDropdownMenu = !toggleDropdownMenu" v-if="currentUser?.photoURL" :src="currentUser?.photoURL" class="h-full aspect-square rounded-full object-cover" />
                  <div @click="toggleDropdownMenu = !toggleDropdownMenu" v-else class="h-full aspect-square rounded-full bg-gray-300/35 dark:bg-gray-100/10 flex items-center justify-center">
                      <p>{{ currentUser?.displayName.split('')[0] }}</p>
                  </div>
                  <!-- dropdown menu -->
                  <div v-if="toggleDropdownMenu" class="absolute w-32 border dark:border-gray-100/10 p-1 right-0 flex flex-col items-center rounded bg-white dark:bg-neutral-800"> 
                      <button @click="logOut" class="text-sm flex items-center justify-center rounded gap-x-2 hover:bg-gray-100/10 w-full">
                        <Icon icon="mdi:sign-out" />
                        <span>Sign out</span>
                      </button>
                  </div>
              </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue"
import { useRouter } from 'vue-router'
import { useAuthStore } from '@store'
import { auth, db } from '@config/firebaseConfig'
import { signOut } from 'firebase/auth'
import { collection, onSnapshot, query, where } from "firebase/firestore"

const router = useRouter()
const authStore = useAuthStore()

const currentUser = computed(() => authStore.user) 

// toggle dropdown menu
const toggleDropdownMenu = ref(false)
// togglee notifications
const toggleNotifications = ref(false)

// Toggle Dark Mode and store the preference in localStorage
const toggleDarkmode = () => {
  const isDarkMode = document.documentElement.classList.toggle('dark')
  // Store the preference in localStorage
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
}

// Apply the stored preference when the page loads
const applyThemePreference = () => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// sign out
const logOut = async () => {
  try {
      await signOut(auth)

      authStore.logout()

      if (!authStore.isAuthenticated) {
          router.push('/');
      } 
  } catch (error) {
    console.log(error)
  }
}

// get notifications
const notifRef = collection(db, 'notifications')

const notifications = ref([])
const hasNotSeenNotifications = computed(() => notifications.value.some(notification => notification.isSeen === false))

const getNotifications = async () => {
    if (currentUser.value?.uid) {
        try {
            onSnapshot(
                query(
                    notifRef,
                    where('to', '==', currentUser.value?.uid)
                ),
                (snapshot) => {
                    notifications.value = []; 
                    snapshot.forEach(doc => {
                        notifications.value.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                }
            );
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    } else {
        console.log('No user is logged in.');
    }
};

onMounted(() => {
    applyThemePreference();

    watch(() => currentUser.value, () => {
        getNotifications();
    });
});

</script>

<style scoped>

</style>