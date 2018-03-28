'use strict'

var yo = require('yo-yo')
var css = require('./universal-dapp-styles')

class MultiParamManager {
  // constructor (api = {}, events = {}, opts = {}) {

  // DOMElement

  // inputs are the params for the function in the sol file
  // lookupOnly - is this a lookup a constant - or does it cost gas
  // outputOverride - is the value of a lookup that can be shown as a bit of json

  constructor (inputs, title, lookupOnly, clickMultiCallBack) {
    this.clickMultiCallBack = clickMultiCallBack
    this.inputs = inputs
    this.title = title
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

  // clickButton () {
  //   this.clickMultiCallBack(argArr)
  // }
// uncomment this:::
  // clickMultiButton () {
  //   // should this logic be done here or in the main file?
  //   var argArr = []
  //   this.inputs.map(function (inp) {
  //     argArr.push(document.getElementById(inp.name).value)
  //   })
  //   this.clickMultiCallBack(argArr)
  // }

  // function clickMultiButton () {
  //   var argArr = []
  //   args.funABI.inputs.map(function (inp) {
  //     argArr.push(document.getElementById(inp.name).value)
  //   })
  //   // !! so I'm using call on udapp previously I had been using on the fuction internalCall(true, argArr)
  //   // what are all the other args here for?
  //   self.udapp.call(true, argArr, inputField.value, lookupOnly, (decoded) => {
  //     outputOverride.innerHTML = ''
  //     outputOverride.appendChild(decoded)
  //   })
  //   // internalCall(true, argArr)

  //   this.parentNode.parentNode.parentNode.style.display = 'none'
  //   this.parentNode.parentNode.parentNode.parentNode.firstChild.style.display = 'flex'
  // }

  render (contractActionsContainer) {
    var contractActionsContainerSingle = yo`<div class="${css.contractActionsContainerSingle}" ><i class="fa fa-expand ${css.methCaret}" onclick=${this.switchMethodViewOn}></i></div>`

    var contractActionsContainerMulti = yo`<div class="${css.contractActionsContainerMulti}" ></div>`
    var contractActionsContainerMultiInner = yo`<div class="${css.contractActionsContainerMultiInner}" ></div>`
    var contractActionsMultiInnerTitle = yo`<div onclick=${this.switchMethodViewOff} class="${css.multiHeader}"><i class='fa fa-compress ${css.methCaret}'></i> ${this.title}</div>`
    var buttonMulti = yo`<button onclick=${this.clickMultiButton} class="${css.instanceButton}"></button>`

    // Here down
    // just copied it from universal-dapp-ui
    // var inputs = self.udapp.getInputs(args.funABI)
    var inputField = yo`<input></input>`
    inputField.setAttribute('placeholder', this.inputs)
    inputField.setAttribute('title', this.inputs)

    if (!this.title) {
      this.title = '(fallback)'
    }

    // is the button used in both the single situation and the multi?
    var button = yo`<button onclick=${this.clickButton} class="${css.instanceButton}"></button>`
    button.classList.add(css.call)
    button.setAttribute('title', this.title)
    button.innerHTML = this.title

    buttonMulti.classList.add(css.call)
    buttonMulti.setAttribute('title', this.title)
    buttonMulti.innerHTML = this.title
    // Here up copied from universal-dapp-ui

    contractActionsContainer.appendChild(contractActionsContainerSingle)
    // put in expand button and field
    contractActionsContainerSingle.appendChild(button)
    contractActionsContainerSingle.appendChild(button)
    contractActionsContainerSingle.appendChild(inputField)

    contractActionsContainer.appendChild(contractActionsContainerMulti)
    contractActionsContainerMulti.appendChild(contractActionsContainerMultiInner)
    contractActionsContainerMultiInner.appendChild(contractActionsMultiInnerTitle)

    var contractMethodFields = this.createMultiFields(this.inputs)

    contractActionsContainerMultiInner.appendChild(contractMethodFields)

    var contractMethodFieldsSubmit = yo`<div class="${css.group} ${css.multiArg}" ></div>`
    contractActionsContainerMultiInner.appendChild(contractMethodFieldsSubmit)
    contractMethodFieldsSubmit.appendChild(buttonMulti)
  // update this DOMElement so it returns all the html - and this gets attached to the its parent element in each case - right?!
    // return DOMElement
    // or or or ...
    // or when all this is done - just attach this div ( called...) to the parent div that is passed in as a param
  }

    // public value () {
    //
    //  return JSON like :  {"uint256 p" : "123", "uint256 pp" : "12322" }
    // }

    // encodedValue () {
        // // after submit
        // // return encoded val of all
        // // var x = value ()
        // ethereumjs.abi.encode..
        // return 0xabcder
    // }
}
module.exports = MultiParamManager
