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

  onEditorChange = (editorName, value) => {
    this.setState((prevState) => {
      return {
        [editorName]: {
          ...prevState[editorName],
          value,
        }
      }
    })
    this.props.onEditorChange(editorName, value)
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
          onEditorChange={this.onEditorChange}
          executeOnEditorChange={this.props.executeOnEditorChange}
          executeOnEditorChangeDebounce={this.props.executeOnEditorChangeDebounce}
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

//HOC
// Sandbox = withStyles(styles)(Sandbox)

Sandbox.defaultProps = {
  onEditorChange: () => {},
  onTabClick: () => {},
  onPlayButtonClick: () => {},
  onDisplayModeButtonClick: () => {},
  theme: 'solarized_dark',
  executeOnEditorChangeDebounce: 1000,
  executeOnEditorChange: true,
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
    readOnly: false
  },
  scriptEditor: {
    defaultValue: '',
    mode: 'js',
    readOnly: false
  },
  stylesheetEditor: {
    defaultValue: '',
    mode: 'css',
    readOnly: false
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
    readOnly: PropTypes.bool
  }),
  scriptEditor: PropTypes.shape({
    defaultValue: PropTypes.string,
    mode: PropTypes.oneOf(['javascript', 'jsx']),
    readOnly: PropTypes.bool
  }),
  stylesheetEditor: PropTypes.shape({
    defaultValue: PropTypes.string,
    mode: PropTypes.oneOf(['css']),
    readOnly: PropTypes.bool
  }),
  dependencies: PropTypes.arrayOf(PropTypes.string),
}

export {Sandbox}
