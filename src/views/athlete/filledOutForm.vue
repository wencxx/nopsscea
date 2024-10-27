<template>
    <div class="space-y-10">
        <div class="flex items-center gap-x-2 text-xl">
            <Icon icon="clarity:form-line" class="text-2xl" />
            <h1>Filled Out Forms</h1>
        </div>
        <div class="bg-gray-100 dark:bg-gray-100/10 p-5 rounded-md">
            <table class="min-w-[500px] md:w-full font-inter tracking-wide">
                <thead>
                    <tr>
                        <th class="w-1/4 py-1 border border-gray-300 dark:border-gray-100/10">Form</th>
                        <th class="w-1/4 py-1 border border-gray-300 dark:border-gray-100/10">Semester</th>
                        <th class="w-1/4 py-1 border border-gray-300 dark:border-gray-100/10">School year   </th>
                        <th class="w-1/4 py-1 border border-gray-300 dark:border-gray-100/10">Action</th>
                    </tr>
                </thead>
                <tbody v-if="!gettingForms && forms.length > 0">
                    <tr v-for="(form, index) in forms" :key="index">
                        <td class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">{{ form.formName }}</td>
                        <td class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">{{ form.semester }}</td>
                        <td class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">{{ form.sy }}</td>
                        <td class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">
                            <div class="flex justify-center gap-x-2">
                                <button @click="downloadForm(index)">
                                    <Icon icon="mdi:eye" class="text-2xl text-green-500 hover:scale-110" />
                                </button>
                                <button @click="deleteForm(form.id, index)">
                                    <Icon icon="mdi:trash" class="text-2xl text-red-500 hover:scale-110" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="!gettingForms && forms.length === 0">
                    <tr>
                        <td colspan="4" class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">No forms to show</td>
                    </tr>
                </tbody>
                <tbody v-if="gettingForms">
                    <tr v-for="i in 3" :key="i">
                        <td class="p-2 border-gray-300 dark:border-gray-100/10 border">
                            <div class="h-7 w-3/4 rounded bg-gray-300 animate-pulse mx-auto"></div>
                        </td>
                        <td class="p-2 border-gray-300 dark:border-gray-100/10 border">
                            <div class="h-7 w-3/4 rounded bg-gray-300 animate-pulse mx-auto"></div>
                        </td>
                        <td class="p-2 border-gray-300 dark:border-gray-100/10 border">
                            <div class="h-7 w-3/4 rounded bg-gray-300 animate-pulse mx-auto"></div>
                        </td>
                        <td class="p-2 border-gray-300 dark:border-gray-100/10 border">
                            <div class="h-7 w-1/4 rounded bg-gray-300 animate-pulse mx-auto"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { useAuthStore } from '@store'
import { computed, onMounted, watchEffect, ref } from 'vue'
import { db } from '@config/firebaseConfig.js'
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'
import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import { saveAs } from 'file-saver'
import ImageModule from 'docxtemplater-image-module-free'
import moment from 'moment'

const $toast = useToast()
const authStore = useAuthStore()

const currentUser = computed(() => authStore.user)

const forms = ref([])

// form reference
const formRef = collection(db, 'forms')
const gettingForms = ref(false)

// get forms
const getUserForms = async () => {
    try {
        gettingForms.value = true
        const q = query(
            formRef,
            where('userId', '==', currentUser.value.uid)
        )

        const snapshots = await getDocs(q)

        snapshots.docs.forEach(doc => {
            forms.value.push({
                id: doc.id,
                ...doc.data()
            })
        })
        gettingForms.value = false
    } catch (error) {
        $toast.error('Failed to get forms')
    }
}

// download form
const loadImageAsArrayBuffer = async (imageUrl) => {
  const response = await fetch(imageUrl)
  if (!response.ok) throw new Error('Network response was not ok')
  return await response.arrayBuffer()
}

const downloadForm = async (index) => {
    const formData = forms.value[index]

    try {
        const response = await fetch('/PRISAA-FORM-2019-02-Parental-Consent-1.docx')

        if (!response.ok) throw new Error('Failed to fetch DOCX template')

        const docxArrayBuffer = await response.arrayBuffer()

        const imageArrayBuffer = await loadImageAsArrayBuffer(formData.picture2x2)

        const zip = new PizZip(docxArrayBuffer)

        const imageModule = new ImageModule({
            centered: false,
            getImage: function () {
                return imageArrayBuffer
            },
            getSize: function () {
                return [200, 200]
            },
        })

        const doc = new Docxtemplater(zip, {
            modules: [imageModule],
        })

        doc.setData({
            image: formData.picture2x2,
            name: formData.name,
            schoolname: formData.schoolName,
            cluster: 'NOPSSCEA',
            provDate: moment(formData.provDate).format('LL'),
            provVenue: formData.provVenue,
            regDate: moment(formData.regDate).format('LL'),
            regVenue: formData.regVenue,
            natDate: moment(formData.natDate).format('LL'),
            natVenue: formData.natVenue,
            fathersName: formData.fathersName,
            mothersName: formData.mothersName,
            guardiansName: formData.guardianName,
        })

        doc.render()

        const output = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        })

        saveAs(output, 'parents-consent.docx')
    } catch (error) {
        console.error('Error generating document:', error)
    }
}

// delete form
const deleteForm = async (formId, index) => {
    const docRef = doc(db, 'forms', formId)
    try {
        await deleteDoc(docRef)
        forms.value.splice(index, 1)

        $toast.success('Form deleted successfully')
    } catch (error) {
        $toast.error('Failed to deleted docs')
    }
}


onMounted(() => {
watchEffect(() => {
    if(currentUser.value?.uid){
        getUserForms()
    }
})
})
</script>
