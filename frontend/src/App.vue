<script setup>
  import { ElMessage, ElTable } from 'element-plus'
  import { reactive, ref, isProxy, toRaw } from 'vue'

  import { constants } from './assets/constants'
  import { translations } from './assets/translations'

  const ruleFormRef = ref()
  const apiLocal = "http://localhost:1938/api/MyActivity/"

  const defaultForm = reactive({
    description: '',
    socialPlatform: '',
    socialType: '',
    pointsEarned: 10,
  })

  <RouterView />
</template>

  export default {
    name: 'App',
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
    data() {
      return {
        tableData: [],
        totalPoints: 0,
        modalVisible: false,
        activityForm: this.defaultForm,
        translations: this.translations,
}
    },
    beforeMount() {
      this.getList()

.logo {
  display: block;
  margin: 0 auto 2rem;
    },
    methods: {
      getList() {
        this.axios
        .post(this.apiLocal + 'list')
        .then(response => {
          console.log(response.data)
          this.tableData = response.data
        })
        .then(() => this.calculatePoints())
        .catch(error => {
          console.error('axios fetch error', error)
          ElMessage.error(translations.snackbars.serverIssue)
        })
      },
      calculatePoints() {
        this.totalPoints = 0
        this.tableData && this.tableData.forEach(row => this.totalPoints += row.pointsEarned)
      },
      getRawInfo(info) {
        return isProxy(info) ? toRaw(info) : info
      },
      createRow(formData, formRef) {
        const formInfo = this.getRawInfo(formData)
        const payload = {
          ...formInfo,
          date: new Date()
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

                  ElMessage({
                    message: translations.snackbars.axiosSuccess,
                    type: 'success',
                  })
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
      },
      openModal(isEditMode, rowData) {
        this.modalVisible = true
        if (isEditMode) {
          this.editFlag = true
          this.activityForm = rowData
        } else this.setFormScratch()
      },
      closeModal(formRef) {
        if(!formRef) return
        formRef.resetFields()
        this.modalVisible = false
      },
      editRow(rowData) {
        const rowInfo = this.getRawInfo(rowData)
        console.log('edit', rowInfo)
      },
      deleteRow(index) {
        this.tableData.splice(index, 1)
        console.log('deleted', this.tableData)
        ElMessage({
          message: translations.snackbars.rowDelete,
          type: 'success'
        })
      },
      convertToIcon(platform) {
        switch(platform) {
          default:
            return 'nothing'
}
      },
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
</script>

<template>
  <el-card class="box-card">
    <!-- main header -->
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
                  <span :class="gradientStyle">{{totalPoints}}</span>
                </h1>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-button class="absolute button right-0" type="primary" @click="openModal(false, {})">{{translations.createActivityText}}</el-button>
          </el-col>
        </el-row>
      </div>
    </template>

    <!-- table component -->
      <el-table
        :data="this.tableData"
        table-layout="auto"
        class="cultos-table"
        header-cell-class-name="font-extrabold text-xl text-black"
      >
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
        <el-table-column :label="translations.colHeaders.dateCol" sortable prop="date">
          <template #default="scope">
            <p>{{scope.row.date.slice(0, 10)}}</p>
          </template>
        </el-table-column>
        <el-table-column :label="translations.colHeaders.detailsCol">
          <template #default="scope">
            <p>{{translations.placeholders.thanksForText}} {{scope.row.description}}</p>
          </template>
        </el-table-column>
        <el-table-column :label="translations.colHeaders.activityCol">
          <template #default="scope">
          <el-row>
            <el-space>
              <font-awesome-icon :icon="['fab', this.convertToIcon(scope.row.socialPlatform)]" />
              <p>{{scope.row.socialType}}</p>
            </el-space>
          </el-row>
          </template>
        </el-table-column>
        <el-table-column :label="translations.colHeaders.earnedCol" sortable prop="pointsEarned">
          <template #default="scope">
            <p :class="gradientStyle">+ {{scope.row.pointsEarned}}</p>
          </template>
        </el-table-column>
        <el-table-column :label="translations.colHeaders.actionsCol">
          <template #default="scope">
            <el-button @click="editRow(scope.row)">
              <font-awesome-icon icon="pen-to-square" />
            </el-button>
            <el-popconfirm
              :title="translations.placeholders.deletePopupText"
              @confirm="deleteRow(scope.$index)"
            >
              <template #reference>
                <el-button>
                  <font-awesome-icon icon="trash-can" />
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
  </el-card>

  <!-- dialog component -->
  <el-dialog v-model="modalVisible" :title="editFlag ? translations.editActivityText : translations.createActivityText">
    <el-form ref="ruleFormRef" :model="activityForm" :rules="inputRules" label-position="top">
      <el-form-item :label="translations.modalInputs.detailsLabel" prop="description">
        <el-col :span="18">
          <el-input
            clearable
            type="text"
            :minLength="descMinLength"
            :maxLength="descMaxLength"
            v-model="activityForm.description"
            :placeholder="translations.placeholders.detailsInputText"
          >
            <template #prepend>
              <span>{{translations.placeholders.thanksForText}}</span>
            </template>
            <template #append>
              <span>{{ constants.descMaxLength - activityForm.description.length}} / {{ constants.descMaxLength }}</span>
            </template>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item :label="translations.modalInputs.platformLabel" prop="socialPlatform">
        <el-select v-model="activityForm.socialPlatform" clearable :placeholder="translations.placeholders.platformSelectText">
          <el-option :label="translations.socialPlatform.twitter" :value="translations.socialPlatform.twitter" />
          <el-option :label="translations.socialPlatform.facebook" :value="translations.socialPlatform.facebook" />
          <el-option :label="translations.socialPlatform.instagram" :value="translations.socialPlatform.instagram" />
        </el-select>
      </el-form-item>
      <el-form-item :label="translations.modalInputs.typeLabel" prop="socialType">
        <el-select v-model="activityForm.socialType" clearable :placeholder="translations.placeholders.typeSelectText">
          <el-option :label="translations.socialType.liked" :value="translations.socialType.liked" />
          <el-option :label="translations.socialType.shared" :value="translations.socialType.shared" />
          <el-option :label="translations.socialType.posted" :value="translations.socialType.posted" />
        </el-select>
      </el-form-item>
      <el-form-item :label="translations.modalInputs.pointsLabel" prop="pointsEarned">
        <el-input-number
          type="num"
          :min="constants.pointsAmtMin"
          :max="constants.pointsAmtMax"
          :step="constants.pointsAmtStep"
          v-model="activityForm.pointsEarned"
        />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>
  .box-card {
    width: 75%;
  }

  .cultos-table {
    width: auto;
    overflow: visible;
}
</style>
