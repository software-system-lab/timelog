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
        logLsit: [],
        TagList: window.TagList,
        tagFilters: [{
          text: 'else',
          value: '-1'
        }],
        logIDtoModify: null,
        dialogFormVisible: false,
        rowData: [],
      }
    },
    async mounted() {
      let result = await _logService.GetUserLogs();
      if (result != "no data")
        this.logLsit = result;

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
        this.logLsit = await _logService.GetUserLogs();
        this.dialogFormVisible = false;
      }
    },
    components: {
      ModifyHistoryModal,
    }
  }

</script>

<style scoped>


</style>
