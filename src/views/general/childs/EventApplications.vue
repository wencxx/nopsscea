<template>
    <table class="!w-full tracking-wide rounded overflow-hidden">
        <thead>
            <tr>
                <th class="w-2/6 py-1 border dark:border-gray-100/10 font-medium">School</th>
                <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Address</th>
                <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Email</th>
                <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Athletes</th>
                <th class="w-1/6 py-1 border dark:border-gray-100/10 font-medium">Actions</th>
            </tr>
        </thead>
        <tbody v-if="pendingParticipants.length > 0">
            <tr class="text-md" v-for="(participant, index) in pendingParticipants" :key="index">
                <td class="p-2 border dark:border-gray-100/10">
                    <div class="flex gap-x-3">
                        <img :src="participant?.schoolLogo" alt="school logo" class="w-14 bg-gray-200 dark:bg-gray-100/10 p-2 rounded">
                        <div class="flex flex-col justify-center">
                            <h1 class="text-md capitalize">{{ participant.schoolName  }}</h1>
                            <p class="text-xs text-gray-500 font-semibold uppercase">{{ participant.schoolAbbreviation }}</p>
                        </div>
                    </div>
                </td>
                <td class="p-2 border dark:border-gray-100/10 text-center">{{ participant.schoolAddress }}</td>
                <td class="p-2 border dark:border-gray-100/10 text-center">{{ participant.schoolEmail }}</td>
                <td class="p-2 border dark:border-gray-100/10 text-center">10</td>
                <td class="p-2 border dark:border-gray-100/10 text-center">
                    <div class="flex justify-center gap-x-2">
                        <Icon icon="bxs:file-doc" class="cursor-pointer text-gray-500 text-2xl" @click="generateDoc(participant.schoolId)"/>
                        <Icon icon="tabler:check" class="cursor-pointer text-green-500 text-2xl" @click="acceptApplicant(participant.participantsId, participant.schoolId, index)"/>
                    </div>
                </td>
            </tr>
        </tbody>
        <tbody v-if="loadingParticipants">
            <tr v-for="i in 5" :key="i">
                <td class="p-2 border dark:border-gray-100/10">
                    <div class="flex gap-x-3">
                        <div class="w-14 aspect-square animate-pulse bg-gray-200 dark:bg-gray-100/10 p-2 rounded"></div>
                        <div class="flex flex-col gap-y-1 justify-center">
                            <div class="h-6 w-56 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                            <div class="h-4 w-16 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                        </div>
                    </div>
                </td>
                <td class="p-2 border space-y-1 dark:border-gray-100/10">
                    <div class="h-6 w-50 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                    <div class="h-6 w-32 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                </td>
                <td class="p-2 border dark:border-gray-100/10">
                    <div class="h-6 w-50 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                </td>
                <td class="p-2 border dark:border-gray-100/10">
                    <div class="h-6 w-50 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                </td>
                <td class="p-2 border dark:border-gray-100/10">
                    <div class="h-6 w-50 bg-gray-200 dark:bg-gray-100/10 rounded animate-pulse"></div>
                </td>
            </tr>
        </tbody>
        <tbody v-if="!loadingParticipants && pendingParticipants.length == 0">
            <tr class="text-md">
                <td class="p-2 border dark:border-gray-100/10 text-center font-medium" colspan="6">No participants</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { db } from '@config/firebaseconfig'
