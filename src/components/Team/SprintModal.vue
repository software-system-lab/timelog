<template>
  <el-dialog title="Sprint" :visible.sync="visible" :before-close="closeModal" @open="openHandler">
    <el-form ref="form" :model="rowData" :rules="formRules" label-width="100px" :label-position="'right'">
      <el-form-item label="SprintName" prop="SprintName">
        <el-input v-model="rowData.SprintName"></el-input>
      </el-form-item>
      <el-form-item label="Duration" prop="Duration">
        <el-date-picker v-model="rowData.Duration" type="daterange" unlink-panels align="center" range-separator="to"
          start-placeholder="Start" end-placeholder="End" :picker-options="pickerOptions" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Content" prop="Content">
        <el-input type="textarea" v-model="rowData.Content" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="danger" v-if="this.rowDataID != null" @click="Delete()">Delete</el-button>
      <el-button @click="closeModal()">Cancel</el-button>
      <el-button type="primary" @click="Confirm()">Confirm</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import _profileService from '../../services/ProfileService.js'

  export default {
    props: ['rowDataID', 'visible'],
    data() {
      return {
        rowData: {},
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        formRules: {
          SprintName: [{
            required: true,
            message: 'Check Here!',
            trigger: 'blur'
          }],
          Duration: [{
            required: true,
            message: 'Check Here!',
            trigger: 'blur'
          }],
          Content: [{
            required: false,
            message: 'Check Here!',
            trigger: 'blur'
          }]
        }
      };
    },
    methods: {
      async openHandler() {
        if (this.rowDataID != null)
          this.rowData = await _profileService.GetSprint(this.rowDataID);
      },
      closeModal() {
        this.$refs['form'].resetFields();
        this.$emit('close-modal');
      },
      async Confirm() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            let result = await _profileService.ModifyOrAddASprint(this.rowData);
            if (result) {
              this.$message({
                message: 'Success!',
                type: 'success'
              });
              this.closeModal();
            }
          }
        });
      },
      async Delete() {
        this.$confirm('This operation would affect to your whole team', 'Are you sure?', {
          confirmButtonText: 'ok',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(async () => {
          let result = await _profileService.DeleteASprint(this.rowData);
          if (result) {
            this.$message({
              message: 'Deleted!',
              type: 'success'
            });
            this.closeModal();
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'canceled'
          });
        });
      },
    }
  }

</script>

<style scoped>


</style>
