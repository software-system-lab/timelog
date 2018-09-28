<template>
  <div>
    <el-row>
      <el-col :md="16" :sm="24">
        <h2>Recent Log</h2>
        <el-select v-model="SprintIDToSearch" placeholder="Choose">
          <el-option v-for="item in SprintList" :key="item.SprintID" :label="item.SprintName" :value="item.SprintID">
          </el-option>
        </el-select>
        <el-button type="success" icon="el-icon-search" circle @click="confirmSearchBox()"></el-button>
        <el-table :data="logList" sortable="true">

          <el-table-column type="expand">
            <template slot-scope="scope">
              {{scope.row.Description}}
            </template>
          </el-table-column>

          <el-table-column prop="Tag" label="Tag" align="left" :filters="tagFilters" :filter-method="filterTag">
            <template slot-scope="scope">
              <el-select v-model="scope.row.Tags" multiple disabled keyword placeholder="Choose">
                <el-option v-for="item in TagList" :key="item.TagID" :label="item.TagName" :value="item.TagID">
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
    <ModifyHistoryModal :visible.sync="dialogFormVisible" :rowDataID="logIDtoModify" @close-modal="closeModal()"></ModifyHistoryModal>
  </div>
</template>

<script>
  import ModifyHistoryModal from './History/ModifyModal'
  import _logService from '../services/LogService.js'

  export default {
    data() {
      return {
        logList: [],
        TagList: window.TagList,
        tagFilters: [{
          text: 'else',
          value: '-1'
        }],
        logIDtoModify: null,
        SprintIDToSearch: window.Profile.Sprint.SprintID,
        SprintList: window.SprintList,
        dialogFormVisible: false,
        rowData: [],
      }
    },
    async mounted() {
      this.QueryLogs();

      //tagFilters
      //clear list
      this.tagFilters.length = 0;
      this.TagList.forEach(x => {
        this.tagFilters.push({
          value: x.TagID.toString(),
          text: x.TagName,
        })
      })
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
        this.logIDtoModify = rowData.LogID;
        this.dialogFormVisible = true;
      },
      async closeModal() {
        this.logIDtoModify = null;
        this.logList = await _logService.GetUserLogs();
        this.dialogFormVisible = false;
      },
      confirmSearchBox() {
        this.QueryLogs(this.SprintIDToSearch);
      },
      async QueryLogs(sprintID) {
        let result = await _logService.GetUserLogs(sprintID);
        if (result != "no data")
          this.logList = result;
        else
          this.logList = [];
      }
    },
    components: {
      ModifyHistoryModal,
    }
  }

</script>

<style scoped>


</style>
