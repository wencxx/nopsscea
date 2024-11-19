<template>
    <div class="bg-black/10 h-screen w-screen fixed top-0 left-0 !mt-0 flex items-center justify-center">
        <div class="bg-white w-full max-w-md h-fit p-5 flex flex-col gap-y-5 rounded-md border items-center">
            <Icon icon="mdi:warning" class="text-red-500 text-8xl" />
            <p class="w-full px-2 py-1 bg-red-300 border border-red-400 rounded text-gray-950 text-sm">Removing this {{ user }} will also {{ type }} all related data.</p>
            <h3 class="text-center text-2xl font-medium">Are you sure you want to {{ type }} this <span class="capitalize">{{ user }}</span>?</h3>
            <div class="w-full flex justify-center gap-x-3 mt-2">
                <button class="w-1/3 py-1 text-white rounded bg-green-500" @click="emit('closeModal')">Cancel</button>
                <button class="w-1/3 py-1 text-white rounded bg-red-500" @click="emit('acceptDelete')">Yes</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const { user, type } = defineProps({
    user: String,
    type: String,
})

const emit = defineEmits(['closeModal', 'acceptDelete'])
</script>