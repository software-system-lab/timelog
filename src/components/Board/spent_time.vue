<template>
  <el-card>
    <el-row>
      <h2>Spent Time</h2>
      <h3>{{getHour(totalTime)}} : {{getMinute(totalTime)}}</h3>
      <el-col :md="12" :sm="24">
        <div class="chart-container" style="margin: auto;">
          <div :id="'piechart-' + chartID" style="width: 100%; height: 100%; min-height: 350px"></div>
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
              {{(scope.row.TimeLength / totalTime * 100).toFixed(2) || 0}} %
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-button v-if="publishVisible" type="warning" @click="publish">Publish</el-button>
  </el-card>
</template>

<script>
/* global google */
import { LogComponent } from '@/components/interface.js'
import { Component, Watch } from 'vue-property-decorator'

@Component({
  props: {
    LogReportData: Array,
    publishVisible: Boolean,
    chartID: Number
  }
})
export default class SpentTime extends LogComponent {
  // Data members
  ctx = null
  pieChart = null
  logReportData = []
  totalTime = 0
  chart = null

  @Watch('LogReportData')
  logReportDataChanged (newData) {
    this.logReportData = newData
    this.totalTime = 0
    this.logReportData.forEach((item) => {
      this.totalTime += item.TimeLength
    })

    if (this.chart) {
      this.drawChart()
    }
  }

  // Life cycle
  async mounted () {
    if (this.LogReportData) {
      this.logReportData = this.LogReportData
    }
    google.charts.load('current', { packages: ['corechart'] })
    google.charts.setOnLoadCallback(this.drawChart)
  }

  // Methods
  drawChart () {
    const pieArray = [['Activity', 'Hours']]
    this.logReportData.forEach((item) => {
      pieArray.push([
        item.ActivityName,
        {
          v: item.TimeLength / 3600000,
          f: this.getHour(item.TimeLength) + ':' + this.getMinute(item.TimeLength)
        }
      ])
    })

    var data = google.visualization.arrayToDataTable(pieArray)

    var options = {
      title: 'Spent Time',
      pieSliceText: 'value-and-percentage'
    }

    this.chart = new google.visualization.PieChart(document.getElementById('piechart-' + this.chartID))

    this.chart.draw(data, options)
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

  update () {
    this.logReportData = this.LogReportData
  }

  publish () {
    this.$emit('publish')
  }
}
</script>
