<template>
<el-container>
  <el-header style="height: 100px;">
    <TeamlistButton css="text-align: left" />
    <div style="text-align: center; font-size: 16px">
      <span>{{ teamName }}</span>
    </div>
    <TeamButtons css="text-align: right" />
  </el-header>
  <el-main>
    <el-collapse>
      <Teammate v-for="(info, idx) in teammatesInfo" :key="idx" :info="info"></Teammate>
    </el-collapse>
  </el-main>
</el-container>
</template>
<script>
import TeamlistButton from '@/components/Team/teamlist_button.vue'
import TeamButtons from '@/components/Team/button.vue'
import Teammate from '@/components/Team/teammate.vue'
import _profileService from '@/services/ProfileService.js'
import _teamService from '@/services/TeamService.js'

export default {
  components: {
    TeamlistButton,
    TeamButtons,
    Teammate
  },
  data () {
    return {
      teamName: '',
      teammatesInfo: []
    }
  },
  async created () {
    const teamID = this.$route.params.id
    this.teamName = await _teamService.getTeamName(teamID)
    this.teammatesInfo = await _profileService.GetTeammates(teamID)
  }
}
</script>
