import React from "react";
import ReactDOM from "react-dom";
import brace from 'brace';
import AceEditor from 'react-ace';
import withStyles from '@material-ui/core/styles/withStyles';

import 'brace/mode/java';
import 'brace/theme/github';


const styles = theme => ({
  root: {height: '100% !important', width: '100% !important'}
});

class ScriptEditor extends React.Component {

  //unique number for each instance (for dom id)
  static id = 0

  constructor(props) {
    super(props)

    this.state = {
      name: "script-editor-" + ScriptEditor.id++
    }
  }

  onChange = (newValue) => {
    console.log('change', newValue);
    this.setState({
      value: newValue
    })
    // this.props.onChange(newValue)
  }

  render() {
    const {classes} = this.props
    return (
      <AceEditor
        className={classes.root}
        height="100%"
        style={this.props.style}
        mode="javascript"
        theme="github"
        name={this.state.name}
        value={this.state.value}
        onChange={this.onChange}
        editorProps={{ $blockScrolling: true }}
      />
    )
  }
}

ScriptEditor = withStyles(styles)(ScriptEditor)

export {ScriptEditor}
