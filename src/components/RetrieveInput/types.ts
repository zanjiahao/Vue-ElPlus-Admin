/* retrieveInput */

export type Ingredient = 'showFields' | 'showValue' | 'showColon' | 'showContinue'

// 可选字段列表类型
export interface ValueItemType {
  fieldType: string
  valueMap: any[]
}

export interface InputData extends ValueItemType {
  fieldName: string
}

// 检索输入组件初始化相关类型
export interface RetrieveInitDataType {
  tooltipContent: string // 规则提示
  separator: RegExp // 区分查询语句条件
  retrievedContent: string // 检索关键字
  inputElement: any // 输入框 dom 元素
  shouldHandleBlur: boolean // blur 时是否触发检索
  historyContent: string // 记录修改前输入框文本, 用于键盘监听处理
  placeholderText: string // 提示文案
  showDropdown: boolean
  activeIndex: number // 键盘上下键对应的行
  isKeyBoardPermit: boolean // 键盘开关
  isKeywordPermit: boolean // 键盘关键字[],"",''补全开关
  inputDebounce: any // 防抖
  showFields: boolean // 显示下拉可选字段
  showValue: boolean // 显示下拉可选值
  showColon: boolean // : :*
  showContinue: boolean // AND OR
  originFieldList: string[] // 所有字段列表 ['name', 'age']
  continueList: any[] // 操作符
  colonList: any[] // : | :* 冒号相关数组
  fieldList: any[] // 下拉 key 字段列表
  valueList: any[] // 下拉 值 字段列表
}
