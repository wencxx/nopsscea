<template>
    <div class="fixed top-0 left-0 bg-black/10 h-screen w-screen flex items-center justify-center px-5">
        <div class="w-full max-w-3xl h-fit bg-white rounded-md border p-5 space-y-3 relative">
            <Icon icon="mdi:close" class="absolute top-4 right-4 text-lg cursor-pointer" @click="emit('closeModal')" />
            <h1 class="text-center font-semibold text-lg">{{ schoolName }} Athletes</h1>
            <div class="w-full h-[60dvh] overflow-auto">
                <table class="!w-full tracking-wide rounded overflow-hidden">
                    <thead>
                        <tr>
                            <th class="w-2/6 py-1 border dark:border-gray-100/10 font-medium">Name</th>
                            <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Sport</th>
                            <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Email</th>
                        </tr>
                    </thead>
                    <tbody v-if="athletes.length">
                        <tr class="text-md" v-for="(athlete, index) in athletes" :key="index">
                            <td class="p-2 border dark:border-gray-100/10">
                                <div class="flex gap-x-3">
                                    <img :src="athlete?.photoUrl" alt="school logo" class="w-16 aspect-square rounded object-cover">
                                    <div class="flex flex-col justify-center">
                                        <h1 class="text-md capitalize">{{ athlete.firstName  }} {{ athlete.middleName  }} {{ athlete.lastName  }}</h1>
                                        <p class="text-xs text-gray-500 font-semibold uppercase">{{ athlete.address }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="p-2 border dark:border-gray-100/10 text-center">{{ athlete.sport }}</td>
                            <td class="p-2 border dark:border-gray-100/10 text-center">{{ athlete.email }}</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="3" class="p-2 border dark:border-gray-100/10 text-center">No athletes to show</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['closeModal'])


const { schoolName, athletes } = defineProps({
    schoolName: String,
    athletes: Array,

})
</script>