var modal = require('./modaldialog.js')
var yo = require('yo-yo')
module.exports = {
  alert: function (text) {
    modal('', yo`<div>${text}</div>`, null, { label: null })
  },
  prompt: function (title, text, ok, cancel) {
    modal(title,
      yo`<div>${text}<div><input type='text' name='prompt_text' id='prompt_text'></div></div>`,
      {
        fn: () => { if (typeof ok === 'function') ok(document.getElementById('prompt_text').value) }
      },
      {
        fn: () => { if (typeof cancel === 'function') cancel() }
      }
    )
  },
  confirm: function (title, text, ok, cancel) {
    modal(title, yo`<div>${text}</div>`,
      {
        fn: () => { if (typeof ok === 'function') ok() }
      },
      {
        fn: () => { if (typeof cancel === 'function') cancel() }
      }
    )
  }
}
