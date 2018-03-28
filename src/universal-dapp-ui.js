/* global */
'use strict'

var $ = require('jquery')
var yo = require('yo-yo')
var helper = require('./lib/helper')
var copyToClipboard = require('./app/ui/copy-to-clipboard')
var css = require('./universal-dapp-styles')
var MultiParamManager = require('./MultiParamManager')

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
    var close = yo`<div class="${css.udappClose}" onclick=${remove}><i class="${css.closeIcon} fa fa-close" aria-hidden='true'></i></div>`
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

  // should outputOverride assigned in the class or here?
  var outputOverride = yo`<div class=${css.value}></div>`
  // is title assigned in the class or here?
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

  // does this function go to the class?
  // do I need to change args to a argArr
  // do I need to change that in the udapp.call
  // I need to look at udapp.call!!!
  function clickButton () {
    self.udapp.call(true, args, inputField.value, lookupOnly, (decoded) => {
      outputOverride.innerHTML = ''
      outputOverride.appendChild(decoded)
    })
  }

  var contractProperty = yo`<div class="${css.contractProperty} ${css.buttonsContainer}"></div>`
  var contractActions = yo`<div class="${css.contractActions}" ></div>`
  var contractActionsContainer = yo`<div class="${css.contractActionsContainer}" ></div>`

  contractProperty.appendChild(contractActions)
  contractActions.appendChild(contractActionsContainer)

  if (inputs.length) {
    // here's where to put the part about the multi-params
// the callback it to handle the

    var multiParamManager = new MultiParamManager(inputs, title, lookupOnly, (arg) => {
      // check if its for a the multiview or not with the isArray
      if (arg.isArray()) {
        // SELF!!!!
        self.udapp.call(true, arg, inputField.value, lookupOnly, (decoded) => {
          outputOverride.innerHTML = ''
          outputOverride.appendChild(decoded)
        })
        this.parentNode.parentNode.parentNode.style.display = 'none'
        this.parentNode.parentNode.parentNode.parentNode.firstChild.style.display = 'flex'
      } else {
        // arg is a string
        // previously it had been like this - but that looks just like the self.udapp.call line looks the same ... probs???
        // self.udapp.call(true, args, inputField.value, lookupOnly, (decoded) => {
        // outputOverride.innerHTML = ''
        // outputOverride.appendChild(decoded)
      }
    })

    multiParamManager.render(contractActionsContainer)

    // but there is the callback function that needs to have the info in it

    // or this instance will have the scaffolding and then the biz logic is here - so what gets returned is the html but when you click on submit or anything that is done here...
    // So this means that the class just needs to attach all the html and return that and then what gets returned from the constructor? is then appendChilded into the div.
    // Or does this need to be done in a callback.
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
