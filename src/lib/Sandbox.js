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
    selectedTab: 'scriptTab',
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
      //this tab no longer exists, so need to change selected tab
      this.setState({ selectedTab: 'stylesheetTab' });
    }
  }

  onPlayButtonClick = () => {
    this.execute()
  }

  onDisplayModeButtonClick = (requestedMode) => {
    this.setState({displayMode: requestedMode})
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
    return (
      <StatelessSandbox
        onRef={(ref) => {this.statelessSandboxRef = ref}}
        classes={this.props.classes}
        style={this.props.style}
        onEditorChange={this.onEditorChange}
        executeOnEditorChange={true}
        executeOnEditorChangeDebounce={1000}
        onTabClick={this.onTabClick}
        selectedTab={this.state.selectedTab}
        onPlayButtonClick={this.onPlayButtonClick}
        onDisplayModeButtonClick={this.onDisplayModeButtonClick}
        displayMode={this.state.displayMode}
        theme={this.props.theme}
        dependencies={this.props.dependencies}
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
  displayMode: 'tab',
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

export {Sandbox}
