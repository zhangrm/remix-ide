'use strict'

var yo = require('yo-yo')
var css = require('./universal-dapp-styles')

class MultiParamManagerTest {
  
  constructor (inputs, lookupOnly, clickMultiCallBack) {
    this.clickMultiCallBack = clickMultiCallBack
    this.inputs = inputs
    this.lookupOnly = lookupOnly
  }

  switchMethodViewOn () {
    this.parentNode.style.display = 'none'
    var singleCont = this.parentNode.parentNode
    singleCont.querySelector(`.${css.contractActionsContainerMulti}`).style.display = 'block'
  }
  switchMethodViewOff () {
    // don't use sibling
    this.parentNode.parentNode.style.display = 'none'
    this.parentNode.parentNode.previousSibling.style.display = 'flex'
  }

  createMultiFields (inputs) {
    if (inputs) {
      return yo`<div>
        ${inputs.map(function (inp) {
          return yo`<div class="${css.multiArg}"><label for="${inp.name}"> ${inp.name}: </label><input placeholder="${inp.type}" id="${inp.name}" title="${inp.name}"></div>`
        })}
      </div>`
    }
  }

  clickButton () {
    this.clickMultiCallBack(argArr)
  }

  clickMultiButton () {
    var argArr = []
    this.inputs.map(function (inp) {
      argArr.push(document.getElementById(inp.name).value)
    })
    this.clickMultiCallBack(argArr)
  }
  render () {
    return "<div><h1>HOHOHO</h1></div>"
  }
}

module.exports = MultiParamManagerTest
