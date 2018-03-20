/* global */
'use strict'

var $ = require('jquery')
var yo = require('yo-yo')
var helper = require('./lib/helper')
var copyToClipboard = require('./app/ui/copy-to-clipboard')
var css = require('./universal-dapp-styles')

/*
  trigger debugRequested
*/
function UniversalDAppUI (udapp, opts = {}) {
  var self = this
  this.udapp = udapp

  self.el = yo`<div class=${css.udapp}></div>`
}

UniversalDAppUI.prototype.reset = function () {
  this.el.innerHTML = ''
}

UniversalDAppUI.prototype.renderInstance = function (contract, address, contractName) {
  var abi = this.udapp.getABI(contract)
  return this.renderInstanceFromABI(abi, address, contractName)
}

// TODO this function was named before "appendChild".
// this will render an instance: contract name, contract address, and all the public functions
// basically this has to be called for the "atAddress" (line 393) and when a contract creation succeed
// this returns a DOM element
UniversalDAppUI.prototype.renderInstanceFromABI = function (contractABI, address, contractName) {
  var self = this

  function remove () { instance.remove() }

  address = (address.slice(0, 2) === '0x' ? '' : '0x') + address.toString('hex')
  var instance = yo`<div class="instance ${css.instance}" id="instance${address}"></div>`
  var context = self.udapp.context()

  var shortAddress = helper.shortenAddress(address)
  var title = yo`<div class="${css.title}" onclick=${toggleClass}>
    <div class="${css.titleText}"> ${contractName} at ${shortAddress} (${context}) </div>
    ${copyToClipboard(() => address)}
  </div>`

  if (self.udapp.removable_instances) {
    var close = yo`<div class="${css.udappClose}" onclick=${remove}><i class="${css.closeIcon} fa fa-close" aria-hidden="true"></i></div>`
    instance.append(close)
  }

  function toggleClass () {
    $(instance).toggleClass(`${css.hidesub}`)
  }

  instance.appendChild(title)

  // Add the fallback function
  var fallback = self.udapp.getFallbackInterface(contractABI)
  if (fallback) {
    instance.appendChild(this.getCallButton({
      funABI: fallback,
      address: address,
      contractAbi: contractABI,
      contractName: contractName
    }))
  }

  $.each(contractABI, (i, funABI) => {
    if (funABI.type !== 'function') {
      return
    }
    // @todo getData cannot be used with overloaded functions
    instance.appendChild(this.getCallButton({
      funABI: funABI,
      address: address,
      contractAbi: contractABI,
      contractName: contractName
    }))
  })

  return instance
}

// TODO this is used by renderInstance when a new instance is displayed.
// this returns a DOM element.
UniversalDAppUI.prototype.getCallButton = function (args) {
  var self = this
  // args.funABI, args.address [fun only]
  // args.contractName [constr only]
  var lookupOnly = args.funABI.constant

  var inputs = self.udapp.getInputs(args.funABI)
  var inputField = yo`<input></input>`
  inputField.setAttribute('placeholder', inputs)
  inputField.setAttribute('title', inputs)

  var outputOverride = yo`<div class=${css.value}></div>`

  var title
  if (args.funABI.name) {
    title = args.funABI.name
  } else {
    title = '(fallback)'
  }

  var button = yo`<button onclick=${clickButton} class="${css.instanceButton}"></button>`
  button.classList.add(css.call)
  button.setAttribute('title', title)
  button.innerHTML = title

  function clickButton () {
    self.udapp.call(true, args, inputField.value, lookupOnly, (decoded) => {
      outputOverride.innerHTML = ''
      outputOverride.appendChild(decoded)
    })
  }

  function clickMultiButton () {
    var argArr = []
    args.funABI.inputs.map(function (inp) {
      argArr.push(document.getElementById(inp.name).value)
    })
    self.udapp.call(true, argArr, inputField.value, lookupOnly, (decoded) => {
      outputOverride.innerHTML = ''
      outputOverride.appendChild(decoded)
    })

    this.parentNode.parentNode.parentNode.style.display = 'none'
    this.parentNode.parentNode.parentNode.parentNode.firstChild.style.display = 'flex'
  }

  var contractProperty = yo`<div class="${css.contractProperty} ${css.buttonsContainer}"></div>`
  var contractActions = yo`<div class="${css.contractActions}" ></div>`
  var contractActionsContainer = yo`<div class="${css.contractActionsContainer}" ></div>`

  function switchMethodViewOn () {
    this.parentNode.style.display = 'none'
    var singleCont = this.parentNode.parentNode
    singleCont.querySelector(`.${css.contractActionsContainerMulti}`).style.display = 'block'
  }
  function switchMethodViewOff () {
    // don't use sibling
    this.parentNode.parentNode.style.display = 'none'
    this.parentNode.parentNode.previousSibling.style.display = 'flex'
  }

  function createMultiFields () {
    if (args.funABI.inputs) {
      return yo`<div>
        ${args.funABI.inputs.map(function (inp) {
          return yo`<div class="${css.multiArg}"><label for="${inp.name}"> ${inp.name}: </label><input placeholder="${inp.type}" id="${inp.name}" title="${inp.name}"></div>`
        })}
      </div>`
    }
  }

  contractProperty.appendChild(contractActions)
  if (inputs.length) {
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

    var contractMethodFields = createMultiFields()

    contractActionsContainerMultiInner.appendChild(contractMethodFields)

    var contractMethodFieldsSubmit = yo`<div class="${css.group} ${css.multiArg}" ></div>`
    contractActionsContainerMultiInner.appendChild(contractMethodFieldsSubmit)
    contractMethodFieldsSubmit.appendChild(buttonMulti)
  } else {
    // no containing div - its a lookup with no args
    contractActions.appendChild(button)
  }
  if (lookupOnly) {
    contractProperty.appendChild(outputOverride)
  }

  if (lookupOnly) {
    contractProperty.classList.add(css.constant)
    button.setAttribute('title', (title + ' - call'))
  }

  if (args.funABI.inputs && args.funABI.inputs.length > 0) {
    contractProperty.classList.add(css.hasArgs)
  }

  if (args.funABI.payable === true) {
    contractProperty.classList.add(css.payable)
    button.setAttribute('title', (title + ' - transact (payable)'))
  }

  if (!lookupOnly && args.funABI.payable === false) {
    button.setAttribute('title', (title + ' - transact (not payable)'))
  }

  return contractProperty
}

module.exports = UniversalDAppUI
