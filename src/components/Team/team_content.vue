<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>{{ teamName }}</span>
  </div>
  <el-collapse>
    <Teammate v-for="(info, idx) in teammatesInfo" :key="idx" :info="info"></Teammate>
  </el-collapse>
</el-card>
</template>
<script>
import Teammate from "@/components/Team/teammate.vue"
import _profileService from "@/services/ProfileService.js";
import _teamService from "@/services/TeamService.js";

export default {
  components: {
    Teammate
  },
  data() {
    return {
      teamName: "",
      teammatesInfo: []
    }
  },
  async created() {
    const teamID = this.$route.params.id;
    this.teamName = await _teamService.getTeamName(teamID)
    this.teammatesInfo = await _profileService.GetTeammates(teamID);
  }
}
</script>
