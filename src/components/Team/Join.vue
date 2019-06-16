<template>
<div>
  <el-row>
    <el-card>

    </el-card>
  </el-row>
  <br>
  <el-row :gutter="20">
    <el-col :md="12" :sm="24">
      <el-card>
        <div slot="header">
          <h2>Create Team</h2>
        </div>
        <el-form :label-position="'right'">
          <el-form-item label="Team Name">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="Team Code">
            <el-input></el-input>
          </el-form-item>
          <el-button type="primary">Create</el-button>
        </el-form>
      </el-card>
    </el-col>
    <el-col :md="12" :sm="24">
      <el-card>
        <div slot="header">
          <h2>Join a Team</h2>
        </div>
        <el-form :label-position="'right'">
          <el-form-item label="Team Name">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="Team Code">
            <el-input></el-input>
          </el-form-item>
          <el-button type="primary">Join</el-button>
        </el-form>
      </el-card>
    </el-col>
  </el-row>

</div>
</teamplate>
