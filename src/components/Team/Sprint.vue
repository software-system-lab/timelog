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
        <el-button type="primary" @click="openModal({})">Create</el-button>
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
    <SprintModal :visible.sync="dialogFormVisible" :rowData="rowData" v-on:add-sprint-row="addSprintRow(rowData)"></SprintModal>
  </div>
</template>

<script>
  import SprintModal from './SprintModal'

  export default {
    data() {
      return {
        SprintList: [{
          ID:'1',
          Name: 'sprint1',
          Duration: ["2018-7-29","2018-8-11"],
          Content: 'xxxxxxxxxxxxxx'
        }],
        rowData: [],
        dialogFormVisible: false
      }
    },
    methods: {
      openModal(rowData) {
        this.dialogFormVisible = true;
        this.rowData = rowData;
        //console.log(rowData);
      },
      addSprintRow(rowData) {
        this.SprintList.push(rowData);
      }
    },
    components: {
      SprintModal,
    }
  }

</script>

<style scoped>


</style>
