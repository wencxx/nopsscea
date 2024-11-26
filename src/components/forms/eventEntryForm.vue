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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
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
                    <label>College</label>
                    <input type="number" class="border rounded h-8 pl-2" v-model="formData.ytc">
                </div>
            </div>
            <div class="flex justify-end gap-x-5 !mt-10">
                <button v-if="currentPage === 1 || currentPage === 14" class="border border-blue-900 text-blue-900 w-1/5 py-1 rounded" type="button" @click="closeModal">Close</button>
                <button v-if="currentPage > 1 && currentPage < 14" class="border border-blue-900 text-blue-900 w-1/5 py-1 rounded" type="button" @click="currentPage--" :disabled="currentPage === 1">Back</button>
                <button v-if="currentPage === 14 && joining" class="border border-transparent bg-blue-900 text-white w-1/5 py-1 rounded animate-pulse" disabled>Joining</button>
                <button v-if="currentPage === 14 && !joining" class="border border-transparent bg-blue-900 text-white w-1/5 py-1 rounded">Join</button>
                <button v-if="currentPage < 14 && !joining" class="border border-transparent bg-blue-900 text-white w-1/5 py-1 rounded" type="button" @click="currentPage++">Next</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, defineEmits, computed } from 'vue'
import { useRoute } from 'vue-router'
import { db, auth, storage } from '@config/firebaseConfig'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { ref as storageRef, getDownloadURL, uploadBytes } from 'firebase/storage'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import { saveAs } from 'file-saver'
import { PDFDocument } from 'pdf-lib'


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
    bvg: '',
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

// const joinEvent = async () => {
//     try {
//         joining.value = true
//         await addDoc(formRef, {
//             ...formData.value,
//             eventId: route.params.id,
//             eventId: route.params.id,
//             addedAt: Timestamp.now(),
//             schoolId: user.uid
//         })

//         emit('joinedEvent')
//         joining.value = false
//     } catch (error) {
//         $toast.error(error.message)
//     }
// }

