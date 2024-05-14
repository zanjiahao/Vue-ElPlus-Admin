<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 工具栏
-->
<template>
  <div class="right-menu" :class="{ 'ver-style': isShowVerticalStyle }">
    <Guide class="right-menu-item hover-effect ver-clr" />
    <Language class="right-menu-item hover-effect ver-clr" />
    <div class="right-menu-item hover-effect ver-clr" @click="openSettingsDrawer">
      <svg-icon id="guide-settings" name="settings" />
    </div>
    <Fullscreen class="right-menu-item hover-effect ver-clr" />
    <div class="user-name ver-clr">
      {{ userStore.name }}
    </div>
    <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click" placement="top-start">
      <div class="avatar-wrapper">
        <img :src="userStore.avatar" class="user-avatar" />
        <el-icon class="icon-caret ver-clr">
          <CaretBottom />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <!-- 首页 -->
          <router-link to="/">
            <el-dropdown-item>
              <svg-icon name="menu-home" />
              <span style="margin-left: 5px">{{ $t('header.home') }}</span>
            </el-dropdown-item>
          </router-link>
          <!-- Github -->
          <a target="_blank" href="https://github.com/zanjiahao/Vue-ElPlus-Admin.git">
            <el-dropdown-item>
              <svg-icon name="github" />
              <span style="margin-left: 5px">{{ $t('header.github') }}</span>
            </el-dropdown-item>
          </a>
          <!-- Gitee -->
          <a target="_blank" href="https://gitee.com/zjh-sir/vue-el-plus-admin.git">
            <el-dropdown-item>
              <svg-icon name="gitee" />
              <span style="margin-left: 5px">{{ $t('header.gitee') }}</span>
            </el-dropdown-item>
          </a>
          <!-- 页面设置 -->
          <el-dropdown-item @click="openSettingsDrawer">
            <svg-icon name="settings" />
            <span style="margin-left: 5px">{{ $t('header.pageSet') }}</span>
          </el-dropdown-item>
          <!-- 退出登录 -->
          <el-dropdown-item divided @click="logout">
            <svg-icon name="logout" />
            <span style="display: inline-block; margin-left: 5px">{{ $t('header.logout') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup name="ToolBar">
import Fullscreen from '../Fullscreen/index.vue'
import Language from '../Language/index.vue'
import Guide from '../Guide/index.vue'
import { elConfirm } from '@/utils/element'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTabsStore } from '@/store/modules/tabs'
import { useUserStore } from '@/store/modules/user'
import { useGlobalStore } from '@/store/modules/global'
import mittBus from '@/utils/mittBus'
const router = useRouter()
const tabStore = useTabsStore()
const userStore = useUserStore()
const globalStore = useGlobalStore()

const isShowVerticalStyle = computed(() => {
  return globalStore.layout === 'vertical'
})

// 打开页面设置抽屉
function openSettingsDrawer() {
  mittBus.emit('open-setting-drawer')
}

// 注销
function logout() {
  elConfirm({ content: '您是否确认退出登录?' }, async () => {
    await tabStore.setTabs([])
    userStore.logout()
    router.push('/login')
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';

.right-menu {
  display: flex;
  width: auto;
  height: 100%;
  line-height: 50px;
  color: $toolHerClr;
  .user-name {
    margin: 0 10px;
    font-size: 14px;
    color: $toolHerClr;
    white-space: nowrap;
    vertical-align: bottom;
  }
  &:focus {
    outline: none;
  }
  .right-menu-item {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 8px;
    font-size: 18px;
    color: $toolHerClr;
    vertical-align: text-bottom;
    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;
      &:hover {
        background: rgb(0 0 0 / 2.5%);
      }
    }
  }
  .avatar-container {
    margin-right: 26px;
    .avatar-wrapper {
      position: relative;
      margin-top: 9px;
      line-height: 32px;
      .user-avatar {
        width: 32px;
        height: 32px;
        cursor: pointer;
        border-radius: 50%;
      }
      .icon-caret {
        position: absolute;
        top: 20px;
        right: -16px;
        font-size: 12px;
        color: $toolHerClr;
        cursor: pointer;
      }
    }
  }
}
.ver-style {
  :deep(.fullscreen) {
    .svg-icon {
      color: $toolVerClr;
    }
  }
  .ver-clr {
    color: $toolVerClr !important;
  }
}
</style>
