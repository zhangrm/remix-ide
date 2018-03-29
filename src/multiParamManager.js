'use strict'

var yo = require('yo-yo')
var css = require('./universal-dapp-styles')

class MultiParamManager {
  
  /**
    * run the list of records
    *
    * @param {Array} inputSetup
    * @param {bool} lookupOnly
    * @param {Object} funABI
    * @param {Function} clickMultiCallBack
    *
    */
  constructor (inputSetup, lookupOnly, funABI, clickCallBack) {
    this.inputSetup = inputSetup
    this.lookupOnly = lookupOnly
    this.funABI = funABI
    this.clickCallBack = clickCallBack
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

  createMultiFields () {
    if (this.inputs) {
      return yo`<div>
        ${this.inputs.map(function (inp) {
          return yo`<div class="${css.multiArg}"><label for="${inp.name}"> ${inp.name}: </label><input placeholder="${inp.type}" id="${inp.name}" title="${inp.name}"></div>`
        })}
      </div>`
    }
  }

  render () {

    
    var title
    if (this.funABI.name) {
      title = this.funABI.name
    } else {
      title = '(fallback)'
    }
    
    var inputField = yo`<input></input>`
    inputField.setAttribute('placeholder', '')
    inputField.setAttribute('title', '')
    
    var onClick = () => {
       this.clickCallBack(this.funABI.inputs, inputField.value)
    }

    var contractActionsContainerSingle = yo`<div class="${css.contractActionsContainerSingle}" ><i class="fa fa-expand ${css.methCaret}" onclick=${this.switchMethodViewOn} title=${title} ></i><button onclick=${() => { onClick() }} class="${css.instanceButton} ${css.call}">${title}</button>${inputField}</div>`

    var multiOnClick = () => {
      var valArray = contractActionsContainerMultiInner.querySelectorAll('input').value
      var ret = []
      for (var el in valArray) {
        ret.push(el.value)
      }
      this.clickCallBack(this.inputs, ret)
    }

    var button = yo`<button onclick=${() => { multiOnClick() }} class="${css.instanceButton}"></button>`
    var contractActionsContainerMulti = yo`<div class="${css.contractActionsContainerMulti}" >
      <div class="${css.contractActionsContainerMultiInner}" >
        <div onclick=${this.switchMethodViewOff} class="${css.multiHeader}">
          <i class='fa fa-compress ${css.methCaret}'></i> ${this.title}
        </div>
        ${this.createMultiFields()}
        <div class="${css.group} ${css.multiArg}" >
          ${button}
        </div>
      </div>
    </div>`
 
    if (this.lookupOnly) {
      // contractProperty.appendChild(outputOverride)
    }

    if (this.lookupOnly) {
      // contractProperty.classList.add(css.constant)
      // buttonMulti.setAttribute('title', (title + ' - call'))
    }

    if (this.funABI.inputs && this.funABI.inputs.length > 0) {
      // contractProperty.classList.add(css.hasArgs)
    }

    if (this.funABI.payable === true) {
      // contractProperty.classList.add(css.payable)
      // buttonMulti.setAttribute('title', (title + ' - transact (payable)'))
    }

    if (!this.lookupOnly && this.funABI.payable === false) {
      // buttonMulti.setAttribute('title', (title + ' - transact (not payable)'))
    }

    // contractActionsContainer.appendChild(contractActionsContainerSingle)
    // contractActionsContainer.appendChild(contractActionsContainerMulti)
    // return contractActionsContainer
    return yo`<div>${contractActionsContainerSingle} ${contractActionsContainerMulti}</div>`
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
