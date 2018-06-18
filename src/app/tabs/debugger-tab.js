var yo = require('yo-yo')
var csjs = require('csjs-inject')

var registry = require('../../global/registry')
var styles = require('../ui/styles-guide/theme-chooser').chooser()

module.exports = class DebuggerTab {
  constructor (opts = { api: {}, events: {} }) {
    const self = this
    var {event} = registry.put({api: this, name: 'debugger-tab'})
    self.event = event
    self._api = opts.api
    self._events = opts.events
    self._view = { el: null }
    self.data = {}
    self._components = {}
  }
  render () {
    const self = this
    if (self._view.el) return self._view.el
    self._view.el = yo`
      <div class="${css.debuggerTabView} "id="debugView">
        <div id="debugger" class="${css.debugger}"></div>
      </div>`
    return self._view.el
  }
}
const css = csjs`
  .debuggerTabView {
    padding: 2%;
  }
  .debugger {
    margin-bottom: 1%;
    ${styles.rightPanel.debuggerTab.box_Debugger}
  }
`
