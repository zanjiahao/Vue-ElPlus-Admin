<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 国际语言切换列表组件
-->
<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <span><svg-icon id="guide-language" name="language"></svg-icon></span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in languageList"
          :key="item.value"
          :command="item.value"
          :disabled="language === item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useGlobalStore } from '@/store/modules/global'

const i18n = useI18n()
const globalStore = useGlobalStore()
const language = computed(() => globalStore.language)

const languageList = [
  { label: '简体中文', value: 'zh' },
  { label: 'English', value: 'en' }
]

const changeLanguage = (lang: string) => {
  i18n.locale.value = lang
  globalStore.setGlobalState('language', lang as GlobalType.LanguageType)
}
</script>
