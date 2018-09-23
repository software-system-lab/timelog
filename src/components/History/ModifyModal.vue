<template>
  <el-dialog title="Modify Log" :visible.sync="visible">
    <el-form :model="rowData">

      {{rowData.Event}}
      <!-- form content -->
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModal()">取 消</el-button>
      <el-button type="primary" @click="submit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import _logService from '../../services/LogService.js'

  export default {
    props: ['visible','logIDtoModify'],
    data() {
      return {
        rowData: {
          Event: '',
          Category: [],
          DurationStr: '',
          Description: ''
        },
      };
    },
    async mounted() {

    },
    methods: {
      submit() {

      },
      closeModal() {
        this.$emit('update:visible', false)
      }
    }
  }

</script>

<style scoped>


</style>
