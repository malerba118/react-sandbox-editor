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

  onPlayButtonClick = () => {
    this.execute()
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
        // classes={this.props.classes}
        onEditorChange={this.onEditorChange}
        executeOnEditorChange={true}
        executeOnEditorChangeDebounce={1000}
        onTabClick={this.onTabClick}
        selectedTab={this.state.selectedTab}
        onPlayButtonClick={this.onPlayButtonClick}
        editors={{
          template: {
            value: this.state.template.value
          },
          script: {
            value: this.state.script.value,
          },
          stylesheet: {
            value: this.state.stylesheet.value,
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
}

export {Sandbox}
