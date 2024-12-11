<template>
    <div class="fixed top-0 left-0 w-screen h-screen bg-black/10 !mt-0 flex items-center justify-center">
        <form @submit.prevent="updateStatus" class="w-full max-w-sm rounded-md bg-white h-fit p-5 flex flex-col items-center gap-y-4">
            <h1 class="capitalize font-semibold text-lg">Reason for declining</h1>
            <p v-if="emptyReason" class="bg-red-500 w-full text-start pl-2 text-white rounded -mb-2">Please enter a reason.</p>
            <input type="text" list="reasonList" placeholder="Enter reason for not qualifying" class="w-full pl-2 border rounded h-8" v-model="reason">
            <datalist id="reasonList">
                <option>Overage</option>
                <option>Transcript of Records</option>
                <option>Birth Certificate</option>
            </datalist>
            <div class="flex w-full justify-end gap-x-3">
                <button type="button" class="bg-red-500 px-2 text-white rounded" @click="emit('closeModal')">Close</button>
                <button v-if="!updating" class="bg-green-500 px-2 text-white rounded">Submit</button>
                <button v-else class="bg-green-500 px-2 text-white rounded animate-pulse" disabled>Submitting</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { db } from '@config/firebaseConfig.js'
import { query, collection, where, limit, updateDoc, getDocs, doc } from 'firebase/firestore'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()

const emit = defineEmits(['closeModal', 'confirmed'])
const { athleteID } = defineProps({
    athleteID: String
})

const reason = ref('')

const updating = ref(false)
const emptyReason = ref(false)

const updateStatus = async () => {
    emptyReason.value = false
    try {
        if(!reason.value) return emptyReason.value = true
        updating.value = true
        const q = query(
            collection(db, 'athletes'),
            where('athleteId', '==', athleteID),
            limit(1)
        )

        const snapshot = await getDocs(q)

        await updateDoc(doc(db, 'athletes', snapshot.docs[0].id), {
            status: 'Not Qualified',
            reason: reason.value
        })

        updating.value = false
        emit('confirmed', reason.value)
        $toast.success('Updated athlete status successfully')
    } catch (error) {
        $toast.success('Failed to update athlete status')
        console.log(error)
    }
}
</script>