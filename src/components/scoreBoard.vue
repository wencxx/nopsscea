<template>
    <div class="fixed top-0 left-0 h-screen w-screen bg-black/10 flex items-center justify-center">
        <div class="bg-white rounded-xl w-full max-w-3xl h-fit p-5 pb-10 flex flex-col items-center gap-y-14 border relative">
            <Icon icon="mdi:close" class="absolute top-2 right-2 text-xl cursor-pointer" @click="emit('closeScoreboard')" />
            <div class="text-center">
                <h1 class="text-xl font-semibold tracking-wide uppercase">{{ scheduleDetails.sport }} SCOREBOARD</h1>
                <p class="text-sm uppercase font-semibold tracking-wide text-gray-500">{{ moment(scheduleDetails.dateTime).format('lll') }} - {{ scheduleDetails.status }}</p>
            </div>
            <div class="w-full flex justify-center items-center gap-x-3">
                <div v-if="role === 'admin' && scheduleDetails.status !== 'waiting'" class="flex flex-col text-2xl gap-y-2">
                    <button class="bg-green-500 text-white rounded-full px-2" @click="incrementScore('part1')">+</button>
                    <button class="bg-red-500 text-white rounded-full px-2" @click="decrementScore('part1')">-</button>
                </div>
                <div class="flex items-center justify-between border h-20 gap-x-1 w-3/4 relative rounded-full">
                    <div class="flex items-center gap-x-3 h-full">
                        <div class="border-r h-full w-16 flex items-center justify-center">
                            <h1 class="font-bold text-2xl text-blue-900">{{ scheduleDetails.part1Score }}</h1>
                        </div>
                        <div>
                            <h1 class="text-2xl font-semibold tracking-wide">{{ scheduleDetails.part1ABBR }}</h1>
                            <div v-if="scheduleDetails.status === 'ended'">
                                <p v-if="scheduleDetails.part1Score > scheduleDetails.part2Score" class="-mt-2 text-sm font-semibold text-green-500 tracking-wide">Winner</p>
                                <p v-else class="-mt-2 text-sm font-semibold text-red-500 tracking-wide">Loser</p>
                            </div>
                        </div>
                    </div>
                    <div class="w-32 bg-gray-100 aspect-square rounded-full border flex items-center justify-center absolute left-1/2 -translate-x-1/2">
                        <h1 class="text-3xl font-bold text-blue-900">V<span class="text-red-700">S</span></h1>
                    </div>
                    <div class="flex items-center gap-x-3 h-full">
                        <div>
                            <h1 class="text-2xl font-semibold tracking-wide">{{ scheduleDetails.part2ABBR }}</h1>
                            <div v-if="scheduleDetails.status === 'ended'">
                                <p v-if="scheduleDetails.part2Score > scheduleDetails.part1Score" class="-mt-2 text-sm font-semibold text-green-500 tracking-wide">Winner</p>
                                <p v-else class="-mt-2 text-sm font-semibold text-red-500 tracking-wide">Loser</p>
                            </div>
                        </div>
                        <div class="border-l h-full w-16 flex items-center justify-center">
                            <h1 class="font-bold text-2xl text-red-700">{{ scheduleDetails.part2Score }}</h1>
                        </div>
                    </div>
                </div>
                <div v-if="role === 'admin' && scheduleDetails.status !== 'waiting'" class="flex flex-col text-2xl gap-y-2">
                    <button class="bg-green-500 text-white rounded-full px-2" @click="incrementScore('part2')">+</button>
                    <button class="bg-red-500 text-white rounded-full px-2" @click="decrementScore('part2')">-</button>
                </div>
            </div>
            <div class="flex items-center justify-center gap-x-5 w-full" v-if="role === 'admin'">
                <button class="bg-blue-900 w-2/12 py-1 rounded text-white hidden" :class="{ '!block': scheduleDetails.status === 'waiting' }" @click="toggleScheduleStatus('start')" :disabled="scheduleDetails.status === 'started'">START</button>
                <button class="bg-green-500 w-2/12 py-1 rounded text-white hidden" :class="{ '!block': scheduleDetails.status !== 'waiting' }" @click="toggleScheduleStatus('waiting')">UNDO</button>
                <button class="bg-red-700 w-2/12 py-1 rounded text-white hidden" :class="{ '!block': scheduleDetails.status === 'started' }" @click="toggleScheduleStatus('end')">END</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import moment from "moment";
import { computed } from "vue";
import { db } from '@config/firebaseConfig'
import { doc, updateDoc, increment } from 'firebase/firestore'

const role = computed(() => localStorage.getItem('role'))

const emit = defineEmits(['closeScoreboard'])

const { scheduleDetails } = defineProps({
    scheduleDetails: Object
})

const scheduleRef = doc(db, 'schedules', scheduleDetails.id)

// change schedule status
const toggleScheduleStatus = async (type) => {
    try {
        if(type === 'start'){
            await updateDoc(scheduleRef, {
                status: 'started'
            })

            scheduleDetails.status = 'started'
        }else if(type === 'end'){
            await updateDoc(scheduleRef, {
                status: 'ended'
            })

            scheduleDetails.status = 'ended'
        }else{
            await updateDoc(scheduleRef, {
                status: 'waiting'
            })

            scheduleDetails.status = 'waiting'
        }

    } catch (error) {
        console.log(error)
    }
}

// add score
const incrementScore = async (partType) => {
    try {
        if(partType === 'part1'){
            scheduleDetails.part1Score++

            await updateDoc(scheduleRef, {
                part1Score: increment(1)
            })
        }else{
            scheduleDetails.part2Score++

            await updateDoc(scheduleRef, {
                part2Score: increment(1)
            })
        }
    } catch (error) {
        console.log(error)
    }
}

// add score
const decrementScore = async (partType) => {
    try {
        if(partType === 'part1'){
            scheduleDetails.part1Score--

            await updateDoc(scheduleRef, {
                part1Score: increment(-1)
            })
        }else{
            scheduleDetails.part2Score--

            await updateDoc(scheduleRef, {
                part2Score: increment(-1)
            })
        }
    } catch (error) {
        console.log(error)
    }
}
</script>