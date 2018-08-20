'use strict'
var CodeListView = require('./CodeListView')
var CalldataPanel = require('./CalldataPanel')
var MemoryPanel = require('./MemoryPanel')
var CallstackPanel = require('./CallstackPanel')
var StackPanel = require('./StackPanel')
var StoragePanel = require('./StoragePanel')
var FullStoragesChangesPanel = require('./FullStoragesChanges')
var StepDetail = require('./StepDetail')
var DropdownPanel = require('./DropdownPanel')
var SolidityState = require('./SolidityState')
var SolidityLocals = require('./SolidityLocals')
var remixDebug = require('remix-debug')
var StorageResolver = remixDebug.storage.StorageResolver
var yo = require('yo-yo')

function VmDebugger (_parentUI, _traceManager, _codeManager, _solidityProxy, _callTree) {
  let _parent = _parentUI.debugger
  var self = this
  this.view
  this.asmCode = new CodeListView(_parent, _codeManager)
  this.stackPanel = new StackPanel(_parentUI, _traceManager)
  this.storagePanel = new StoragePanel(_parentUI, _traceManager)
  this.memoryPanel = new MemoryPanel(_parentUI, _traceManager)
  this.calldataPanel = new CalldataPanel(_parentUI, _traceManager)
  this.callstackPanel = new CallstackPanel(_parentUI, _traceManager)
  this.stepDetail = new StepDetail(_parentUI, _traceManager)
  this.solidityState = new SolidityState(_parentUI, _traceManager, _codeManager, _solidityProxy)
  this.solidityLocals = new SolidityLocals(_parentUI, _traceManager, _callTree)

  /* Return values - */
  this.returnValuesPanel = new DropdownPanel('Return Value', {json: true})
  this.returnValuesPanel.data = {}
  _parentUI.event.register('indexChanged', this.returnValuesPanel, function (index) {
    if (!self.view) return
    var innerself = this
    _traceManager.getReturnValue(index, function (error, returnValue) {
      if (error) {
        innerself.update([error])
      } else if (_parentUI.currentStepIndex === index) {
        innerself.update([returnValue])
      }
    })
  })
  /* Return values - */

  this.fullStoragesChangesPanel = new FullStoragesChangesPanel(_parentUI, _traceManager)

  _parent.event.register('newTraceLoaded', this, function () {
    if (!self.view) return
    var storageResolver = new StorageResolver({web3: _parent.web3})
    self.storagePanel.storageResolver = storageResolver
    self.solidityState.storageResolver = storageResolver
    self.solidityLocals.storageResolver = storageResolver
    self.fullStoragesChangesPanel.storageResolver = storageResolver
  })
  _parent.callTree.event.register('callTreeReady', () => {
    if (!self.view) return
    if (_parent.callTree.reducedTrace.length) {
      self.solidityLocals.basicPanel.show()
      self.solidityState.basicPanel.show()
    } else {
      self.asmCode.basicPanel.show()
    }
  })
}

VmDebugger.prototype.remove = function () {
  // used to stop listenning on event. bad and should be "refactored"
  this.view = null
}

VmDebugger.prototype.render = function () {
  var view = yo`<div id='vmdebugger'>
        <div>
            ${this.asmCode.render()}
            ${this.solidityLocals.render()}
            ${this.solidityState.render()}
            ${this.stepDetail.render()}
            ${this.stackPanel.render()}
            ${this.storagePanel.render()}
            ${this.memoryPanel.render()}
            ${this.calldataPanel.render()}
            ${this.callstackPanel.render()}
            ${this.returnValuesPanel.render()}
            ${this.fullStoragesChangesPanel.render()}
          </div>
      </div>`
  if (!this.view) {
    this.view = view
  }
  return view
}

module.exports = VmDebugger
