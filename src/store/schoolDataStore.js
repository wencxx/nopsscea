import { defineStore } from 'pinia'

export const useSchoolDataStore = defineStore('schoolDaataStore', {
    state: () => ({
        coaches: [],
        athletes: [],
        pendingAthletes: [],
    }),
})