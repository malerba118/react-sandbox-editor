import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import {ScriptEditor, TemplateEditor, StylesheetEditor} from './editors'
import {SandboxInterpreter} from './SandboxInterpreter'
import debounce from 'debounce'
import {withDependencies} from './utils'

const ReactInterpreter = withDependencies(['http://react'])(SandboxInterpreter)

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
  },
  playButton: {
    cursor: 'pointer'
  },
});

class StatelessSandbox extends React.Component {

  //oopsies, not quite stateless
  state = {
    interpreter: {
      script: '',
      template: '',
      stylesheet: ''
    }
  };

  tabNames = ['templateTab', 'scriptTab', 'stylesheetTab', 'resultTab']

  onTabClick = (event, index) => {
    this.props.onTabClick(this.tabNames[index])
  };

  componentDidMount() {
    this.props.onRef(this)
    // run the interpreter on the initial props
    this.updateInterpreter()
    // set the initial auto refresh debounce time
    this.requestInterpreterUpdate = debounce(
      this.updateInterpreter,
      this.props.executeOnEditorChangeDebounce
    )
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.executeOnEditorChangeDebounce !== prevProps.executeOnEditorChangeDebounce) {
      // if auto refresh time has changed, change the debounce time
      this.requestInterpreterUpdate = debounce(
        this.updateInterpreter,
        this.props.executeOnEditorChangeDebounce
      )
    }
    if (
      (this.props.executeOnEditorChange) &&
      (this.props.editors.script.value !== prevProps.editors.script.value ||
      this.props.editors.template.value !== prevProps.editors.template.value ||
      this.props.editors.stylesheet.value !== prevProps.editors.stylesheet.value)
    ) {
      this.requestInterpreterUpdate()
    }
  }

  execute() {
    if (this.interpreterRef) {
      this.interpreterRef.execute()
    }
    else {
      alert('no interpreter ref exists!')
    }
  }

  updateInterpreter = () => {
    this.setState((prevState) => {
      return {
        interpreter: {
          script: this.props.editors.script.value,
          template: this.props.editors.template.value,
          stylesheet: this.props.editors.stylesheet.value
        }
      }
    })
  }

  render() {
    const { classes } = this.props;
    const selectedTabName = this.props.selectedTab
    return (
      <div className={classes.root}>
        <Tabs
          value={this.tabNames.indexOf(this.props.selectedTab)}
          onChange={this.onTabClick}
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
            <PlayCircleOutline onClick={this.props.onPlayButtonClick} />
          </div>
        </Tabs>
        <div className={classes.tabsContent} id="tabs-content">
          <TemplateEditor
            style={{position: 'absolute', top: 0, zIndex: (selectedTabName === 'templateTab' ? 1 : 0)}}
            onChange={(value) => this.props.onEditorChange('template', value)}
            value={this.props.editors.template.value}
          />
          <ScriptEditor
            style={{position: 'absolute', top: 0, zIndex: selectedTabName === 'scriptTab' ? 1 : 0}}
            onChange={(value) => this.props.onEditorChange('script', value)}
            value={this.props.editors.script.value}
          />
          <StylesheetEditor
            style={{position: 'absolute', top: 0, zIndex: selectedTabName === 'stylesheetTab' ? 1 : 0}}
            onChange={(value) => this.props.onEditorChange('stylesheet', value)}
            value={this.props.editors.stylesheet.value}
          />
          <ReactInterpreter
            onRef={(ref) => {this.interpreterRef = ref}}
            style={{position: 'absolute', top: 0, zIndex: 0}}
            script={this.state.interpreter.script}
            template={this.state.interpreter.template}
            stylesheet={this.state.interpreter.stylesheet}
          />
        </div>
      </div>
    );
  }
}

//HOC
StatelessSandbox = withStyles(styles)(StatelessSandbox)

StatelessSandbox.defaultProps = {
  executeOnEditorChangeDebounce: 1000,
  executeOnEditorChange: true,
  onTabClick: () => {},
  onPlayButtonClick: () => {},
};

export {StatelessSandbox}
