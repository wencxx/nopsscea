<template>
    <div class="h-screen w-screen bg-black/10 fixed top-0 left-0 flex items-center justify-center">
        <form @submit.prevent="addMedal" class="bg-white p-4 rounded shadow space-y-5 dark:text-black">
            <h1 class="text-center text-lg" v-if="data.type === 'add'">Add Medal</h1>
            <h1 class="text-center text-lg" v-else>Remove Medal</h1>
            <p v-if="hasEmptyField" class="!-mb-3 bg-red-500 pl-2 text-white rounded">All fields are required</p>
            <div class="flex flex-col gap-y-2">
                <label>Gold</label>
                <input type="number" class="border rounded h-8 w-80 pl-2" v-model="medalData.gold">
            </div>
            <div class="flex flex-col gap-y-2">
                <label>Silver</label>
                <input type="number" class="border rounded h-8 w-80 pl-2" v-model="medalData.silver">
            </div>
            <div class="flex flex-col gap-y-2">
                <label>Bronze</label>
                <input type="number" class="border rounded h-8 w-80 pl-2" v-model="medalData.bronze">
            </div>
            <div class="flex justify-end gap-x-2">
                <button class="text-sm border border-blue-900 text-blue-900 w-1/4 py-1 rounded" type="button" @click="closeModal">Cancel</button>
                <button v-if="!adding" class="text-sm border border-transparent bg-blue-900 text-white w-1/4 py-1 rounded">
                    <span v-if="data.type === 'add'">Add</span>
                    <span v-else>Remove</span>
                </button>
                <button v-else class="text-sm border border-transparent bg-blue-900 text-white w-1/4 py-1 rounded animate-pulse" disabled>
                    <span v-if="data.type === 'add'">Adding</span>
                    <span v-else>Removing</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { db } from '@config/firebaseConfig.js'
import { getDocs, updateDoc, Timestamp, collection, query, where, limit, doc, increment } from 'firebase/firestore'
import { ref, onMounted, defineEmits, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()
const route = useRoute()

const emit = defineEmits(['closeModal', 'addedNewMedal'])
const { data } = defineProps({
    data: Object
})

const closeModal = () => {
    medalData.value = {
        school: '',
        gold: '',
        silver: '',
        bronze: '',
    }
    emit('closeModal')
}

// get participants
const partRef = collection(db, 'participants')
const participants = ref([])

const getParticipants = async () => {
    try {
        const q = query(
            partRef,
            where('eventId', '==', route.params.id)
        )

        const snapshot = await getDocs(q)

        snapshot.docs.forEach(doc => {
            participants.value.push({
                id: doc.id,
                schoolId: doc.data().schoolId
            })
        })
    } catch (error) {
        console.log(error)
    }
}

// add schedule
const medalData = ref({
    school: data.school,
    type: data.type,
    gold: 0,
    silver: 0,
    bronze: 0,
})

// add medal
const adding = ref(false)
const hasEmptyField = ref(false)

const addMedal = async () => {
    hasEmptyField.value = false
    const participantId =  participants.value.find(part => part.schoolId === data.school)

    const participantRef = doc(db, 'participants', participantId.id)
    try {
        adding.value = true


        if(data.type === 'add'){
            await updateDoc(participantRef, {
                gold: increment(medalData.value.gold),
                silver: increment(medalData.value.silver),
                bronze: increment(medalData.value.bronze),
            })

            $toast.success('Added medal successfully')
        }else{
            await updateDoc(participantRef, {
                gold: increment(-medalData.value.gold),
                silver: increment(-medalData.value.silver),
                bronze: increment(-medalData.value.bronze),
            })

            $toast.success('Removed medal successfully')
        }
        

        emit('addedNewMedal', medalData.value)
        closeModal()
    } catch (error) {
        console.log(error)
    } finally {
        adding.value = false
    }
}

onMounted(() => {
    getParticipants()
})
</script>