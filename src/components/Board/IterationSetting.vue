<template>
<el-dialog :visible="visible" :before-close="closeModal" @open="openHandler" :fullscreen="ModalFullScreen">
  <div slot='title'>
    <h2>Iteration Setting</h2>
  </div>
  <el-row class="iter-set-row">
    <el-col :md="12" :sm="24" style="align-vertical: middle;">
      <p>Now Iteration</p>
      <el-select v-model="iterationID" placeholder="Select" @change="onSelect">
        <el-option v-for="(it, idx) in IterationList" :key="idx" :label="it.IterationName" :value="it.IterationID">
        </el-option>
      </el-select>
      <el-divider>or</el-divider>
      <el-button @click="newIteration">New Iteration</el-button>
    </el-col>
    <el-col :md="12" :sm="24">
      <el-card>
        <div slot='header'>
          <span>Iteration Info</span>
        </div>
        <el-form ref="form" :model="IterationForm" :rules="formRules" label-width="110px" :label-position="'right'" :disabled='!editing'>
          <el-form-item label="Start Date" prop="StartDate">
            <el-date-picker v-model="IterationForm.StartDate" type="date" placeholder="Start Date"></el-date-picker>
          </el-form-item>
          <el-form-item label="End Date" prop="EndDate">
            <el-date-picker v-model="IterationForm.EndDate" type="date" placeholder="End Date" :picker-options="endDateOption"></el-date-picker>
          </el-form-item>
          <el-form-item label="Name" prop="IterationName">
            <el-input v-model="IterationForm.IterationName"></el-input>
          </el-form-item>
          <el-form-item label="Content" prop="Content">
            <el-input type="textarea" v-model="IterationForm.Content" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
          </el-form-item>
        </el-form>
        <el-button v-if="editing" type="primary" icon="el-icon-edit" @click="SaveIteration">Save</el-button>
        <el-button v-else type="primary" icon="el-icon-edit" @click="() => { this.editing = true; }">Edit</el-button>
      </el-card>
    </el-col>
  </el-row>
  <el-row>
    <el-table :data="GoalList" sortable="true">
      <el-table-column prop="Project Name" label="Project">
        <template slot-scope="scope">
          {{scope.row.ProjectName}}
        </template>
      </el-table-column>
      <el-table-column prop="GoalHour" label="Goal(Hour)">
        <template slot-scope="scope">
          <el-input type='number' step="1" min="1" :disabled="!scope.row.IsEdit" v-model="scope.row.GoalHour"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="">
        <template slot-scope="scope">
          <el-button type="primary" v-if="!scope.row.IsEdit" icon="el-icon-edit" circle @click="() => {scope.row.IsEdit=true}"></el-button>
          <el-button type="success" v-if="scope.row.IsEdit" icon="el-icon-check" circle @click="ModifyOrAdd(scope.row)"></el-button>
          <el-button type="danger" v-if="scope.row.IsEdit" icon="el-icon-close" circle @click="cancelGoal(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
  <div slot="footer" class="dialog-footer">
    <el-button @click="closeModal()">Close</el-button>
  </div>
</el-dialog>
</template>

<script>
import _logService from '../../services/LogService.js'
import _profileService from '@/services/ProfileService.js'
import moment from 'moment'

export default {
  props: {
    visible: Boolean
  },
  data() {
    return {
      iterationID: window.Profile.CurrentIterationID,
      IterationList: [],
      GoalList: window.ProjectList,
      IterationForm: {},
      formRules: {},
      endDateOption: {},
      editing: false
    }
  },
  created() {
    this.endDateOption.disabledDate = time => {
      if (moment(this.IterationForm.StartDate) > moment(time.getTime()))
        return true;
      return false;
    }
    this.Query();
  },
  computed: {
    ModalFullScreen() {
      return window.screen.width < 992 ? true : false;
    }
  },
  methods: {
    async Query() {
      let result = await _logService.ProjectsAndLengthOfTime();
      if (result != "no data") {
        this.GoalList = result;
      }
    },
    async openHandler() {
      this.IterationList = await _profileService.GetIterations();
      if (this.iterationID)
        this.IterationForm = await _profileService.GetIterationById(this.iterationID);
    },
    closeModal() {
      this.$refs['form'].resetFields();
      this.$emit('close');
    },
    newIteration() {
      this.editing = true;
      this.IterationForm = {
        IterationID: null,
        IterationName: '',
        StartDate: new moment(),
        EndDate: new moment().add(7, 'days'),
        Content: ''
      };
    },
    SaveIteration() {
      let result = _profileService.ModifyOrAddAIteration(this.IterationForm)
      if (result) {
        this.$message({
          message: 'successed!',
          type: 'success'
        });
        this.IsProfileEdit = false;
        this.openHandler()
      } else {
        this.$message.error('Fail to delete the project! Please Retry');
      }
      this.editing = false;
    },
    async onSelect() {
      this.editing = false;
      this.IterationForm = await _profileService.GetIterationById(this.iterationID);
      let response = await _profileService.ChangeIteration(this.iterationID);
      if (response != 'no data') {
        window.Profile.currentIterationID = this.iterationID;
        this.$message({
          message: 'successed!',
          type: 'success'
        });
      }
    },
    ModifyOrAdd(data) {
      data.IsEdit = false;
      _logService.ModifyOrAddAGoal(data)
    },
    cancelGoal() {
      this.Query();
    }
  }
}
</script>

<style scoped>
@media screen and (min-width: 992px) {
  .iter-set-row {
    display: flex !important;
    align-items: center !important;
  }
}
</style>
