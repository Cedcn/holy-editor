import 'deku/lib/element'
import 'deku/lib/app'

import HolyEditor from './core/holy-editor'

// toolbar
import title from './extension/tools/title'
import bold from './extension/tools/bold'
import italic from './extension/tools/italic'
import underline from './extension/tools/underline'
import strikeThrough from './extension/tools/strike_through'
import foreColor from './extension/tools/fore_color'
import backColor from './extension/tools/back_color'
import modules from './extension/tools/modules'
import orderList from './extension/tools/order_list'
import unorderList from './extension/tools/unorder_list'
import image from './extension/tools/image'
import code from './extension/tools/code'
import quote from './extension/tools/quote'
import emoji from './extension/tools/emoji'
import justifyFull from './extension/tools/justify_full'
import justifyCenter from './extension/tools/justify_center'
import justifyLeft from './extension/tools/justify_left'
import justifyRight from './extension/tools/justify_right'
import link from './extension/tools/link'
import html from './extension/tools/html'
import iframe from './extension/tools/iframe'
import convert from './extension/tools/convert'
import fontSize from './extension/tools/font_size'
import fullscreen from './extension/tools/fullscreen'
import video from './extension/tools/video'
import removeFormat from './extension/tools/remove_format'

// theme
import tacitly from './extension/themes/tacitly'

HolyEditor.register('tools', title)
HolyEditor.register('tools', bold)
HolyEditor.register('tools', italic)
HolyEditor.register('tools', underline)
HolyEditor.register('tools', strikeThrough)
HolyEditor.register('tools', foreColor)
HolyEditor.register('tools', backColor)
HolyEditor.register('tools', modules)
HolyEditor.register('tools', orderList)
HolyEditor.register('tools', unorderList)
HolyEditor.register('tools', image)
HolyEditor.register('tools', code)
HolyEditor.register('tools', quote)
HolyEditor.register('tools', emoji)
HolyEditor.register('tools', justifyFull)
HolyEditor.register('tools', justifyCenter)
HolyEditor.register('tools', justifyLeft)
HolyEditor.register('tools', justifyRight)
HolyEditor.register('tools', link)
HolyEditor.register('tools', html)
HolyEditor.register('tools', iframe)
HolyEditor.register('tools', convert)
HolyEditor.register('tools', fontSize)
HolyEditor.register('tools', fullscreen)
HolyEditor.register('tools', video)
HolyEditor.register('tools', removeFormat)

HolyEditor.register('themes', tacitly)

export default HolyEditor
