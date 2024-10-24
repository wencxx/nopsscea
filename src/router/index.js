import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store'

const routes =  [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/LoginView.vue')
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
        component: () => import('../views/admin/AdminDashboardView.vue'),
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
        path: '/finished-events',
        name: 'FinishedEvents',
        component: () => import('../views/general/FinishedEvents.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/school',
        name: 'schoolDashboard',
        component: () => import('../views/school/SchoolDashboardView.vue'),
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
        path: '/school/athletes-details/:id',
        name: 'athleteDetails',
        component: () => import('../views/school/AthleteDetails.vue'),
        meta: {
            requiresAuth: true,
            requiresRole: 'school'
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
        component: () => import('../views/coach/CoachDashboardView.vue'),
        meta: {
            requiresAuth: true,
            requiresRole: 'coach'
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
        name: 'athleteDashboard',
        component: () => import('../views/athlete/dashboard.vue'),
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