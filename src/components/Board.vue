<template>
<div>
  <el-row :gutter="20">
    <el-col :md="12" :sm="24">
      <el-card>
        <div slot="header" class="clearfix">
          <h2>Add a Log</h2>
        </div>
        <el-form ref="form" :model="LogForm" :rules="formRules" label-width="110px" :label-position="'right'">
          <el-form-item label="What you do?" prop="Title">
            <el-input v-model="LogForm.Title"></el-input>
          </el-form-item>
          <el-form-item label="Project" prop="ProjectID">
            <el-select v-model="LogForm.ProjectID" filterable reserve-keyword placeholder="Choose">
              <el-option v-for="item in ProjectList" :key="item.ProjectID" :label="item.ProjectName" :value="item.ProjectID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Start Time">
            <el-col :md="12" :sm="24">
              <el-form-item prop="StartDate">
                <el-date-picker v-model="LogForm.StartDate" type="date" placeholder="Start Date" align="'center'"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="24">
              <el-form-item prop="StartTime">
                <el-time-picker v-model="LogForm.StartTime" format="HH:mm" value-format="HH:mm">
                </el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="End Time">
            <el-col :md="12" :sm="24">
              <el-form-item prop="EndDate">
                <el-date-picker v-model="LogForm.EndDate" type="date" placeholder="End Date" :picker-options="endDateOption" align="'center'"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="24">
              <el-form-item prop="EndTime">
                <el-time-picker v-model="LogForm.EndTime" format="HH:mm" value-format="HH:mm" :picker-options='endTimeOption'>
                </el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="Description" prop="Description">
            <el-input type="textarea" v-model="LogForm.Description" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="danger" icon="el-icon-close" @click="Clear">Clear</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="onSubmit">Add</el-button>
      </el-card>
    </el-col>
    <el-col :md="12" :sm="24">
      <el-card>
        <div slot="header" class="clearfix">
          <el-button type="primary" id='iteration-setting' icon="el-icon-setting" @click='openIterationSetting'></el-button>
          <h2>My Iteration Target</h2>
        </div>
        <TargetBase v-for="project in ProjectAnalysisList" :key="project.ProjectID" v-if="project.ProjectID != null" :project="project"></TargetBase>
      </el-card>
    </el-col>
  </el-row>
  <br>
  <el-card>
    <el-row>
      <h2>Project / Spent Time</h2>
      <el-col :md="12" :sm="24">
        <div class="chart-container" style="margin: auto;">
          <canvas id="Chart"></canvas>
        </div>
      </el-col>
      <el-col :md="12" :sm="24">
        <el-table :data="ProjectAnalysisList" sortable="true">
          <el-table-column prop="ProjectName" label="Project">
            <template slot-scope="scope">
              {{scope.row.ProjectName}}
            </template>
          </el-table-column>
          <el-table-column prop="Time Length" label="Time Length">
            <template slot-scope="scope">
              {{paddingLeft((scope.row.TimeLength / 3600000).toFixed(0),2)}} : {{paddingLeft((scope.row.TimeLength %
              3600000).toFixed(0),2)}}
            </template>
          </el-table-column>
          <el-table-column label="Percentage">
            <template slot-scope="scope">
              {{(scope.row.TimeLength / PieData.datasets[0].TimeLengthSum * 100).toFixed(2)}} %
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-card>
  <IterationSetting :visible='iterationSetting' @close='closeIterationSetting' />
</div>
</template>

<script>
import Chart from 'chart.js';
import TargetBase from './Board/TargetBase'
import _profileService from '../services/ProfileService.js'
import _logService from '../services/LogService.js'
import IterationSetting from '@/components/Board/IterationSetting.vue'
import moment from 'moment'

