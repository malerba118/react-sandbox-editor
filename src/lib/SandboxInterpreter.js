import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import processors from './processors'

export class SandboxInterpreter extends React.Component {

  constructor(props) {
    super(props)
    this.iframeContainerRef = null
    this.currentIframe = null
  }

  buildDependencies = () => {
    return this.props.dependencies.map((dependency) => {
      return `<script src="${dependency}"></script>`
    })
    .join('\n')
  }

  buildStylesheet = () => {
    let stylesheet = ''
    let stylesheetProcessor = processors.getStylesheetProcessor(this.props.stylesheetMode)
    try {
      stylesheet = stylesheetProcessor(this.props.stylesheet)
    }
    catch (e){
      console.error(e)
    }
    return (`<style>${stylesheet}</style>`)
  }

  buildHead = () => {
    return (
      `<head>
        ${this.buildStylesheet()}
      </head>`
    )
  }

  buildCommunication = () => {
    return (`
      <script>
        let _log = console.log
        console.log = (...arguments) => {
          window.parent.postMessage({
            action: 'log',
            arguments: arguments
          }, '*')
          return _log(...arguments)
        }
      </script>
    `)
  }

  buildPreScript = () => {
    let preScript = ''
    let scriptProcessor = processors.getScriptProcessor(this.props.scriptMode)
    try {
      preScript = scriptProcessor(this.props.preScript)
    }
    catch (e){
      console.error(e)
    }
    return (`<script>${preScript}</script>`)
  }

  buildScript = () => {
    let script = ''
    let scriptProcessor = processors.getScriptProcessor(this.props.scriptMode)
    try {
      script = scriptProcessor(this.props.script)
    }
    catch (e){
      console.error(e)
    }
    return (`<script>${script}</script>`)
  }

  buildPostScript = () => {
    let postScript = ''
    let scriptProcessor = processors.getScriptProcessor(this.props.scriptMode)
    try {
      postScript = scriptProcessor(this.props.postScript)
    }
    catch (e){
      console.error(e)
    }
    return (`<script>${postScript}</script>`)
  }

  buildTemplate = () => {
    let template = ''
    let templateProcessor = processors.getTemplateProcessor(this.props.templateMode)
    try {
      template = templateProcessor(this.props.template)
    }
    catch (e){
      console.error(e)
    }
    return template
  }

  buildBody = () => {
    return (
      `<body>
        ${this.buildTemplate()}
        ${this.buildCommunication()}
        ${this.buildDependencies()}
        ${this.buildPreScript()}
        ${this.buildScript()}
        ${this.buildPostScript()}
      </body>`
    )
  }

  buildContents = () => {
    return (
      `<html>
        ${this.buildHead()}
        ${this.buildBody()}
       </html>`
    )
  }

  messageListener = e => {
    if (this.currentIframe && e.source === this.currentIframe.contentWindow) {
        this.props.onConsoleEvent({
          action: e.data.action,
          arguments: e.data.arguments
        })
    }
  }

  componentDidMount() {
    window.addEventListener('message', this.messageListener);
    this.props.onRef(this)
    this.execute()
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.messageListener);
    this.props.onRef(undefined)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.preScript !== this.props.preScript ||
      prevProps.script !== this.props.script ||
      prevProps.postScript !== this.props.postScript ||
      prevProps.template !== this.props.template ||
      prevProps.stylesheet !== this.props.stylesheet
    ) {
      this.execute()
    }
  }

  execute() {
    //remove all children
    while (this.iframeContainerRef.hasChildNodes()) {
        this.iframeContainerRef.removeChild(this.iframeContainerRef.lastChild);
    }
    //create new iframe
    let iframe = document.createElement('iframe');
    this.currentIframe = iframe
    iframe.height="100%"
    iframe.width="100%"
    iframe.sandbox=this.props.permissions.join(' ')
    iframe.style.border="none"
    try {
      iframe.srcdoc=this.buildContents()
    }
    catch (e){
      console.error(e)
    }
    //insert it into dom
    this.iframeContainerRef.appendChild(iframe);
  }

  render() {
    return (
      <div
        className={this.props.className}
        ref={(element) => {this.iframeContainerRef = element}}
        style={{
          height: '100%',
          width: '100%',
          ...this.props.style,
          background: 'white'
        }}>
      </div>
    )
  }
}

SandboxInterpreter.defaultProps = {
  permissions: [
    'allow-forms',
    'allow-pointer-lock',
    'allow-popups',
    'allow-modals',
    'allow-same-origin',
    'allow-scripts',
    'allow-top-navigation'
  ],
  dependencies: [],
  preScript: '',
  script: '',
  postScript: '',
  scriptMode: 'javascript',
  template: '',
  templateMode: 'html',
  stylesheet: '',
  stylesheetMode: 'css',
  onRef: () => {},
  onConsoleEvent: console.log
}

SandboxInterpreter.propTypes = {
  permissions: PropTypes.arrayOf(
    PropTypes.oneOf([
      'allow-forms',
      'allow-pointer-lock',
      'allow-popups',
      'allow-modals',
      'allow-same-origin',
      'allow-scripts',
      'allow-top-navigation'
    ])
  ),
  dependencies: PropTypes.arrayOf(PropTypes.string),
  preScript: PropTypes.string,
  script: PropTypes.string,
  postScript: PropTypes.string,
  scriptMode: PropTypes.oneOf(['javascript', 'jsx']),
  template: PropTypes.string,
  templateMode: PropTypes.oneOf(['html']),
  stylesheet: PropTypes.string,
  stylesheetMode: PropTypes.oneOf(['css']),
  onRef: PropTypes.func,
  onConsoleEvent: PropTypes.func
}
