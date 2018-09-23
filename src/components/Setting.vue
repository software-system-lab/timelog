<template>
  <el-collapse accordion>
    <el-collapse-item title="My Tags" name="1">
      <el-row>
        <el-col :md="18" :sm="24">
          <el-table :data="TagList" sortable="true">

            <el-table-column prop="TagName" label="Name" align="left">
              <template slot-scope="scope">
                <el-input v-if="scope.row.TagID == null" placeholder="Add a new tag" minlength="1" v-model="scope.row.TagName">
                </el-input>
                <el-input v-else :disabled="scope.row.IsDisable" minlength="1" v-model="scope.row.TagName">
                </el-input>
              </template>
            </el-table-column>

            <el-table-column label="" align="left">
              <template slot-scope="scope">
                <el-button v-if="scope.row.TagID==null" type="primary" icon="el-icon-plus" circle @click="ModifyOrAdd(scope.row)"></el-button>
                <el-button v-else type="primary" icon="el-icon-edit" circle @click="ModifyOrAdd(scope.row)"></el-button>
                <el-button v-if="(!scope.row.IsDisable)&&(scope.row.TagID!=null)" type="danger" icon="el-icon-delete"
                  circle @click="Delete(scope.row)"></el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item title="My Profile" name="2">

    </el-collapse-item>
    <el-collapse-item title="" name="3">

    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import _logService from '../services/LogService.js'

  export default {
    data() {
      return {
        TagList: [{
          TagID: null,
          Name: '',
          IsDisable: false
        }, ]
      }
    },
    async created() {
      this.QueryTags();
    },
    methods: {
      async ModifyOrAdd(tag) {
        if (tag.IsDisable == true) {
          if (tag.TagID) //not new tag
            tag.IsDisable = false;
        } else {
          if (tag.TagName.length < 1) {
            this.$message.error('Name of tag cannot be null!');
            return;
          }

          var DuplicatedTag = this.TagList.find(x => x.TagName == tag.TagName && x.TagID != null && x.TagID != tag.TagID)
          if (DuplicatedTag) {
            this.$message.error('Duplicate name!');
            return;
          }

          let result = await _logService.ModifyOrAddATag(tag);
          if (result) {
            this.$message({
              message: 'successed!',
              type: 'success'
            });
            this.QueryTags();
          } else {
            this.$message.error('Tag Added Fail!Please Retry');
          }
        }
      },
      async Delete(tag) {
        let result = await _logService.DeleteATag(tag);
        if (result) {
          this.$message({
            message: 'successed!',
            type: 'success'
          });
          this.QueryTags();
        } else {
          this.$message.error('Delete Tag Fail!Please Retry');
        }
      },
      async QueryTags() {
        let taglist = await _logService.GetUserTags();
        
        //clear list
        this.TagList.length = 0;
        window.TagList.length = 0;
        // input to add tag
        this.TagList.push({
          TagID: null,
          TagName: '',
          IsDisable: false
        });
        //else to window data
        window.TagList.push({
          TagID: -1,
          TagName: 'else',
        })

        if (taglist == "no data")
          this.$message({
            message: 'no tag data!',
            type: 'warning'
          });
        else {
          taglist.forEach(x => {
            this.TagList.push({
              TagID: x.TagID,
              TagName: x.TagName,
              IsDisable: true
            });
            window.TagList.push({
              TagID: x.TagID,
              TagName: x.TagName,
            })
          });
        }
      }
    }
  }

</script>

<style scoped>
  .el-collapse {
    text-align: left;
  }

</style>
