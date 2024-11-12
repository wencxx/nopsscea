<template>
    <div class="fixed top-0 left-0 bg-black/10 w-screen h-screen flex items-center justify-center">
        <form @submit.prevent="joinEvent" class="p-5 bg-white w-fit h-fit rounded shadow space-y-5 dark:text-black">
            <h1 class="text-center text-lg font-bold">Event Entry Form</h1>
            <div v-if="currentPage === 1" class="grid grid-cols-3 gap-3"> 
                <h2 class="col-span-3 font-bold">Basketball 5X5</h2>
                <h3 class="col-span-3">Senior</h3>
                <div class="flex flex-col">
                    <label>Mens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.b5x5m">
                </div>
                <div class="flex flex-col">
                    <label>Womens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.b5x5w">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.b5x5c">
                </div>
                <h3 class="col-span-3">Youth</h3>
                <div class="flex flex-col">
                    <label>Boys</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.b5x5b">
                </div>
                <div class="flex flex-col">
                    <label>Girls</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.b5x5g">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.b5x5yc">
                </div>
            </div>
            <div v-if="currentPage === 2" class="grid grid-cols-3 gap-3"> 
                <h2 class="col-span-3 font-bold">Basketball 3X3</h2>
                <h3 class="col-span-3">Senior</h3>
                <div class="flex flex-col">
                    <label>Mens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.b3x3m">
                </div>
                <div class="flex flex-col">
                    <label>Womens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.b3x3w">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.b3x3c">
                </div>
                <h3 class="col-span-3">Youth</h3>
                <div class="flex flex-col">
                    <label>Boys</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.b3x3b">
                </div>
                <div class="flex flex-col">
                    <label>Girls</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.b3x3g">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.b3x3yc">
                </div>
            </div>
            <div v-if="currentPage === 3" class="grid grid-cols-3 gap-3"> 
                <h2 class="col-span-3 font-bold">Beach Volleyball</h2>
                <h3 class="col-span-3">Senior</h3>
                <div class="flex flex-col">
                    <label>Mens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.bvm">
                </div>
                <div class="flex flex-col">
                    <label>Womens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.bvw">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.bvc">
                </div>
                <h3 class="col-span-3">Youth</h3>
                <div class="flex flex-col">
                    <label>Boys</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.bvb">
                </div>
                <div class="flex flex-col">
                    <label>Girls</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.bvg">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.ybvc">
                </div>
            </div>
            <div v-if="currentPage === 4" class="grid grid-cols-3 gap-3"> 
                <h2 class="col-span-3 font-bold">Football</h2>
                <h3 class="col-span-3">Senior</h3>
                <div class="flex flex-col">
                    <label>Mens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.fm">
                </div>
                <div class="flex flex-col">
                    <label>Womens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.fw">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.fc">
                </div>
                <h3 class="col-span-3">Youth</h3>
                <div class="flex flex-col">
                    <label>Boys</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.fb">
                </div>
                <div class="flex flex-col">
                    <label>Girls</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.fg">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.yfc">
                </div>
            </div>
            <div v-if="currentPage === 5" class="grid grid-cols-3 gap-3"> 
                <h2 class="col-span-3 font-bold">Sepak Takraw</h2>
                <h3 class="col-span-3">Senior</h3>
                <div class="flex flex-col">
                    <label>Mens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.stm">
                </div>
                <div class="flex flex-col">
                    <label>Womens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.stw">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.stc">
                </div>
                <h3 class="col-span-3">Youth</h3>
                <div class="flex flex-col">
                    <label>Boys</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.stb">
                </div>
                <div class="flex flex-col">
                    <label>Girls</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.stg">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.ystc">
                </div>
            </div>
            <div v-if="currentPage === 6" class="grid grid-cols-3 gap-3"> 
                <h2 class="col-span-3 font-bold">Volleyball</h2>
                <h3 class="col-span-3">Senior</h3>
                <div class="flex flex-col">
                    <label>Mens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.vm">
                </div>
                <div class="flex flex-col">
                    <label>Womens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.vw">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.vc">
                </div>
                <h3 class="col-span-3">Youth</h3>
                <div class="flex flex-col">
                    <label>Boys</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.vb">
                </div>
                <div class="flex flex-col">
                    <label>Girls</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.vg">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.yvc">
                </div>
            </div>
            <div v-if="currentPage === 7" class="grid grid-cols-3 gap-3"> 
                <h2 class="col-span-3 font-bold">Athletics</h2>
                <h3 class="col-span-3">Senior</h3>
                <div class="flex flex-col">
                    <label>Mens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.am">
                </div>
                <div class="flex flex-col">
                    <label>Womens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.aw">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.ac">
                </div>
                <h3 class="col-span-3">Youth</h3>
                <div class="flex flex-col">
                    <label>Boys</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.ab">
                </div>
                <div class="flex flex-col">
                    <label>Girls</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.ag">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.yac">
                </div>
            </div>
            <div v-if="currentPage === 8" class="grid grid-cols-3 gap-3"> 
                <h2 class="col-span-3 font-bold">Badminton</h2>
                <h3 class="col-span-3">Senior</h3>
                <div class="flex flex-col">
                    <label>Mens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.bm">
                </div>
                <div class="flex flex-col">
                    <label>Womens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.bw">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.bc">
                </div>
                <h3 class="col-span-3">Youth</h3>
                <div class="flex flex-col">
                    <label>Boys</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.bb">
                </div>
                <div class="flex flex-col">
                    <label>Girls</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.bg">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.ybc">
                </div>
            </div>
            <div v-if="currentPage === 9" class="grid grid-cols-3 gap-3"> 
                <h2 class="col-span-3 font-bold">Chess</h2>
                <h3 class="col-span-3">Senior</h3>
                <div class="flex flex-col">
                    <label>Mens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.cm">
                </div>
                <div class="flex flex-col">
                    <label>Womens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.cw">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.cc">
                </div>
                <h3 class="col-span-3">Youth</h3>
                <div class="flex flex-col">
                    <label>Boys</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.cb">
                </div>
                <div class="flex flex-col">
                    <label>Girls</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.cg">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.ycc">
                </div>
            </div>
            <div v-if="currentPage === 10" class="grid grid-cols-3 gap-3"> 
                <h2 class="col-span-3 font-bold">Dancesport</h2>
                <h3 class="col-span-3">Senior</h3>
                <div class="flex flex-col">
                    <label>Mens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.dm">
                </div>
                <div class="flex flex-col">
                    <label>Womens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.dw">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.dc">
                </div>
                <h3 class="col-span-3">Youth</h3>
                <div class="flex flex-col">
                    <label>Boys</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.db">
                </div>
                <div class="flex flex-col">
                    <label>Girls</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.dg">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.ydc">
                </div>
            </div>
            <div v-if="currentPage === 11" class="grid grid-cols-3 gap-3"> 
                <h2 class="col-span-3 font-bold">Karatedo</h2>
                <h3 class="col-span-3">Senior</h3>
                <div class="flex flex-col">
                    <label>Mens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.km">
                </div>
                <div class="flex flex-col">
                    <label>Womens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.kw">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.kc">
                </div>
                <h3 class="col-span-3">Youth</h3>
                <div class="flex flex-col">
                    <label>Boys</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.kb">
                </div>
                <div class="flex flex-col">
                    <label>Girls</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.kg">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.ykc">
                </div>
            </div>
            <div v-if="currentPage === 12" class="grid grid-cols-3 gap-3"> 
                <h2 class="col-span-3 font-bold">Swimming</h2>
                <h3 class="col-span-3">Senior</h3>
                <div class="flex flex-col">
                    <label>Mens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.sm">
                </div>
                <div class="flex flex-col">
                    <label>Womens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.sw">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.sc">
                </div>
                <h3 class="col-span-3">Youth</h3>
                <div class="flex flex-col">
                    <label>Boys</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.sb">
                </div>
                <div class="flex flex-col">
                    <label>Girls</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.sg">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.ysc">
                </div>
            </div>
            <div v-if="currentPage === 13" class="grid grid-cols-3 gap-3"> 
                <h2 class="col-span-3 font-bold">Table Tennis</h2>
                <h3 class="col-span-3">Senior</h3>
                <div class="flex flex-col">
                    <label>Mens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.tnm">
                </div>
                <div class="flex flex-col">
                    <label>Womens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.tnw">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.tnc">
                </div>
                <h3 class="col-span-3">Youth</h3>
                <div class="flex flex-col">
                    <label>Boys</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.tnb">
                </div>
                <div class="flex flex-col">
                    <label>Girls</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.tng">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.ytnc">
                </div>
            </div>
            <div v-if="currentPage === 14" class="grid grid-cols-3 gap-3"> 
                <h2 class="col-span-3 font-bold">Taekwondo</h2>
                <h3 class="col-span-3">Senior</h3>
                <div class="flex flex-col">
                    <label>Mens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.tm">
                </div>
                <div class="flex flex-col">
                    <label>Womens</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.tw">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.tc">
                </div>
                <h3 class="col-span-3">Youth</h3>
                <div class="flex flex-col">
                    <label>Boys</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.tb">
                </div>
                <div class="flex flex-col">
                    <label>Girls</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.tg">
                </div>
                <div class="flex flex-col">
                    <label>Combined</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.ytc">
                </div>
            </div>
            <div class="flex justify-end gap-x-5 !mt-10">
                <button v-if="currentPage === 1" class="border border-blue-900 text-blue-900 w-1/5 py-1 rounded" type="button" @click="closeModal">Close</button>
                <button v-if="currentPage === 2" class="border border-blue-900 text-blue-900 w-1/5 py-1 rounded" type="button" @click="currentPage--" :disabled="currentPage === 1">Back</button>
                <button v-if="currentPage === 14 && joining" class="border border-transparent bg-blue-900 text-white w-1/5 py-1 rounded animate-pulse" disabled>Joining</button>
                <button v-if="currentPage === 14 && !joining" class="border border-transparent bg-blue-900 text-white w-1/5 py-1 rounded">Join</button>
                <button v-if="currentPage < 14 && !joining" class="border border-transparent bg-blue-900 text-white w-1/5 py-1 rounded" type="button" @click="currentPage++">Next</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import { db, auth } from '@config/firebaseConfig'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()
