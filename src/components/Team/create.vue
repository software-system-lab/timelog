<template>
<el-container>
  <el-header style="height: 100px;">
    <TeamlistButton css="text-align: left" />
    <div style="text-align: center; font-size: 16px">
      <h2>Create Team</h2>
    </div>
  </el-header>
  <el-main>
    <el-form :label-position="'right'">
      <TeamButtons css="text-align: right" />
      <el-form-item label="Team Name">
        <el-input v-model="createTeamName"></el-input>
      </el-form-item>
      <el-form-item label="Team Code">
        <el-input v-model="createTeamCode"></el-input>
      </el-form-item>
      <el-button type="primary" @click='createTeam' :disabled='!completed'> Create
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
      createTeamName: "",
      createTeamCode: ""
    };
  },
  computed: {
    completed() {
      return this.createTeamName !== "" && this.createTeamCode !== ""
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
