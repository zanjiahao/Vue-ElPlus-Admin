<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: App
-->
<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useTheme } from '@/hooks/useTheme'
import { useGlobalStore } from '@/store/modules/global'
import { ElConfigProvider } from 'element-plus'
import { useI18n } from 'vue-i18n'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const globalStore = useGlobalStore()

// init theme
const { initTheme } = useTheme()
initTheme()

// init language
const i18n = useI18n()
onMounted(() => {
  i18n.locale.value = globalStore.language
  globalStore.setGlobalState('language', globalStore.language as GlobalType.LanguageType)
})

const locale = computed(() => {
  return globalStore.language === 'zh' ? zhCn : en
})
</script>

<style lang="scss" scoped></style>
