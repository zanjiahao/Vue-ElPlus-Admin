/**
 * v-debounce
 * 按钮防抖指令，可自行扩展至input
 * 接收参数：function类型
 */
import type { Directive, DirectiveBinding } from 'vue'
import { debounce as _debounce } from 'lodash'

interface ElType extends HTMLElement {
  __handleClick__: () => any
}

const debounce: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    if (typeof binding.value !== 'function') {
      throw 'callback must be a function'
    }
    el.__handleClick__ = _debounce(() => binding.value(), 300)
    el.addEventListener('click', el.__handleClick__)
  },
  beforeUnmount(el: ElType) {
    if (el.__handleClick__) el.removeEventListener('click', el.__handleClick__)
  }
}

export default debounce
