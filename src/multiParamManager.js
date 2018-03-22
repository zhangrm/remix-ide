'use strict'

var yo = require('yo-yo')
var css = require('./universal-dapp-styles')

// it should return the div'ed up elements and it should take in
// or should it do all the logic?

// render params should be all the elements above.

class MultiParamManager {
        // try making the render work.
  // constructor (api = {}, events = {}, opts = {}) {
  // var inputs
  // var // so what to do about the lack of defined:
// button
// clickMultiButton
// switchMethodViewOff
// title
// inputField
// createMultiFields
// DOMElement
  constructor (inputs, lookupOnly, clickMultiCallBack) {
    this.clickMultiCallBack = clickMultiCallBack

    this.inputs = inputs
    // this.udapp = udapp
    this.lookupOnly = lookupOnly
    // this.outputOverride = outputOverride
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

  render (params) {
    var contractActionsContainerSingle = yo`<div class="${css.contractActionsContainerSingle}" ><i class="fa fa-expand ${css.methCaret}" onclick=${switchMethodViewOn}></i></div>`

    var contractActionsContainerMulti = yo`<div class="${css.contractActionsContainerMulti}" ></div>`
    var contractActionsContainerMultiInner = yo`<div class="${css.contractActionsContainerMultiInner}" ></div>`
    var contractActionsMultiInnerTitle = yo`<div onclick=${switchMethodViewOff} class="${css.multiHeader}"><i class='fa fa-compress ${css.methCaret}'></i> ${title}</div>`
    var buttonMulti = yo`<button onclick=${clickMultiButton} class="${css.instanceButton}"></button>`

    buttonMulti.classList.add(css.call)
    buttonMulti.setAttribute('title', title)
    buttonMulti.innerHTML = title

    // attach containing div
    contractActions.appendChild(contractActionsContainer)

    contractActionsContainer.appendChild(contractActionsContainerSingle)
    // put in expand button and field
    contractActionsContainerSingle.appendChild(button)
    contractActionsContainerSingle.appendChild(button)
    contractActionsContainerSingle.appendChild(inputField)

    contractActionsContainer.appendChild(contractActionsContainerMulti)
    contractActionsContainerMulti.appendChild(contractActionsContainerMultiInner)
    contractActionsContainerMultiInner.appendChild(contractActionsMultiInnerTitle)

    var contractMethodFields = createMultiFields(this.inputs)

    contractActionsContainerMultiInner.appendChild(contractMethodFields)

    var contractMethodFieldsSubmit = yo`<div class="${css.group} ${css.multiArg}" ></div>`
    contractActionsContainerMultiInner.appendChild(contractMethodFieldsSubmit)
    contractMethodFieldsSubmit.appendChild(buttonMulti)
  // update this DOMElement so it returns all the html - and this gets attached to the its parent element in each case - right?!
    return DOMElement
	}

    // public value () { 
    //
    // 	return JSON like :  {"uint256 p" : "123", "uint256 pp" : "12322" }
    // }

    // encodedValue () {
        // // after submit
        // // return encoded val of all
        // // var x = value ()
        // ethereumjs.abi.encode..
        // return 0xabcder
    // }
}
