var yo = require('yo-yo')
var csjs = require('csjs-inject')
var registry = require('../../global/registry')

module.exports = class AnalysisTab {
  constructor (opts = { api: {}, events: {} }) {
    const self = this
    var {event} = registry.put({api: this, name: 'analysis-tab'})
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
      <div class="${css.analysisTabView} "id="staticanalysisView"></div>`
    return self._view.el
  }
}
const css = csjs`
  .analysisTabView {
    padding: 2%;
    padding-bottom: 3em;
    display: flex;
    flex-direction: column;
  }
`
