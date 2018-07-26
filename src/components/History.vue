<template>
  <div>
    <el-row>
      <el-col :md="18" :sm="24">
        <h2>Recent Log</h2>
        <el-table :data="recordList" style="width: 100%">

          <el-table-column type="expand">
            <template slot-scope="scope">
              {{scope.row.description}}
            </template>
          </el-table-column>

          <el-table-column prop="category" label="Category" width="180" :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
      :filter-method="filterTag">
            <template slot-scope="scope">
              {{scope.row.category}}
            </template>
          </el-table-column>

          <el-table-column prop="event" label="Event" width="180">
            <template slot-scope="scope">
              {{scope.row.event}}
            </template>
          </el-table-column>

          <el-table-column prop="duration" label="Duration" width="180">
            <template slot-scope="scope">
              {{scope.row.category}}
            </template>
          </el-table-column>

          <el-table-column label="123">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </template>
          </el-table-column>

        </el-table>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        recordList: [{
            category: "123",
            event: "456",
            duration: "yyyy/mm/dd hh:mm ~ yyyy/mm/dd hh:mm",
            description:"NIHOW"
          },
          {
            category: "123",
            event: "456",
            duration: "yyyy/mm/dd hh:mm ~ yyyy/mm/dd hh:mm"
          },
        ],

      }
    },
    methods:{
        filterTag(value, row) {
            return row.tag === value;
        },
    }
  }

</script>

<style scoped>


</style>
