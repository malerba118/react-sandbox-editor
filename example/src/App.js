import React, { Component } from 'react'

import ExampleComponent from 'react-sandbox-editor'
import {Sandbox, SandboxInterpreter} from 'react-sandbox-editor'

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
          <Sandbox
            classes={{
              tabsRoot:'tabs-root',
              tabRoot: 'tab-root-text',
              tabSelected: 'tab-selected',
              tabsIndicator: 'tabs-indicator',
              playButton: 'play-button'
            }}
          />
        </div>
      </div>
    )
  }
}
