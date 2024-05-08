<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: Svg组件
-->
<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" />
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface IProp {
  name: string
  className?: string
}

const props = withDefaults(defineProps<IProp>(), {
  name: '',
  className: ''
})

const isExternal = computed(() => isExternalPath(props.name))
const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  if (props.className) {
    return 'svg-icon ' + props.className
  } else {
    return 'svg-icon'
  }
})
const styleExternalIcon = computed(() => {
  return {
    mask: `url(${props.name}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${props.name}) no-repeat 50% 50%`
  }
})

/**
 * @param {string} path
 * @returns {Boolean}
 */
function isExternalPath(path: string): Boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}
.svg-external-icon {
  display: inline-block;
  background-color: currentColor;
  mask-size: cover !important;
}
</style>
