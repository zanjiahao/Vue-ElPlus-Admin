<!--
 * @Description: 
-->
<template>
  <div>
    <el-button>count: {{ dataCount }}</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, inject, onMounted, watch } from 'vue'

const dataCount = inject('dynamicCounter')

watch(
  () => dataCount,
  (newValue: any) => {
    console.log('Counter updated in child:', newValue)
  },
  { immediate: false, deep: true }
)
</script>

<style lang="scss" scoped></style>
