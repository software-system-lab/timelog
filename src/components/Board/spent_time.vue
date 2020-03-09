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
        <el-table :data="logReportData" sortable="true">
          <el-table-column prop="ActivityName" label="Activity">
            <template slot-scope="scope">
              {{scope.row.ActivityName}}
            </template>
          </el-table-column>
          <el-table-column prop="Time Length" label="Time Length">
            <template slot-scope="scope">
              {{getHour(scope.row.TimeLength)}} : {{getMinute(scope.row.TimeLength)}}
            </template>
          </el-table-column>
          <el-table-column label="Percentage">
            <template slot-scope="scope">
              {{(scope.row.TimeLength / pieData.datasets[0].timeLength * 100).toFixed(2) || 0}} %
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-button v-if="buttonVisible" type="warning" @click="publish">Publish</el-button>
    <el-button v-if="buttonVisible" type="success" @click="publish">Export</el-button>
  </el-card>
</template>

<script>
import $ from 'jquery'
import { LogComponent } from '@/components/interface.js'
import { Component, Watch } from 'vue-property-decorator'
import Chart from 'chart.js'
import Export from '@/services/export/export.js'

@Component({
  props: {
    LogReportData: Array,
    buttonVisible: Boolean
  }
})
export default class SpentTime extends LogComponent {
  // Data members
  ctx = null
  pieChart = null
  logReportData = []
  pieData = this.initPieData()

  @Watch('LogReportData')
  logReportDataChanged (newData) {
    this.logReportData = newData
    this.setPieChart()
  }

  // Life cycle
  async mounted () {
    this.ctx = $('#Chart')
    if (this.LogReportData) {
      this.logReportData = this.LogReportData
    }
  }

  // Methods
  serializePieData () {
    this.pieData = this.initPieData()
    this.pieData.labels.length = 0
    this.pieData.datasets[0].data.length = 0
    const maxLabelNums = 7
    for (let i = 0; i < this.logReportData.length; i++) {
      if (i < maxLabelNums) {
        this.pieData.labels.push(this.logReportData[i].ActivityName)
        this.pieData.datasets[0].data.push(this.logReportData[i].TimeLength.toFixed(0))
      } else if (i === maxLabelNums) {
        this.pieData.labels.push('Other Activities')
        this.pieData.datasets[0].data.push(this.logReportData[i].TimeLength.toFixed(0))
      } else {
        this.pieData.datasets[0].data[5] = (parseInt(this.pieData.datasets[0].data[5]) + this.logReportData[i].TimeLength).toFixed(
          0)
      }
      this.pieData.datasets[0].timeLength += this.logReportData[i].TimeLength
    }

    // data to hour
    for (let i = 0; i < this.pieData.datasets[0].data.length; i++) {
      this.pieData.datasets[0].data[i] = (this.pieData.datasets[0].data[i] / 3600000).toFixed(2)
    }
  }

  initPieData () {
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

  generatePieChart () {
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

              var value = parseFloat(dataset.data[tooltipItem.index])
              var currentValue = parseInt(value) + ':' + Math.round((value % 1) * 60)
              return ' ' + data.labels[tooltipItem.index] + ': ' + currentValue
            }
          }
        }
      }
    })
  }

  paddingLeft (str, len) {
    if (str.toString().length >= len) {
      return str
    } else {
      return this.paddingLeft('0' + str, len)
    }
  }

  getHour (time) {
    return this.paddingLeft(Math.floor(time / 3600000), 2)
  }

  getMinute (time) {
    return this.paddingLeft((time %
    3600000 / 60 / 1000).toFixed(0), 2)
  }

  setPieChart () {
    this.serializePieData()
    this.generatePieChart()
  }

  update () {
    this.logReportData = this.LogReportData
  }

  publish () {
    this.$emit('publish')
  }

  export() {
    Export.export()

    // const template = this.$el.innerHTML;
    //         let html = `<!DOCTYPE html>
    //             <html>
    //             <head>
    //                 <meta charset="utf-8">
    //                 <meta name="viewport" content="width=device-width,initial-scale=1.0">
    //                 <title>X-Find迅聘选才</title>
    //                 <link rel="stylesheet" href="https://cdn.bootcss.com/iview/2.14.0/styles/iview.css" />
    //                 <style>
    //                     ${resumecss}
    //                 </style>
    //             </head>
    //             <body>
    //                 <div class="resume_preview_page" style="margin:0 auto;width:1200px">
    //                 ${template}
    //                 </div>
    //             </body>
    //             </html>`;
    //         return html;
  }
}
</script>
