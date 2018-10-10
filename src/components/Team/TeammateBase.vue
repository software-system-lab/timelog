<template>
  <el-row>
    <el-col :md="12" :sm="24">
      <div class="chart-container" style="margin: auto;">
        <canvas :id="teammate.FBUserID"></canvas>
      </div>
    </el-col>
    <el-col :md="12" :sm="24">
      <el-table :data="TagAnalysisList" sortable="true">
        <el-table-column prop="TagName" label="Tag">
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
        <el-table-column prop="Time Target" label="Time Target(hr)">
          <template slot-scope="scope">
            {{scope.row.TimeTarget}}
          </template>
        </el-table-column>
        <el-table-column label="Percentage">
          <template slot-scope="scope">
            {{(scope.row.TimeLength / Data.datasets[0].TimeLengthSum * 100).toFixed(2)}} %
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<!-- <el-collapse-item :title="teammate.UserName" :name="teammate.FBUserID">
    <template>

    </template>
  </el-collapse-item> -->

<script>
  import _logService from "../../services/LogService.js";

  export default {
    props: ["teammate"],
    data() {
      return {
        Data: {
          labels: [],
          datasets: [{
              label: "Spent",
              TimeLengthSum: 0,
              data: [],
              backgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)",
                "rgba(255, 145, 64, 0.8)"
              ]
            },
            {
              label: "Target",
              TargetTimeLengthSum: 0,
              data: [],
              backgroundColor: [
                "rgba(255, 99, 132, 0.3)",
                "rgba(54, 162, 235, 0.3)",
                "rgba(255, 206, 86, 0.3)",
                "rgba(75, 192, 192, 0.3)",
                "rgba(153, 102, 255, 0.3)",
                "rgba(255, 145, 64, 0.3)"
              ]
            }
          ]
        },
        TagAnalysisList: []
      };
    },
    async mounted() {
      this.QueryTeammateData();
      var ctx = $(`#${this.teammate.FBUserID}`);
      var myChart = new Chart(ctx, {
        type: "horizontalBar",
        data: this.Data,
        options: {
          title: {
            display: true,
            text: "(min)"
          }
        }
      });
    },
    methods: {
      async QueryTeammateData() {
        let result = await _logService.TagsAndLengthOfTime(
          this.teammate.FBUserID
        );
        if (result != "no data") {
          this.TagAnalysisList = result;
          //clear
          this.Data.labels.length = 0;
          this.Data.datasets[0].data.length = 0;
          for (let i = 0; i < result.length; i++) {
            if (i < 5) {
              this.Data.labels.push(result[i].TagName);
              this.Data.datasets[0].data.push(result[i].TimeLength.toFixed(0));
              this.Data.datasets[1].data.push(
                result[i].TimeTarget != null ?
                result[i].TimeTarget.toFixed(0) * 60 :
                0
              );
            } else if (i == 5) {
              this.Data.labels.push("Other Tags");
              this.Data.datasets[0].data.push(result[i].TimeLength.toFixed(0));
              this.Data.datasets[1].data.push(
                result[i].TimeTarget != null ?
                result[i].TimeTarget.toFixed(0) * 60 :
                0
              );
            } else {
              this.Data.datasets[0].data[5] += result[i].TimeLength.toFixed(0);
              this.Data.datasets[1].data[5] +=
                result[i].TimeTarget != null ?
                result[i].TimeTarget.toFixed(0) * 60 :
                0;
            }
            this.Data.datasets[0].TimeLengthSum += result[i].TimeLength;
            this.Data.datasets[1].TargetTimeLengthSum +=
              result[i].TimeTarget * 60;
          }
        }
      },
      paddingLeft(str, len) {
        if (str.toString().length >= len) return str;
        else return this.paddingLeft("0" + str, len);
      }
    }
  };

</script>

<style scoped>
</style>
