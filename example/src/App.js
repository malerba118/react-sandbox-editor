import React, { Component } from 'react'

import ExampleComponent from 'react-sandbox-editor'
import {Sandbox, SandboxInterpreter, withDependencies} from 'react-sandbox-editor'

const ReactSandbox = withDependencies([
  'https://fb.me/react-15.1.0.js',
  'https://fb.me/react-dom-15.1.0.js'
])(Sandbox)

export default class App extends Component {
  render () {
    return (
      <div>
        {/*<SandboxInterpreter
          script={`console.log('hi')`}
          template={`<div>Hello World!</div>`}
          stylesheet={`div {background: green;}`}
          scriptType='js'
          templateType='html'
          stylesheetType='css'
        />*/}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
          <ReactSandbox
            classes={{
              tabsRoot:'tabs-root',
              tabRoot: 'tab-root-text',
              tabSelected: 'tab-selected',
              tabsIndicator: 'tabs-indicator',
              playButton: 'play-button'
            }}
            editors={{
              script: {
                defaultValue: '',
                mode: 'jsx'
              },
              template: {
                defaultValue: '',
                mode: 'html'
              },
              stylesheet: {
                defaultValue: '',
                mode: 'css'
              }
            }}
          />
        </div>
      </div>
    )
  }
}
