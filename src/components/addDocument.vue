<template>
    <div class="bg-black/10 w-screen h-screen fixed top-0 left-0  !mt-0 flex items-center justify-center">
        <div class="bg-white w-full max-w-sm rounded-md border shadow h-fit p-5 space-y-5">
            <div class="flex flex-col gap-y-1">
                <label>Document Type</label>
                <select class="h-8 rounded border">
                    <option>Select document type</option>
                    <option>Birth Certificate</option>
                    <option>Transcript of Records</option>
                </select>
            </div>
            <div class="flex flex-col gap-y-1">
                <label>Insert File</label>
                <input type="file">
            </div>
            <div class="flex gap-x-2 justify-end !mt-8">
                <button class="border border-blue-900 text-blue-900 w-1/3 rounded" @click="closeModal">Close</button>
                <button class="bg-blue-900 text-white w-1/3 rounded" @click="addDoc">Add</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';
import { db } from '@config/firebaseConfig'
import { addDoc, collection } from 'firebase/firestore';

const emit = defineEmits(['closeModal'])

const closeModal = () => {
    emit('closeModal')
}

const
</script>