<template>
  <el-card>
    <div slot="header" class="clearfix">
      <h2>Published</h2>
    </div>
    <el-table :data="userDataList" sortable="true">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <SpentTime :ProjectList="scope.row.projectList"/>
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
import publishService from '@/services/publish_service.js'
import SpentTime from '@/components/Board/spent_time.vue'

export default {
  data() {
    return {
      userDataList: []
    }
  },
  created() {
    this.update()
  },
  methods: {
    async update() {
      this.userDataList = await publishService.getUserDataList()
      this.$forceUpdate();
    },
    paddingLeft(str, len) {
      if (str.toString().length >= len) {
        return str;
      }
      else {
        return this.paddingLeft('0' + str, len);
      }
    },
    getHour(time) {
      return this.paddingLeft((time / 3600000).toFixed(0),2)
    },
    getMinute(time) {
      return this.paddingLeft((time %
      3600000 / 60 / 1000).toFixed(0),2)
    },
  },
  components: {
    SpentTime
  }
}
</script>
