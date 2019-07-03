<template>
<div>
  <el-row>
    <el-card>

    </el-card>
  </el-row>
  <el-row :gutter="20">
    <el-col>
      <el-card>
        <div slot="header">
          <h2>Create Team</h2>
        </div>
        <el-form :label-position="'right'">
          <el-form-item label="Team Name">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="Team Code">
            <el-input></el-input>
          </el-form-item>
          <el-button type="primary" @click='createTeam'>Create</el-button>
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
  methods: {
    createTeam() {
      _teamService.createTeam(this.createTeamName, this.createTeamCode);
    }
  }

}
</script>
