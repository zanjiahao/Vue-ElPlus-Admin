// TS声明文件(模块插件)-它可以用来扩展原有模块的类型
declare module 'vue3-json-viewer' {
  import { AllowedComponentProps, App, Component, ComponentCustomProps, VNodeProps } from 'vue'
  interface JsonViewerProps {
    value: Object | Array<any> | string | number | boolean //对象
    expanded: boolean //是否自动展开
    expandDepth: number //展开层级
    copyable: boolean | object //是否可复制
    sort: boolean //是否排序
    boxed: boolean //是否boxed
    theme: string //主题 dark | light
    previewMode: boolean //是否可复制
    timeformat: (value: any) => string
  }
  type JsonViewerType = JsonViewerProps & VNodeProps & AllowedComponentProps & ComponentCustomProps
  const JsonViewer: Component<JsonViewerType>
  export { JsonViewer }
  const def: { install: (app: App) => void }
  export default def
}
