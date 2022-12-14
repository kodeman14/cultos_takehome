<script setup>
  import { reactive, isProxy, toRaw } from 'vue'
  import { ElMessage, ElTable } from 'element-plus'

  import { constants } from '../assets/constants'
  import { translations } from '../assets/translations'

  import CardHeader from '../components/CardHeader.vue'
  import CreateModal from '../components/CreateModal.vue'
  import TableDisplay from '../components/TableDisplay.vue'

  const defaultForm = reactive({
    socialType: '',
    description: '',
    socialPlatform: '',
    pointsEarned: constants.startingPoints,
  })

  const inputRules = reactive({
    description: [{
      required: true,
      trigger: 'blur',
      message: translations.errors.descReq,
    }, {
      trigger: 'blur',
      min: constants.descMinLength,
      max: constants.descMaxLength,
      message: translations.errors.descLength,
    }],
    points: [
      { required: true, message: translations.errors.pointsReq, trigger: 'change' },
      { type: 'number', message: translations.errors.pointsNum, trigger: 'change' },
    ],
    socialPlatform: [{
      required: true,
      trigger: 'change',
      message: translations.errors.platformReq,
    }],
    socialType: [{
      required: true,
      trigger: 'change',
      message: translations.errors.activityReq,
    }],
  })
</script>

<script>
  export default {
    name: 'HomeView',
    components: {
      CardHeader,
      CreateModal,
      TableDisplay,
    },
    data() {
      return {
        pageNum: constants.pageNum,
        pageSize: constants.pageSize,
        tableData: [],
        pagedData: [],
        totalPoints: 0,
        editFlag: false,
        loadingRef: true,
        isEmptyFlag: false,
        isServerDown: true,
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
          this.tableData = response.data
          this.checkEmpty(false)

          setTimeout(() => {
            this.setPagedData()
            this.calculatePoints()
            this.loadingRef = false
          }, constants.timeout)
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
        this.activityForm = { ...this.freshFormFields}
        formRef.resetFields()
        formRef.clearValidate()
        this.modalVisible = false
      },
      editRow(rowData) {
        const rowInfo = this.getRawInfo(rowData)
        this.openModal(true, rowInfo)
      },
      deleteRow(index) {
        this.tableData.splice(index, 1)

        this.setPagedData()
        this.checkEmpty(false)
        this.calculatePoints()
        ElMessage({
          message: translations.snackbars.rowDelete,
          type: 'success'
        })
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
      },
    },
  }
</script>

<template>
  <el-container>
    <el-header class="contents">
      <NavMenu />
    </el-header>
    <el-main>
      <el-card class="w-full lg:w-3/4 lg:mx-auto">
        <!-- main header -->
        <CardHeader
          :is-server-down="this.isServerDown"
          :total-points="this.totalPoints"
          @open-modal="openModal"
        />
        <el-divider />

        <!-- conditional table display -->
        <div v-if="!this.isEmptyFlag && !this.isServerDown">
          <TableDisplay
            @edit-row="editRow"
            @delete-row="deleteRow"
            :paged-data="this.pagedData"
            :loading-ref="this.loadingRef"
            @sizing-change="handleSizeChange"
            @paging-change="handlePageChange"
            :list-length="this.tableData.length"
          />
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
    </el-main>
  </el-container>

  <!-- create activity modal -->
  <CreateModal
    @create-row="createRow"
    @close-modal="closeModal"
    :edit-flag="this.editFlag"
    :is-visible="this.modalVisible"
    :activity-form="this.activityForm"
  />
</template>