<script setup>
  import { constants } from '../assets/constants'
  import { translations } from '../assets/translations'

  import { ElMessage } from 'element-plus'
</script>

<script>
  export default {
    name: 'CardHeader',
    props: ['isServerDown', 'totalPoints'],
    emits: ['openModal'],
    methods: {
      wipFeature() {
        ElMessage({
          message: translations.snackbars.wipFeature,
          type: 'info',
        })
      }
    }
  }
</script>

<template #header>
  <div class="grid text-center items-center lg:grid-cols-4 gap-y-2">
    <h1 class="font-extrabold text-2xl lg:text-4xl">{{translations.yourActivityText}}</h1>
    <h1>
      {{translations.totalEarnedText}}
      <span :class="constants.gradientStyle.join(' ')">
        {{this.isServerDown ? constants.noPointsExist : this.totalPoints}}
      </span>
    </h1>
    <div></div>
    <div class="flex flex-row">
      <el-button
        type="primary"
        class="button lg:float-right flex lg:block mx-auto lg:mx-0"
        @click="this.$emit('openModal', false)"
      >
        {{translations.createActivityText}}
      </el-button>
      <el-button
        type="danger"
        class="button lg:float-right flex lg:block mx-auto lg:mx-0"
        @click="wipFeature"
      >
        {{'Search'}}
      </el-button>
    </div>
  </div>
</template>