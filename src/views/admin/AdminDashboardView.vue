<template>
    <div class="grid grid-cols-3 gap-5">
        <div class="bg-gray-100 dark:bg-gray-100/10 col-span-3 h-[25dvh] border dark:border-gray-100/10 rounded-xl grid grid-cols-4 p-5 gap-x-5">
            <div class="border rounded-xl bg-gray-200 dark:bg-neutral-800 dark:border-gray-100/10 p-5 flex flex-col justify-between">
                <div>
                    <Icon icon="mdi:event-outline" class="text-4xl text-blue-900" />
                </div>
                <div>
                    <h1 class="text-2xl font-bold">{{ eventsCount }}</h1>
                </div>
                <div>
                    <h3 class="capitalize text-lg">Total Events</h3>
                </div>
            </div>
            <div class="border rounded-xl bg-gray-200 dark:bg-neutral-800 dark:border-gray-100/10 p-5 flex flex-col justify-between">
                <div>
                    <Icon icon="lucide:school-2" class="text-4xl text-red-700" />
                </div>
                <div>
                    <h1 class="text-2xl font-bold">{{ schoolCount }}</h1>
                </div>
                <div>
                    <h3 class="capitalize text-lg">Total schools</h3>
                </div>
            </div>
            <div class="border rounded-xl bg-gray-200 dark:bg-neutral-800 dark:border-gray-100/10 p-5 flex flex-col justify-between">
                <div>
                    <Icon icon="fluent-emoji-high-contrast:person-running" class="text-4xl text-blue-900" />
                </div>
                <div>
                    <h1 class="text-2xl font-bold">{{athletesCount}}</h1>
                </div>
                <div>
                    <h3 class="capitalize text-lg">Total athletes</h3>
                </div>
            </div>
            <div class="border rounded-xl bg-gray-200 dark:bg-neutral-800 dark:border-gray-100/10 p-5 flex flex-col justify-between">
                <div>
                    <Icon icon="material-symbols:person-apron-outline" class="text-4xl text-red-700" />
                </div>
                <div>
                    <h1 class="text-2xl font-bold">{{ coachesCount }}</h1>
                </div>
                <div>
                    <h3 class="capitalize text-lg">Total Coaches</h3>
                </div>
            </div>
        </div>
        <div class="bg-gray-100 dark:bg-gray-100/10 col-span-1 h-[35dvh] border dark:border-gray-100/10 rounded-md p-3 flex justify-center items-center">
            <doughnutChart :labels="doughNutLabels" :data="doughNutDatasets" :label="doughNutLabel" />
        </div>
        <div class="bg-gray-100 dark:bg-gray-100/10 col-span-2 h-[35dvh] border dark:border-gray-100/10 rounded-md p-3 flex items-center">
            <lineChart :labels="chartLabels" :data="chartDatasets" :label="chartLabel" class="!w-full" />
        </div>
        <div class="bg-gray-100 dark:bg-gray-100/10 col-span-3 h-[50dvh] border dark:border-gray-100/10 rounded-md p-3 flex flex-col items-center relative">
          <select class="absolute top-2 right-5 rounded px-3 py-1" v-model="selectedYear" @change="updateChart">
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
                <option>2028</option>
                <option>2029</option>
                <option>2030</option>
            </select>
            <barChart :labels="chartLabels2" :data="chartDatasets2" :label="chartLabel2" class="!w-full" />
        </div>
        <div class="bg-gray-100 dark:bg-gray-100/10 col-span-3 p-3 border dark:border-gray-100/10 rounded-md">
            <h1 class="mb-2 capitalize font-bold flex items-center gap-x-1"><Icon icon="noto:1st-place-medal" class="text-3xl" /> Top 5 most medals won all time</h1>
            <table class="min-w-[500px] md:w-full tracking-wide rounded overflow-hidden">
                <thead>
                    <tr>
                        <th class="w-1/12 py-1 border dark:border-gray-100/10 font-medium">Rank</th>
                        <th class="w-3/12 py-1 border dark:border-gray-100/10 font-medium">School</th>
                        <th class="w-1/12 py-1 border dark:border-gray-100/10 font-medium">Gold</th>
                        <th class="w-1/12 py-1 border dark:border-gray-100/10 font-medium">Silver</th>
                        <th class="w-1/12 py-1 border dark:border-gray-100/10 font-medium">Bronze</th>
                        <th class="w-1/12 py-1 border dark:border-gray-100/10 font-medium">Total</th>
                    </tr>
                </thead>
                <tbody v-if="schoolMedal.length">
                    <tr v-for="(medal, index) in schoolMedal" :key="medal" class="text-md">
                        <td class="p-2 border dark:border-gray-100/10 text-center">{{ index + 1 }}</td>
                        <td class="p-2 border dark:border-gray-100/10">
                            <div class="flex gap-x-3">
                                <img v-if="filterSchool(medal.school)?.schoolLogo" :src="filterSchool(medal.school)?.schoolLogo" alt="school logo" class="w-14 rounded">
                                <div v-else class="w-16 aspect-square bg-gray-200 dark:bg-gray-100/10 p-2 rounded"></div>
                                <div class="flex flex-col justify-center">
                                    <h1 class="text-sm capitalize">{{ filterSchool(medal.school)?.schoolName }}</h1>
                                    <p class="text-xs text-gray-500 font-semibold uppercase">{{ filterSchool(medal.school)?.schoolAbbreviation }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="p-2 border dark:border-gray-100/10 text-center">{{ medal.gold }}</td>
                        <td class="p-2 border dark:border-gray-100/10 text-center">{{ medal.silver }}</td>
                        <td class="p-2 border dark:border-gray-100/10 text-center">{{ medal.bronze }}</td>
                        <td class="p-2 border dark:border-gray-100/10 text-center">{{ medal.gold + medal.silver + medal.bronze }}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr class="text-md">
                        <td colspan="6" class="p-2 border dark:border-gray-100/10 text-center">No schools to show</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import doughnutChart from '../../components/charts/doughnutChart.vue'
import barChart from '../../components/charts/barChart.vue'
import lineChart from '../../components/charts/lineChart.vue'
import { onMounted, ref, computed } from 'vue'
import { db } from '@config/firebaseConfig.js'
import { getDocs, collection, getCountFromServer, where, query, and } from 'firebase/firestore'

// count events
const eventsRef = collection(db, 'events')
const eventsCount = ref(0)
const countEvents = async () => {
    try {
        const snapshot = await getCountFromServer(eventsRef)

        eventsCount.value = snapshot.data().count
    } catch (error) {
        console.log(error)
    }
}
const userRef = collection(db, 'userRole')

// school lists
const schools = ref([])

// get school
const schoolRef = collection(db, 'schools')
const getSchools = async () => {
    try {
        const snapshots = await getDocs(schoolRef)

        snapshots.docs.forEach(doc => {
            schools.value.push({
                id: doc.id,
                ...doc.data()
            })
        })

        groupMedalsByYear()
    } catch (error) {
        console.log(error)
    }
}

// filter school
const filterSchool = (schoolId) => {
    const school = schools.value.find(school => school.schoolId == schoolId)

    return school
}

// count school
const schoolCount = ref(0)
const countSchools = async () => {
    try {
        const q = query(
            userRef,
            and(
                where('role', '==', 'school'),
                where('isAccepted', '==', true)
            )
        )

        const snapshots = await getCountFromServer(q)

        schoolCount.value = snapshots.data().count
    } catch (error) {
        console.log(error)
    }
}

// count athletes
const athletesId = ref([])
const athletesCount = ref(0)
const countAthletes = async () => {
    try {
        const q = query(
            userRef,
            and(
                where('role', '==', 'athlete'),
                where('isAccepted', '==', true)
            )
        )
        const snapshots = await getDocs(q)

        snapshots.docs.forEach(doc => {
            athletesId.value.push(doc.data().userId)
        })

        athletesCount.value = snapshots.docs.length
        countAthletesByGender()
    } catch (error) {
        console.log(error)
    }
}

// count athletes by gender
const athletesRef = collection(db, 'athletes');
const athleteMaleCount = ref(0);
const athleteFemaleCount = ref(0);

const countAthletesByGender = async () => {
    try {
        const q = query(
            athletesRef,
            where('athleteId', 'in', athletesId.value)
        );
        const snapshots = await getDocs(q);

        snapshots.docs.forEach(doc => {
            const data = doc.data();
            if (data.gender === 'Male') {
                athleteMaleCount.value++;
            } else if (data.gender === 'Female') {
                athleteFemaleCount.value++;
            }
        });
    } catch (error) {
        console.error('Error counting athletes by gender:', error);
    }
};

const doughNutLabel = ref('Total No. of athletes by gender');
const doughNutLabels = ref(['Male', 'Female']);
const doughNutDatasets = computed(() => [athleteMaleCount.value, athleteFemaleCount.value]);


// count coaches
const coachesCount = ref(0)
const countCoaches = async () => {
    try {
        const q = query(
            userRef,
            and(
                where('role', '==', 'coach'),
                where('isAccepted', '==', true)
            )
        )
        const snapshot = await getCountFromServer(q)

        coachesCount.value = snapshot.data().count
    } catch (error) {
        console.log(error)
    }
}

// get grouped participants
const groupedParticipants = ref({})
const participantsRef = collection(db, 'participants')

const groupParticipantsByYear = async () => {
    try {
        const snapshot = await getDocs(participantsRef)

        snapshot.docs.forEach(doc => {
            const dateAdded = doc.data().joinedAt.toDate()
            const year = dateAdded.getFullYear()

            if (!groupedParticipants.value[year]) {
                groupedParticipants.value[year] = 0
            }

            groupedParticipants.value[year]++
        })

        chartLabels.value = Object.keys(groupedParticipants.value)
        chartDatasets.value = Object.values(groupedParticipants.value)

    } catch (error) {
        console.log(error)
    }
}

const schoolMedal = ref({})

const groupParticipantsBySchool = async () => {
    try {
        const snapshot = await getDocs(participantsRef)

        snapshot.docs.forEach(doc => {
            const school = doc.data().schoolId
            if (!schoolMedal.value[school]) {
                schoolMedal.value[school] = {
                    school: school,
                    gold: 0,
                    silver: 0,
                    bronze: 0
                }
            }

            schoolMedal.value[school].gold += doc.data().gold || 0
            schoolMedal.value[school].silver += doc.data().silver || 0
            schoolMedal.value[school].bronze += doc.data().bronze || 0
        })

        const sortedSchools = Object.values(schoolMedal.value).sort((a, b) => {
            const scoreA = a.gold * 3 + a.silver * 2 + a.bronze
            const scoreB = b.gold * 3 + b.silver * 2 + b.bronze
            return scoreB - scoreA
        })

        schoolMedal.value = sortedSchools.slice(0, 5)
        
    } catch (error) {
        console.log(error)
    }
}

const chartLabel = ref('Events participants every year')
const chartLabels = ref([])
const chartDatasets = ref([])

// get grouped medals by year
const participantsByYear = ref({});
const selectedYear = ref("2024"); 
const chartLabel2 = ref('Annual medal tally')
const chartLabels2 = ref([]);
const chartDatasets2 = ref([]);

const groupMedalsByYear = async () => {
    try {
        const snapshot = await getDocs(participantsRef);
        const tempParticipantsByYear = {};

        snapshot.docs.forEach(doc => {
            const data = doc.data();
            const joinedAt = data.joinedAt?.toDate();
            if (joinedAt) {
                const year = joinedAt.getFullYear();

                if (!tempParticipantsByYear[year]) {
                    tempParticipantsByYear[year] = [];
                }

                tempParticipantsByYear[year].push({
                    name: filterSchool(data.schoolId)?.schoolAbbreviation,
                    gold: data.gold || 0,
                    silver: data.silver || 0,
                    bronze: data.bronze || 0,
                });
            }
        });

        participantsByYear.value = tempParticipantsByYear;

        updateChart()
    } catch (error) {
        console.error("Error grouping participants:", error);
    }
};

const updateChart = () => {
    if (!selectedYear.value || !participantsByYear.value[selectedYear.value]) {
        chartLabels2.value = [];
        chartDatasets2.value = [];
        return;
    }

    const participants = participantsByYear.value[selectedYear.value];

    chartLabels2.value = participants.map(p => p.name); 
    chartDatasets2.value = participants.map(
        p => p.gold + p.silver + p.bronze 
    );
};



onMounted(() => {
    countEvents()
    countSchools()
    countAthletes()
    countCoaches()
    groupParticipantsByYear()
    groupParticipantsBySchool()
    getSchools()
})

</script>

<style scoped>

</style>
