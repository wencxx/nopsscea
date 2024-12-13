<template>
    <div class="fixed top-0 left-0 bg-black/10 w-screen h-screen !mt-0 flex items-center justify-center">
        <form @submit.prevent="addComment" class="bg-white w-full max-w-sm h-fit rounded-md p-3 space-y-3">
            <h1 class="text-center text-lg font-semibold tracking-wide">Comment</h1>
            <textarea class="border w-full min-h-44 p-2" v-model="comment"></textarea>
            <div class="flex w-full justify-end gap-x-4">
                <button class="bg-red-500 w-1/4 text-white rounded" type="button" @click="emit('closeModal')">Close</button>
                <button v-if="!commenting" class="bg-green-500 w-1/4 text-white rounded">Submit</button>
                <button v-else class="bg-green-500 w-1/4 text-white rounded animate-pulse" disabled>Submitting</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '@config/firebaseConfig.js'
import { doc, updateDoc, arrayUnion, arrayRemove  } from 'firebase/firestore'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()

const route = useRoute()

const emit = defineEmits(['closeModal'])

const { commentDetails, trainingDetails } = defineProps({
    commentDetails: Object,
    trainingDetails: Object
})

const comment = ref(commentDetails.comment || '')
const trainingRef = doc(db, 'trainings', route.params.id)
const commenting = ref(false)

const addComment = async () => {
    try {
        commenting.value = true
        const athleteAttendance = trainingDetails.attendance?.find(item => item.athlete === commentDetails.athleteId);
        if (!athleteAttendance) {
            await updateDoc(trainingRef, {
                attendance: arrayUnion({ athlete: commentDetails.athleteId, rating: 0, comment: comment.value })
            });
        } else {
            const oldRating = athleteAttendance.rating;
            const oldComment = athleteAttendance.comment;
            if(athleteAttendance.comment){
                console.log(athleteAttendance.comment)
                await updateDoc(trainingRef, {
                    attendance: arrayRemove({ athlete: commentDetails.athleteId, rating: oldRating, comment: oldComment })
                });
                await updateDoc(trainingRef, {
                    attendance: arrayUnion({ athlete: commentDetails.athleteId, rating: oldRating, comment: comment.value })
                });
            }else{
                await updateDoc(trainingRef, {
                    attendance: arrayRemove({ athlete: commentDetails.athleteId, rating: oldRating })
                });
                await updateDoc(trainingRef, {
                    attendance: arrayUnion({ athlete: commentDetails.athleteId, rating: oldRating, comment: comment.value })
                });
            }
            athleteAttendance.comment = comment.value
        }

        commenting.value = false
        $toast.success('Commented successfully')
    } catch (error) {
        console.error('Error rating athlete:', error);
        $toast.success('Failed to add comment')
    }
};
</script>