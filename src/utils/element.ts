import { ElMessage, ElMessageBox } from 'element-plus'
/**
 * elConfirm 函数: 用于统一风格无标题通知弹框
 * configOption 自定义相关配置:
 *    1. content 为提示内容
 *    2. confirmButtonText 为确认的操作类型 例如：确认 | 删除 | 重试
 *    2. cancelButtonText  为取消的操作类型 例如：取消 | cancel
 * callbackThen 成功的回调函数
 * callbackCatch 失败的回调函数
 */
export function elConfirm(configOptions: ConfirmOption, callbackThen?: () => any, callbackCatch?: () => any) {
  const { content, type = 'warning', confirmButtonText = '确定', cancelButtonText = '取消' } = configOptions
  ElMessageBox.confirm(content, '', {
    type: type || 'warning',
    confirmButtonText,
    cancelButtonText,
    showClose: false,
    customClass: 'untitled-confirm',
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        try {
          if (callbackThen && typeof callbackThen === 'function') {
            await callbackThen()
          } else {
            ElMessage({ type: 'success', message: `${confirmButtonText || '操作'}成功` })
          }
        } catch (error) {
          callbackCatch && typeof callbackCatch === 'function' && callbackCatch()
        } finally {
          instance.confirmButtonLoading = false
          done()
        }
      } else {
        done()
      }
    }
  }).catch(() => {
    // 只有取消情况下会触发这里
    ElMessage({ type: 'info', message: '已取消操作' })
  })
}

/*
 * elAlert 方法: 通知弹框, 可自定义Content结构体内容
 * config 自定义相关配置:
 *  1. type 类型
 *  2. title 默认为无标题弹框
 *  3. content 为提示内容
 *  4. childContent 为提示子内容，isDefaultHtml 关闭情况下不可用
 *  5. isDefaultHtml // 默认HTML方式，关闭后可配合 customClass 属性进行自定义 html 内容
 *  6. showClose // 显示右上角关闭按钮
 *  7. showCancelButton // 显示取消按钮
 *  8. customClass // 自定义样式类名
 * callbackThen 成功的回调函数
 * callbackCatch 失败的回调函数
 */
export function elAlert(configOptions: AlertOption, callbackThen?: () => any, callbackCatch?: () => any) {
  const {
    type, // 类型
    title = '',
    content,
    childContent = undefined, // 子内容，只能在 isHtml 为 true 模式下使用(注意：isHtml为true情况下不可用)
    isDefaultHtml = true,
    showClose = false,
    showCancelButton = true,
    cancelButtonText = '取消',
    confirmButtonText = '确认',
    customClass = 'gl-cst-alert-style' // 可以不使用默认样式
  } = configOptions
  const defaultContent = `
    <div class='al-content'>
      <div class='al-text'>${content}</div>
      ${childContent ? `<div class='al-child-text'>${childContent}</div>` : ''}
    </div>
  `
  // isDefaultHtml为true的情况下直接使用content内容，例如：<div>父内容<div>子内容</div></div>，可配合自定义样式
  const cstContent = !isDefaultHtml ? content : defaultContent
  ElMessageBox.alert(cstContent, title, {
    type: type || 'warning',
    showClose, // 是否显示右上角关闭按钮
    showCancelButton, // 是否显示取消按钮
    dangerouslyUseHTMLString: true, // 容易导致 XSS 攻击, 永远不要将用户提交的内容赋值给 message 属性
    closeOnClickModal: false, // 是否点击遮罩可关闭弹框
    confirmButtonText,
    cancelButtonText,
    customClass,
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        try {
          if (callbackThen && typeof callbackThen === 'function') {
            await callbackThen()
          } else {
            ElMessage.success({ message: `${type || '操作'}成功` })
          }
        } catch (error) {
          callbackCatch && typeof callbackCatch === 'function' && callbackCatch()
        } finally {
          instance.confirmButtonLoading = false
          done()
        }
      } else {
        done()
      }
    }
  }).catch(() => {
    // 取消情况下会触发
    ElMessage({ type: 'info', message: '已取消操作' })
  })
}
