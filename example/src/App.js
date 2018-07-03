import React, { Component } from 'react'

import {Sandbox, SandboxInterpreter, withDependencies} from 'react-sandbox-editor'

const ReactSandbox = withDependencies([
  'https://fb.me/react-15.1.0.js',
  'https://fb.me/react-dom-15.1.0.js'
])(Sandbox)

export default class App extends Component {

  state = {
    displayMode: 'tab'
  }

  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
          <ReactSandbox
            theme="tomorrow"
            editors={{
              template: {
                defaultValue: '',
                mode: 'html'
              },
              script: {
                defaultValue: '',
                mode: 'jsx'
              },
              stylesheet: {
                defaultValue: '',
                mode: 'css'
              },
            }}
            classes={{root: 'sandbox-root'}}
          />
        </div>
      </div>
    )
  }
}
