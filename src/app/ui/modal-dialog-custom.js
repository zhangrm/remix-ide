var modal = require('./modaldialog.js')
var yo = require('yo-yo')
module.exports = {
  alert: function (text) {
    modal('', yo`<div>${text}</div>`, null, { label: null })
  },
  prompt: function (title, text, callback) {
    modal(title, yo`<div>${text} <div><input type='text' name='prompt_text'></div></div>`, null, null)
    var okPromptDiv = document.getElementById('modal-footer-ok')
    function okPromptListener () {
       // return "OK we've got a hit!"
      // console.log('hit on okPorpt listner')
      callback('callback ' + text)
    }
    okPromptDiv.addEventListener('click', okPromptListener)
  },
  confirm: function (title, text) {
    modal(title, yo`<div>confirmmm ${text} ho ho</div>`, null, null)
  }

}
