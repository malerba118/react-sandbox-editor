import React from "react";
import ReactDOM from "react-dom";
import brace from 'brace';
import AceEditor from 'react-ace';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactResizeDetector from 'react-resize-detector';

import 'brace/mode/javascript';
import 'brace/mode/jsx';
import 'brace/mode/typescript';
import 'brace/theme/github';
import 'brace/theme/tomorrow';
import 'brace/theme/solarized_light';
import 'brace/theme/monokai';
import 'brace/theme/twilight';
import 'brace/theme/solarized_dark';


const styles = theme => ({
  root: {height: '100%', width: '100%'}
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

  render() {
    const {classes} = this.props
    console.log(this.props.theme)
    return (
      <div className={classes.root} style={this.props.style}>
        <ReactResizeDetector handleWidth handleHeight>
          {(width, height) => {
            return (
              <AceEditor
                height={`${height !== undefined ? height : '100%'}`}
                width={`${width !== undefined ? width : '100%'}`}
                mode="javascript"
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

ScriptEditor = withStyles(styles)(ScriptEditor)

export {ScriptEditor}
