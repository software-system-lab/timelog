<template>
  <div>
    <el-row>
      <el-col :md="12" :sm="12">
        <h3>Current Sprint : {{this.NowSprint}}</h3>
      </el-col>
      <el-col :md="3" :sm="3">
        <el-button type="primary" round @click="openModal()">
          <i class="el-icon-plus"></i>
          Create</el-button>
      </el-col>
      <el-col :md="9" :sm="9">
        <el-button type="warning" round @click="openChangeBox()" v-if="!changeBoxVisible">
          <i class="el-icon-edit-outline"></i>
          Change</el-button>
        <div v-if="changeBoxVisible">
          <el-select v-model="SprintIDToChange" placeholder="Choose">
            <el-option v-for="item in SprintList" :key="item.SprintID" :label="item.SprintName" :value="item.SprintID">
            </el-option>
          </el-select>
          <el-button type="success" icon="el-icon-check" circle @click="confirmChangeBox()"></el-button>
          <el-button type="danger" icon="el-icon-close" circle @click="cancelChangeBox()"></el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :md="24" :sm="24">
        <el-table :data="SprintList" style="width: 90%" height="600px" sortable="true">

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
        SprintList: window.SprintList,
        rowIDtoModify: null,
        NowSprint: window.Profile.Sprint.SprintDisplayName,
        dialogFormVisible: false,
        changeBoxVisible: false,
        SprintIDToChange: null
      }
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
      openChangeBox() {
        this.changeBoxVisible = !this.changeBoxVisible;
      },
      async confirmChangeBox() {
        if (this.SprintIDToChange == null)
          return;
        this.$confirm('This operation would affect to your whole team!!!', 'Are you sure?', {
          confirmButtonText: 'ok',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(async () => {
          let result = await _profileService.ChangeSprint(this.SprintIDToChange);
          if (result) {
            this.$message({
              message: 'Sprint of your Team have been Changed!',
              type: 'success'
            });
            window.Profile.Sprint = result;
            this.NowSprint = window.Profile.Sprint.SprintDisplayName
            this.changeBoxVisible = !this.changeBoxVisible;
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'canceled'
          });
        });
      },
      cancelChangeBox() {
        this.changeBoxVisible = !this.changeBoxVisible;
      },
      async QuerySprintList() {
        let sprintList = await _profileService.GetSprints();
        if (sprintList != "no data")
          window.SprintList = sprintList;
        else
          window.SprintList = [];
        window.SprintList = sprintList;
        this.SprintList = sprintList;
      }
    },
    components: {
      SprintModal,
    }
  }

</script>

<style scoped>
  .el-row {
    text-align: left
  }

</style>
