<template>
    <div class="w-screen h-screen top-0 left-0 fixed bg-black/10 !mt-0 flex items-center justify-center">
        <div class="w-full max-w-5xl h-[80%]">
            <img :src="images[currentImage].downloadUrl" alt="certificates" class="w-full h-full object-fit">
        </div>
        <div class="absolute top-5 right-5 bg-black/25 p-2 rounded-full">
            <Icon icon="mdi:close" class="text-lg text-white cursor-pointer" @click="emit('closeModal')" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const { images, currentImage } = defineProps({
    images: Array,
    currentImage: Number
})

const emit = defineEmits(['closeModal'])
</script>