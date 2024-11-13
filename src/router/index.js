import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store'
import adminDashboard from '../views/admin/AdminDashboardView.vue'
import schoolDashboard from '../views/school/SchoolDashboardView.vue'
import coachDashboard from '../views/coach/CoachDashboardView.vue'
import athleteNewsfeed from '../views/athlete/newsfeed.vue'
import Login from '../views/LoginView.vue'

const routes =  [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/register/select-role',
        name: 'selectRole',
        component: () => import('../views/SelectRoleView.vue')
    },
    {
        path: '/register/school',
        name: 'registerSchool',
        component: () => import('../views/RegisterSchoolView.vue')
    },
    {
        path: '/register/athlete',
        name: 'registerAthlete',
        component: () => import('../views/RegisterAthleteView.vue')
    },
    {
        path: '/register/coach',
        name: 'registerCoach',
        component: () => import('../views/RegisterCoachView.vue')
    },
    {
        path: '/admin',
        name: 'adminDashboard',
        component: adminDashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin/applications',
        name: 'schoolApplications',
        component: () => import('../views/admin/SchoolApplications.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin/member-school',
        name: 'memberSchool',
        component: () => import('../views/admin/MemberSchool.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/upcoming-events',
        name: 'upcomingEvents',
        component: () => import('../views/general/UpcomingEvents.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/upcoming-event-details/:id',
        name: 'upcomingEventDetails',
        component: () => import('../views/general/UpcomingEventDetails.vue'),
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: 'applicants',
                name: 'eventApplicants',
                component: () => import('../views/general/childs/EventApplications.vue'),
                meta: {
                    requiresAuth: true,
                    requiresRole: 'admin'
                },
            }
        ]
    },
    {
        path: '/ongoing-events',
        name: 'ongoingEvents',
        component: () => import('../views/general/OngoingEvents.vue'),
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/event-details/:id',
        component: () => import('../views/general/OngoingEventDetails.vue'),
        children: [
            {
                path: '',
                name: 'eventDashboard',
                component: () => import('../views/general/childs/EventDashboard.vue')
            },
            {
                path: 'schedules',
                name: 'eventSchedules',
                component: () => import('../views/general/childs/EventSchedules.vue')
            },
            {
                path: 'medals',
                name: 'eventMedals',
                component: () => import('../views/general/childs/EventMedals.vue')
            }
        ],
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/finished-events',
        name: 'FinishedEvents',
        component: () => import('../views/general/FinishedEvents.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/announcements',
        name: 'announcements',
        component: () => import('../views/admin/Announcements.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/school',
        name: 'schoolDashboard',
        component: schoolDashboard,
        meta: {
            requiresAuth: true,
            requiresRole: 'school'
        }
    },
    {
        path: `/school/pending-athletes`,
        name: 'pendingAthletes',
        component: () => import('../views/school/PendingAthletesView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/school/athletes-list',
        name: 'athletesList',
        component: () => import('../views/school/AthletesList.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/athletes-details/:id',
        name: 'athleteDetails',
        component: () => import('../views/school/AthleteDetails.vue'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/school/pending-coaches',
        name: 'pendingCoaches',
        component: () => import('../views/school/PendingCoachesView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/school/coaches-list',
        name: 'coachesList',
        component: () => import('../views/school/CoachesList.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/coach',
        name: 'coachDashboard',
        component: coachDashboard,
        meta: {
            requiresAuth: true,
            requiresRole: 'coach'
        }
    },
    {
        path: '/coach/training',
        name: 'training',
        component: () => import('../views/coach/Training.vue'),
        meta: {
            requiresAuth: true,
            requiresRole: 'coach'
        }
    },
    {
        path: '/coach/training/:id',
        name: 'trainingDetails',
        component: () => import('../views/coach/TrainingDetails.vue'),
        meta: {
            requiresAuth: true,
            requiresRole: 'coach'
        }
    },
    {
        path: '/coach/pending-athletes',
        name: 'pendingAthletesCoach',
        component: () => import('../views/coach/PendingAthletesView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/coach/athletes-list',
        name: 'athletesListCoach',
        component: () => import('../views/coach/AthletesList.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/athlete',
        name: 'athleteNewsfeed',
        component: athleteNewsfeed,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/athlete/forms',
        name: 'forms',
        component: () => import('../views/athlete/forms.vue'),
        meta: {
            requiresAuth: true,
            requiresRole: 'athlete'
        }
    },
    {
        path: '/athlete/filed-out-forms',
        name: 'filledOut',
        component: () => import('../views/athlete/filledOutForm.vue'),
        meta: {
            requiresAuth: true,
            requiresRole: 'athlete'
        }
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const isAuthenticated = authStore.isAuthenticated

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/'); 
    }else if(to.path === '/' && isAuthenticated){
        if(!!localStorage.getItem('role')){
            next(`/${localStorage.getItem('role')}`)
        }else{
            next()
        }
    }else if(to.meta.requiresAuth && to.meta.requiresRole){
        if(to.meta.requiresRole === 'school' && localStorage.getItem('role') === 'school'){
            next()
        }else if(to.meta.requiresRole === 'admin' && localStorage.getItem('role') === 'admin'){
            next()
        }else if(to.meta.requiresRole === 'athlete' && localStorage.getItem('role') === 'athlete'){
            next()
        }else if(to.meta.requiresRole === 'coach' && localStorage.getItem('role') === 'coach'){
            next()
        }else{
            next(from.fullPath)
        }
    }else {
        next(); 
    }
});


export default router