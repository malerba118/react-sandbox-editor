import React from "react";
import ReactDOM from "react-dom";
import brace from 'brace';
import AceEditor from 'react-ace';
import withStyles from '@material-ui/core/styles/withStyles';

import 'brace/mode/html';
import 'brace/theme/github';


const styles = theme => ({
  root: {height: '100% !important', width: '100% !important'}
});

class TemplateEditor extends React.Component {

  //unique number for each instance (for dom id)
  static id = 0

  constructor(props) {
    super(props)

    this.state = {
      name: "template-editor-" + TemplateEditor.id++
    }
  }

  render() {
    const {classes} = this.props
    return (
      <AceEditor
        className={classes.root}
        height="100%"
        style={this.props.style}
        mode="html"
        theme="github"
        name={this.state.name}
        value={this.props.value}
        onChange={this.props.onChange}
        editorProps={{ $blockScrolling: true }}
      />
    )
  }
}

TemplateEditor = withStyles(styles)(TemplateEditor)

export {TemplateEditor}
