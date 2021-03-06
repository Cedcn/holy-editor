import { mount } from 'utils/common'
import EvEmitter from 'ev-emitter'

const $body = $('html body')

const defaults = {
  panel: null,
  onMount: () => {}
}

class Modal extends EvEmitter {
  constructor ($selector, options) {
    super()
    this.options = Object.assign({}, defaults, options)
    this.__S_ = this.constructor.__S_

    const dom = (
      <section class={this.__S_['modal-container']} data-widget="modal">
        <div class={this.__S_['modal-content']}>
          {this.options.panel}
        </div>
        <div class={this.__S_['modal-mask']} />
      </section>
    )

    this.$container = mount($selector, dom)
    this.options.onMount.call(this)

    this.$container.css('display', 'none')
    const $mask = this.$container.find(this.__S_['modal-mask'].selector)

    let isOpen = false

    this.open = cb => {
      if (isOpen) return
      isOpen = true
      this.$container.css('display', 'block')
      $body.addClass(this.__S_['open-modal'].className)
      this.emitEvent('open:before')

      $(document).on('keydown', this.escCloseModal)

      const openAnima = setTimeout(() => {
        this.$container.addClass(this.__S_['modal-show'].className)
        clearTimeout(openAnima)
      }, 10)

      this.emitEvent('open:after')
      if (typeof cb === 'function') cb()
    }

    this.close = cb => {
      if (!isOpen) return
      isOpen = false
      this.emitEvent('close:before')
      this.$container.removeClass(this.__S_['modal-show'].className)
      $body.removeClass(this.__S_['open-modal'].className)
      $(document).off('keydown', this.escCloseModal)

      const closeAnima = setTimeout(() => {
        this.$container.css('display', 'none')
        this.emitEvent('close:after')
        clearTimeout(closeAnima)
      }, 300)

      if (typeof cb === 'function') cb()
    }

    $mask.on('mousedown', e => {
      e.preventDefault()
      e.stopPropagation()
      if (e.which === 1) this.close()
    })
  }

  escCloseModal = e => {
    if (e.which === 27) this.close()
  }
}

export default Modal
