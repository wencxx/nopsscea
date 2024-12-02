import { defineStore } from 'pinia'
import { db } from '@config/firebaseConfig.js'
import { collection, getDocs, where, limit, query, and } from 'firebase/firestore'

export const useDataStore = defineStore('dataStore', {
    state: () => ({
        coachData: null,
        athletesData: [],
        pendingAthletesData: [],
        trainingData: [],
    }),
    actions: {
        async getCoachData(coachId) {
            this.athletesData = []
            this.trainingData = []
            const docRef = collection(db, 'coaches')
            try {
                const q = query(
                    docRef,
                    where('coachId', '==', coachId),
                    limit(1)
                )
                const snapshots = await getDocs(q)
                
                if (snapshots.empty) return console.log('No documents')

                this.coachData = {
                    id: snapshots.docs[0].id,
                    ...snapshots.docs[0].data(),
                }

                this.getAthletes(snapshots.docs[0].data().sport, snapshots.docs[0].data().school)
                this.getPendingAthletes(snapshots.docs[0].data().sport, snapshots.docs[0].data().school)
                this.getTrainingData(snapshots.docs[0].data().sport, snapshots.docs[0].data().school)
            } catch (error) {
                console.log(error)
            }
        },
        async getAthletes(sport, school) {
            const userRef = collection(db, 'userRole')
            const docRef = collection(db, 'athletes')
            try {
                const q = query(
                    userRef,
                    where('isAccepted', '==', true),
                    where('role', '==', 'athlete')
                )

                const snapshots = await getDocs(q)

                for (const doc of snapshots.docs) {
                    const athleteQuery = query(
                        docRef,
                        where('school', '==', school),
                        where('sport', '==', sport),
                        where('athleteId', '==', doc.data().userId)
                    )
                    const athleteSnapshots = await getDocs(athleteQuery)

                    if (athleteSnapshots.empty) {
                        continue
                    }

                    athleteSnapshots.docs.forEach(athleteDoc => {
                        this.athletesData.push({
                            id: athleteDoc.id,
                            ...athleteDoc.data(),
                        })
                    })
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getPendingAthletes(sport, school) {
            this.pendingAthletesData = []
            const userRef = collection(db, 'userRole')
            const docRef = collection(db, 'athletes')
            try {
                const q = query(
                    userRef,
                    where('isAccepted', '==', false),
                    where('role', '==', 'athlete')
                )

                const snapshots = await getDocs(q)

                for (const doc of snapshots.docs) {
                    const athleteQuery = query(
                        docRef,
                        where('school', '==', school),
                        where('sport', '==', sport),
                        where('athleteId', '==', doc.data().userId)
                    )
                    const athleteSnapshots = await getDocs(athleteQuery)

                    if (athleteSnapshots.empty) {
                        continue
                    }

                    athleteSnapshots.docs.forEach(athleteDoc => {
                        this.pendingAthletesData.push({
                            id: athleteDoc.id,
                            userRoleId: doc.id,
                            ...athleteDoc.data(),
                        })
                    })
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getTrainingData(sport, school) {
            const trainingRef = collection(db, 'trainings')
            try {
                const q = query(
                    trainingRef,
                    and(
                        where('sport', '==', sport),
                        where('school', '==', school),
                    )
                )
                const snapshots = await getDocs(q)
                
                if (snapshots.empty) return

                snapshots.docs.forEach(doc => {
                    this.trainingData.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })

            } catch (error) {
                console.log(error)
            }
        },
    }
})