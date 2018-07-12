import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import brace from 'brace';
import AceEditor from 'react-ace';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactResizeDetector from 'react-resize-detector';
import classNames from 'classnames';

import 'brace/mode/html';
import 'brace/theme/github';
import 'brace/theme/tomorrow';
import 'brace/theme/solarized_light';
import 'brace/theme/monokai';
import 'brace/theme/twilight';
import 'brace/theme/solarized_dark';


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
      <div className={classNames(classes.root, this.props.className)} style={this.props.style}>
        <ReactResizeDetector handleWidth handleHeight>
          {(width, height) => {
            return (
              <AceEditor
                height={`${height !== undefined ? height : '100%'}`}
                width={`${width !== undefined ? width : '100%'}`}
                mode="html"
                focus={false}
                readOnly={this.props.readOnly}
                wrapEnabled={this.props.wrapLines}
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

TemplateEditor = withStyles(styles)(TemplateEditor)

TemplateEditor.defaultProps = {
  mode: 'html',
  readOnly: false,
  wrapLines: false,
  theme: 'solarized_dark',
  value: '',
  onChange: () => {}
}

TemplateEditor.propTypes = {
  mode: PropTypes.oneOf(['html']),
  readOnly: PropTypes.bool,
  wrapLines: PropTypes.bool,
  theme: PropTypes.oneOf([
    'solarized_dark',
    'solarized_light',
    'twilight',
    'tomorrow',
    'github',
    'monokai',
  ]),
  value: PropTypes.string,
  onChange: PropTypes.func
}

export {TemplateEditor}
