<template>
  <el-collapse>
    <el-collapse-item v-for="teammate in TeammateList" :key="teammate.FBUserID" :title="teammate.UserName" :name="teammate.FBUserID">

      <TeammateBase :teammate="teammate"></TeammateBase>

    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import TeammateBase from "./TeammateBase";
  import _profileService from "../../services/ProfileService.js";

  export default {
    data() {
      return {
        TeammateList: []
      };
    },
    components: {
      TeammateBase
    },
    async mounted() {
      this.TeammateList = await _profileService.GetTeammates();
    }
  };

</script>

<style scoped>
</style>
