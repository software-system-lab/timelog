<template>
  <div>
    <el-row>
      <el-col :md="16" :sm="24">
        <h2>Recent Log</h2>

        <el-table :data="logLsit" style="width: 90%" sortable="true">

          <el-table-column type="expand">
            <template slot-scope="scope">
              {{scope.row.Description}}
            </template>
          </el-table-column>

          <el-table-column prop="Tag" label="Tag" align="left" :filters="tagFilters" :filter-method="filterTag">
            <template slot-scope="scope">
              <el-select v-model="scope.row.Tags" multiple disabled keyword placeholder="Choose">
                <el-option v-for="item in TagList" :key="item.TagID" :label="item.Name" :value="item.TagID">
                </el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column prop="Title" label="Event" align="left" sortable>
            <template slot-scope="scope">
              {{scope.row.Title}}
            </template>
          </el-table-column>

          <el-table-column prop="Duration" label="Duration" align="left" sortable>
            <template slot-scope="scope">
              {{scope.row.Duration}}
            </template>
          </el-table-column>

          <el-table-column label="" align="left">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="Edit(scope.row)"></el-button>
            </template>
          </el-table-column>

        </el-table>

      </el-col>
    </el-row>
    <ModifyHistoryModal :visible.sync="dialogFormVisible"></ModifyHistoryModal>
  </div>
</template>

<script>
  import ModifyHistoryModal from './History/ModifyModal'
  import _logService from '../services/LogService.js'

  export default {
    data() {
      return {
        logLsit: [],
        TagList: [],
        tagFilters: [{
          text: 'else',
          value: '-1'
        }],
        dialogFormVisible: false,
        rowData: [],
      }
    },
    async created() {
      this.logLsit = await _logService.GetUserLogs();
      //Get user tags
      let taglist = await _logService.GetUserTags();
      if (taglist == "no data")
        this.$message({
          message: 'Go setting page to add some tags!',
          type: 'warning'
        });
      else {
        this.TagList.push({
          TagID: -1,
          Name: 'else',
        })
        taglist.forEach(x => {
          this.TagList.push({
            TagID: x.TagID,
            Name: x.TagName,
          })
          //tagFilters
          this.tagFilters.push({
            value: x.TagID.toString(),
            text: x.TagName,
          })
        });
      }
    },
    methods: {
      filterTag(value, row) {
        var flag = false;
        row.Tags.forEach(x => {
          if (x == value)
            flag = true;
        });
        return flag;
      },
      Edit(rowData) {
        this.dialogFormVisible = true;
      }
    },
    components: {
      ModifyHistoryModal,
    }
  }

</script>

<style scoped>


</style>
