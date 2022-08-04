<script setup>
  import { constants } from '../assets/constants'
  import { translations } from '../assets/translations'
</script>

<script>
  export default {
    name: 'CardHeader',
    props: ['isServerDown', 'totalPoints'],
    emits: ['openModal']
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
    <el-button
      type="primary"
      class="button lg:float-right flex lg:block w-1/2 mx-auto lg:mx-0"
      @click="this.$emit('openModal', false)"
    >
      {{translations.createActivityText}}
    </el-button>
  </div>
</template>