import { defineStore } from 'pinia'
import router from '../router'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    loginStatus: false,
    user: JSON.parse(localStorage.getItem('userObj')),
  }),
  getters: {
    signedIn: (state) => state.loginStatus = localStorage.getItem('statusBool')
  },
  actions: {
    loginApp(formData) {
      this.user = formData
      this.loginStatus = true
      localStorage.setItem('userObj', JSON.stringify(formData))
      localStorage.setItem('statusBool', this.loginStatus)
      router.push('/list')
    },
    logoutApp() {
      this.user = null
      this.loginStatus = false
      localStorage.removeItem('userObj')
      localStorage.removeItem('statusBool')
      router.push('/')
    }
  }
})