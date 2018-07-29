<template>
  <el-dialog title="Modify Log" :visible.sync="visible">
    <el-form :model="rowData">

{{rowData.event}}
<!-- form content-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModal()">取 消</el-button>
      <el-button type="primary" @click="closeModal()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: ['rowData', 'visible'],
    data() {
      return {

      };
    },
    methods: {
      closeModal() {
        this.$emit('update:visible', false)
      }
    }
  }

</script>

<style scoped>


</style>
