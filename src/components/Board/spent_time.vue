<template>
  <el-card>
    <el-row>
      <h2>Project / Spent Time</h2>
      <el-col :md="12" :sm="24">
        <div class="chart-container" style="margin: auto;">
          <canvas id="Chart"></canvas>
        </div>
      </el-col>
      <el-col :md="12" :sm="24">
        <el-table :data="projectList" sortable="true">
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
              {{(scope.row.TimeLength / pieData.datasets[0].timeLength * 100).toFixed(2)}} %
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import Chart from 'chart.js';

export default {
  props: {
    projectList: Array
  },
  data() {
    return {
      ctx: null,
      pieData: {
        labels: [],
        datasets: [{
          timeLength: 0,
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
  async mounted() {
    this.ctx = $("#Chart");
  },
  methods: {
    async queryPieData() {
      this.pieData.labels.length = 0;
      this.pieData.datasets[0].data.length = 0;
      if (this.projectList.length >= 5) {
        this.projectList.sort((a, b) => {
          return a.TimeLength > b.TimeLength;
        })
      }
      for (let i = 0; i < this.projectList.length; i++) {
        if (i < 5) {
          this.pieData.labels.push(this.projectList[i].ProjectName);
          this.pieData.datasets[0].data.push(this.projectList[i].TimeLength.toFixed(0));
        } else if (i == 5) {
          this.pieData.labels.push("Other Projects");
          this.pieData.datasets[0].data.push(this.projectList[i].TimeLength.toFixed(0));
        } else {
          this.pieData.datasets[0].data[5] = (parseInt(this.pieData.datasets[0].data[5]) + this.projectList[i].TimeLength).toFixed(
            0);
        }
        this.pieData.datasets[0].timeLength += this.projectList[i].TimeLength;
      }

      //data to hour
      for (let i = 0; i < this.pieData.datasets[0].data.length; i++) {
        this.pieData.datasets[0].data[i] = (this.pieData.datasets[0].data[i] / 3600000).toFixed(2);
      }
    },
    generatePieChart() {
      this.pieChart = new Chart(this.ctx, {
        type: 'pie',
        data: this.pieData,
        options: {
          title: {
            display: true,
            text: '(hour)',
          },
        }
      });
    },
    paddingLeft(str, len) {
      if (str.toString().length >= len) {
        return str;
      }
      else {
        return this.paddingLeft('0' + str, len);
      }
    },
    update() {
      this.queryPieData()
    }
  }
}
</script>
