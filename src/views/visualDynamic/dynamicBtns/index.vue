<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 动态按钮
-->
<template>
  <div class="dynamic-btns card">
    <div class="btns-wrap" v-for="(item, index) in gridboxList" :key="index + 1">
      <component :is="item.element"></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sortable from 'sortablejs'
import RotateBgButton from './components/RotateBgButton.vue'
import IconMoveButton from './components/IconMoveButton.vue'
import BorderAnimationButton from './components/BorderAnimationButton.vue'
import BorderAnimationButton2 from './components/BorderAnimationButton2.vue'
import TranslateBgButton from './components/TranslateBgButton.vue'
import RoundedGradientButton from './components/RoundedGradientButton.vue'
import MirrorSideButton from './components/MirrorSideButton.vue'
import ShakeButton from './components/ShakeButton.vue'
import Skew3DButton from './components/Skew3DButton.vue'
import HoverCircleButton from './components/HoverCircleButton.vue'
import PunkEffectButton from './components/PunkEffectButton.vue'
import PunkEffectButton2 from './components/PunkEffectButton2.vue'
import BirdButton from './components/BirdButton.vue'
import ObliqueLineButton from './components/ObliqueLineButton.vue'
import { onMounted } from 'vue'

const gridboxList = [
  { element: BirdButton },
  { element: RotateBgButton },
  { element: IconMoveButton },
  { element: PunkEffectButton },
  { element: PunkEffectButton2 },
  { element: ObliqueLineButton },
  { element: BorderAnimationButton },
  { element: BorderAnimationButton2 },
  { element: TranslateBgButton },
  { element: RoundedGradientButton },
  { element: MirrorSideButton },
  { element: ShakeButton },
  { element: Skew3DButton },
  { element: HoverCircleButton }
]

onMounted(() => {
  tabsDrop()
})

// tabs 拖拽排序
const tabsDrop = () => {
  Sortable.create(document.querySelector('.dynamic-btns') as HTMLElement, {
    draggable: '.btns-wrap', // 指定那些元素可以被拖拽
    animation: 300 // 动画时间
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';

.dynamic-btns {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;

  .btns-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33.3%;
    height: 33.3%;
    color: #e5e4e9;
    background-color: #304156;
    border: 1px solid #e5e4e9;
  }
}
</style>
