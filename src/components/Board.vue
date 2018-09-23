<template>
  <div>
    <el-row>
      <el-col :md="6" :sm="12">
        Team: {{this.TeamName}}
      </el-col>
      <el-col :md="6" :sm="12">
        Sprint: {{this.NowSprint}}
      </el-col>
      <el-col :md="6" :sm="12">

      </el-col>
      <el-col :md="6" :sm="12">

      </el-col>
    </el-row>
    <el-row>
      <el-col :md="12" :sm="24">
        <h2>Add a log</h2>
        <el-form ref="form" :model="LogForm" :rules="formRules" label-width="150px" :label-position="'right'">
          <el-form-item label="What you do?" prop="Event">
            <el-input v-model="LogForm.Event"></el-input>
          </el-form-item>
          <el-form-item label="Tag" prop="Tag">
            <el-select v-model="LogForm.Tag" multiple filterable reserve-keyword placeholder="Choose">
              <el-option v-for="item in TagList" :key="item.TagID" :label="item.TagName" :value="item.TagID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="What time?" prop="Date">
            <el-date-picker v-model="LogForm.Date" type="date" placeholder="Day" :picker-options="pickerOptions" align="'center'"></el-date-picker>
          </el-form-item>
          <el-form-item prop="Duration">
            <el-time-picker v-model="LogForm.Duration" range-separator="to" start-placeholder="Start" end-placeholder="End"
              format="HH:mm" value-format="HH:mm" is-range>
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
        <h2>Recent</h2>
        <el-row>
          <div class="chart-container" style="width:70%;margin: auto;">
            <canvas id="Chart"></canvas>
          </div>
        </el-row>
        <br>
        <el-row>
          <el-col :md="24" :sm="24">
            <el-table :data="PieListData" style="width: 90%" sortable="true">
              <el-table-column prop="TagName" label="Name">
                <template slot-scope="scope">
                  {{scope.row.TagName}}
                </template>
              </el-table-column>
              <el-table-column prop="TimeLength" label="Time Length">
                <template slot-scope="scope">
                  {{scope.row.TimeLength}}
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
        <!-- <el-row>
          <h2>Progress</h2>
          <el-progress type="circle" :percentage="0"></el-progress>
        </el-row> -->
      </el-col>
    </el-row>
    <el-row>
      <el-col :md="24" :sm="24">
        <h2>My Sprint Target</h2>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Chart from 'chart.js';
  import _profileService from '../services/ProfileService.js'
  import _logService from '../services/LogService.js'

  export default {
    data() {
      return {
        LogForm: {
          Event: '',
          Tag: [],
          Date: '',
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
        PieListData: [],
        PieData: {
          labels: [],
          datasets: [{
            TimeLengthSum: 0,
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 145, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 145, 64, 1)'
            ],
            borderWidth: 2
          }]
        }
      }
    },
    computed: {
      TeamName() {
        return window.Profile.Team.TeamName;
      },
      NowSprint() {
        return window.Profile.Sprint.SprintDisplayName;
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
          Date: '',
          Duration: '',
          Description: ''
        }
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
      let pieResult = await _logService.TagsAndLengthOfTime();
      if (pieResult != "no data") {
        this.PieListData = pieResult;
        for (let i = 0; i < pieResult.length; i++) {
          if (i < 5) {
            this.PieData.labels.push(pieResult[i].TagName);
            this.PieData.datasets[0].data.push(pieResult[i].TimeLength);
          } else if (i == 5) {
            this.PieData.labels.push("Other");
            this.PieData.datasets[0].data.push(pieResult[i].TimeLength);
          } else {
            this.PieData.datasets[0].data[5] += pieResult[i].TimeLength;
          }
          this.PieData.datasets[0].TimeLengthSum += pieResult[i].TimeLength;
        }
      }

      var ctx = $("#Chart");
      var myChart = new Chart(ctx, {
        type: 'polarArea',
        data: this.PieData,
        options: {}
      });
    }
  }

</script>

<style scoped>


</style>
