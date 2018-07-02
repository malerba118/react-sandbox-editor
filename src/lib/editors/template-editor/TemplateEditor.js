import React from "react";
import ReactDOM from "react-dom";
import brace from 'brace';
import AceEditor from 'react-ace';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactResizeDetector from 'react-resize-detector';

import 'brace/mode/html';
import 'brace/theme/github';


const styles = theme => ({
  root: {height: '100%', width: '100%'}
});

class TemplateEditor extends React.Component {

  //unique number for each instance (for dom id)
  static id = 0

  constructor(props) {
    super(props)

    this.state = {
      name: "template-editor-" + TemplateEditor.id++,
    }
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.root} style={this.props.style}>
        <ReactResizeDetector handleWidth handleHeight>
          {(width, height) => {
            return (
              <AceEditor
                height={`${height !== undefined ? height : '100%'}`}
                width={`${width !== undefined ? width : '100%'}`}
                mode="html"
                theme="github"
                name={this.state.name}
                value={this.props.value}
                onChange={this.props.onChange}
                editorProps={{ $blockScrolling: true }}
              />
            )
          }}
        </ReactResizeDetector>
      </div>
    )
  }
}

TemplateEditor = withStyles(styles)(TemplateEditor)

export {TemplateEditor}
