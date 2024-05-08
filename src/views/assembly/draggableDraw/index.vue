<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 拖拽拉伸
-->
<!-- 
  :layout.sync="layout"    //栅格的初始布局数据源。值必须为 `Array`，其数据项为 `Object`。 每条数据项必须有 `i, x, y, w 和 h` 属性。
  :col-num="12"            //定义栅格系统的列数，其值需为自然数。
  :row-height="30"         //每行的高度，单位像素。
  :is-draggable="true"     //标识栅格中的元素是否可拖拽。
  :is-resizable="true"     //标识栅格中的元素是否可调整大小。
  :vertical-compact="true" //标识布局是否垂直压缩。即行内垂直方向上顶端对齐
  :margin="[10, 10]"       //每个栅格之间的间距
  :use-css-transforms="true">   //标识是否使用CSS属性 `transition-property: transform;` 
-->
<template>
  <div class="draggable-draw card">
    <grid-layout
      v-model:layout="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :margin="[5, 5]"
      :use-css-transforms="true"
    >
      <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
        {{ item.i }}
      </grid-item>
    </grid-layout>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const layout = ref([
  { x: 0, y: 0, w: 12, h: 3, i: 0 },
  { x: 0, y: 3, w: 6, h: 7, i: 1 },
  { x: 6, y: 3, w: 6, h: 7, i: 2 },
  { x: 0, y: 10, w: 3, h: 7, i: 3 },
  { x: 3, y: 10, w: 3, h: 7, i: 4 },
  { x: 6, y: 10, w: 3, h: 7, i: 5 },
  { x: 9, y: 10, w: 3, h: 7, i: 6 },
  { x: 0, y: 17, w: 6, h: 7, i: 7 },
  { x: 6, y: 17, w: 6, h: 7, i: 8 }
])
</script>
<style lang="scss" scoped>
.draggable-draw {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .vue-grid-layout {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .vue-grid-item {
      background-color: #748696;
      border: 1px solid #fff;
      box-sizing: border-box;
    }
  }
}
</style>
