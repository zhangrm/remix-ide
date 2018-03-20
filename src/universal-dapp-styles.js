var csjs = require('csjs-inject')
var styleGuide = require('./app/ui/styles-guide/theme-chooser')
var styles = styleGuide.chooser()

var css = csjs`
  .instanceTitleContainer {
    display: flex;
    align-items: center;
  }
  .title {
    ${styles.rightPanel.runTab.titlebox_RunTab}
    display: flex;
    justify-content: end;
    align-items: center;
    font-size: 11px;
    height: 30px;
    width: 97%;
    overflow: hidden;
    word-break: break-word;
    line-height: initial;
    overflow: visible;
  }
  .titleLine {
    display: flex;
    align-items: baseline;
  }
  .titleText {
    margin-right: 1em;
    word-break: break-word;
    min-width: 230px;
  }

  .title .copy {
    color: ${styles.rightPanel.runTab.icon_AltColor_Instance_CopyToClipboard};
  }
  .instance {
    ${styles.rightPanel.runTab.box_Instance};
    margin-bottom: 10px;
    padding: 10px 15px 15px 15px;
    position: relative;
    overflow: visible;
  }
  .instance .title:before {
    content: "\\25BE";
    margin-right: 5%;
  }
  .instance.hidesub .title:before {
    content: "\\25B8";
    margin-right: 5%;
  }
  .instance.hidesub > * {
      display: none;
  }
  .instance.hidesub .title {
      display: flex;
  }
  .instance.hidesub .udappClose {
      display: flex;
  }
  .methCaret {
    margin-right: 5px;
    cursor: pointer;
    font-size: 12px;
  }
  .group:after {
    content: "";
    display: table;
    clear: both;
  }
  .buttonsContainer {
    margin-top: 2%;
    display: flex;
    overflow: hidden;
  }
  .contractActions {
    // display: flex;
  }
  .instanceButton {}
  .closeIcon {
    font-size: 12px;
    cursor: pointer;
  }
  .udappClose {
    display: flex;
    justify-content: flex-end;
  }
  .contractProperty {
    overflow: auto;
    margin-bottom: 0.4em;
  }
  .contractProperty.hasArgs input {
    min-width: 200px;
    padding: .36em;
    border-radius: 5px;
    width: 70%;
  }
  .contractProperty button {
    ${styles.rightPanel.runTab.button_Create}
    min-width: 100px;
    width: 100px;
    font-size: 10px;
    margin:0;
    word-break: inherit;
  }
  .contractProperty button:disabled {
    cursor: not-allowed;
    background-color: white;
    border-color: lightgray;
  }
  .contractProperty.constant button {
    ${styles.rightPanel.runTab.button_Constant}
    min-width: 100px;
    width: 100px;
    font-size: 10px;
    margin:0;
    word-break: inherit;
    outline: none;
    width: inherit;
  }
  .contractProperty input {
    display: none;
  }
  .contractProperty > .value {
    box-sizing: border-box;
    float: left;
    align-self: center;
    color: ${styles.appProperties.mainText_Color};
    margin-left: 4px;
  }
  .contractActionsContainer {
    display: flex;
    width: 98%;
  }
  .contractActionsContainerSingle {
    display: flex;
    width: 100%;
  }
  .contractActionsContainerMulti {
    display:none;
    position: absolute;
    top: 58px;
    z-index: 1000;
    width: 90%;
  }
  .contractActionsContainerMultiInner {
    border: 2px solid ${styles.appProperties.warning_BorderColor};
    padding: 5px 5px 5px 10px;
    -webkit-box-shadow: 5px 5px 9px 0px rgba(61,61,61,1);
    -moz-box-shadow: 5px 5px 9px 0px rgba(61,61,61,1);
    box-shadow: 5px 5px 9px 0px rgba(61,61,61,1);
    background-color: ${styles.appProperties.primary_BackgroundColor};
  }
  .multiHeader {
    text-align: left;
    font-size: 10px;
    margin-bottom: 5px;
    font-weight: bold;
    cursor: pointer;
  }
  .multiArg {
    margin-bottom: 8px;
  }

  .multiArg label {
      float: left;
      margin-right: 6px;
      font-size: 10px;
      width: 20%;
  }
  .multiArg button {
    border-radius: 3px;
    float: right;
    margin-right: 5%;
  }
  .hasArgs .multiArg input {
    border-left: 1px solid #dddddd;
  }
  .hasArgs input {
    display: block;
    border: 1px solid #dddddd;
    padding: .36em;
    border-left: none;
    padding: 8px 8px 8px 10px;
    font-size: 10px;
    height: 25px;
  }
  .hasArgs button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
  }
`

module.exports = css
