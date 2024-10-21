import { defineStore } from "pinia";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: null,
        isAuthenticated: !!localStorage.getItem('isAuth'),
        token: localStorage.getItem('token') || ''
    }),
    actions: {
        async login(token, role){
            this.isAuthenticated = true
            this.token = token

            localStorage.setItem('isAuth', true)
            localStorage.setItem('token', token)
            localStorage.setItem('role', role)
        },
        async logout(){
            this.user = null
            this.token = ''

            localStorage.removeItem('isAuth')
            localStorage.removeItem('token')
            localStorage.removeItem('role')
        }
    }
})