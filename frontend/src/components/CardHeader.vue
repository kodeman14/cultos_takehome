<script setup>
  import { constants } from '../assets/constants'
  import { translations } from '../assets/translations'
</script>

<script>
  export default {
    props: ['isServerDown', 'totalPoints'],
    emits: ['openModal']
  }
</script>

<template #header>
    <div class="card-header">
      <el-row>
        <el-col :span="18">
          <el-row>
            <el-col :span="9">
              <h1 class="font-extrabold text-4xl">{{translations.yourActivityText}}</h1>
            </el-col>
            <el-col :span="9">
              <h1 class="absolute top-2">
                {{translations.totalEarnedText}}
                <span :class="constants.gradientStyle.join(' ')">{{this.isServerDown ? constants.noPointsExist : this.totalPoints}}</span>
              </h1>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-button class="absolute button right-0" type="primary" @click="this.$emit('openModal', false, {})">{{translations.createActivityText}}</el-button>
        </el-col>
      </el-row>
    </div>
</template>