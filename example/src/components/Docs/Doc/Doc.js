import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ComponentDocumentation from './ComponentDocumentation'
import HocDocumentation from './HocDocumentation'
import Typography from '@material-ui/core/Typography';

class Doc extends Component {
  render() {
    const doc = this.props.doc
    if (!doc) {
      return (
        <div style={{textAlign: 'center', marginTop: 64}}>
          Documentation version does not exist
        </div>
      )
    }
    else {
      return (
        <div style={{padding: '5% 10%'}}>
          <Typography variant="display1" gutterBottom style={{marginBottom: 36, color: 'rgba(0,0,0,.65)'}}>
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
          <Typography variant="display1" gutterBottom style={{marginBottom: 36, marginTop: 64, color: 'rgba(0,0,0,.65)'}}>
            Higher-Order Components
          </Typography>
          {Object.keys(doc.hoc).map((hocName, i) => (
            <div key={i}>
              <HocDocumentation hoc={{
                name: hocName,
                ...doc.hoc[hocName]
              }} />
            </div>
          ))}
        </div>
      )
    }
  }
}

export default withRouter(Doc)
