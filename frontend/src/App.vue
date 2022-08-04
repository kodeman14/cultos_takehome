<script setup>
  import { RouterView } from 'vue-router'
  import { reactive, isProxy, toRaw } from 'vue'
  import { ElMessage, ElTable } from 'element-plus'

  import { constants } from './assets/constants'
  import { translations } from './assets/translations'
</script>

<template>
  <RouterView />
</template>
