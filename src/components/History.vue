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
          <el-button type="success" icon="el-icon-search" @click="QueryLogs()">Search</el-button>
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

          <el-table-column prop="TaskType" label="TaskType" align="left" :filters="taskTypeFilters" :filter-method="filterTaskType">
            <template slot-scope="scope">
              {{scope.row.TaskTypeName ? scope.row.TaskTypeName : "Other Events"}}
            </template>
          </el-table-column>

          <el-table-column prop="Title" label="Title" align="left" sortable>
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
  <ModifyHistoryModal :visible="dialogFormVisible" :rowDataID="logIDtoModify" @close-modal="closeModal()"></ModifyHistoryModal>
</div>
</template>

<script>
import { LogView } from '@/components/interface.js'
import { Component } from 'vue-property-decorator'
import moment from 'moment'
import ModifyHistoryModal from '@/components/History/ModifyModal'
import _logService from '@/services/LogService.js'
import profileService from '@/services/ProfileService.js'

@Component({
  components: {
    ModifyHistoryModal,
  }
})
export default class History extends LogView {
  // Data members
  logList = []

  taskTypeList = window.TaskTypeList

  taskTypeFilters = [{
    text: 'Untitled Events',
    value: null
  }]

  logIDtoModify = null
  TimeBoxList = window.SprintList
  dialogFormVisible = false
  rowData = []
  KeywordToSearch = ''
  StartSearchDate = new moment().add(-7, 'days').format('YYYY-MM-DD')
  EndSearchDate = new moment().format('YYYY-MM-DD')

  // Life cycle
  beforeCreated() {
    this.taskTypeList.push({
      TaskTypeName: "Untitled Events",
      TaskTypeID: ""
    })
  }

  async mounted() {
    const currentTimeBox = await profileService.getCurrentTimeBoxRange()
    if (currentTimeBox) {
      this.StartSearchDate = moment(currentTimeBox.StartDate)
      this.EndSearchDate = moment(currentTimeBox.EndDate)
    }

    this.QueryLogs()

    //taskTypeFilters
    //clear list
    this.taskTypeFilters.length = 0
    this.taskTypeList.forEach(x => {
      this.taskTypeFilters.push({
        value: x.TaskTypeID? x.TaskTypeID.toString(): null,
        text: x.TaskTypeName,
      })
    })
  }


  // Methods
  filterTaskType(value, row) {
    var flag = false
    if (row.TaskTypeID == value) {
      flag = true
    }
    return flag
  }

  Edit(rowData) {
    this.logIDtoModify = rowData.LogID
    this.dialogFormVisible = true
  }

  async closeModal() {
    this.logIDtoModify = null
    this.QueryLogs()
    this.dialogFormVisible = false
  }

  async QueryLogs() {
    let result = await _logService.GetUserLogs(this.KeywordToSearch, new moment(this.StartSearchDate), new moment(this.EndSearchDate))
    if (result != "no data")
      this.logList = result
    else
      this.logList = []
  }

  update() {
    this.QueryLogs()
  }
}
</script>
