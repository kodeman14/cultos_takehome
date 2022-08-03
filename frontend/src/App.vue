<script setup>
  import { ElMessage, ElTable } from 'element-plus'
  import { reactive, isProxy, toRaw } from 'vue'

  import { constants } from './assets/constants'
  import { translations } from './assets/translations'
  import CreateModal from './components/CreateModal.vue'
  import TableDisplay from './components/TableDisplay.vue'

  const defaultForm = reactive({
    description: '',
    socialPlatform: '',
    socialType: '',
    pointsEarned: 10,
  })

  const inputRules = reactive({
    description: [{
      required: true,
      message: translations.errors.descReq, trigger:
      'blur'
    }, {
      min: constants.descMinLength,
      max: constants.descMaxLength,
      message: translations.errors.descLength,
      trigger: 'blur'
    }],
    points: [
      { required: true, message: translations.errors.pointsReq, trigger: 'change' },
      { type: 'number', message: translations.errors.pointsNum, trigger: 'change' },
    ],
    socialPlatform: [{
      required: true,
      message: translations.errors.platformReq,
      trigger: 'change',
    }],
    socialType: [{
      required: true,
      message: translations.errors.activityReq,
      trigger: 'change',
    }],
  })
</script>

<script>
  export default {
    name: 'App',
    components: {
      CreateModal,
      TableDisplay,
    },
    data() {
      return {
        pageNum: 1,
        pageSize: 5,
        tableData: [],
        pagedData: [],
        totalPoints: 0,
        editFlag: false,
        isServerDown: true,
        isEmptyFlag: false,
        modalVisible: false,
        freshFormFields: {},
        activityForm: this.defaultForm,
        translations: this.translations,
}
    },
    beforeMount() {
      this.getList()
      this.freshFormFields = { ...this.activityForm }
    },
    methods: {
      getList() {
        this.axios
        .post(constants.apiEndpoint + constants.apiList)
        .then(response => {
          console.log(response.data)
          this.tableData = response.data

          this.setPagedData()
          this.checkEmpty(false)
          this.calculatePoints()
        })
        .catch(error => {
          this.checkEmpty(true)
          console.error('axios fetch error', error)
          ElMessage.error(translations.snackbars.serverIssue)
        })
      },
      calculatePoints() {
        this.totalPoints = 0 //always resets to 0
        this.tableData && this.tableData.forEach(row => this.totalPoints += row.pointsEarned)
      },
      getRawInfo(info) {
        return isProxy(info) ? toRaw(info) : info
      },
      setFormScratch() {
        this.editFlag = false
        // this.ruleFormRef.resetFields()
        console.log('default', this.freshFormFields)
        this.activityForm = { ... this.freshFormFields }
      },
      createRow(formData, formRef) {
        const formInfo = this.getRawInfo(formData)
        const payload = {
          ...formInfo,
          date: new Date()
}

        if(!this.editFlag) {
          if (!formRef) return
          formRef.validate((valid, fields) => {
            if (valid) {
              this.axios.post(constants.apiEndpoint + constants.apiCreate, payload)
                .then(response => {
                  this.modalVisible = false
                  this.tableData.push(response.data)
                  this.setPagedData()
                  this.calculatePoints()

                  ElMessage({
                    message: translations.snackbars.axiosSuccess,
                    type: 'success',
                  })
                })
                .catch(error => {
                  console.error('axios create error', error)
                  ElMessage.error(translations.snackbars.axiosError)
                })
            } else {
              console.error('data valid error', fields)
              ElMessage.error(translations.snackbars.missingFields)
}
          })
        } else { // in edit mode
          this.editFlag = false
          this.calculatePoints()
          this.modalVisible = false

          ElMessage({
            message: translations.snackbars.rowEdit,
            type: 'success',
          })
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
        formRef.clearValidate()
        this.modalVisible = false
      },
      editRow(rowData) {
        const rowInfo = this.getRawInfo(rowData)
        console.log('edit', rowInfo)
        this.openModal(true, rowInfo)
      },
      deleteRow(index) {
        this.tableData.splice(index, 1)
        console.log('deleted', this.tableData)

        this.setPagedData()
        this.checkEmpty(false)
        this.calculatePoints()
        ElMessage({
          message: translations.snackbars.rowDelete,
          type: 'success'
        })
      },
      convertToIcon(platform) {
        switch(platform) {
          case this.translations.socialPlatform.twitter:
            return 'twitter'
          case this.translations.socialPlatform.facebook:
            return 'facebook'
          case this.translations.socialPlatform.instagram:
            return 'instagram'
          default:
            return 'nothing'
}
      },
      handleSizeChange(value) {
        this.pageSize = value
        this.setPagedData()
      },
      handlePageChange(value) {
        this.pageNum = value
        this.setPagedData()
      },
      setPagedData() {
        const rawTable = this.getRawInfo(this.tableData)
        const multSizeNum = this.pageSize * this.pageNum
        this.pagedData = rawTable.slice(multSizeNum - this.pageSize, multSizeNum)
      },
      checkEmpty(dbIssue) {
        const rawTable = this.getRawInfo(this.tableData)
        this.isServerDown = dbIssue
        if (!dbIssue) this.isEmptyFlag = rawTable.length === 0
}
    },
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
                  <span :class="constants.gradientStyle.join(' ')">{{this.isServerDown ? constants.noPointsExist : this.totalPoints}}</span>
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
    <div v-if="!this.isEmptyFlag && !this.isServerDown">
      <el-table
        ref="tableDataRef"
        table-layout="auto"
        class="cultos-table"
        :data="this.pagedData()"
        header-cell-class-name="font-extrabold text-xl text-black"
      >
        <!-- :row-key="id" -->
        <!-- v-if="!this.hideColMobile" -->
        <!-- @current-change="handleRowClick" -->
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
            <p :class="constants.gradientStyle.join(' ')">+ {{scope.row.pointsEarned}}</p>
          </template>
        </el-table-column>
        <el-table-column :label="translations.colHeaders.actionsCol">
          <template #default="scope">
            <el-button @click="editRow(scope.row)">
              <font-awesome-icon icon="pen-to-square" />
            </el-button>
            <el-popconfirm
              trigger="hover"
              placement="right"
              persistent="false"
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
      <div class="flex justify-center mt-10">
        <el-pagination
          background
          :page-sizes="[5, 10]"
          :total="this.tableData.length"
          v-model:page-size="pageSizeRef"
          @size-change="handleSizeChange"
          v-model:currentPage="currPageRef"
          @current-change="handlePageChange"
          layout="total, sizes, prev, pager, next"
        />
      </div>
    </div>
    <div v-else>
      <el-empty :description="translations.errors[
        this.isEmptyFlag
        ? 'emptyTable'
        : this.isServerDown
          ? 'noDataLoaded'
          : 'otherIssue'
      ]" />
    </div>
  </el-card>

  <CreateModal
    @create-row="createRow"
    @close-modal="closeModal"
    :edit-flag="this.editFlag"
    :is-visible="this.modalVisible"
    :activity-form="this.activityForm"
        />
</template>
