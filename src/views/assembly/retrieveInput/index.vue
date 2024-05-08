<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 检索输入框使用案例
-->
<template>
  <div class="retrieve-input-box card">
    <h3 class="text">检索输入框🌞🌞🌞</h3>
    <br />
    <span class="text"><strong>提示：</strong>已添加键盘事件</span>
    <!-- 检索输入 -->
    <div class="ipt-box">
      <div class="retrieve-box">
        <RetrieveInput
          ref="searchIptRef"
          :input-value="retrieveContent"
          :dropdown-data="dropdownData"
          :tooltips-show="true"
        />
      </div>
      <el-button type="primary" @click="getDropdownList(true)">查询</el-button>
    </div>
    <div class="json-viewer-box" v-loading="loading">
      <json-viewer
        v-if="JSON.stringify(jsonViewerData).length > 2"
        :value="jsonViewerData"
        :copyable="true"
        :sort="true"
        :expand-depth="2"
      >
        <template #copy>
          <span>复制</span>
        </template>
      </json-viewer>
      <div v-else class="empty-box"><el-empty description="暂无数据" /></div>
    </div>
  </div>
</template>

<script lang="ts" setup name="RetrieveInput">
import api from '@/api'
import { isEmpty as _isEmpty } from 'lodash'
import RetrieveInput from '@/components/RetrieveInput/index.vue'
import { InputData } from '@/components/RetrieveInput/types'
import { reactive, toRefs } from 'vue'

const initData = reactive({
  retrieveContent: '',
  dropdownData: {},
  loading: false,
  jsonViewerData: {}
})

const { retrieveContent, dropdownData, jsonViewerData, loading } = toRefs(initData)

// 获取下拉选项数据
async function getDropdownList(isClick: boolean = false): Promise<void> {
  loading.value = true
  try {
    const resp = await api.RetrieveInputApi.getRetrieveInputApi()
    const resData = resp.data?.dataList
    if (!_isEmpty(resData)) {
      const dropdownObj: Record<string, { fieldType: string; valueMap: any[] }> = {} // 转成检索输入框需要的数据结构
      resData.forEach((item: InputData) => {
        const { fieldName, fieldType, valueMap } = item
        if (!Object.prototype.hasOwnProperty.call(dropdownObj, fieldName)) {
          dropdownObj[fieldName] = {
            fieldType,
            valueMap // 利用json去重
          }
        }
      })
      dropdownData.value = dropdownObj
      if (isClick) {
        jsonViewerData.value = dropdownObj
      }
    }
  } finally {
    loading.value = false
  }
}

// 获取数据
getDropdownList()
</script>

<style lang="scss" scoped>
.retrieve-input-box {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  .ipt-box {
    display: flex;
    margin-top: 20px;
    .retrieve-box {
      margin-right: 10px;
      width: 600px;
      height: 32px;
    }
  }
  .json-viewer-box {
    margin: 20px 0;
    padding: 20px;
    width: 70%;
    flex: 1;
    box-shadow: var(--el-box-shadow-light);
    overflow: auto;
    box-sizing: border-box;
    // json类型插件样式修改
    .jv-container {
      display: inline;
      line-height: 20px;
      background: transparent;
      ::v-deep .jv-code {
        display: inline;
        padding: 0 !important;
        font-size: 12px !important;

        .jv-key {
          color: #606266 !important;
        }
        .jv-string,
        .jv-number,
        .jv-undefined {
          color: #409eff !important;
        }
      }
    }
    // 空数据样式
    .empty-box,
    .el-empty {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
