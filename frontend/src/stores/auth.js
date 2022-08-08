import { defineStore } from 'pinia'
import router from '../router'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('userObj')),
    loginStatus: false,
    returnUrl: null,
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
      router.push(this.returnUrl || '/list')
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