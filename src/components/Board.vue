<template>
<div>
  <el-row>
    <el-col :md="12" :sm="24">
      <el-row>
        <el-col :md="18" :sm="18">
          Iteration: {{this.NowIteration}}
        </el-col>
      </el-row>
      <h2>Add a log</h2>
      <el-form ref="form" :model="LogForm" :rules="formRules" label-width="110px" :label-position="'right'">
        <el-form-item label="What you do?" prop="Event">
          <el-input v-model="LogForm.Event"></el-input>
        </el-form-item>
        <el-form-item label="Tag" prop="Tag">
          <el-select v-model="LogForm.Tag" multiple filterable reserve-keyword placeholder="Choose">
            <el-option v-for="item in TagList" :key="item.TagID" :label="item.TagName" :value="item.TagID">
            </el-option>
          </el-select>
          <el-tooltip class="item" effect="dark" content="When you choose multiple tags,the time you spent would be equally divided into them!" placement="top">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="What time?" prop="Date">
          <el-date-picker v-model="LogForm.Date" type="date" placeholder="Day" :picker-options="pickerOptions" align="'center'"></el-date-picker>
        </el-form-item>
        <el-form-item prop="Duration">
          <el-time-picker v-model="LogForm.Duration" range-separator="to" start-placeholder="Start" end-placeholder="End" format="HH:mm" value-format="HH:mm" is-range>
          </el-time-picker>
        </el-form-item>
        <el-form-item label="Description" prop="Description">
          <el-input type="textarea" v-model="LogForm.Description" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="danger" icon="el-icon-close" @click="Clear">Clear</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="onSubmit">Add</el-button>
    </el-col>
    <el-col :md="12" :sm="24">
      <h2>My Iteration Target</h2>
      <TargetBase v-for="tag in TagAnalysisList" :key="tag.TagID" v-if="tag.TagID != -1" :tag="tag"></TargetBase>
    </el-col>
  </el-row>
  <br>
  <el-row>
    <h2>Tag / Spent Time</h2>
    <el-col :md="12" :sm="24">
      <div class="chart-container" style="margin: auto;">
        <canvas id="Chart"></canvas>
      </div>
    </el-col>
    <el-col :md="12" :sm="24">
      <el-table :data="TagAnalysisList" sortable="true">
        <el-table-column prop="Tag Name" label="Tag">
          <template slot-scope="scope">
            {{scope.row.TagName}}
          </template>
        </el-table-column>
        <el-table-column prop="Time Length" label="Time Length">
          <template slot-scope="scope">
            {{paddingLeft((scope.row.TimeLength / 60).toFixed(0),2)}} : {{paddingLeft((scope.row.TimeLength %
              60).toFixed(0),2)}}
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
</div>
</template>

<script>
import Chart from 'chart.js';
import TargetBase from './Board/TargetBase'
import _profileService from '../services/ProfileService.js'
import _logService from '../services/LogService.js'

export default {
  data() {
    return {
      LogForm: {
        Event: '',
        Tag: [],
        Date: new Date().toISOString().slice(0, 10),
        Duration: '',
        Description: ''
      },
      TagList: window.TagList,
      pickerOptions: {
        disabledDate(time) {
          return Date.parse(window.Profile.Sprint.StartDate) > time.getTime() || Date.parse(window.Profile
            .Sprint.EndDate) < time.getTime()
        },
      },
      formRules: {
        Event: [{
          required: true,
          message: 'Check Here!',
          trigger: 'blur'
        }],
        Tag: [{
          required: true,
          message: 'Check Here!',
          trigger: 'blur'
        }],
        Date: [{
          required: true,
          message: 'Check Here!',
          trigger: 'blur'
        }],
        Duration: [{
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
      TagAnalysisList: [],
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
  computed: {
    NowIteration() {
      return '';
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
        Event: '',
        Tag: [],
        Date: new Date().toISOString().slice(0, 10),
        Duration: '',
        Description: ''
      }
    },
    async QueryPieData() {
      let result = await _logService.TagsAndLengthOfTime();
      if (result != "no data") {
        this.TagAnalysisList = result;
        //clear
        this.PieData.labels.length = 0;
        this.PieData.datasets[0].data.length = 0;
        for (let i = 0; i < result.length; i++) {
          if (i < 5) {
            this.PieData.labels.push(result[i].TagName);
            this.PieData.datasets[0].data.push(result[i].TimeLength.toFixed(0));
          } else if (i == 5) {
            this.PieData.labels.push("Other Tags");
            this.PieData.datasets[0].data.push(result[i].TimeLength.toFixed(0));
          } else {
            this.PieData.datasets[0].data[5] = (parseInt(this.PieData.datasets[0].data[5]) + result[i].TimeLength).toFixed(
              0);
          }
          this.PieData.datasets[0].TimeLengthSum += result[i].TimeLength;
        }

        //data to hour
        for (let i = 0; i < this.PieData.datasets[0].data.length; i++) {
          this.PieData.datasets[0].data[i] = (this.PieData.datasets[0].data[i] / 60).toFixed(2);
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
  }
}
</script>

<style scoped>
.el-form {
  width: 90%
}
</style>
