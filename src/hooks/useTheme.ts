import { storeToRefs } from 'pinia'
import { useGlobalStore, defaultPrimary } from '@/store/modules/global'
import { getLightColor, getDarkColor } from '@/utils/color'

/**
 * @description 全局主题 hooks
 * */
export const useTheme = () => {
  const globalStore = useGlobalStore()
  const { primary, isDark } = storeToRefs(globalStore)

  // 设置主题颜色
  function changePrimary(val: string | null) {
    if (!val) {
      // 当清空主题颜色时需要把默认值替换上
      val = defaultPrimary
    }
    const html = document.documentElement as HTMLElement
    // 设置 elementplus 默认主题颜色
    html.style.setProperty('--el-color-primary', primary.value)
    // 设置 elementplus 点击时颜色
    const primaryClickClr = isDark.value ? `${getLightColor(val, 0.2)}` : `${getDarkColor(val, 0.3)}`
    document.documentElement.style.setProperty('--el-color-primary-dark-2', primaryClickClr)
    // 设置主题相关高亮颜色
    for (let i = 1; i <= 9; i++) {
      const primaryColor = isDark.value ? `${getDarkColor(val, i / 10)}` : `${getLightColor(val, i / 10)}`
      document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor)
    }
    globalStore.setGlobalState('primary', val)
  }

  // 切换暗黑模式
  function switchDark() {
    const html = document.documentElement as HTMLElement
    if (isDark.value) html.setAttribute('class', 'dark')
    else html.setAttribute('class', '')
    // 切换模式后需要重新对主题颜色进行赋值，不然可能会影响到高亮色
    changePrimary(primary.value)
  }

  // 初始化主题
  function initTheme() {
    changePrimary(primary.value)
    switchDark()
  }

  return { changePrimary, switchDark, initTheme }
}
