'use strict'

var yo = require('yo-yo')
var css = require('./universal-dapp-styles')

class MultiParamManager {
       
  constructor (inputs, lookupOnly) {
    this.inputs = inputs
    this.lookupOnly = lookupOnly
  }

  render () {
    return "wazzzap"
  }

  showit () {
    debugger
    return "hohohoho " + this.inputs
  }
}

module.exports = MultiParamManager
