<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 自定义检索输入框
-->
<template>
  <div id="serach-input-wrap">
    <div class="serach-input">
      <el-input
        id="elInputRef"
        ref="elInputRef"
        v-model="retrievedContent"
        :title="retrievedContent.length > 100 ? retrievedContent : ''"
        :clearable="!tooltipsShow"
        :placeholder="placeholderText"
        type="text"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="inputDebounce"
      />
      <div v-if="props.tooltipsShow" class="tips-pic">
        <el-tooltip :open-delay="600" effect="dark" placement="top">
          <template #content>
            <div v-html="tooltipContent" />
          </template>
          <svg-icon name="icon-tips" />
        </el-tooltip>
      </div>
    </div>
    <!-- 下拉列表三角形 -->
    <div v-if="renderDropdown" class="triangle" />
    <!-- 下拉列表 -->
    <transition name="el-zoom-in-top">
      <div v-if="renderDropdown" id="menus-list" ref="dropdownRef" @click="handleClickDropdown">
        <!-- field 列表 -->
        <div v-if="showFields">
          <div v-for="item in fieldList" :key="item.id" class="dropdown-item" @click="handleClickField(item)">
            <div class="item-value">
              <div class="item-type-icon field-clr">
                <svg-icon name="icon-field"></svg-icon>
              </div>
              <span class="item-text">{{ item }}</span>
            </div>
            <div class="item-description">
              <div>筛选包含</div>
              <div class="item-callout">
                {{ item }}
              </div>
              <div>的结果</div>
            </div>
          </div>
        </div>
        <!-- value 列表 -->
        <div v-if="showValue">
          <div v-for="item in valueList" :key="item.id" class="dropdown-item" @click="handleClickValue(item)">
            <div class="item-value normal-width">
              <div class="item-type-icon value-clr">
                <svg-icon name="icon-value"></svg-icon>
              </div>
              <span class="item-text">{{ item }}</span>
            </div>
          </div>
        </div>
        <!-- : :* -->
        <div v-if="showColon">
          <div v-for="item in colonList" :key="item.id" class="dropdown-item" @click="handleClickColon(item)">
            <div class="item-value">
              <div class="item-type-icon colon-clr">
                <svg-icon name="icon-colon"></svg-icon>
              </div>
              <span class="item-text">{{ item }}</span>
            </div>
            <div class="item-description">
              <div class="item-callout">
                {{ item === ':' ? '等于' : '存在' }}
              </div>
              <div>{{ item === ':' ? '某一值' : '任意形式' }}</div>
            </div>
          </div>
        </div>
        <!-- AND OR -->
        <div v-if="showContinue">
          <div v-for="item in continueList" :key="item.id" class="dropdown-item" @click="handleClickContinue(item)">
            <div class="item-value">
              <div class="item-type-icon continue-clr">
                <svg-icon name="icon-continue"></svg-icon>
              </div>
              <span class="item-text">{{ item }}</span>
            </div>
            <div class="item-description">
              <div>需要</div>
              <div class="item-callout">
                {{ item === 'AND' ? '两个参数都' : '一个或多个参数' }}
              </div>
              <div>为真</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import lodash from 'lodash'
