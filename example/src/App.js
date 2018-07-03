import React, { Component } from 'react'

import {Sandbox, withDependencies} from 'react-sandbox-editor'

const ReactSandbox = withDependencies([
  'https://fb.me/react-15.1.0.js',
  'https://fb.me/react-dom-15.1.0.js'
])(Sandbox)

export default class App extends Component {

  state = {
    displayMode: 'tab',
    template: {
      defaultValue: '',
    },
    script: {
      defaultValue: '',
    },
    stylesheet: {
      defaultValue: '',
    }
  }

  constructor(props) {
    super(props)
    setTimeout(() => {
      this.setState({
        template: {
          defaultValue: '<div>blah</div>',
        }
      })
    }, 5000)
  }

  onEditorChange = (editorName, value) => {

  }

  render () {
    return (
      <div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
          <ReactSandbox
            onEditorChange={this.onEditorChange}
            theme="solarized_dark"
            permissions={['allow-scripts']}
            editors={{
              template: {
                defaultValue: this.state.template.defaultValue,
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
