<template>
    <el-container>
        <div>hihi</div>
      <el-aside width="8%">
        <router-view name="header"></router-view>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
</template>
