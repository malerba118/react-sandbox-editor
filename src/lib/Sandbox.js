import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
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
    },
    script: {
      value: '',
    },
    stylesheet: {
      value: '',
    }
  };

  componentDidMount() {
    this.setState({
      template: {value: this.props.templateEditor.defaultValue},
      script: {value: this.props.scriptEditor.defaultValue},
      stylesheet: {value: this.props.stylesheetEditor.defaultValue},
    })
  }

  componentWillReceiveProps(nextProps) {
    //if default values have changed update editor with new default
    if (
      nextProps.templateEditor.defaultValue !== this.props.templateEditor.defaultValue
    ) {
      this.setState({
        template: {
          value: nextProps.templateEditor.defaultValue
        }
      })
    }
    if (
      nextProps.scriptEditor.defaultValue !== this.props.scriptEditor.defaultValue
    ) {
      this.setState({
        script: {
          value: nextProps.scriptEditor.defaultValue
        }
      })
    }
    if (
      nextProps.stylesheetEditor.defaultValue !== this.props.stylesheetEditor.defaultValue
    ) {
      this.setState({
        stylesheet: {
          value: nextProps.stylesheetEditor.defaultValue
        }
      })
    }
  }

  onTabClick = (value) => {
    this.setState({ selectedTab: value });
    this.props.onTabClick(value)
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

  onPlayButtonClick = () => {
    this.execute()
    this.props.onPlayButtonClick()
  }

  onDisplayModeButtonClick = (requestedMode) => {
    this.setState({displayMode: requestedMode})
    this.props.onDisplayModeButtonClick(requestedMode)
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
  templateEditor: {
    defaultValue: '',
    mode: 'html',
    readOnly: false,
    wrapLines: false,
  },
  scriptEditor: {
    defaultValue: '',
    mode: 'js',
    readOnly: false,
    wrapLines: false,
  },
  stylesheetEditor: {
    defaultValue: '',
    mode: 'css',
    readOnly: false,
    wrapLines: false,
  },
  dependencies: []
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
}

export {Sandbox}
