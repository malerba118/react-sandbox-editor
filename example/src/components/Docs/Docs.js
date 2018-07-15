import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import documentation from '../../documentation'
import Doc from './Doc'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class Docs extends Component {

  constructor(props) {
    super(props)
    this.state = {
      docId: this.getDocIdFromUrlParam(this.props.match.params.version)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      docId: this.getDocIdFromUrlParam(nextProps.match.params.version)
    })
  }

  getDocIdFromUrlParam(urlParam) {
    let docId
    if (urlParam === 'latest') {
      docId = this.getLatestDocId()
    }
    else {
      docId = urlParam
    }
    return docId
  }

  getLatestDocId() {
    let docId
    let docIds = this.getDocIds()
    docId = docIds.sort()[docIds.length - 1]
    return docId
  }

  getDocIds = () => {
    return Object.keys(documentation)
  }

  handleSelectChange = (key, val) => {
    this.props.history.push(`/docs/${val}`)
  }

  render() {
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'flex-end', paddingTop: 24, paddingRight: 24}}>
          <FormControl>
            <InputLabel htmlFor="doc-id-select">Version</InputLabel>
            <Select
              value={this.state.docId}
              onChange={(e) => this.handleSelectChange('docId', e.target.value)}
              input={<Input name="doc-id" id="doc-id-select" />}
            >
              {this.getDocIds().map((docId, i) => (
                <MenuItem key={i} value={docId}>{docId}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Doc doc={documentation[this.state.docId]}/>
      </div>
    )
  }
}

export default withRouter(Docs)
