<template>
    <div class="bg-black/10 w-screen h-screen fixed top-0 left-0  !mt-0 flex items-center justify-center">
        <div class="bg-white w-full max-w-sm rounded-md border shadow h-fit p-5 space-y-5">
            <h1 class="text-center text-xl">Add Certificates</h1>
            <h1 v-if="hasEmptyField" class="bg-red-500 text-white pl-2 rounded py-1">Fill out empty fields</h1>
            <div class="flex flex-col gap-y-1">
                <label>Document Type</label>
                <select class="h-8 rounded border" v-model="documentType">
                    <option value="" disabled>Select document type</option>
                    <option>Birth Certificate</option>
                    <option>Transcript of Records</option>
                </select>
            </div>
            <div class="flex flex-col gap-y-1">
                <label>Insert File</label>
                <input type="file" accept=".jpg, .jpeg, .jpg, .png, .docx, .docs" @change="changeFileUpload">
            </div>
            <div class="flex gap-x-2 justify-end !mt-8">
                <button class="border border-blue-900 text-blue-900 w-1/3 rounded" @click="closeModal">Close</button>
                <button v-if="!addingDocs" class="bg-blue-900 text-white w-1/3 rounded" @click="addDocument">Add</button>
                <button v-else class="bg-blue-900 text-white w-1/3 rounded animate-pulse" disabled>Adding</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, defineEmits, ref } from 'vue';
import { db, storage } from '@config/firebaseConfig'
import { addDoc, collection } from 'firebase/firestore';
import { ref as storageRef, getDownloadURL, uploadBytes } from 'firebase/storage'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { useAuthStore } from '@store'

const authStore = useAuthStore()
const $toast = useToast()

const currentUser = computed(() => authStore.user)

const emit = defineEmits(['closeModal'])

const closeModal = () => {
    emit('closeModal')
}

const documentType = ref('')
const fileToBeUploaded = ref(null)
const fileName = ref('')

const changeFileUpload = () => {
    const file = event.target.files[0]

    fileName.value = file.name
    fileToBeUploaded.value = file
}

const hasEmptyField = ref(false)
const addingDocs = ref(false)

const docReference = collection(db, 'documents')

const addDocument = async () => {
    if(fileToBeUploaded.value === null || !documentType.value) return hasEmptyField.value = true

    try {
        addingDocs.value = true
        const storagePath = `documents/${fileName.value}`

        const storageReference = storageRef(storage, storagePath)

        await uploadBytes(storageReference, fileToBeUploaded.value)

        const downloadUrl = await getDownloadURL(storageReference)

        const snapshot = await addDoc(docReference, {
            userId: currentUser.value.uid,
            documentType: documentType.value,
            file: fileName.value,
            downloadUrl: downloadUrl
        })

        if(!snapshot.empty) {
            const data = {
                id: snapshot.id,
                userId: currentUser.value.uid,
                documentType: documentType.value,
                file: fileName.value,
                downloadUrl: downloadUrl
            }

            emit('closeModal', data)

            $toast.success('Uploaded document successfully')
        }
    } catch (error) {
        $toast.error('Failed uploading document')
        console.log(error)
    }finally{
        addingDocs.value = false
    }
}
</script>