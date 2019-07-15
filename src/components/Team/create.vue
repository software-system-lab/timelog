<template>
<div>
  <el-row :gutter="20">
    <el-col>
      <el-card>
        <div slot="header">
          <h2>Create Team</h2>
        </div>
        <el-form :label-position="'right'">
          <el-form-item label="Team Name">
            <el-input v-model="createTeamName"></el-input>
          </el-form-item>
          <el-form-item label="Team Code">
            <el-input v-model="createTeamCode"></el-input>
          </el-form-item>
          <el-button type="primary" @click='createTeam' :disabled='!completed'> Create
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
      createTeamName: "",
      createTeamCode: ""
    };
  },
  computed: {
    completed() {
      return this.joinTeamName !== "" && this.joinTeamCode !== ""
    }
  },
  methods: {
    async createTeam() {
      const result = await _teamService.createTeam(this.createTeamName, this.createTeamCode);

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
          message: 'Team Name invalid or used',
          type: 'error'
        });
      }
    }
  }

}
</script>