const route = useRoute()

const emit = defineEmits(['joinedEvent', 'closeModal'])

const closeModal = () => {
    emit('closeModal')
}

const formData = ref({
    b5x5m: '',
    b5x5w: '',
    b5x5c: '',
    b5x5b: '',
    b5x5g: '',
    b5x5yc: '',
    b3x3m: '',
    b3x3w: '',
    b3x3c: '',
    b3x3b: '',
    b3x3g: '',
    b3x3yc: '',
    bvm: '',
    bvw: '',
    bvc: '',
    bvb: '',
    bvm: '',
    ybvc: '',
    fm: '',
    fw: '',
    fc: '',
    fb: '',
    fg: '',
    yfc: '',
    fm: '',
    fw: '',
    fc: '',
    fb: '',
    fg: '',
    yfc: '',
    stm: '',
    stw: '',
    stc: '',
    stb: '',
    stg: '',
    ystc: '',
    vm: '',
    vw: '',
    vc: '',
    vb: '',
    vg: '',
    yvc: '',
    am: '',
    aw: '',
    ac: '',
    ab: '',
    ag: '',
    yac: '',
    bm: '',
    bw: '',
    bc: '',
    bb: '',
    bg: '',
    ybc: '',
    cm: '',
    cw: '',
    cc: '',
    cb: '',
    cg: '',
    ycc: '',
    dm: '',
    dw: '',
    dc: '',
    db: '',
    dg: '',
    ydc: '',
    km: '',
    kw: '',
    kc: '',
    kb: '',
    kg: '',
    ykc: '',
    sm: '',
    sw: '',
    sc: '',
    sb: '',
    sg: '',
    ysc: '',
    tnm: '',
    tnw: '',
    tnc: '',
    tnb: '',
    tng: '',
    ytnc: '',
    tm: '',
    tw: '',
    tc: '',
    tb: '',
    tg: '',
    ytc: '',
})

const user = auth.currentUser

// collection
const formRef = collection(db, 'forms')
const joining = ref(false)

const joinEvent = async () => {
    try {
        joining.value = true
        await addDoc(formRef, {
            ...formData.value,
            eventId: route.params.id,
            eventId: route.params.id,
            addedAt: Timestamp.now(),
            schoolId: user.uid
        })

        emit('joinedEvent')
        joining.value = false
    } catch (error) {
        $toast.error(error.message)
    }
}

const currentPage = ref(1)
</script>