<template>
<div>
  <el-row>
    <el-col :md="24" :sm="24">
      <el-card>
        <div slot="header" class="clearfix">
          <h2>Recent Log</h2>
        </div>
        <el-col :md="12" :sm="24">
          <el-input size="medium" placeholder="By Keyword" v-model="KeywordToSearch"></el-input>
        </el-col>
        <el-col :md="8" :sm="24">
          <el-date-picker v-model="StartSearchDate" type="date" placeholder="Start Date"></el-date-picker>
          <el-date-picker v-model="EndSearchDate" type="date" placeholder="End Date"></el-date-picker>
        </el-col>
        <el-col :md="4" :sm="24">
          <el-button type="success" icon="el-icon-search" @click="confirmSearchBox()">Search</el-button>
        </el-col>
        <br />
        <br />
        <el-divider />
        <el-table :data="logList" sortable="true">
          <el-table-column type="expand">
            <template slot-scope="scope">
              {{scope.row.Description}}
            </template>
          </el-table-column>

          <el-table-column prop="Project" label="Project" align="left" :filters="projectFilters" :filter-method="filterProject">
            <template slot-scope="scope">
              <el-select v-model="scope.row.Projects" multiple disabled keyword placeholder="Choose">
                <el-option v-for="item in projectList" :key="item.ProjectID" :label="item.ProjectName" :value="item.ProjectID">
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
      </el-card>
    </el-col>
  </el-row>
  <ModifyHistoryModal :visible.sync="dialogFormVisible" :rowDataID="logIDtoModify" @close-modal="closeModal()"></ModifyHistoryModal>
</div>
</template>

<script>
import ModifyHistoryModal from './History/ModifyModal'
import _logService from '../services/LogService.js'
import moment from 'moment'

export default {
  data() {
    return {
      logList: [],
      projectList: window.ProjectList,
      projectFilters: [{
        text: 'other',
        value: null
      }],
      logIDtoModify: null,
      IterationIDToSearch: window.Profile.currentIterationID,
      IterationList: window.SprintList,
      dialogFormVisible: false,
      rowData: [],
      KeywordToSearch: '',
      StartSearchDate: new moment(),
      EndSearchDate: new moment().add(7, 'days')
    }
  },
  async mounted() {
    this.QueryLogs();

    //projectFilters
    //clear list
    this.projectFilters.length = 0;
    this.projectList.forEach(x => {
      this.projectFilters.push({
        value: x.ProjectID.toString(),
        text: x.ProjectName,
      })
    })
  },
  methods: {
    filterProject(value, row) {
      var flag = false;
      row.Projects.forEach(x => {
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
      this.QueryLogs(this.IterationIDToSearch);
      this.dialogFormVisible = false;
    },
    confirmSearchBox() {
      this.QueryLogs(this.IterationIDToSearch);
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
