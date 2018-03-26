'use strict'

var yo = require('yo-yo')
var css = require('./universal-dapp-styles')

class ClassTest {

  constructor (t1, t2) {
    this.t1 = t1
    this.t2 = t2
  }

  render () {
    return "<div><h1>HOHOHO</h1></div>"
  }
}

module.exports = ClassTest
