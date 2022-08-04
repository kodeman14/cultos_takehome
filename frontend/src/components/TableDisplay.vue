<script setup>
  import { reactive, ref } from 'vue'

  import { constants } from '../assets/constants'
  import { translations } from '../assets/translations'
  
  const currPageRef = ref(constants.pageNum)
  const pageSizeRef = ref(constants.pageSize)
</script>

<script>
  export default {
    props: ['pagedData', 'listLength', 'pageNum', 'pageSize'],
    emits: ['editRow', 'deleteRow', 'sizingChange', 'pagingChange'],
    data() {
      return {
        mobileWidth: window.innerWidth < constants.mobileWidth
      }
    },
    created() {
      window.addEventListener("resize", this.onResize);
    },
    destroyed() {
      window.removeEventListener("resize", this.onResize);
    },
    methods: {
      iconConvert(platform) {
        switch(platform) {
          case this.translations.socialPlatform.twitter:
            return 'twitter'
          case this.translations.socialPlatform.facebook:
            return 'facebook'
          case this.translations.socialPlatform.instagram:
            return 'instagram'
          default: //fail safe
            return 'font-awesome'
        }
      },
      handleSizing(value) {
        this.$emit('sizingChange', value)
      },
      handlePaging(value) {
        this.$emit('pagingChange', value)
      },
      onResize(e) {
        console.log('width', window.innerWidth)
        this.mobileWidth = window.innerWidth < constants.mobileWidth
      }
    },
  }
</script>

<template>
  <el-table
    table-layout="auto"
    class="cultos-table"
    :data="this.pagedData"
    header-cell-class-name="font-extrabold text-xl text-black"
  >
    <!-- date -->
    <el-table-column
      prop="date"
      align="center"
      header-align="center"
      v-if="!this.mobileWidth"
      :sortable="!this.mobileWidth"
      :label="translations.colHeaders.dateCol"
    >
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
          <font-awesome-icon :icon="['fab', this.iconConvert(scope.row.socialPlatform)]" />
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
        <el-button @click="this.$emit('editRow', scope.row)">
          <font-awesome-icon icon="pen-to-square" />
        </el-button>
        <el-popconfirm
          trigger="click"
          placement="right"
          persistent="false"
          :title="translations.placeholders.deletePopupText"
          @confirm="this.$emit('deleteRow', scope.$index)"
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
      :total="listLength"
      :page-sizes="[5, 10]"
      v-model:page-size="pageSizeRef"
      @size-change="this.handleSizing"
      v-model:currentPage="currPageRef"
      @current-change="this.handlePaging"
      layout="total, sizes, prev, pager, next"
    />
  </div>
</template>
