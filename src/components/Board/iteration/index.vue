this.iterationInfo.iterationID<template>
  <el-card>
    <div slot="header" class="clearfix">
      <h2>Duration</h2>
    </div>
    <el-row>
      <el-col :md="12" :sm="24" id="board-duration-iteration">
        <el-col :md="12" :sm="24">
          <Selection @selected="iterationSelected" :iterationInfo="iterationInfo" ref="selection"/>
          <el-divider></el-divider>
          <el-button @click="newIteration" icon="el-icon-document-add">NewIteration</el-button>
        </el-col>
        <el-col :md="12" :sm="24">
          <!-- <el-button @click="edit">Edit</el-button>
          <br/>
          <el-button @click="setGoal">Set Goal</el-button> -->
        </el-col>
      </el-col>
      <el-col :md="12" :sm="24" id="board-duration-datepicker">
      </el-col>
    </el-row>
    <InfoDialog :visible="infoDialogActive" :iterationInfo="iterationInfo" :isNew="isNew" @update="iterationSelected" @close="closeDialog" ref="infoDialog"/>
  </el-card>
</template>

<script>
import Selection from '@/components/Board/iteration/selection.vue'
import InfoDialog from '@/components/Board/iteration/info_dialog.vue'

export default {
  props: {
    iterationInfo: Object
  },
  data() {
    return {
      infoDialogActive: false,
      isNew: false
    }
  },
  methods: {
    update() {
      this.$refs.infoDialog.update()
      this.$refs.selection.update()
    },
    newIteration() {
      this.isNew = true
      this.infoDialogActive = true
    },
    closeDialog(type) {
      if (type === 'iteration_info') {
        this.isNew = false
        this.infoDialogActive = false
      }
    },
    iterationSelected(iterationID) {
      this.$emit("update", iterationID)
    }
  },
  components: {
    Selection,
    InfoDialog
  }
}
</script>
