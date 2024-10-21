<template>
    <div class="flex flex-col gap-y-5">
        <!-- header -->
        <div class="flex gap-x-20">
            <div>
                <h1 class="text-lg font-semibold">Event: <span class="font-medium">Nopsscea season 33</span></h1>
                <h1 class="text-lg font-semibold">Status: <span class="font-medium">Not started</span></h1>
            </div>
            <div>
                <h1 class="text-lg font-semibold">Start date: <span class="font-medium">Jan 10, 2023</span></h1>
                <h1 class="text-lg font-semibold">End date: <span class="font-medium">Feb 10, 2023</span></h1>
            </div>
        </div>
        <!-- {{ role }} -->
        <!-- charts -->
        <div class="grid grid-cols-3 gap-4">
            <div class="col-span-3 grid grid-cols-4 gap-4 bg-gray-100 dark:bg-neutral-800 border dark:border-gray-100/10 rounded-xl p-3">
                <div class="border rounded-xl bg-gray-200 dark:bg-neutral-800 dark:border-gray-100/10 p-5 flex items-center justify-between h-36">
                    <div>
                        <h1 class="text-4xl font-bold">15</h1>
                    </div>
                    <div class="flex flex-col items-end">
                        <Icon icon="lucide:school-2" class="text-4xl text-red-700" />
                        <h3 class="capitalize text-lg">Total Participants</h3>
                    </div>
                </div>
                <div class="border rounded-xl bg-gray-200 dark:bg-neutral-800 dark:border-gray-100/10 p-5 flex items-center justify-between h-36">
                    <div>
                        <h1 class="text-4xl font-bold">100</h1>
                    </div>
                    <div class="flex flex-col items-end">
                        <Icon icon="material-symbols:sports-martial-arts-rounded" class="text-4xl text-blue-900" />
                        <h3 class="capitalize text-lg">Total Athletes</h3>
                    </div>
                </div>
                <div class="border rounded-xl bg-gray-200 dark:bg-neutral-800 dark:border-gray-100/10 p-5 flex items-center justify-between h-36">
                    <div>
                        <h1 class="text-4xl font-bold">15</h1>
                    </div>
                    <div class="flex flex-col items-end">
                        <Icon icon="material-symbols:sports-kabaddi-rounded" class="text-4xl text-red-700" />
                        <h3 class="capitalize text-lg">Total Coaches</h3>
                    </div>
                </div>
                <div class="border rounded-xl bg-gray-200 dark:bg-neutral-800 dark:border-gray-100/10 p-5 flex items-center justify-between h-36">
                    <div>
                        <h1 class="text-4xl font-bold">15</h1>
                    </div>
                    <div class="flex flex-col items-end">
                        <Icon icon="lucide:school-2" class="text-4xl text-blue-900" />
                        <h3 class="capitalize text-lg">Total Participants</h3>
                    </div>
                </div>
            </div>
            <div class="col-span-2 grid grid-cols-4 gap-4 bg-gray-100 dark:bg-neutral-800 border dark:border-gray-100/10 rounded-xl p-3">
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const role = localStorage.getItem('role')
</script>
