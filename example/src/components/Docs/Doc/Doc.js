import React, { Component } from 'react'
import { withRouter, Route, Switch, Link } from 'react-router-dom'
import ComponentDocumentation from './ComponentDocumentation'
import Typography from '@material-ui/core/Typography';

class Doc extends Component {
  render() {
    const doc = this.props.doc
    if (!doc) {
      return (
        <div>
          Documentation version does not exist
        </div>
      )
    }
    else {
      return (
        <div style={{padding: '5% 10%'}}>
          <Typography variant="display1" gutterBottom style={{marginBottom: 36}}>
            Components
          </Typography>
          {Object.keys(doc.components).map((componentName, i) => (
            <div key={i}>
              <ComponentDocumentation component={{
                name: componentName,
                ...doc.components[componentName]
              }} />
            </div>
          ))}
        </div>
      )
    }
  }
}

export default withRouter(Doc)
