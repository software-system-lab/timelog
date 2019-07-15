<template>
<el-container>
  <el-header>
    <div style="text-align: center; font-size: 16px">
      <span>Team List</span>
    </div>
    <TeamButtons css="text-align: right" />
  </el-header>
  <el-main>
    <el-table :data='teamlist' style="width: 100%">
      <el-table-column prop="name" label="Team Name" width="180">
      </el-table-column>
      <el-table-column prop="size" label="Team Size">
      </el-table-column>
      <el-table-column fixed="right" label="Detail" width="120">
        <template slot-scope="scope">
          <el-button @click="teamDetail(scope.row.id)" type="success" size="small">GO</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</el-container>
</template>

<script>
import TeamButtons from "@/components/Team/button.vue";
import ProfileService from '@/services/ProfileService.js'
export default {
  components: {
    TeamButtons
  },
  data() {
    return {
      teamlist: []
    }
  },
  async created() {
    this.teamlist = await ProfileService.GetTeamList(window.Profile.UserID)
  },
  methods: {
    teamDetail(id) {
      this.$router.push({
        name: 'Team - content',
        params: {
          id: id
        }
      })
    }
  }
}
</script>
