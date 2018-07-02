import React, { Component } from 'react'

import {Sandbox, SandboxInterpreter, withDependencies} from 'react-sandbox-editor'

const ReactSandbox = withDependencies([
  'https://fb.me/react-15.1.0.js',
  'https://fb.me/react-dom-15.1.0.js'
])(Sandbox)

export default class App extends Component {

  state = {
    resultPosition: 'tab'
  }

  constructor(props) {
    super(props)
    setTimeout(() => {
      this.setState({
        resultPosition: 'bottom'
      })
    }, 10000)
  }

  render () {
    return (
      <div>
        <div>
          <p>This is a paragraph</p>
          <ReactSandbox
            resultPosition={this.state.resultPosition}
          />
          <p style={{background:'yellow'}}>This is another paragraph</p>
        </div>
      </div>
    )
  }
}
