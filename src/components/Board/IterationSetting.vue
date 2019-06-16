<template>
<el-dialog :visible="visible" :before-close="closeModal" @open="openHandler" :fullscreen="ModalFullScreen">
  <div slot='title'>
    <h2>Iteration Setting</h2>
  </div>
  <el-form ref="form" :model="LogForm" :rules="formRules" label-width="110px" :label-position="'right'">
    <el-row>
      <el-col :md="12" :sm="24" style="vertical-align: middle; height: 100%">
        <p>Now Iteration</p>
        <el-select v-model="iteration" placeholder="Select">
          <el-option v-for="(it, idx) in IterationList" :key="idx" :label="it.IterationName" :value="it.IterationID">
          </el-option>
        </el-select>
        <el-divider>or</el-divider>
        <el-button>New Iteration</el-button>
      </el-col>
      <el-col :md="12" :sm="24">
        <el-card>
          <div slot='header'>
            <span>Iteration Info</span>
          </div>
          <el-form-item label="Start Date" prop="StartDate">
            <el-date-picker v-model="LogForm.StartDate" type="date" placeholder="Start Date"></el-date-picker>
          </el-form-item>
          <el-form-item label="End Date" prop="EndDate">
            <el-date-picker v-model="LogForm.EndDate" type="date" placeholder="End Date" :picker-options="endDateOption"></el-date-picker>
          </el-form-item>
          <el-form-item label="Name" prop="IterationName">
            <el-input v-model="LogForm.IterationName"></el-input>
          </el-form-item>
          <el-form-item label="Content" prop="Content">
            <el-input type="textarea" v-model="LogForm.Content" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
          </el-form-item>
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
            <el-input :disabled="scope.row.InputDisabled" v-model="scope.row.GoalHour"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="ModifyOrAdd(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-close" circle @click="() => {scope.row.InputDisabled=true}"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="closeModal()">Cancel</el-button>
  </div>
</el-dialog>
</template>

<script>
import _logService from '../../services/LogService.js'
import _profileService from '@/services/ProfileService.js'
import moment from 'moment'

export default {
  props: {
    visible: Boolean,
    currentIterationID: String
  },
  data() {
    // return {
    //   LogForm: {},
    //   ProjectList: window.ProjectList,
    //   endDateOption: {},
    //   formRules: {
    //     Title: [{
    //       required: true,
    //       message: 'Check Here!',
    //       trigger: 'blur'
    //     }],
    //     ProjectID: [{
    //       required: false,
    //       message: 'Check Here!',
    //       trigger: 'blur'
    //     }],
    //     StartTime: [{
    //       required: true,
    //       message: 'Check Here!',
    //       trigger: 'blur'
    //     }],
    //     StartDate: [{
    //       required: true,
    //       message: 'Check Here!',
    //       trigger: 'blur'
    //     }],
    //     EndTime: [{
    //       required: true,
    //       message: 'Check Here!',
    //       trigger: 'blur'
    //     }],
    //     EndDate: [{
    //       required: true,
    //       message: 'Check Here!',
    //       trigger: 'blur'
    //     }],
    //     Description: [{
    //       required: false,
    //       message: 'Check Here!',
    //       trigger: 'blur'
    //     }],
    //   },
    // };
    //
    return {
      iteration: this.currentIterationID,
      IterationList: [],
      GoalList: window.ProjectList,
      LogForm: {},
      formRules: {},
      endDateOption: {},
    }
  },
  created() {
    this.endDateOption.disabledDate = time => {
      if (moment(this.LogForm.StartDate) > moment(time.getTime()))
        return true;
      return false;
    }
  },
  computed: {
    ModalFullScreen() {
      return window.screen.width < 992 ? true : false;
    }
  },
  methods: {
    async openHandler() {
      this.IterationList = await _profileService.GetIteration()
    },
    closeModal() {
      this.$refs['form'].resetFields();
      this.$emit('close');
    },
  }
}
</script>

<style scoped>


</style>
