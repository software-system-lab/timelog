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

          <el-table-column prop="Project" label="Project" align="left" :filters="projectFilters" :filter-method="filterProject">
            <template slot-scope="scope">
              {{scope.row.ProjectName ? scope.row.ProjectName : "Other Events"}}
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
import LogView from '@/components/interface.js'
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

  projectList = window.ProjectList

  projectFilters = [{
    text: 'Untitled Events',
    value: null
  }]

  logIDtoModify = null
  IterationList = window.SprintList
  dialogFormVisible = false
  rowData = []
  KeywordToSearch = ''
  StartSearchDate = new moment().add(-7, 'days').format('YYYY-MM-DD')
  EndSearchDate = new moment().format('YYYY-MM-DD')

  // Life cycle
  beforeCreated() {
    this.projectList.push({
      ProjectName: "Untitled Events",
      ProjectID: ""
    })
  }

  async mounted() {
    const currentIteration = await profileService.getCurrentIterationRange()
    if (currentIteration) {
      this.StartSearchDate = moment(currentIteration.StartDate)
      this.EndSearchDate = moment(currentIteration.EndDate)
    }

    this.QueryLogs()

    //projectFilters
    //clear list
    this.projectFilters.length = 0
    this.projectList.forEach(x => {
      this.projectFilters.push({
        value: x.ProjectID? x.ProjectID.toString(): null,
        text: x.ProjectName,
      })
    })
  }


  // Methods
  filterProject(value, row) {
    var flag = false
    if (row.ProjectID == value) {
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
