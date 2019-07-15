<template>
<div>
  <el-row :gutter="20">
    <el-col>
      <el-card>
        <div slot="header">
          <h2>Join a Team</h2>
        </div>
        <el-form :label-position="'right'">
          <el-form-item label="Team Name">
            <el-input v-model="joinTeamName"></el-input>
          </el-form-item>
          <el-form-item label="Team Code">
            <el-input v-model="joinTeamCode"></el-input>
          </el-form-item>
          <el-button type="primary" @click='joinTeam' :disabled='!completed'> Join
          </el-button>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
import _teamService from '@/services/TeamService.js'

export default {
  data() {
    return {
      joinTeamName: "",
      joinTeamCode: ""
    };
  },
  computed: {
    completed() {
      return this.joinTeamName !== "" && this.joinTeamCode !== ""
    }
  },
  methods: {
    async joinTeam() {
      let result = await _teamService.joinTeam(this.joinTeamName, this.joinTeamCode);
      if (result && result.TeamID) {
        this.$router.push({
          name: "Team - content",
          params: {
            id: result.TeamID
          }
        })
      } else {
        vueRoot.$message({
          showClose: true,
          message: 'Unable to join the team',
          type: 'error'
        });
      }
    }
  }

}
</script>
