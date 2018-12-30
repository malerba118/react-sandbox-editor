import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import {StatelessSandbox} from './StatelessSandbox';
import JssProvider from 'react-jss/lib/JssProvider';
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName';

const generateClassName = createGenerateClassName({
  productionPrefix: 'react-sandbox-editor',
});


class Sandbox extends React.Component {
  state = {
    selectedTab: 'templateTab',
    displayMode: 'tab',
    template: {
      value: '',
      defaultValue: ''
    },
    script: {
      value: '',
      defaultValue: ''
    },
    stylesheet: {
      value: '',
      defaultValue: ''
    }
  };

  componentDidMount() {
    this.props.onRef(this)
  }

  componentWillUnmount() {
    this.props.onRef(null)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //if default values have changed update editor with new default
    let nextState = {...prevState}
    if (
      nextProps.templateEditor.defaultValue !== prevState.template.defaultValue
    ) {
      nextState.template = {
        value: nextProps.templateEditor.defaultValue,
        defaultValue: nextProps.templateEditor.defaultValue
      }
    }
    if (
      nextProps.scriptEditor.defaultValue !== prevState.script.defaultValue
    ) {
      nextState.script = {
        value: nextProps.scriptEditor.defaultValue,
        defaultValue: nextProps.scriptEditor.defaultValue
      }
    }
    if (
      nextProps.stylesheetEditor.defaultValue !== prevState.stylesheet.defaultValue
    ) {
      nextState.stylesheet = {
        value: nextProps.stylesheetEditor.defaultValue,
        defaultValue: nextProps.stylesheetEditor.defaultValue
      }
    }
    return nextState
  }

  onTabClick = (event, value) => {
    this.setState({ selectedTab: value })
    this.props.onTabClick(event, value)
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.displayMode !== this.state.displayMode &&
      this.state.displayMode === 'horizontal-split' &&
      this.state.selectedTab === 'resultTab'
    ) {
      //when switching to split view mode the tab goes
      //away so we need to switch tabs
      this.setState({ selectedTab: 'stylesheetTab' });
    }
  }

  onPlayButtonClick = (event) => {
    this.execute()
    this.props.onPlayButtonClick(event)
  }

  onDisplayModeButtonClick = (event, requestedMode) => {
    this.setState({displayMode: requestedMode})
    this.props.onDisplayModeButtonClick(event, requestedMode)
  }

  execute = () => {
    if (this.statelessSandboxRef) {
      this.statelessSandboxRef.execute()
    }
  }

  onCodeChange = (editorName, value) => {
    this.setState((prevState) => {
      return {
        [editorName]: {
          ...prevState[editorName],
          value,
        }
      }
    })
    this.props.onCodeChange(editorName, value)
  }

  render() {
    const { classes } = this.props;
    //props will override default behavior provided by state
    const displayMode = this.props.displayMode || this.state.displayMode
    const selectedTab = this.props.selectedTab || this.state.selectedTab
    return (
      <JssProvider generateClassName={generateClassName}>
        <StatelessSandbox
          onRef={(ref) => {this.statelessSandboxRef = ref}}
          classes={this.props.classes}
          style={this.props.style}
          onCodeChange={this.onCodeChange}
          executeOnCodeChange={this.props.executeOnCodeChange}
          executeOnCodeChangeDebounce={this.props.executeOnCodeChangeDebounce}
          onTabClick={this.onTabClick}
          selectedTab={selectedTab}
          onPlayButtonClick={this.onPlayButtonClick}
          onDisplayModeButtonClick={this.onDisplayModeButtonClick}
          displayMode={displayMode}
          theme={this.props.theme}
          permissions={this.props.permissions}
          dependencies={this.props.dependencies}
          hideDisplayModeButton={this.props.hideDisplayModeButton}
          horizontalSplitOffset={this.props.horizontalSplitOffset}
          preScript={this.props.preScript}
          postScript={this.props.postScript}
          templateEditor={{
            ...this.props.templateEditor,
            value: this.state.template.value,
          }}
          scriptEditor={{
            ...this.props.scriptEditor,
            value: this.state.script.value,
          }}
          stylesheetEditor={{
            ...this.props.stylesheetEditor,
            value: this.state.stylesheet.value,
          }}
        />
      </JssProvider>
    );
  }
}

Sandbox.defaultProps = {
  onCodeChange: () => {},
  onTabClick: () => {},
  onPlayButtonClick: () => {},
  onDisplayModeButtonClick: () => {},
  theme: 'solarized_dark',
  executeOnCodeChangeDebounce: 1000,
  executeOnCodeChange: true,
  permissions: [
    'allow-forms',
    'allow-pointer-lock',
    'allow-popups',
    'allow-modals',
    'allow-same-origin',
    'allow-scripts',
    'allow-top-navigation'
  ],
  preScript: '',
  postScript: '',
  templateEditor: {
    defaultValue: '',
    mode: 'html',
    readOnly: false,
    wrapLines: false,
  },
  scriptEditor: {
    defaultValue: '',
    mode: 'javascript',
    readOnly: false,
    wrapLines: false,
  },
  stylesheetEditor: {
    defaultValue: '',
    mode: 'css',
    readOnly: false,
    wrapLines: false,
  },
  dependencies: [],
  horizontalSplitOffset: 50,
  onRef: () => {},
}

Sandbox.propTypes = {
  permissions: PropTypes.arrayOf(
    PropTypes.oneOf([
      'allow-forms',
      'allow-pointer-lock',
      'allow-popups',
      'allow-modals',
      'allow-same-origin',
      'allow-scripts',
      'allow-top-navigation'
    ])
  ),
  preScript: PropTypes.string,
  postScript: PropTypes.string,
  templateEditor: PropTypes.shape({
    defaultValue: PropTypes.string,
    mode: PropTypes.oneOf(['html']),
    readOnly: PropTypes.bool,
    wrapLines: PropTypes.bool,
  }),
  scriptEditor: PropTypes.shape({
    defaultValue: PropTypes.string,
    mode: PropTypes.oneOf(['javascript', 'jsx']),
    readOnly: PropTypes.bool,
    wrapLines: PropTypes.bool,
  }),
  stylesheetEditor: PropTypes.shape({
    defaultValue: PropTypes.string,
    mode: PropTypes.oneOf(['css']),
    readOnly: PropTypes.bool,
    wrapLines: PropTypes.bool,
  }),
  onCodeChange: PropTypes.func,
  onTabClick: PropTypes.func,
  onPlayButtonClick: PropTypes.func,
  onDisplayModeButtonClick: PropTypes.func,
  theme: PropTypes.oneOf([
    'solarized_dark',
    'solarized_light',
    'twilight',
    'tomorrow',
    'github',
    'monokai',
  ]),
  executeOnCodeChangeDebounce: PropTypes.number,
  executeOnCodeChange: PropTypes.bool,
  hideDisplayModeButton: PropTypes.bool,
  selectedTab: PropTypes.oneOf(['templateTab', 'scriptTab', 'stylesheetTab', 'resultTab']),
  displayMode: PropTypes.oneOf(['tab', 'horizontal-split']),
  dependencies: PropTypes.arrayOf(PropTypes.string),
  horizontalSplitOffset: PropTypes.number,
  onRef: PropTypes.func,
}

export {Sandbox}