import { outline } from './outline'
import { ref, reactive, toRefs, nextTick, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { Ingredient, ValueItemType, RetrieveInitDataType } from './types'
const emit = defineEmits(['update:input-value'])

const props = defineProps({
  inputValue: {
    required: true,
    type: String
  },
  dropdownData: {
    required: true, // 设置属性为必须使用类型
    type: Object,
    default: () => ({})
  },
  // 提示问号是否展示
  tooltipsShow: {
    required: true,
    type: Boolean,
    default: false
  }
})

const initData: RetrieveInitDataType = reactive({
  tooltipContent: outline.retrieveIptTip, // 规则提示
  separator: /AND|OR/, // 区分查询语句条件
  retrievedContent: '', // 检索关键字
  inputElement: null, // 输入框 dom 元素
  shouldHandleBlur: true, // blur 时是否触发检索
  historyContent: '', // 记录修改前输入框文本, 用于键盘监听处理
  placeholderText: outline.placeholder,
  showDropdown: false,
  activeIndex: 0, // 键盘上下键对应的行
  isKeyBoardPermit: false, // 键盘开关
  isKeywordPermit: false, // 键盘关键字[],"",''补全开关
  inputDebounce: null, // 防抖
  showFields: false, // 显示下拉可选字段
  showValue: false, // 显示下拉可选值
  showColon: false, // : :*
  showContinue: false, // AND OR
  originFieldList: [], // 所有字段列表 ['name', 'age']
  continueList: ['AND', 'OR'], // 操作符
  colonList: [':', ':*'], // : | :* 冒号相关数组
  fieldList: [], // 下拉 key 字段列表
  valueList: [] // 下拉 值 字段列表
})

const elInputRef = ref()
const dropdownRef = ref()

const {
  tooltipContent, // 规则提示
  separator, // 区分查询语句条件
  retrievedContent, // 检索关键字
  inputElement, // 输入框 dom 元素
  shouldHandleBlur, // blur 时是否触发检索
  historyContent, // 记录修改前输入框文本, 用于键盘监听处理
  placeholderText,
  showDropdown,
  activeIndex, // 键盘上下键对应的行
  isKeyBoardPermit, // 键盘开关
  isKeywordPermit, // 键盘关键字[],"",''补全开关
  inputDebounce, // 防抖
  showFields, // 显示下拉可选字段
  showValue, // 显示下拉可选值
  showColon, // : :*
  originFieldList,
  showContinue, // AND OR
  continueList, // 操作符
  colonList, // : | :* 冒号相关数组
  fieldList, // 下拉 key 字段列表
  valueList // 下拉 值 字段列表
} = toRefs(initData)

// computed 区域
const renderDropdown = computed(() => {
  return showDropdown.value && (showFields.value || showValue.value || showColon.value || showContinue.value)
})

// watch 监听区域
watch(
  () => props.inputValue,
  (newValue: any) => {
    // 父组件传给子组件的值
    retrievedContent.value = newValue
  },
  { immediate: true, deep: true }
)
watch(
  () => initData.retrievedContent,
  (newValue: any) => {
    // 当每次子组件值改变的时候将通知父组件
    emit('update:input-value', newValue)
  },
  { deep: true }
)
watch(
  () => props.dropdownData,
  (newValue: any) => {
    originFieldList.value = Object.keys(newValue)
    if (originFieldList.value.length && showDropdown.value) {
      // 可能字段接口还没返回用户就 focus 了输入框
      calculateDropdown()
    }
  },
  { deep: true }
)
watch(
  showDropdown,
  (isBoolean: boolean) => {
    if (isBoolean) {
      // 显示下拉列表情况前先确定下拉内容
      calculateDropdown()
    } else {
      showFields.value = false
      showValue.value = false
      showColon.value = false
      showContinue.value = false
      fieldList.value.splice(0)
      valueList.value.splice(0)
      isKeyBoardPermit.value = false // 关闭键盘监听
    }
  },
  { deep: true }
)

// 挂载后
onMounted(() => {
  inputElement.value = elInputRef.value
  // 防抖处理
  inputDebounce.value = lodash.debounce(handleInput, 500)
  // 开启事件监听
  document.addEventListener('keypress', keypressHandleEvent, false)
  document.addEventListener('keyup', keyupHandleEvent, false)
})

// 销毁之前
onBeforeUnmount(() => {
  // 销毁事件监听
  document.removeEventListener('keypress', keypressHandleEvent, false)
  document.removeEventListener('keyup', keyupHandleEvent, false)
})

// 函数方法区域

// 点击下拉列表区域触发事件
function handleClickDropdown(e: any) {
  e.stopPropagation()
  shouldHandleBlur.value = false
  const timer = setTimeout(() => {
    shouldHandleBlur.value = true
    inputElement.value?.focus()
    clearTimeout(timer)
  }, 200)
}

// keypress 键盘按下并释放 事件里面可以监听并区分键盘大小写
function keypressHandleEvent(event: any) {
  const keyName = event.key
  const whiteList = ['[', "'", '"']
  // 监听搜索条件中特殊字符补全
  if (isKeywordPermit.value) {
    if (whiteList.includes(keyName)) {
      const timeId = setTimeout(() => {
        const posIndex = getInputCursorPosition() as number // 获取input下标位置
        const changeText = retrievedContent.value.split('')
        switch (keyName) {
          case '[':
            changeText.splice(posIndex, 0, ']')
            break
          case "'":
            changeText.splice(posIndex, 0, "'")
            break
          case '"':
            changeText.splice(posIndex, 0, '"')
            break
        }
        retrievedContent.value = changeText.join('')
        setTextTaluePosition(posIndex)
        clearTimeout(timeId)
      }, 50)
    }
  }
}

// keyup 键盘释放事件
function keyupHandleEvent(event: any) {
  const keyName = event.key

  if (keyName === 'Backspace' && isKeywordPermit.value) {
    const posIndex = getInputCursorPosition() as number // 获取input下标位置
    const hisPosStr = historyContent.value.substring(posIndex, posIndex + 1) // 删除的那个字符
    const posLatterStr = retrievedContent.value.substring(posIndex, posIndex + 1) // 删除之后光标后一个字符
    // 监听搜索条件中特殊字符补全
    const _str = retrievedContent.value.split('')
    const whiteList = ["'", '"', '[', ']']
    if (whiteList.includes(hisPosStr)) {
      const startWhiteList = ["'", '"', '[']
      const endWhiteList = ["'", '"', ']']
      const delStr = startWhiteList.find(item => item === hisPosStr)
      const willDelStr = endWhiteList.find(item => item === posLatterStr)
      if (delStr === willDelStr || (delStr === '[' && willDelStr === ']')) {
        _str.splice(posIndex, 1)
      }
    }

    retrievedContent.value = _str.join('')
    setTextTaluePosition(posIndex)
  }

  // 记录修改前文本, 用于键盘监听处理
  historyContent.value = retrievedContent.value

  // 当搜索条件未开启的情况下不监听键盘事件
  if (!dropdownRef.value || !isKeyBoardPermit.value) {
    if (['NumpadEnter', 'Enter'].includes(keyName)) {
      event.preventDefault()
      closeDropdown()
    }
    return
  }

  // Esc 按键退出并设为失焦状态
  if (keyName === 'Escape') return closeDropdown()

  // 监听搜索条件选项 上下键盘移动
  const dropdownItemList = dropdownRef.value.querySelectorAll('.dropdown-item')
  if (showDropdown.value && dropdownItemList.length) {
    switch (keyName) {
      case 'ArrowUp': // 箭头向上
        if (activeIndex.value) {
          activeIndex.value -= 1
        } else {
          activeIndex.value = dropdownItemList.length - 1
        }
        calculateScroll(true)
        break
      case 'ArrowDown': // 键盘向下
        activeIndex.value += 1
        if (activeIndex.value === 0 || activeIndex.value === dropdownItemList.length) {
          activeIndex.value = 0
        }
        calculateScroll(false)
        break
      case 'Enter':
        if (activeIndex.value >= 0) {
          // enter 选中下拉选项
          dropdownItemList[activeIndex.value].click()
        } else {
          // enter 检索
          closeDropdown()
        }
        break
    }
    // 添加行样式
    setEventRowStyleFn(dropdownItemList, activeIndex.value) // 添加行样式
  }
}

// 为当前行添加样式
function setEventRowStyleFn(elItemList: HTMLInputElement[], index: number) {
  elItemList.forEach((item, i: number) => {
    if (index === i) {
      item.classList.add('active-event')
    } else {
      item.classList.remove('active-event')
    }
  })
}

// 上下键选择项目时滚动到可视区域
function calculateScroll(isTop: boolean) {
  nextTick(() => {
    // 列表容器
    const containerEl = dropdownRef.value
    const containerRect = containerEl.getBoundingClientRect()
    const containerTop = containerRect.top
    const containerBottom = containerTop + containerRect.height
    // 激活的列表项
    const itemEl = containerEl.querySelector('.dropdown-item.active-event')
    const itemRect = itemEl.getBoundingClientRect()
    const itemTop = itemRect.top
    const itemBottom = itemTop + itemRect.height
    // 列表项不在容器可视范围
    if (itemTop < containerTop || itemBottom > containerBottom) {
      const currentScrollTop = containerEl.scrollTop
      if (isTop) {
        containerEl.scrollTop = currentScrollTop + itemTop - containerTop
      } else {
        containerEl.scrollTop = currentScrollTop + itemBottom - containerBottom
      }
    }
  })
}

// 用于获取input下标位置
function getInputCursorPosition() {
  const inputText = document.getElementById('elInputRef') as HTMLInputElement
  return inputText?.selectionStart
}

// 设置鼠标光标位置的函数
function setTextTaluePosition(spos: number) {
  const elInput = document.getElementById('elInputRef') as HTMLInputElement
  if (spos < 0) spos = elInput.value.length
  if (elInput.setSelectionRange) {
    // 兼容火狐,谷歌
    const timeId = setTimeout(function () {
      elInput.setSelectionRange(spos, spos)
      elInput.focus()
      clearTimeout(timeId)
    }, 0)
  }
}

// 根据当前输入关键字计算提示内容
function calculateDropdown() {
  if (lodash.isEmpty(originFieldList.value)) return
  const trimValue = retrievedContent.value.trim()
  const lastFragments = retrievedContent.value.split(separator.value)
  const lastFragment = lastFragments[lastFragments.length - 1]

  // 以 name:"arman" OR age:18 为例，还没开始输入字段
  // 检索内容 为空 | 为@字符 | AND加空格 | OR加空格 情况下需展示字段列表
  if (
    !trimValue ||
    trimValue === '@' ||
    /\s+AND\s+$/.test(retrievedContent.value) ||
    /\s+OR\s+$/.test(retrievedContent.value)
  ) {
    showWhichDropdown('Fields')
    fieldList.value = [...originFieldList.value]
    return
  }
  // 开始输入字段【name】
  const inputField = /^\s*(?<field>[@\w.]+)$/.exec(lastFragment)?.groups?.field
  if (inputField) {
    fieldList.value = originFieldList.value.filter(item => {
      if (item.includes(inputField)) {
        if (item === inputField) {
          // 完全匹配字段同时和 : :* 选项
          showColon.value = true
        }
        return true
      } else {
        return false
      }
    })
    showWhichDropdown(fieldList.value.length ? 'Fields' : '')
    return
  }
  // 字段输入完毕【name 】的情况, 开始展示冒号
  if (/^\s*(?<field>[@\w.]+)\s*$/.test(lastFragment)) {
    showWhichDropdown('Colon')
    return
  }
  // 准备输入值【name:】,这里是确定field字段，判断对应哪个value列表
  // 正则里 ?<field> 的方式是在起别名
  const confirmField = /^\s*(?<field>[@\w.]+)\s*:\s*$/.exec(lastFragment)?.groups?.field
  if (confirmField) {
    const valueMap = props.dropdownData[confirmField]
    if (!lodash.isEmpty(valueMap)) {
      valueList.value = getValueList(valueMap)
      showWhichDropdown('Value')
    } else {
      showWhichDropdown('')
      valueList.value.splice(0)
    }
    return
  }
  // 正在输入值【age:1】注意后面没有空格，匹配字段对应值列表
  const valueResult = /^\s*(?<field>[@\w.]+)\s*:\s*(?<value>[\S]+)$/.exec(lastFragment)
  if (valueResult) {
    const confirmField = valueResult.groups?.field
    const valueMap = props.dropdownData[confirmField as string]
    if (valueMap) {
      const inputValue = valueResult.groups?.value
      valueList.value = getValueList(valueMap).filter(item => item.includes(inputValue as string))
      showWhichDropdown(valueList.value.length ? 'Value' : '')
    } else {
      showWhichDropdown('')
      valueList.value.splice(0)
    }
    return
  }
  // 一组条件输入完毕【age:18 】提示继续增加条件 AND OR
  if (/^\s*(?<field>[@\w.]+)\s*:\s*(?<value>[\S\s]+)\s+$/.test(lastFragment)) {
    showWhichDropdown('Continue')
    return
  }
  showWhichDropdown('')
}

/**
 * 显示哪个下拉列表
 * @param {string} param
 */
function showWhichDropdown(param: string) {
  const types = ['Fields', 'Value', 'Colon', 'Continue']
  for (const type of types) {
    const key = `show${type}` as Ingredient
    const bool = type === param
    initData[key] = bool
    if (bool) {
      // 当@message情况下不展示下拉列表
      if (param === 'Value' && lodash.isEmpty(valueList.value)) {
        showFields.value = false
        showValue.value = false
        showColon.value = false
        showContinue.value = false
        return
      }
      nextTick(() => {
        if (dropdownRef.value) {
          const dropdownItemList = dropdownRef.value.querySelectorAll('.dropdown-item')
          activeIndex.value = 0
          setEventRowStyleFn(dropdownItemList, activeIndex.value)
          isKeyBoardPermit.value = true // 开启键盘关键字监听
        }
      })
    }
  }
}

/**
 * 获取某个字段可选的值列表
 * @param {Object} valueObj
 * @return {string[]}
 */
function getValueList(valueObj: ValueItemType) {
  const { fieldType, valueMap } = valueObj
  if (fieldType === 'string') {
    return Object.keys(valueMap).map(item => `"${item}"`)
  }
  return Object.keys(valueMap)
}

// 在 Input 值改变时触发
function handleInput() {
  calculateDropdown()
}

// 失去焦点后的事件
function handleBlur() {
  // blur 时检索
  // 下拉菜单 click 时也会触发 blur 事件，但是不执行检索相关逻辑
  // 下拉菜单 click 事件在 blur 事件触发后 100+ms 后触发
  // 所以 blur 事件回调延迟 200ms 执行，让 click 事件执行后才确认如何执行
  const timer = setTimeout(() => {
    if (shouldHandleBlur.value) {
      // 非点击下拉触发的 blur 事件, 就是点击下拉列表外围区域
      showDropdown.value = false
      isKeyBoardPermit.value = false // 关闭键盘监听
      isKeywordPermit.value = true // 关闭键盘关键字补全监听
    } else {
      // 点击了下拉菜单，会再次聚焦
      // 聚焦事件已挪到 handleClickDropdown 函数中，因为 Esc 和 非点击下拉列表区域等均会触发失焦事件
      // 逻辑：除了点击方式触发选中下拉列表区域，其余方式不能触发再次聚焦
      // this.inputElement.focus()
    }
    clearTimeout(timer)
  }, 200)
}

// 获取焦点后的事件
function handleFocus() {
  showDropdown.value = true
  isKeywordPermit.value = true
}

function closeDropdown() {
  showDropdown.value = false
  if (!lodash.isEmpty(inputElement.value)) {
    inputElement.value.blur()
  }
}

/**
 * 选择某个可选字段
 * @param {string} field
 */
function handleClickField(field: string) {
  valueList.value = getValueList(props.dropdownData[field])
  const currentValue = retrievedContent
  const trimValue = currentValue.value.trim()
  if (!trimValue || trimValue === '@') {
    retrievedContent.value = `${field} `
  } else {
    const fragments = currentValue.value.split(separator.value)
    if (!fragments[fragments.length - 1].trim()) {
      // 可能的情况 【name:"arman" AND \s】
      retrievedContent.value = `${currentValue.value}${field} `
    } else {
      // 可能的情况【name:"arman" AND ag】【name】
      retrievedContent.value = currentValue.value.replace(/\s*[@\w.]+$/, ` ${field} `)
    }
  }
  showWhichDropdown('Colon')
}
/**
 * 选择 : 或者 :*
 * @param {string} type
 */
function handleClickColon(type: string) {
  retrievedContent.value = `${retrievedContent.value + type} `
  nextTick(() => calculateDropdown())
}

/**
 * 选择某个字段可选值
 * @param {string} value
 */
function handleClickValue(value: string) {
  // 当前输入值可能的情况 【name:"a】【age:】
  retrievedContent.value = retrievedContent.value.replace(/:\s*[\S]*$/, `: ${value} `)
  showWhichDropdown('Continue')
}

/**
 * 选择 AND 或者 OR
 * @param {string} type
 */
function handleClickContinue(type: string) {
  retrievedContent.value = `${retrievedContent.value + type} `
  const timer = setTimeout(() => {
    showWhichDropdown('Fields')
    fieldList.value = [...originFieldList.value]
    clearTimeout(timer)
  }, 0)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
