import React from "react";
import ReactDOM from "react-dom";
import brace from 'brace';
import AceEditor from 'react-ace';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactResizeDetector from 'react-resize-detector';

import 'brace/mode/css';
import 'brace/theme/github';
import 'brace/theme/tomorrow';
import 'brace/theme/solarized_light';
import 'brace/theme/monokai';
import 'brace/theme/twilight';
import 'brace/theme/solarized_dark';

const styles = theme => ({
  root: {height: '100%', width: '100%'}
});

class StylesheetEditor extends React.Component {

  //unique number for each instance (for dom id)
  static id = 0

  constructor(props) {
    super(props)

    this.state = {
      name: "stylesheet-editor-" + StylesheetEditor.id++
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
                height={`${height !== undefined ? height  : '100%'}`}
                width={`${width !== undefined ? width  : '100%'}`}
                mode="css"
                theme={this.props.theme}
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

StylesheetEditor = withStyles(styles)(StylesheetEditor)

export {StylesheetEditor}
