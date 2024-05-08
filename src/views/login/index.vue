<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 登录页面
-->
<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="rules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user" class-name="icon-style" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon name="password" class-name="icon-style" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :name="passwordType === 'password' ? 'eye' : 'eye-open'" class-name="icon-style" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        size="large"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="handleLogin"
      >
        Login
      </el-button>

      <div style="position: relative">
        <div class="tips">
          <span>Username : admin</span>
          <span>Password : any</span>
        </div>
        <div class="tips">
          <span style="margin-right: 18px">Username : editor</span>
          <span>Password : any</span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import api from '@/api'
import { setToken } from '@/utils/auth'
import { getTimeState } from '@/utils/index'
import { ElNotification } from 'element-plus'
import { ref, reactive, toRefs, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const validateUsername = (rule: unknown, value: string | undefined, callback: (msg?: string) => void) => {
  if (!value) {
    callback('请输入用户名')
  } else {
    callback()
  }
}
const validatePassword = (rule: unknown, value: string | undefined, callback: (msg?: string) => void) => {
  if (!value || value.length < 6) {
    callback('密码不能少于6位')
  } else {
    callback()
  }
}
const initData = reactive({
  loginForm: {
    username: '',
    password: ''
  },
  rules: {
    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
    password: [{ required: true, trigger: 'blur', validator: validatePassword }]
  },
  passwordType: 'password', // 展示或隐藏密码
  capsTooltip: false, // 判断是否显示提示内容
  loading: false,
  redirect: undefined,
  otherQuery: {}
})
let { loginForm, rules, capsTooltip, passwordType, loading } = toRefs(initData)
const password = ref()
const loginFormRef = ref()

// watch 监听区域
watch(
  route,
  (newValue: any) => {
    const query = newValue?.query
    if (query) {
      initData.redirect = query.redirect
      initData.otherQuery = getOtherQuery(query)
    }
  },
  { immediate: true, deep: true }
)

function checkCapslock(e: any) {
  const { key } = e
  capsTooltip.value = key && key.length === 1 && key >= 'A' && key <= 'Z'
}
function showPwd() {
  if (passwordType.value == 'password') {
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
  nextTick(() => {
    password.value.focus() // 设置焦点
  })
}

// 获取剩余的路径参数
type queryType = Record<string, string>
function getOtherQuery(query: queryType) {
  return Object.keys(query).reduce((acc: queryType, cur: string) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
}

function handleLogin() {
  loginFormRef.value.validate(async (valid: Boolean) => {
    if (valid) {
      loading.value = true
      try {
        const { username } = loginForm.value
        let resp = null
        if (username === 'admin') {
          resp = await api.UserApi.adminLoginApi()
        } else if (['zjh', 'zanjiahao'].includes(username)) {
          resp = await api.UserApi.zjhLoginApi()
        } else {
          resp = await api.UserApi.visitorLoginApi()
        }
        const resData = resp?.data
        if (resData) {
          const { token, tokenHead } = resData
          // 设置token
          let bkToken = `${tokenHead}-${token}`
          setToken(bkToken)
          // 路由跳转
          await router.push({
            path: initData.redirect || '/',
            query: initData.otherQuery
          })
          ElNotification({
            title: getTimeState(),
            message: '欢迎登录 Vue ElPlus Admin',
            type: 'success',
            duration: 3000
          })
        }
      } finally {
        loading.value = false
      }
    } else {
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eeeeee;
$cursor: #ffffff;
.login-container {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #2d3a4b;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    :deep(.el-form-item) {
      margin-bottom: 22px;
      color: #454545;
      background: rgb(0 0 0 / 10%);
      border: 1px solid rgb(255 255 255 / 10%);
      border-radius: 5px;
      .el-form-item__content {
        width: 85%;
        line-height: 40px;
      }
      .el-input {
        width: 85%;
        height: 47px;
        background: transparent;
        .el-input__wrapper {
          width: 100%;
          background: transparent;
          box-shadow: none;
        }
        .el-input__inner {
          width: 100%;
          height: 47px;
          padding: 12px 5px 12px 15px;
          color: $light_gray;
          background: transparent;
          border-radius: 0;
          caret-color: $cursor;
          &:-webkit-autofill {
            box-shadow: 0 0 0 1000px #283443 inset !important;
            -webkit-text-fill-color: $cursor !important;
          }
        }
      }
    }
  }
  .tips {
    margin-bottom: 10px;
    font-size: 14px;
    color: #ffffff;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    display: inline-block;
    width: 30px;
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    .icon-style {
      color: #889aa4;
    }
  }
  .title-container {
    position: relative;
    .title {
      margin: 0 auto 40px;
      font-size: 26px;
      font-weight: bold;
      color: $light_gray;
      text-align: center;
    }
  }
  .show-pwd {
    position: absolute;
    top: 7px;
    right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
