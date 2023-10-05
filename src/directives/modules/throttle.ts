/*
  需求：防止按钮在短时间内被多次点击，使用节流函数限制规定时间内只能点击一次。
  
  使用：给 Dom 加上 v-throttle 及回调函数即可
  <button v-throttle="debounceClick">节流提交</button>
*/
import type { Directive, DirectiveBinding } from 'vue'
import { throttle as _throttle } from 'lodash'

interface ElType extends HTMLElement {
  __handleClick__: () => any
}
const throttle: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    if (typeof binding.value !== 'function') {
      throw 'callback must be a function'
    }
    el.__handleClick__ = _throttle(() => binding.value(), 1000)
    el.addEventListener('click', el.__handleClick__)
  },
  beforeUnmount(el: ElType) {
    if (el.__handleClick__) el.removeEventListener('click', el.__handleClick__)
  }
}

export default throttle
