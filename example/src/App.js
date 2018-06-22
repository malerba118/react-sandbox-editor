import React, { Component } from 'react'

import ExampleComponent from 'react-sandbox-editor'
import {ExampleComponent2, ExampleComponent3} from 'react-sandbox-editor'

export default class App extends Component {
  render () {
    return (
      <div>
        <ExampleComponent3 text='Modern React component module' />
      </div>
    )
  }
}
