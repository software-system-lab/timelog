<template>
  <div>
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <template v-for="tab in tabList">
        <el-tab-pane :label="tab.tabLabel" :key="tab.routeName" :name="tab.routeName"></el-tab-pane>
      </template>
      <router-view></router-view>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tabList: [{
            tabLabel: 'Teammate',
            routeName: 'Team - Teammate'
          },
          {
            tabLabel: 'Iteration',
            routeName: 'Team - Sprint'
          }
        ],
        activeTab: null,
      }
    },
    methods: {
      handleClick(tab) {
        router.push({
          name: tab.name
        });
      },
    },
  }

</script>

<style scoped>


</style>
