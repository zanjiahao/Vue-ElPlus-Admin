<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 【组件】指导按钮
-->
<template>
  <div class="guide-wrap" @click.prevent.stop="guideHandle">
    <svg-icon name="icon-guide" class="svg-icon" />
  </div>
</template>

<script setup lang="ts" name="guide">
import { computed } from 'vue'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { useGlobalStore } from '@/store/modules/global'
const globalStore = useGlobalStore()
import { toolVerClr } from '@/styles/variables.module.scss'

const isHorizontal = computed(() => {
  return globalStore.layout === 'horizontal'
})

const guideHandle = () => {
  const driver: Driver = new Driver({
    allowClose: false, // 点击遮罩层是否关闭
    doneBtnText: '结束', // 最后一个按钮上的文本
    closeBtnText: '关闭', // “关闭”按钮上的文本
    nextBtnText: '下一步', // “下一步”按钮上的文本
    prevBtnText: '上一步', // “上一步”按钮上的文本
    animate: true, // 动画
    opacity: 0.75, // 遮罩层不透明度（0表示仅弹出且不覆盖）
    padding: 6, // 边距
    keyboardControl: true, // 允许通过键盘进行控制（esc以关闭，箭头键移动）
    // 在元素即将突出显示时调用
    onHighlightStarted: Element => {
      if (Element?.node) Element['node'].style.color = '#000'
    },
    // 取消选择元素时调用
    onDeselected: Element => {
      const recoverClr = isHorizontal.value ? '#bfcbd9' : toolVerClr
      if (Element?.node) Element['node'].style.color = recoverClr
    }
  })
  driver.defineSteps(isHorizontal.value ? steps.slice(1) : steps)
  driver.start()
}

const steps = [
  {
    element: '#guide-collapseIcon',
    popover: {
      title: 'Collapse Icon',
      description: 'Open && Close sidebar',
      position: 'right'
    }
  },
  {
    element: '#guide-language',
    popover: {
      title: 'Switch Language',
      description: 'Switch the system language',
      position: 'left'
    }
  },
  {
    element: '#guide-settings',
    popover: {
      title: 'Setting Configuration',
      description: 'Custom Settings Configuration Item',
      position: 'left'
    }
  },
  {
    element: '#guide-fullscreen',
    popover: {
      title: 'Full Screen',
      description: 'Full Screen, Exit The Full Screen Page',
      position: 'left'
    }
  }
]
</script>

<style lang="scss" scoped>
.guide-wrap {
  height: 100%;
  cursor: pointer;
}
.zjh-class {
  color: red;
}
</style>
