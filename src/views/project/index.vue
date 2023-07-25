<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: project
-->
<template>
  <div class="project-box content-box card">
    <h3>测试UI组件库中英文(配合中英文切换按钮查验)</h3>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="address" label="Address" />
    </el-table>
    <el-pagination :total="100" />
  </div>
</template>

<script lang="ts" setup name="ProjectTest">
import { ref } from 'vue'
const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
])
</script>

<style lang="scss" scoped>
.project-box {
  width: 100%;
  height: 100%;
}
</style>
