<script setup>
  import { reactive, ref } from 'vue'

  import { constants } from '../assets/constants'
  import { translations } from '../assets/translations'
  
  const currPageRef = ref(constants.pageNum)
  const pageSizeRef = ref(constants.pageSize)
  const mobilePageLayout = "prev, pager, next"
  const desktopPageLayout = `total, sizes, ${mobilePageLayout}, jumper`

  const filterOptions = [
    { text: translations.socialType.liked, value: translations.socialType.liked },
    { text: translations.socialType.shared, value: translations.socialType.shared },
    { text: translations.socialType.posted, value: translations.socialType.posted },
    { text: translations.socialPlatform.twitter, value: translations.socialPlatform.twitter },
    { text: translations.socialPlatform.facebook, value: translations.socialPlatform.facebook },
    { text: translations.socialPlatform.instagram, value: translations.socialPlatform.instagram },
  ]
</script>

<script>
  export default {
    name: 'TableDisplay',
    props: ['pagedData', 'listLength', 'pageNum', 'pageSize', 'loadingRef'],
    emits: ['editRow', 'deleteRow', 'sizingChange', 'pagingChange'],
    data() {
      return {
        mobileWidth: window.innerWidth < constants.mobileWidth
      }
    },
    created() {
      console.log('loading', this.loadingRef)
      window.addEventListener("resize", this.onResize)
    },
    destroyed() {
      window.removeEventListener("resize", this.onResize)
    },
    methods: {
      iconPlatformConvert(platform) {
        switch(platform) {
          case translations.socialPlatform.twitter:
            return 'twitter'
          case translations.socialPlatform.facebook:
            return 'facebook'
          case translations.socialPlatform.instagram:
            return 'instagram'
          default: //fail safe
            return 'fort-awesome'
        }
      },
      iconActivityConvert(activity) {
        switch(activity) {
          case translations.socialType.liked:
            return 'thumbs-up'
          case translations.socialType.shared:
            return 'share-square'
          case translations.socialType.posted:
            return 'note-sticky'
          default: //fail safe
            return 'ban'
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
      },
      filterHandler(value, row) {
        return row.socialPlatform === value || row.socialType === value
      },
    },
  }
</script>

<template>
  <el-scrollbar max-height="500px">
    <el-table
      :data="this.pagedData"
      v-loading="this.loadingRef"
      :element-loading-text="translations.loadingText"
      :table-layout="this.mobileWidth ? 'fixed': 'auto'"
      header-cell-class-name="lg:font-extrabold lg:text-xl text-black"
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

      <!-- details -->
      <el-table-column
        align="center"
        prop="description"
        header-align="center"
        :label="translations.colHeaders.detailsCol"
      >
        <template #default="scope">
          <p>
            <span v-if="!this.mobileWidth">{{translations.placeholders.thanksForText}}</span>
            {{scope.row.description}}
          </p>
        </template>
      </el-table-column>

      <!-- platform -->
      <el-table-column
        align="center"
        header-align="center"
        :filters="filterOptions"
        filter-placement="right-start"
        :filter-method="filterHandler"
        :filter-multiple="false"
        :label="translations.colHeaders.activityCol"
      >
        <template #default="scope">
          <div class="flex justify-center">
            <el-space>
              <font-awesome-icon :icon="['fab', this.iconPlatformConvert(scope.row.socialPlatform)]" />
              <div v-if="this.mobileWidth">
                <font-awesome-icon :icon="['far', this.iconActivityConvert(scope.row.socialType)]" />
              </div>
              <div v-else>
                <p>{{scope.row.socialType}}</p>
              </div>
            </el-space>
          </div>
        </template>
      </el-table-column>

      <!-- points -->
      <el-table-column
        align="center"
        prop="pointsEarned"
        header-align="center"
        :sortable="!this.mobileWidth"
        :label="translations.colHeaders.earnedCol"
      >
        <template #default="scope">
          <p :class="constants.gradientStyle.join(' ')">
            + {{scope.row.pointsEarned}}
          </p>
        </template>
      </el-table-column>

      <!-- actions -->
      <el-table-column
        align="center"
        header-align="center"
        :label="translations.colHeaders.actionsCol"
      >
        <template #default="scope">
          <el-space :fill="fill" wrap>
            <font-awesome-icon
              icon="pen-to-square"
              @click="this.$emit('editRow', scope.row)"
            />
            <el-popconfirm
              trigger="click"
              placement="right"
              persistent="false"
              @confirm="this.$emit('deleteRow', scope.$index)"
              :title="translations.placeholders.deletePopupText"
            >
              <template #reference>
                <font-awesome-icon icon="trash-can" />
              </template>
            </el-popconfirm>
          </el-space>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>

  <!-- pagination -->
  <div class="flex justify-center mt-10">
    <el-pagination
      background
      :total="listLength"
      :page-sizes="[10, 20, 40, 80]"
      v-model:page-size="pageSizeRef"
      @size-change="this.handleSizing"
      v-model:currentPage="currPageRef"
      @current-change="this.handlePaging"
      :pager-count="constants.pagerCount"
      :layout="this.mobileWidth ? mobilePageLayout : desktopPageLayout"
    />
  </div>
</template>