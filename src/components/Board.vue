<template>
  <div>
    <el-row>
      <el-col :md="6" :sm="12">
        Team:{{userData.Team}}
      </el-col>
      <el-col :md="6" :sm="12">
        Sprint:{{userData.Sprint}}
      </el-col>
      <el-col :md="6" :sm="12">

      </el-col>
      <el-col :md="6" :sm="12">

      </el-col>
    </el-row>
    <el-row>
      <el-col :md="12" :sm="24">
        <h2>Add a log</h2>
        <el-form ref="form" :model="LogForm" label-width="100px" :label-position="'right'">
          <el-form-item label="What you do?">
            <el-input v-model="LogForm.Event"></el-input>
          </el-form-item>
          <el-form-item label="Category">
            <el-select v-model="LogForm.Category" placeholder="Choose" multiple :span="11">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="What time?">
            <!-- <el-col> -->
              <el-date-picker v-model="LogForm.Date" type="date" placeholder="Day" align="'center'"></el-date-picker>
            <!-- </el-col> -->
          </el-form-item>
          <el-form-item>
            <!-- <el-col> -->
              <el-time-picker v-model="LogForm.Duration" range-separator="to" start-placeholder="Start" end-placeholder="End" format="HH:mm"
                value-format="HH:mm" is-range>
              </el-time-picker>
            <!-- </el-col> -->
            <!-- <br> -->
            <!-- <el-col> -->
              <el-button type="success" icon="el-icon-time" pull-right>Now</el-button>
            <!-- </el-col> -->
          </el-form-item>
          <el-form-item label="Description">
            <el-input type="textarea" v-model="LogForm.Description" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="onSubmit">Add</el-button>
        <el-button type="danger" @click="Clear">Clear</el-button>
      </el-col>
      <el-col :md="12" :sm="24">
        <h2>Recent</h2>
        <el-row>
          <div class="chart-container" style="width:70%;margin: auto;">
            <canvas id="Chart"></canvas>
          </div>
        </el-row>
        <el-row>
          <h2>Progress</h2>
          <el-progress type="circle" :percentage="0"></el-progress>
        </el-row>
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

  export default {
    data() {
      return {
        LogForm: {
          Event: '',
          Category: '',
          Date: '',
          Duration: '',
          Description: ''
        },
        userData: {
          Team: '',
          Sprint: ''
        }
      }
    },
    async created(){
      let a = await _profileService.GetProfile();
      console.log(a);
    },
    methods: {
      onSubmit() {
        console.log(this.LogForm)
      },

      Clear() {
        this.LogForm.Event = '';
        this.LogForm.Category = '';
        this.LogForm.Date = '';
        this.LogForm.Duration = '';
        this.LogForm.Description = '';
      },

      successMsg() {
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },

      warningMsg() {
        this.$message({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },

      errorMsg() {
        this.$message.error('错了哦，这是一条错误消息');
      }
    },
    mounted() {
      var ctx = $("#Chart");
      var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
          datasets: [{
            label: '# of Votes',
            data: [12, 9, 3, 5, 2],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
  }

</script>

<style scoped>


</style>
