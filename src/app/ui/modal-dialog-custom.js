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
        fn: () => { if (typeof ok.fn === 'function') ok.fn(document.getElementById('prompt_text').value) },
        label: ok.label
      },
      {
        fn: () => { if (typeof cancel.fn === 'function') cancel.fn() },
        label: cancel.label
      }
    )
  },
  confirm: function (title, text, ok, cancel) {
    modal(title, yo`<div>${text}</div>`,
      {
        fn: () => { if (typeof ok.fn === 'function') ok.fn() },
        label: ok.label
      },
      {
        fn: () => { if (typeof cancel.fn === 'function') cancel.fn() },
        label: cancel.label
      }
    )
  }
}
