import { createApp } from 'vue'
import '@/styles/index.scss' // global css
import App from './App.vue'
import Pinia from './store'
import router from './router'
import * as Icons from '@element-plus/icons-vue'
import 'virtual:svg-icons-register' // 引入注册脚本
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'
import SvgIcon from '@/components/svgIcon/index.vue'
import I18n from '@/languages/index'
import VueGridLayout from 'vue-grid-layout'
// 自定义指令功能未完待续... todo
// custom directives
// import directives from "@/directives";

const app = createApp(App)
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons])
})
app.component('SvgIcon', SvgIcon)
app.use(ElementPlus)
app.use(VueGridLayout)
app.use(I18n)
app.use(Pinia)
// app.use(directives)
app.use(router)
app.mount('#app')
