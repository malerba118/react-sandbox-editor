import React, { Component } from 'react'
import { withRouter, Route, Switch, Link } from 'react-router-dom'
import documentation from '../../documentation'
import Doc from './Doc'

class Docs extends Component {
  render() {
    const docId = this.props.match.params.docId
    return (
      <div>
        <Doc doc={documentation[docId]}/>
      </div>
    )
  }
}

export default withRouter(Docs)
