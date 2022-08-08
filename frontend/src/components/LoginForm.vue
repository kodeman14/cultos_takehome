<script setup>
  import { reactive, ref, isProxy, toRaw } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'

  import { constants } from '../assets/constants'
  import { translations } from '../assets/translations'

  const userData = reactive({
    username: '',
    password: '',
  })
</script>

<script>
  export default {
    name: 'LoginForm',
    emits: ['appLogin'],
    data() {
      return {
        userForm: this.userData,
      }
    },
    methods: {
      getRawInfo(info) {
        return isProxy(info) ? toRaw(info) : info
      },
      formReset() {
        this.userForm = {}
      },
    }
  }
</script>

<template>
  <div class="card-header">
    <el-form
      :model="userForm"
      label-position="top"
    >
      <el-form-item :label="translations.loginForm.username" prop="description">
        <el-input
          clearable
          type="text"
          v-model="userForm.username"
          :placeholder="translations.loginForm.username"
        />
      </el-form-item>
      <el-form-item :label="translations.loginForm.password" prop="description">
        <el-input
          clearable
          type="password"
          v-model="userForm.password"
          :placeholder="translations.loginForm.password"
        />
      </el-form-item>
    </el-form>

    <span class="flex justify-center">
      <el-button @click="formReset">
        {{translations.loginForm.resetBtn}}
      </el-button>
      <el-button type="primary" @click="this.$emit('appLogin', this.userForm)">
        <RouterLink to="/list">
          {{translations.loginForm.signinBtn}}
        </RouterLink>
      </el-button>
    </span>
  </div>
</template>
