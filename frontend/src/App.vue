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
}

nav a:first-of-type {
  border: 0;
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

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

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
