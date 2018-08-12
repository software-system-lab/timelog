<template>
  <div>
    <el-row>
      <h2>Current</h2>
      <el-col :md="12" :sm="24">

      </el-col>
      <el-col :md="6" :sm="12">

      </el-col>
    </el-row>
    <el-row>
      <h2>Setting</h2>
      <el-col :md="12" :sm="24">
        <el-button type="primary" @click="openModal()">Create</el-button>
      </el-col>
      <el-col :md="24" :sm="24">
        <h3>Stack</h3>
        <el-table :data="SprintList" style="width: 90%" sortable="true">

          <el-table-column type="expand">
            <template slot-scope="scope">
              {{scope.row.Content}}
            </template>
          </el-table-column>

          <el-table-column prop="Name" label="Sprint" width="180" align="left">
            <template slot-scope="scope">
              {{scope.row.Name}}
            </template>
          </el-table-column>

          <el-table-column prop="Duration" label="Duration" width="180" align="left" sortable>
            <template slot-scope="scope">
              {{scope.row.Duration}}
            </template>
          </el-table-column>

          <el-table-column label="" align="left">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="openModal(scope.row)"></el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-col>
      <el-col :md="12" :sm="24">

      </el-col>
    </el-row>
    <SprintModal ref="sprintModal" :visible.sync="dialogFormVisible" :rowData="modifyRowData" @add-sprint-row="addSprintRow()"
      @update-sprint-row="updateSprintRow()" @close-modal="closeModal()">
    </SprintModal>
  </div>
</template>

<script>
  import SprintModal from './SprintModal'

  export default {
    data() {
      return {
        SprintList: [{
          ID: '1',
          Name: 'sprint1',
          Duration: ["2018-7-29", "2018-8-11"],
          Content: 'xxxxxxxxxxxxxx'
        }],
        modifyRowData: {
          row: {},
          ID: '',
          Name: '',
          Duration: [],
          Content: ''
        },
        dialogFormVisible: false
      }
    },
    methods: {
      openModal(row = null) {
        if (row != null) {
          this.modifyRowData.row = row;
          this.modifyRowData.ID = row.ID;
          this.modifyRowData.Name = row.Name;
          this.modifyRowData.Duration = row.Duration;
          this.modifyRowData.Content = row.Content;
        }
        this.dialogFormVisible = true;
      },
      closeModal() {
        this.cleanModifyRowData();
        this.dialogFormVisible = false;
      },
      addSprintRow() {
        let row = {
          ID: this.modifyRowData.ID,
          Name: this.modifyRowData.Name,
          Duration: this.modifyRowData.Duration,
          Content: this.modifyRowData.Content
        }
        this.SprintList.push(row);
        this.closeModal();
      },
      updateSprintRow() {
        this.modifyRowData.row.ID = this.modifyRowData.ID;
        this.modifyRowData.row.Name = this.modifyRowData.Name;
        this.modifyRowData.row.Duration = this.modifyRowData.Duration;
        this.modifyRowData.row.Content = this.modifyRowData.Content;
        this.closeModal();
      },
      cleanModifyRowData() {
        this.modifyRowData.row = {};
        this.modifyRowData.ID = '';
        this.modifyRowData.Name = '';
        this.modifyRowData.Duration = [];
        this.modifyRowData.Content = '';
      }
    },
    components: {
      SprintModal,
    }
  }

</script>

<style scoped>


</style>
