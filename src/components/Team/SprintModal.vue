<template>
  <el-dialog title="Sprint" :visible.sync="visible" :before-close="closeModal">
    <el-form ref="form" :model="rowData" :rules="formRules" label-width="100px" :label-position="'right'">
      <el-form-item label="Name" prop="Name">
        <el-input v-model="rowData.Name"></el-input>
      </el-form-item>
      <el-form-item label="Duration" prop="Duration">
        <el-date-picker v-model="rowData.Duration" type="daterange" unlink-panels align="center" range-separator="to" start-placeholder="Start"
          end-placeholder="End" :picker-options="pickerOptions" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Content" prop="Content">
        <el-input type="textarea" v-model="rowData.Content" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
      </el-form-item>
    </el-form>


    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="createOrUpdate()">confirm</el-button>
    </div>

  </el-dialog>
</template>

<script>
  export default {
    props: ['rowData', 'visible'],
    data() {
      return {
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
          Name: [{
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
            required: true,
            message: 'Check Here!',
            trigger: 'blur'
          }]
        }
      };
    },
    methods: {
      closeModal() {
        this.$emit('update:visible', false);
      },
      createOrUpdate() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (!('ID' in this.rowData)) {
              ////TODO insert service
              this.rowData.ID = "temp";
              this.$emit('add-sprint-row', this.rowData);
            }
            this.$emit('update:visible', false);
            this.$refs['form'].resetFields();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style scoped>


</style>
