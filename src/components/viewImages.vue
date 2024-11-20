<template>
    <div class="w-screen h-screen top-0 left-0 fixed bg-black/10 !mt-0 flex items-center justify-between px-3">
        <div class="bg-gray-300 p-2 text-xl rounded-full cursor-pointer" @click="prev">
            <Icon icon="mdi:keyboard-arrow-left" />
        </div>
        <div class="w-full max-w-5xl h-[80%]">
            <img :src="images[currentShowing].downloadUrl" alt="certificates" class="w-full h-full object-fit">
        </div>
        <div class="bg-gray-300 p-2 text-xl rounded-full cursor-pointer"  @click="next">
            <Icon icon="mdi:keyboard-arrow-right" />
        </div>
        <div class="absolute top-5 right-16 bg-black/25 p-2 rounded-full cursor-pointer" @click="deleteImage(images[currentShowing].file, images[currentShowing].id)">
            <Icon icon="mdi:trash" class="text-lg text-white" />
        </div>
        <div class="absolute top-5 right-5 bg-black/25 p-2 rounded-full cursor-pointer" @click="emit('closeModal')">
            <Icon icon="mdi:close" class="text-lg text-white"  />
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { storage, db } from '../config/firebaseConfig'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { doc, deleteDoc } from 'firebase/firestore'

const { images, currentImage } = defineProps({
    images: Array,
    currentImage: Number
})

const currentShowing = ref(currentImage || 0)

const emit = defineEmits(['closeModal', 'deleteImage'])

const prev = () => {
    if(currentShowing.value === 0){
        currentShowing.value = images.length - 1
    }else{
        currentShowing.value--
    }
}

const next = () => {
    if(currentShowing.value === images.length - 1){
        currentShowing.value = 0
    }else{
        currentShowing.value++
    }
}

// delete image
const deleteImage = async (file, id) => {
    try {
        const imageRef = storageRef(storage, `certs/${file}`)
        const docRef = doc(db, 'certificates', id)

        await deleteObject(imageRef)
        await deleteDoc(docRef)

        emit('deleteImage', currentShowing.value)
        console.log('Successfull')
    } catch (error) {
        console.log(error)
    }
}
</script>