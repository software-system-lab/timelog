<template>
<el-container>
  <el-header style="height: 100px;">
    <TeamlistButton css="text-align: left" />
    <div style="text-align: center; font-size: 16px">
      <h2>Join a Team</h2>
    </div>
  </el-header>
  <el-main>
    <el-form :label-position="'right'">
      <TeamButtons css="text-align: right" />
      <el-form-item label="Team Name">
        <el-input v-model="joinTeamName"></el-input>
      </el-form-item>
      <el-form-item label="Team Code">
        <el-input v-model="joinTeamCode"></el-input>
      </el-form-item>
      <el-button type="primary" @click='joinTeam' :disabled='!completed'> Join
      </el-button>
    </el-form>
  </el-main>
</el-container>
</template>

<script>
import TeamlistButton from "@/components/Team/teamlist_button.vue";
import TeamButtons from "@/components/Team/button.vue";
import _teamService from '@/services/TeamService.js'

export default {
  components: {
    TeamlistButton,
    TeamButtons
  },
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
