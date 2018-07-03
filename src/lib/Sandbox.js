import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import {StatelessSandbox} from './StatelessSandbox'


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

  componentWillReceiveProps(nextProps) {
    //if default values have changed update editor with new default
    if (
      nextProps.editors.template.defaultValue !== this.props.editors.template.defaultValue
    ) {
      this.setState({
        template: {
          value: nextProps.editors.template.defaultValue
        }
      })
    }
    if (
      nextProps.editors.script.defaultValue !== this.props.editors.script.defaultValue
    ) {
      this.setState({
        script: {
          value: nextProps.editors.script.defaultValue
        }
      })
    }
    if (
      nextProps.editors.stylesheet.defaultValue !== this.props.editors.stylesheet.defaultValue
    ) {
      this.setState({
        stylesheet: {
          value: nextProps.editors.stylesheet.defaultValue
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
        editors={{
          template: {
            value: this.state.template.value,
            mode: this.props.editors.template.mode
          },
          script: {
            value: this.state.script.value,
            mode: this.props.editors.script.mode
          },
          stylesheet: {
            value: this.state.stylesheet.value,
            mode: this.props.editors.stylesheet.mode
          }
        }}
      />
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
  editors: {
    template: {
      defaultValue: '',
      mode: 'html'
    },
    script: {
      defaultValue: '',
      mode: 'js'
    },
    stylesheet: {
      defaultValue: '',
      mode: 'css'
    }
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
  )
}

export {Sandbox}
