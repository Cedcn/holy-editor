import style from './iframe.scss'

import { getRange, setSelection, hasTagsOrInRange } from 'utils/selection'

const defaults = {
  tooltip: 'Iframe'
}

const sciprt = options => ({ el, widget, __S_, $selector, util }) => {
  const opts = Object.assign({}, defaults, options)
  const modal = new widget.Modal($selector, {
    panel: (
      <div class={__S_['iframe-panel']}>
        <div class={`${__S_['iframe-panel__url-wrap']} ${__S_['iframe-panel__filed']}`}>
          <h5>Iframe url  (Format: http://...)</h5>
          <input name="url" class={__S_['iframe-panel__url']} placeholder="http://..." />
        </div>
        <div class={`${__S_['iframe-panel__width-wrap']} ${__S_['iframe-panel__filed']}`}>
          <h5>宽度 (Unit: px)</h5>
          <input name="width" class={__S_['iframe-panel__width']} placeholder="默认" />
        </div>
        <div class={`${__S_['iframe-panel__height-wrap']} ${__S_['iframe-panel__filed']}`}>
          <h5>高度 (Unit: px)</h5>
          <input name="height" class={__S_['iframe-panel__height']} placeholder="默认" />
        </div>
        <div class={`${__S_['iframe-panel__submit-wrap']} ${__S_['iframe-panel__filed']}`}>
          <a class={__S_['u-submit']} href="javascript:;">确定</a>
        </div>
      </div>
    )
  })

  const menu = new widget.Menu($selector, {
    icon: 'iframe',
    tooltip: opts.tooltip,
    onMouseDown: e => {
      modal.open()
    }
  })

  const $submit = modal.$container.find(__S_['u-submit'].selector)

  const vars = {
    cacheRange: null
  }

  modal.on('open:before', () => {
    const range = getRange()
    if (range === null) return
    vars.cacheRange = range
  })

  modal.on('close:before', () => {
    setSelection(vars.cacheRange)
  })

  $submit.on('click', () => {
    const iframeUrl = modal.$container.find('input[name="url"]').val()
    const iframeWidth = modal.$container.find('input[name="width"]').val()
    const iframeHeight = modal.$container.find('input[name="height"]').val()

    if (iframeUrl === '') return
    modal.close()
    document.execCommand('insertHTML', false, `<iframe frameborder="0" src="${iframeUrl}" width="${iframeWidth}"  height="${iframeHeight}"/>`)

    //
    modal.$container.find('input').val('')
  })

  util.addSelectionChangeEvent((isInArea, range) => {
    if (isInArea) {
      util.toEnable(() => menu.enable())
    } else {
      util.toDisable(() => menu.disable())
    }

    if (isInArea) {
      if (hasTagsOrInRange(range, ['PRE', 'BLOCKQUOTE'])) {
        util.toDisable(() => menu.disable())
      }
    }
  })
}

const iframe = {
  name: 'iframe',
  run: sciprt,
  style
}

export default iframe
