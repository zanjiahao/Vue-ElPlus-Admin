<template>
  <div class="card content-box">
    <span class="text">Lodash 防抖指令🌞🌞🌞</span>
    <el-button type="primary" v-debounce="debounceClick"> 防抖按钮 (0.3秒后执行) </el-button>
  </div>
</template>

<script setup lang="ts" name="debounceDirect">
import { ElMessage } from 'element-plus'
const debounceClick = () => {
  ElMessage.success('我是防抖按钮触发的事件')
}
</script>
