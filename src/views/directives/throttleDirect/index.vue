<template>
  <div class="card content-box">
    <span class="text">Lodash 节流指令🌞🌞🌞</span>
    <el-button type="primary" v-throttle="throttleClick"> 节流按钮 (每隔1秒后执行) </el-button>
  </div>
</template>

<script setup lang="ts" name="throttleDirect">
import { ElMessage } from 'element-plus'
const throttleClick = () => {
  ElMessage.success('我是节流按钮触发的事件')
}
</script>
