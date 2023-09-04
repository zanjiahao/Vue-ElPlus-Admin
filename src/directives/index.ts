import { App, Directive } from 'vue'
import waterMarker from './modules/waterMarker'
import debounce from './modules/debounce'
import throttle from './modules/throttle'

const directivesList: { [key: string]: Directive } = {
  waterMarker,
  debounce,
  throttle
}

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach(key => {
      app.directive(key, directivesList[key])
    })
  }
}

export default directives