import { getDoc, doc, addDoc, collection, getDocs, where, query, updateDoc, Timestamp, and, limit } from 'firebase/firestore'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { onMounted, ref, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import { saveAs } from 'file-saver'
import ImageModule from 'docxtemplater-image-module-free'

const route = useRoute()
const emit = defineEmits(['acceptedApplicant'])

const eventId = route.params.id

const $toast = useToast()

// participants ref
const participantsRef = collection(db, 'participants')

// get all participants
const pendingParticipants = ref([])
const loadingParticipants = ref(false)

const getParticipants = async (eventId) => {
    try {
        loadingParticipants.value = true
        const q = query(
            participantsRef,
            where('eventId', '==', eventId)
        )
        const snapshot = await getDocs(q)

        const promises = snapshot.docs.map(async (doc) => {
            const participantsDetails = {
                id: doc.id,
                ...doc.data()
            }

            if(!participantsDetails.isAccepted){
                getParticipantsPersonalDetails(participantsDetails.schoolId, participantsDetails.id)
            }

        })

        await Promise.all(promises)
        loadingParticipants.value = false
    } catch (error) {
        $toast.error('Error getting applicants')
        console.log(error)
    }
}

//school reference 
const schoolRef = collection(db, 'schools')

// get participants personal details
const getParticipantsPersonalDetails = async (schoolId, participantsId) => {    
    try {
        const q = query(
            schoolRef,
            where('schoolId', '==', schoolId)
        )
        
        const snapshots = await getDocs(q)

        snapshots.docs.forEach(doc => {
            pendingParticipants.value.push({
                id: doc.id,
                ...doc.data(),
                participantsId: participantsId
            })
        })
    } catch (error) {
        $toast.error(error.message)
    }
}

const acceptApplicant = async (participantsId, schoolId, index) => {
    const docRef = doc(db, 'participants', participantsId)
    try {
        const snapshot = await updateDoc(docRef, {
            isAccepted: true,
            acceptedAt: Timestamp.now()
        })
        
        const dataToPass = {
            schoolId: schoolId,
            index: index
        }
        emit('acceptedApplicant', dataToPass)
        pendingParticipants.value.splice(index, 1)

        $toast.success('Accepted participants successfully')
    } catch (error) {
        $toast.error(error.message)
    }
}
// generate docx
const formRef = collection(db, 'forms')

const generateDoc = async (schoolId) => {
    try {
        const q = query(
            formRef,
            and(
                where('eventId', '==', eventId),
                where('schoolId', '==', schoolId)
            ),
            limit(1)
        )

        const snapshot = await getDocs(q)

        downloadForm(snapshot.docs[0].data())
    } catch (error) {
        
    }
}

const downloadForm = async (data) => {
    try {
        const response = await fetch('/PRISAA-ENTRY-FORM-1.docx')

        if (!response.ok) throw new Error('Failed to fetch DOCX template')

        const docxArrayBuffer = await response.arrayBuffer()


        const zip = new PizZip(docxArrayBuffer)

        const doc = new Docxtemplater(zip)

        doc.setData({
            b5v5m: data.b5x5m,
            b5v5w: data.b5x5w,
            b5v5c: data.b5x5c,
            b5v5b: data.b5x5b,
            b5v5g: data.b5x5g,
            yb5v5c: data.b5x5yc,
            b3v3m: data.b3x3m,
            b3v3w: data.b3x3w,
            b3v3c: data.b3x3c,
            b3v3b: data.b3x3b,
            b3v3g: data.b3x3g,
            yb3v3c: data.b3x3yc,
            bvm: data.bvm,
            bvw: data.bvw,
            bvc: data.bvc,
            bvb: data.bvb,
            bvg: data.bvg,
            ybvc: data.ybvc,
            fm: data.fm,
            fw: data.fw,
            fc: data.fc,
            fb: data.fb,
            fg: data.fg,
            yfc: data.yfc,
            fm: data.fm,
            fw: data.fw,
            fc: data.fc,
            fb: data.fb,
            fg: data.fg,
            yfc: data.yfc,
            stm: data.stm,
            stw: data.stw,
            stc: data.stc,
            stb: data.stb,
            stg: data.stg,
            ystc: data.ystc,
            vm: data.vm,
            vw: data.vw,
            vc: data.vc,
            vb: data.vb,
            vg: data.vg,
            yvc: data.yvc,
            am: data.am,
            aw: data.aw,
            ac: data.ac,
            ab: data.ab,
            ag: data.ag,
            yac: data.yac,
            bm: data.bm,
            bw: data.bw,
            bc: data.bc,
            bb: data.bb,
            bg: data.bg,
            ybc: data.ybc,
            cm: data.cm,
            cw: data.cw,
            cc: data.cc,
            cb: data.cb,
            cg: data.cg,
            ycc: data.ycc,
            dm: data.dm,
            dw: data.dw,
            dc: data.dc,
            db: data.db,
            dg: data.dg,
            ydc: data.ydc,
            km: data.km,
            kw: data.kw,
            kc: data.kc,
            kb: data.kb,
            kg: data.kg,
            ykc: data.ykc,
            sm: data.sm,
            sw: data.sw,
            sc: data.sc,
            sb: data.sb,
            sg: data.sg,
            ysc: data.ysc,
            tnm: data.tnm,
            tnw: data.tnw,
            tnc: data.tnc,
            tnb: data.tnb,
            tng: data.tng,
            ytnc: data.ytnc,
            tm: data.tm,
            tw: data.tw,
            tc: data.tc,
            tb: data.tb,
            tg: data.tg,
            ytc: data.ytc,
        })

        doc.render()

        const output = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        })

        saveAs(output, 'entry-form.docx')
    } catch (error) {
        console.error('Error generating document:', error)
    }
}

onMounted(() => {
    getParticipants(eventId)
})
</script>
