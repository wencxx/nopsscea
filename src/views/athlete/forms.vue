<template>
    <div class="space-y-10">
        <div class="flex items-center gap-x-2 text-xl">
            <Icon icon="clarity:form-line" class="text-2xl" />
            <h1>Forms</h1>
        </div>
        <div class="bg-gray-100 dark:bg-gray-100/10 p-5 rounded-md">
            <table class="min-w-[500px] md:w-full font-inter tracking-wide">
                <thead>
                    <tr>
                        <th class="w-2/6 py-1 border border-gray-300 dark:border-gray-100/10">Form</th>
                        <th class="w-1/6 py-1 border border-gray-300 dark:border-gray-100/10">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">Parents-consent</td>
                        <td class="py-2 border-gray-300 dark:border-gray-100/10 border text-center">
                            <div>
                                <button class="bg-green-500 text-white px-4 py-1 rounded" @click="showParentConsentModal = true">Fill out</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <parentsConsent v-if="showParentConsentModal" @click.self="showParentConsentModal = false" @closeModal="showParentConsentModal = false" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import parentsConsent from '@components/forms/parentsConsent.vue'

const showParentConsentModal = ref(false)
</script>