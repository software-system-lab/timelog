<template>
  <el-card>
    <el-row>
      <h2>Spent Time</h2>
      <h3>{{getHour(pieData.datasets[0].timeLength)}} : {{getMinute(pieData.datasets[0].timeLength)}}</h3>
      <el-col :md="12" :sm="24">
        <div class="chart-container" style="margin: auto;">
          <canvas id="Chart"></canvas>
        </div>
      </el-col>
      <el-col :md="12" :sm="24">
        <el-table :data="taskTypeList" sortable="true">
          <el-table-column prop="TaskTypeName" label="TaskType">
            <template slot-scope="scope">
              {{scope.row.TaskTypeName}}
            </template>
          </el-table-column>
          <el-table-column prop="Time Length" label="Time Length">
            <template slot-scope="scope">
              {{getHour(scope.row.TimeLength)}} : {{getMinute(scope.row.TimeLength)}}
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
import { LogComponent } from '@/components/interface.js'
import { Component } from 'vue-property-decorator'
import moment from 'moment'
import Chart from 'chart.js'

@Component({
  props: {
    TaskTypeList: Array
  }
})
export default class SpentTime extends LogComponent {
  // Data members
  ctx = null
  pieChart = null
  taskTypeList = []
  pieData = this.initPieData()


  // Life cycle
  async mounted() {
    this.ctx = $("#Chart");
    if (this.TaskTypeList) {
      this.taskTypeList = this.TaskTypeList
      this.setPieChart()
    }
  }


  // Methods
  serializePieData() {
    this.pieData = this.initPieData()
    this.pieData.labels.length = 0
    this.pieData.datasets[0].data.length = 0
    const maxLabelNums = 7
    for (let i = 0; i < this.taskTypeList.length; i++) {
      if (i < maxLabelNums) {
        this.pieData.labels.push(this.taskTypeList[i].TaskTypeName)
        this.pieData.datasets[0].data.push(this.taskTypeList[i].TimeLength.toFixed(0))
      } else if (i == maxLabelNums) {
        this.pieData.labels.push("Other TaskTypes")
        this.pieData.datasets[0].data.push(this.taskTypeList[i].TimeLength.toFixed(0))
      } else {
        this.pieData.datasets[0].data[5] = (parseInt(this.pieData.datasets[0].data[5]) + this.taskTypeList[i].TimeLength).toFixed(0)
      }
      this.pieData.datasets[0].timeLength += this.taskTypeList[i].TimeLength
    }

    //data to hour
    for (let i = 0; i < this.pieData.datasets[0].data.length; i++) {
      this.pieData.datasets[0].data[i] = (this.pieData.datasets[0].data[i] / 3600000).toFixed(2)
    }
  }

  initPieData() {
    return {
      labels: [],
      datasets: [{
        timeLength: 0,
        data: [],
        backgroundColor: [
          'rgba(6, 71, 212, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 145, 64, 0.7)',
          'rgba(0, 199, 239, 0.7)',
          'rgba(255, 99, 132, 0.7)'
        ]
      }]
    }
  }

  generatePieChart() {
    if (this.pieChart) {
      this.pieChart.destroy()
    }
    this.pieChart = new Chart(this.ctx, {
      type: 'pie',
      data: this.pieData,
      options: {
        title: {
          display: true,
          text: '(hour)'
        },
        // showAllTooltips: true,
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              var dataset = data.datasets[tooltipItem.datasetIndex]
              //計算總和
              var sum = 0
              dataset.data.forEach(data => {
                const t = data.split('.')
                const time = parseInt(t[0]) * 3600000 + parseInt(t[1]) * 60000
                sum += time
              })

              var value = parseFloat(dataset.data[tooltipItem.index])
              var currentValue = parseInt(value) + ":" + (value%1)*60
              return " " + data.labels[tooltipItem.index] + ": " + currentValue
              label += Math.round(tooltipItem.yLabel * 100) / 100
              return label
            }
          }
        }
      }
    })
  }

  paddingLeft(str, len) {
    if (str.toString().length >= len) {
      return str
    }
    else {
      return this.paddingLeft('0' + str, len)
    }
  }

  getHour(time) {
    return this.paddingLeft(Math.floor(time / 3600000),2)
  }

  getMinute(time) {
    return this.paddingLeft((time %
    3600000 / 60 / 1000).toFixed(0),2)
  }

  setPieChart() {
    this.serializePieData()
    this.generatePieChart()
  }

  update(taskTypeList) {
    this.taskTypeList = taskTypeList
    this.setPieChart()
  }
}
</script>
