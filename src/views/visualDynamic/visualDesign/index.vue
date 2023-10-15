<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 视觉设计
-->
<template>
  <div class="visual-design card">
    <div
      class="visual-box"
      v-for="(item, index) in gridboxList"
      :key="index + 1"
      :style="item.isAll ? 'width: 100%; height: auto;' : 'width: 50%; height: auto;'"
    >
      <component :is="item.element"></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sortable from 'sortablejs'
import WaterDropLogin from './components/WaterDropLogin.vue'
import HorseRaceLamp from './components/HorseRaceLamp.vue'
import SudokuImageAnimation from './components/SudokuImageAnimation.vue'
import { onMounted } from 'vue'

const gridboxList = [
  { element: WaterDropLogin, isAll: true },
  { element: HorseRaceLamp },
  { element: SudokuImageAnimation }
]
onMounted(() => {
  tabsDrop()
})

// tabs 拖拽排序
const tabsDrop = () => {
  Sortable.create(document.querySelector('.visual-design') as HTMLElement, {
    draggable: '.visual-box', // 指定那些元素可以被拖拽
    animation: 300 // 动画时间
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';

.visual-design {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;

  .visual-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    color: #e5e4e9;
    background-color: #304156;
    border: 1px solid #e5e4e9;
  }
}
</style>
