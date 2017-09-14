import Bold from './templete'

const name = 'bold'
const sciprt = ({ el, widget, styles }) => {
  const $selector = el.$toolbars.find(styles[`tool--${name}`].selector)
  const menuPoint = $selector.find('#menu-point').get(0)
  const modalPoint = $selector.find('#modal-point').get(0)

  const modal = new widget.Modal(modalPoint)
  const s = new widget.Menu(menuPoint, {
    icon: 'bold',
    click: () => modal.open()
  })
}

const bold = {
  name,
  Tpl: Bold,
  run: sciprt
}

export default bold
