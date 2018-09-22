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
      <el-col :md="24" :sm="24">
        <h3>Stack</h3>
        <el-button type="primary" @click="openModal()">Create</el-button>
        <el-table :data="SprintList" style="width: 90%" sortable="true">

          <el-table-column type="expand">
            <template slot-scope="scope">
              {{scope.row.Content}}
            </template>
          </el-table-column>

          <el-table-column prop="SprintName" label="Sprint" align="left">
            <template slot-scope="scope">
              {{scope.row.SprintName}}
            </template>
          </el-table-column>

          <el-table-column prop="Duration" label="Duration" align="left" sortable>
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
    <SprintModal :visible.sync="dialogFormVisible" :rowDataID="rowIDtoModify" @close-modal="closeModal()"></SprintModal>
  </div>
</template>

<script>
  import SprintModal from './SprintModal'
  import _profileService from '../../services/ProfileService.js'

  export default {
    data() {
      return {
        SprintList: [],
        rowIDtoModify: null,
        dialogFormVisible: false
      }
    },
    async created() {
      this.QuerySprintList();
    },
    methods: {
      openModal(row) {
        if (row != null) {
          this.rowIDtoModify = row.SprintID;
        }
        this.dialogFormVisible = true;
      },
      closeModal() {
        this.rowIDtoModify = null;
        this.QuerySprintList();
        this.dialogFormVisible = false;
      },
      async QuerySprintList() {
        this.SprintList = await _profileService.GetSprints();
      }
    },
    components: {
      SprintModal,
    }
  }

</script>

<style scoped>


</style>
