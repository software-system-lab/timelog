<template>
<div>
  <el-row :gutter="20">
    <el-col :md="12" :sm="24">
      <AddLog />
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
              3600000 / 60 / 1000).toFixed(0),2)}}
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
import AddLog from '@/components/log/addLog.vue'

export default {
  data() {
    return {
      ProjectAnalysisList: [],
      iterationSetting: false,
      ctx: null,
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
  methods: {
    async QueryPieData() {
      let result = await _logService.ProjectsAndLengthOfTime();
      if (result == "no data") {
        return
      }
      this.ProjectAnalysisList = result;
      this.PieData.labels.length = 0;
      this.PieData.datasets[0].data.length = 0;
      if (result.length >= 5) {
        result.sort((a, b) => {
          return a.TimeLength > b.TimeLength;
        })
      }
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
      new Chart(this.ctx, {
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
      this.iterationSetting = true;
    },
    closeIterationSetting() {
      this.QueryPieData();
      this.iterationSetting = false;
    }
  },
  async mounted() {
    this.ctx = $("#Chart");
    await this.QueryPieData();
  },
  components: {
    TargetBase,
    IterationSetting,
    AddLog
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
