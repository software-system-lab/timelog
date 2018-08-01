<template>
  <div>
    <el-row>
      <el-col :md="16" :sm="24">
        <h2>Recent Log</h2>
        <el-table :data="recordList" style="width: 90%" sortable="true">

          <el-table-column type="expand">
            <template slot-scope="scope">
              {{scope.row.description}}
            </template>
          </el-table-column>

          <el-table-column prop="category" label="Category" width="180" align="left" :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
            :filter-method="filterTag">
            <template slot-scope="scope">
              {{scope.row.category}}
            </template>
          </el-table-column>

          <el-table-column prop="event" label="Event" width="180" align="left" sortable>
            <template slot-scope="scope">
              {{scope.row.event}}
            </template>
          </el-table-column>

          <el-table-column prop="duration" label="Duration" width="180" align="left" sortable>
            <template slot-scope="scope">
              {{scope.row.category}}
            </template>
          </el-table-column>

          <el-table-column label="" align="left">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="Edit(scope.row)"></el-button>
            </template>
          </el-table-column>

        </el-table>

      </el-col>
    </el-row>
    <ModifyHistoryModal :visible.sync="dialogFormVisible" :rowData="rowData"></ModifyHistoryModal>
  </div>
</template>

<script>
  import ModifyHistoryModal from './History/ModifyModal'

  export default {
    data() {
      return {
        recordList: [{
            category: "123",
            event: "456",
            duration: "yyyy/mm/dd hh:mm ~ yyyy/mm/dd hh:mm",
            description: "NIHOW"
          },
          {
            category: "123",
            event: "789",
            duration: "yyyy/mm/dd hh:mm ~ yyyy/mm/dd hh:mm"
          },
        ],
        dialogFormVisible: false,
        rowData: [],
      }
    },
    methods: {
      filterTag(value, row) {
        return row.tag === value;
      },
      Edit(rowData) {
        this.dialogFormVisible = true;
        this.rowData = rowData;
      }
    },
    components: {
      ModifyHistoryModal,
    }
  }

</script>

<style scoped>


</style>
