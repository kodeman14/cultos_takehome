<template>
  <el-menu
    mode="horizontal"
    :ellipsis="false"
    class="absolute top-0"
    @select="handleSelect"
  >
    <el-menu-item index="0">ATEM_LABS</el-menu-item>
    <div class="flex-grow"></div>
    <el-menu-item index="1">Rewards</el-menu-item>
    <el-menu-item index="2">Archives</el-menu-item>
    <el-sub-menu index="3">
      <template #title>Options</template>
      <el-menu-item index="a">Profile (wip)</el-menu-item>
      <el-menu-item index="b">Logout</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
  import { ElMessage } from 'element-plus'
  import { useAuthStore } from '../stores/auth'
  import { translations } from '../assets/translations'

  const authStore = useAuthStore()
</script>

<script>
  export default {
    methods: {
      handleGoTo(key) {
        switch (key) {
          case '1': return '/rewards'
          case '2': return '/archive'
          case 'a': return '/profile'
          default: return '/'
        }
      },
      handleSelect(key) {
        if (key === 'b') {
          this.authStore.logoutApp()
          ElMessage({
            message: translations.snackbars.loggedOut,
            type: 'success',
          })
        } else {
          ElMessage({
            message: translations.snackbars.wipFeature,
            type: 'info',
          })
          const goTo = this.handleGoTo(key)
          this.$router.push(goTo)
        }
      }
    }
  }
</script>