const joinEvent = async () => {
    joining.value = true
    try {
        const response = await fetch('/PRISAA-ENTRY-FORM-1.docx')
        if (!response.ok) throw new Error('Failed to fetch DOCX template')
        const docxArrayBuffer = await response.arrayBuffer()

        const zip = new PizZip(docxArrayBuffer)
        const doc = new Docxtemplater(zip)

        doc.setData({
            b5v5m: formData.value.b5x5m,
            b5v5w: formData.value.b5x5w,
            b5v5c: formData.value.b5x5c,
            b5v5b: formData.value.b5x5b,
            b5v5g: formData.value.b5x5g,
            yb5v5c: formData.value.b5x5yc,
            b3v3m: formData.value.b3x3m,
            b3v3w: formData.value.b3x3w,
            b3v3c: formData.value.b3x3c,
            b3v3b: formData.value.b3x3b,
            b3v3g: formData.value.b3x3g,
            yb3v3c: formData.value.b3x3yc,
            bvm: formData.value.bvm,
            bvw: formData.value.bvw,
            bvc: formData.value.bvc,
            bvb: formData.value.bvb,
            bvg: formData.value.bvg,
            ybvc: formData.value.ybvc,
            fm: formData.value.fm,
            fw: formData.value.fw,
            fc: formData.value.fc,
            fb: formData.value.fb,
            fg: formData.value.fg,
            yfc: formData.value.yfc,
            fm: formData.value.fm,
            fw: formData.value.fw,
            fc: formData.value.fc,
            fb: formData.value.fb,
            fg: formData.value.fg,
            yfc: formData.value.yfc,
            stm: formData.value.stm,
            stw: formData.value.stw,
            stc: formData.value.stc,
            stb: formData.value.stb,
            stg: formData.value.stg,
            ystc: formData.value.ystc,
            vm: formData.value.vm,
            vw: formData.value.vw,
            vc: formData.value.vc,
            vb: formData.value.vb,
            vg: formData.value.vg,
            yvc: formData.value.yvc,
            am: formData.value.am,
            aw: formData.value.aw,
            ac: formData.value.ac,
            ab: formData.value.ab,
            ag: formData.value.ag,
            yac: formData.value.yac,
            bm: formData.value.bm,
            bw: formData.value.bw,
            bc: formData.value.bc,
            bb: formData.value.bb,
            bg: formData.value.bg,
            ybc: formData.value.ybc,
            cm: formData.value.cm,
            cw: formData.value.cw,
            cc: formData.value.cc,
            cb: formData.value.cb,
            cg: formData.value.cg,
            ycc: formData.value.ycc,
            dm: formData.value.dm,
            dw: formData.value.dw,
            dc: formData.value.dc,
            db: formData.value.db,
            dg: formData.value.dg,
            ydc: formData.value.ydc,
            km: formData.value.km,
            kw: formData.value.kw,
            kc: formData.value.kc,
            kb: formData.value.kb,
            kg: formData.value.kg,
            ykc: formData.value.ykc,
            sm: formData.value.sm,
            sw: formData.value.sw,
            sc: formData.value.sc,
            sb: formData.value.sb,
            sg: formData.value.sg,
            ysc: formData.value.ysc,
            tnm: formData.value.tnm,
            tnw: formData.value.tnw,
            tnc: formData.value.tnc,
            tnb: formData.value.tnb,
            tng: formData.value.tng,
            ytnc: formData.value.ytnc,
            tm: formData.value.tm,
            tw: formData.value.tw,
            tc: formData.value.tc,
            tb: formData.value.tb,
            tg: formData.value.tg,
            ytc: formData.value.ytc,
            SCHOOL: user.displayName.toUpperCase()
        })
        doc.render()

        const generatedDoc = doc.getZip().generate({ type: 'blob' })

        const docStorageRef = storageRef(storage, `forms/${user.displayName}-PRISAA-ENTRY-FORM-1.docx`)
        await uploadBytes(docStorageRef, generatedDoc)
        const docDownloadUrl = await getDownloadURL(docStorageRef)

        const fileResponse = await fetch(docDownloadUrl)  
        if (!fileResponse.ok) throw new Error("Failed to fetch DOCX file")

        const docBlob = await fileResponse.blob()

        const formData2 = new FormData()
        formData2.append("file", docBlob, "document.docx")

        const uploadResponse = await fetch("https://api.pdf.co/v1/file/upload", {
            method: "POST",
            headers: {
                "x-api-key": "wncbtrn@gmail.com_xTAaBkXRa6Bax84AsEmaF49ilnMoB5pIurbompilEmvjqWVVdmrFQw9GbqytWZ2E", 
            },
            body: formData2
        })

        if (!uploadResponse.ok) {
            const errorDetails = await uploadResponse.text()
            console.error("Failed to upload file:", errorDetails)
            throw new Error("Failed to upload DOCX file")
        }

        const uploadResult = await uploadResponse.json()
        const uploadedFileUrl = uploadResult.url

        const pdfResponse = await fetch("https://api.pdf.co/v1/pdf/convert/from/doc", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "wncbtrn@gmail.com_xTAaBkXRa6Bax84AsEmaF49ilnMoB5pIurbompilEmvjqWVVdmrFQw9GbqytWZ2E", 
            },
            body: JSON.stringify({
                url: uploadedFileUrl,
            }),
        })

        if (!pdfResponse.ok) {
            const errorDetails = await pdfResponse.text()
            console.error("Failed to convert DOCX to PDF:", errorDetails)
            throw new Error("Failed to convert DOCX to PDF")
        }

        const pdfResult = await pdfResponse.json()
        const pdfUrl = pdfResult.url

        const pdfBlob = await (await fetch(pdfUrl)).blob()
        const pdfStorageRef = storageRef(storage, `forms/${user.displayName}-PRISAA-ENTRY-FORM-1.pdf`)
        await uploadBytes(pdfStorageRef, pdfBlob)
        const pdfDownloadUrl = await getDownloadURL(pdfStorageRef)

        const data = {
            documentURL: docDownloadUrl,
            pdfURL: pdfDownloadUrl,
        }

        emit('joinedEvent', data)
    } catch (error) {
        console.error("Error submitting form:", error)
        $toast.error("Failed to join event")
    } finally {
        joining.value = false
    }
}

const currentPage = ref(1)
</script>