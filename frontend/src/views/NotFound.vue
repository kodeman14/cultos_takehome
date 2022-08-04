<script setup>
  import { RouterLink } from 'vue-router'
  import { useAuthStore } from '../stores/auth'
  import { translations } from '../assets/translations'

  import LoginForm from '../components/LoginForm.vue'

  const authStore = useAuthStore()
</script>
<script>
  export default {
    name: 'NotFound',
    methods: {
      handleBack() {
        this.$router.push(this.authStore.signedIn ? '/list' : '/')
      }
    }
  }
</script>

<template>
  <el-result
    icon="warning"
    :title="translations.notFound.errorTitle"
    :sub-title="translations.notFound.errorTitle"
  >
    <template #extra>
      <el-button @click="handleBack" type="primary">
        {{translations.notFound.goBackBtn}}
      </el-button>
    </template>
  </el-result>
</template>