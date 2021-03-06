import CodeMirror from 'codemirror'
import { getCss, noScope } from 'csjs'
import insertCss from 'insert-css'

import style from './html.scss'

import codemirrorCss from 'codemirror/lib/codemirror.css'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror-formatting'

import { getRange, setSelection } from 'utils/selection'

const huebeeStyles = noScope`${codemirrorCss} .CodeMirror { height: 100% }`

insertCss(getCss(huebeeStyles))

const defaults = {
  tooltip: '源代码'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)
  let code = null
  const panel = new widget.Modal($selector, {
    panel: (
      <div class={__S_['html-panel']}>
        <div class={__S_['html-panel__codemirror']} />
      </div>
    ),
    onMount () {
      const $mirror = this.$container.find(__S_['html-panel__codemirror'].selector)
      code = new CodeMirror($mirror.get(0), {
        value: '',
        lineNumbers: true,
        mode: 'text/html'
      })
    }
  })

  const menu = new widget.Menu($selector, {
    icon: 'html',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      panel.open()
    }
  })

  const vars = {
    cacheRange: null
  }

  const editCode = mirror => {
    el.$area.html(mirror.getValue())
  }

  panel.on('open:before', () => {
    const range = getRange()
    if (range === null) return
    vars.cacheRange = range
    code.setValue(el.$area.html())
    const totalLines = code.lineCount()
    code.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines })
    code.on('change', editCode)
  })

  panel.on('close:before', () => {
    code.off('change', editCode)
    setSelection(vars.cacheRange)
  })

  util.toEnable(() => menu.enable())
}

const html = {
  name: 'html',
  run: sciprt,
  style
}

export default html
