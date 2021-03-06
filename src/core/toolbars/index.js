import Toolbars from './templete'
import { toCamelCase } from 'utils/common'
import flatten from 'lodash/flatten'
import util from '../util'

const sciprt = ({ tools, options, widget, el, __S_ }) => {
  flatten(tools).forEach(item => {
    const $selector = el.$toolbars.find(`#${__S_[`tool--${item.name}`].className}`)

    // run scripts
    item.run(options.tools[toCamelCase(item.name)])({
      widget,
      __S_,
      el,
      $selector,
      util: util({ el, __S_, $selector })
    })
  })
}

const toolbars = {
  Tpl: Toolbars,
  run: sciprt
}

export default toolbars
