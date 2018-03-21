'use strict'

class MultiParamManager {
	// try making the render work.
	// constructor (api = {}, events = {}, opts = {}) {
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

	    var contractMethodFields = createMultiFields()

	    contractActionsContainerMultiInner.appendChild(contractMethodFields)

	    var contractMethodFieldsSubmit = yo`<div class="${css.group} ${css.multiArg}" ></div>`
	    contractActionsContainerMultiInner.appendChild(contractMethodFieldsSubmit)
	    contractMethodFieldsSubmit.appendChild(buttonMulti)

		return DOMElement
	}

	public value () { 
		// 
		return JSON like :  {"uint256 p" : "123", "uint256 pp" : "12322" }
	}

	encodedValue () {
		// after submit
		// return encoded val of all
		// var x = value ()
		ethereumjs.abi.encode..
		return 0xabcder
	}
}