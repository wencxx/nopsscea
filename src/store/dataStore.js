import { defineStore } from 'pinia'
import { db } from '@config/firebaseConfig.js'
import { collection, getDocs, where, limit, query } from 'firebase/firestore'

export const useDataStore = defineStore('dataStore', {
    state: () => ({
        coachData: null,
    }),
    actions: {
        async getCoachData(coachId){
            const docRef = collection(db, 'coaches')
            try {
                const q = query(
                    docRef,
                    where('coachId', '==', coachId),
                    limit(1)
                )
                const snapshots = await getDocs(q)
                
                if(snapshots.empty) return console.log('No documents')

                this.coachData = {
                    id: snapshots.docs[0].id,
                    ...snapshots.docs[0].data(),
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
})