export default {
  data() {
    return {
      LogForm: {
        Title: '',
        ProjectID: null,
        StartTime: new moment().format('HH:mm'),
        EndTime: new moment().add(1, 'hours').format('HH:mm'),
        StartDate: new moment().format('YYYY-MM-DD'),
        EndDate: new moment().add(1, 'hours').format('YYYY-MM-DD'),
        Description: ''
      },
      ProjectList: window.ProjectList,
      endDateOption: {},
      formRules: {
        Title: [{
          required: true,
          message: 'Check Here!',
          trigger: 'blur'
        }],
        ProjectID: [{
          required: false,
          message: 'Check Here!',
          trigger: 'blur'
        }],
        StartTime: [{
          required: true,
          message: 'Check Here!',
          trigger: 'blur'
        }],
        StartDate: [{
          required: true,
          message: 'Check Here!',
          trigger: 'blur'
        }],
        EndTime: [{
          required: true,
          message: 'Check Here!',
          trigger: 'blur'
        }],
        EndDate: [{
          required: true,
          message: 'Check Here!',
          trigger: 'blur'
        }],
        Description: [{
          required: false,
          message: 'Check Here!',
          trigger: 'blur'
        }],
      },
      ProjectAnalysisList: [],
      iterationSetting: false,
      PieData: {
        labels: [],
        datasets: [{
          TimeLengthSum: 0,
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 145, 64, 0.7)'
          ],
        }]
      }
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
    endTimeOption() {
      if (this.LogForm.StartDate == this.LogForm.EndDate) {
        return {
          selectableRange: this.LogForm.StartTime + ':00 - 23:59:59'
        }
      }
      return;
    }
  },
  methods: {
    async onSubmit() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          let result = await _logService.AddALog(this.LogForm);
          if (result) {
            this.successMsg();
            this.Clear();
            await this.QueryPieData();
          } else {
            this.errorMsg();
          }
        }
      });
    },
    Clear() {
      this.$refs['form'].clearValidate();
      this.LogForm = {
        Title: '',
        ProjectID: null,
        StartTime: new moment().format('HH:mm'),
        EndTime: new moment().add(1, 'hours').format('HH:mm'),
        StartDate: new moment().format('YYYY-MM-DD'),
        EndDate: new moment().add(1, 'hours').format('YYYY-MM-DD'),
        Description: ''
      }
    },
    async QueryPieData() {
      let result = await _logService.ProjectsAndLengthOfTime();
      if (result != "no data") {
        this.ProjectAnalysisList = result;
        //clear
        this.PieData.labels.length = 0;
        this.PieData.datasets[0].data.length = 0;
        for (let i = 0; i < result.length; i++) {
          if (i < 5) {
            this.PieData.labels.push(result[i].ProjectName);
            this.PieData.datasets[0].data.push(result[i].TimeLength.toFixed(0));
          } else if (i == 5) {
            this.PieData.labels.push("Other Projects");
            this.PieData.datasets[0].data.push(result[i].TimeLength.toFixed(0));
          } else {
            this.PieData.datasets[0].data[5] = (parseInt(this.PieData.datasets[0].data[5]) + result[i].TimeLength).toFixed(
              0);
          }
          this.PieData.datasets[0].TimeLengthSum += result[i].TimeLength;
        }

        //data to hour
        for (let i = 0; i < this.PieData.datasets[0].data.length; i++) {
          this.PieData.datasets[0].data[i] = (this.PieData.datasets[0].data[i] / 3600000).toFixed(2);
        }
      }
    },
    paddingLeft(str, len) {
      if (str.toString().length >= len)
        return str;
      else
        return this.paddingLeft('0' + str, len);
    },
    successMsg() {
      this.$message({
        message: 'Log Added!',
        type: 'success'
      });
    },
    errorMsg() {
      this.$message.error('Log Added Fail!Please Retry');
    },
    openIterationSetting() {
      this.iterationSetting = true
    },
    closeIterationSetting() {
      this.iterationSetting = false
    }
  },
  async mounted() {
    await this.QueryPieData();

    var ctx = $("#Chart");
    var myChart = new Chart(ctx, {
      type: 'polarArea',
      data: this.PieData,
      options: {
        title: {
          display: true,
          text: '(hour)',
        },
      }
    });
  },
  components: {
    TargetBase,
    IterationSetting
  }
}
</script>

<style scoped>
.el-form {
  width: 90%
}

#iteration-setting {
  position: relative;
  right: -45%;
  top: 20px
}
</style>
