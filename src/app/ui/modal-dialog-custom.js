var modal = require('./modaldialog.js')
var yo = require('yo-yo')
module.exports = {
  alert: function (text) {
    modal('', yo`<div>${text}</div>`, null, { label: null })
  },
  prompt: function (title, text, ok, cancel) {
    modal(title,
      yo`<div>${text}<div><input type='text' name='prompt_text' id='prompt_text'></div></div>`, {
        fn: () => { ok(document.getElementById('prompt_text').value) }
      },
      {
        fn: () => { cancel() }
      }
    )
  },
  confirm: function (title, text, ok, cancel) {
    modal(title, yo`<div>${text}</div>`, ok, cancel)
  }
}
