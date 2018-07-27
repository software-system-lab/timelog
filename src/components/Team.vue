<template>
  <div>
    <el-tabs v-model="activeTab"  @tab-click="handleClick">
      <template v-for="tab in tabList">
        <el-tab-pane :label="tab.tabLabel" :name="tab.routeName"></el-tab-pane>
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
            tabLabel: 'Sprint',
            routeName: 'Team - Sprint'
          }
        ],
        activeTab: 'Team - Teammate',
      }
    },
    methods: {
      handleClick(tab, event) {
        router.push({ name: tab.name });
      },
    },
  }

</script>

<style scoped>


</style>
