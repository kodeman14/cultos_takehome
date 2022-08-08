<script setup>
  import { useAuthStore } from '../stores/auth'
  import LoginForm from '../components/LoginForm.vue'

  const authStore = useAuthStore()
</script>
<script>
  export default {
    name: 'WelcomePage',
    methods: {
      appLogin(formData) {
        this.authStore.loginApp(formData)
      },
    }
  }
</script>


<template>
  <main>
    <h1 class="font-extrabold text-4xl">HELLO THERE!</h1>
    <LoginForm @app-login="this.appLogin" />
  </main>
</template>
