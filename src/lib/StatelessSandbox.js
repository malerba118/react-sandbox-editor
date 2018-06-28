import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import {ScriptEditor} from './editors/script-editor/ScriptEditor'
import {SandboxInterpreter} from './SandboxInterpreter'


const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 400,
    width: 600,
  },
  tabsRoot: {
    backgroundColor: '#eee',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 50,
    marginRight: theme.spacing.unit * 2,
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 2,
  },
  center: {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fill: {
    flex: 1
  },
  tabsContent: {
    flex: 1,
    position: 'relative'
  }
});

class StatelessSandbox extends React.Component {
  state = {
    selectedTab: 0,
  };

  tabNames = ['templateTab', 'scriptTab', 'stylesheetTab', 'resultTab']

  handleChange = (event, value) => {
    this.setState({ selectedTab: value });
  };

  getSelectedTabName = () => {
    return this.tabNames[this.state.selectedTab]
  }

  onEditorChange = (editorName, value) => {
    console.log(value)
    // this.setState({
    //   [editorName]: value
    // })
  }

  render() {
    const { classes } = this.props;
    const selectedTabName = this.getSelectedTabName()
    return (
      <div className={classes.root}>
        <Tabs
          value={this.state.selectedTab}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="templateTab"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="scriptTab"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="stylesheetTab"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="resultTab"
          />
          <div className={classes.fill}></div>
          <div className={classNames(classes.center, classes.playButton)}>
            <PlayCircleOutline />
          </div>
        </Tabs>
        <div className={classes.tabsContent} id="tabs-content">
          <ScriptEditor
            style={{position: 'absolute', top: 0, zIndex: (selectedTabName === 'templateTab' ? 1 : 0)}}
            onChange={(value) => this.onEditorChange('template', value)}
          />
          <ScriptEditor style={{position: 'absolute', top: 0, zIndex: selectedTabName === 'scriptTab' ? 1 : 0}}/>
          <ScriptEditor style={{position: 'absolute', top: 0, zIndex: selectedTabName === 'stylesheetTab' ? 1 : 0}}/>
          <SandboxInterpreter
            style={{position: 'absolute', top: 0, zIndex: 0}}
            script={`console.log('hi')`}
            template={`<div>Hello World!</div>`}
            stylesheet={`div {background: green;}`}
          />
        </div>
      </div>
    );
  }
}

//HOC
StatelessSandbox = withStyles(styles)(StatelessSandbox)

export {StatelessSandbox}
