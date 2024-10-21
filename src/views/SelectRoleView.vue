<template>
    <div class="dark:text-white flex items-center justify-center">
        <div class="flex items-center justify-center gap-x-5">
            <router-link :to="{ name: 'registerSchool' }" class="bg-blue-900 dark:bg-white dark:text-custom-primary text-white rounded w-[8dvw] text-center py-2 hover:bg-blue-950 hover:dark:bg-gray-200">School</router-link>
            <router-link class="bg-blue-900 dark:bg-white dark:text-custom-primary text-white rounded w-[8dvw] text-center py-2 hover:bg-blue-950 hover:dark:bg-gray-200">Coach</router-link>
            <router-link :to="{ name: 'registerAthlete' }" class="bg-blue-900 dark:bg-white dark:text-custom-primary text-white rounded w-[8dvw] text-center py-2 hover:bg-blue-950 hover:dark:bg-gray-200">Athlete</router-link>
        </div>
        <router-link :to="{ name: 'login' }" class=" text-lg underline absolute left-1/2 bottom-32 -translate-x-1/2 hover:text-red-500" >Back</router-link>
    </div>
</template>

<script setup>

</script>