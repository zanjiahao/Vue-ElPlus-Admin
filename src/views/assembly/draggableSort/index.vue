<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 拖拽排序九宫格
-->
<template>
  <div class="draggable-wrapper card">
    <div class="draggable-item" v-for="(item, index) in draggableItems" :key="item" :style="{ background: item }">
      <h3>{{ index + 1 }}</h3>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Sortable from 'sortablejs'
import { ref, onMounted } from 'vue'

const draggableItems = ref([
  '#87bba2',
  '#ff9b54',
  '#73628a',
  '#76c893',
  '#619b8a',
  '#55828b',
  '#427aa1',
  '#38a3a5',
  '#fcca46'
])

onMounted(() => {
  tabsDrop()
})

// tabs 拖拽排序
const tabsDrop = () => {
  Sortable.create(document.querySelector('.draggable-wrapper') as HTMLElement, {
    draggable: '.draggable-item', // 指定那些元素可以被拖拽
    animation: 300 // 动画时间
  })
}
</script>
<style lang="scss" scoped>
.draggable-wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  .draggable-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33.3%;
    height: 33.3%;
    color: #e5e4e9;
    border: 1px solid #e5e4e9;
  }
}
</style>
