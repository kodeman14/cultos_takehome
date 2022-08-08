<script setup>
  import { reactive, ref } from 'vue'

  import { constants } from '../assets/constants'
  import { translations } from '../assets/translations'

  const ruleFormRef = ref()
  const inputRules = reactive({
    description: [
      {
        required: true,
        message: translations.errors.descReq, trigger:
        'blur'
      }, {
        min: constants.descMinLength,
        max: constants.descMaxLength,
        message: translations.errors.descLength,
        trigger: 'blur'
      }
    ],
    pointsEarned: [
      { required: true, message: translations.errors.pointsReq, trigger: 'blur' },
      { type: 'number', message: translations.errors.pointsNum, trigger: 'blur' },
    ],
    socialPlatform: [{
      required: true,
      message: translations.errors.platformReq,
      trigger: 'blur',
    }],
    socialType: [{
      required: true,
      message: translations.errors.activityReq,
      trigger: 'blur',
    }],
  })
</script>

<script>
  export default {
    name: 'CreateModal',
    props: ['isVisible', 'editFlag', 'activityForm'],
    emits: ['createRow', 'closeModal'],
    data() {
      return {
        mobileWidth: window.innerWidth < constants.mobileWidth
      }
    },
    methods: {
      onResize() {
        this.mobileWidth = window.innerWidth < constants.mobileWidth
      }
    },
    created() {
      window.addEventListener("resize", this.onResize)
    },
    destroyed() {
      window.removeEventListener("resize", this.onResize)
    },
  }
</script>

<template>
  <!-- dialog component -->
  <el-dialog
    :width="this.mobileWidth ? '75%' : '40%'"
    v-model="isVisible"
    :title="translations[
      (editFlag ? 'edit' : 'create')
      + 'ActivityText'
    ]"
  >
    <el-form
      ref="ruleFormRef"
      :rules="inputRules"
      label-position="top"
      :model="activityForm"
    >
      <el-form-item :label="translations.modalInputs.detailsLabel" prop="description">
        <el-input
          clearable
          type="text"
          class="w-full"
          v-model="activityForm.description"
          :minLength="constants.descMinLength"
          :maxLength="constants.descMaxLength"
          :placeholder="translations.placeholders.detailsInputText"
        >
          <template #prepend v-if="!this.mobileWidth">
            <span>{{translations.placeholders.thanksForText}}</span>
          </template>
          <template #append v-if="!this.mobileWidth">
            <span>{{ constants.descMaxLength - activityForm.description.length}} / {{ constants.descMaxLength }}</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="translations.modalInputs.platformLabel" prop="socialPlatform">
        <el-select
          clearable
          class="w-full"
          v-model="activityForm.socialPlatform"
          :placeholder="translations.placeholders.platformSelectText"
        >
          <el-option :label="translations.socialPlatform.twitter" :value="translations.socialPlatform.twitter" />
          <el-option :label="translations.socialPlatform.facebook" :value="translations.socialPlatform.facebook" />
          <el-option :label="translations.socialPlatform.instagram" :value="translations.socialPlatform.instagram" />
        </el-select>
      </el-form-item>
      <el-form-item :label="translations.modalInputs.typeLabel" prop="socialType">
        <el-select
          clearable
          class="w-full"
          v-model="activityForm.socialType"
          :placeholder="translations.placeholders.typeSelectText"
        >
          <el-option :label="translations.socialType.liked" :value="translations.socialType.liked" />
          <el-option :label="translations.socialType.shared" :value="translations.socialType.shared" />
          <el-option :label="translations.socialType.posted" :value="translations.socialType.posted" />
        </el-select>
      </el-form-item>
      <el-form-item :label="translations.modalInputs.pointsLabel" prop="pointsEarned">
        <el-input-number
          type="num"
          class="w-full"
          :max="constants.pointsAmtMax"
          :min="constants.pointsAmtStep"
          :step="constants.pointsAmtStep"
          v-model="activityForm.pointsEarned"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-popconfirm
          trigger="click"
          placement="left"
          persistent="false"
          :title="translations.placeholders.cancelPopupText"
          @confirm="this.$emit('closeModal', ruleFormRef)"
        >
          <template #reference>
            <el-button>{{translations.modalInputs.cancelBtn}}</el-button>
          </template>
        </el-popconfirm>
        <el-button @click="this.$emit('createRow', this.activityForm, ruleFormRef)">
          {{translations.modalInputs.submitBtn}}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>