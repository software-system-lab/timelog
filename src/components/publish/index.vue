<template>
  <el-card>
    <div slot="header" class="clearfix">
      <h2>Published</h2>
    </div>
    <el-table :data="userDataList" sortable="true">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <SpentTime :LogReportData="scope.row.activityList" :isInPublish="false"/>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column prop="duration" label="Duration" align="center">
        <template slot-scope="scope">
          {{scope.row.duration}}
        </template>
      </el-table-column>
      <el-table-column prop="total" label="Total" align="center">
        <template slot-scope="scope">
          {{getHour(scope.row.total)}} : {{getMinute(scope.row.total)}}
        </template>
      </el-table-column>
      <el-table-column prop="update" label="Update Time" align="center">
        <template slot-scope="scope">
          {{scope.row.update}}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import publishService from '@/services/publish_service.js'
import SpentTime from '@/components/Board/spent_time.vue'

@Component({
  components: {
    SpentTime
  }
})
export default class Publish extends Vue {
  // Data members
  userDataList = []

  // Life cycle
  created () {
    this.update()
  }

  // Methods
  async update () {
    this.userDataList = await publishService.getUserDataList()
  }

  paddingLeft (str, len) {
    if (str.toString().length >= len) {
      return str
    }
    return this.paddingLeft('0' + str, len)
  }

  getHour (time) {
    return this.paddingLeft((time / 3600000).toFixed(0), 2)
  }

  getMinute (time) {
    return this.paddingLeft((time %
    3600000 / 60 / 1000).toFixed(0), 2)
  }
}
</script>
