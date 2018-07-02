import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import TabDisplayIcon from '@material-ui/icons/Tab';
import SplitScreenDisplayIcon from '@material-ui/icons/ViewStream';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import {ScriptEditor, TemplateEditor, StylesheetEditor} from './editors'
import {SandboxInterpreter} from './SandboxInterpreter'
import debounce from 'debounce'

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
    backgroundColor: '#5bc0de',
  },
  tabRoot: {
    textTransform: 'uppercase',
    color: 'rgba(0, 0, 0, 0.54)',
    opacity: 1,
    minWidth: 30,
    marginRight: theme.spacing.unit * 0,
    '&:hover': {
      color: '#5bc0de',
    },
    '&$tabSelected': {
      color: '#5bc0de',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#5bc0de',
    },
  },
  tabSelected: {color:'#5bc0de'},
  typography: {
    padding: theme.spacing.unit * 0,
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
  iconButtonRoot: {
    height: 36,
    width: 36,
    margin: 4
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

  onDisplayModeButtonClick = () => {
    let requestedDisplayMode = 'tab'
    if (this.props.displayMode === 'tab') {
      requestedDisplayMode = 'tab'
    }

  }

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
          classes={{
            root: classes.tabsRoot,
            indicator: classes.tabsIndicator
          }}
        >
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={this.props.editors.template.mode}
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={this.props.editors.script.mode}
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={this.props.editors.stylesheet.mode}
          />
          {this.props.displayMode === 'tab' && (
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="Result"
            />
          )}
          <div className={classes.fill}></div>
          <div className={classes.center}>
            {this.props.displayMode === 'horizontal-split' && (
                <IconButton
                disableRipple
                className={classNames(classes.center, classes.iconButtonRoot)}
                style={{display: this.props.hideDisplayModeButton ? 'none' : ''}}
                aria-label="sandbox-editor-dispay-mode"
                onClick={() => this.props.onDisplayModeButtonClick('tab')}
              >
                <TabDisplayIcon/>
                {this.props.displayMode === 'tab' && <SplitScreenDisplayIcon />}
              </IconButton>
            )}
            {this.props.displayMode === 'tab' && (
                <IconButton
                disableRipple
                className={classNames(classes.center, classes.iconButtonRoot)}
                style={{display: this.props.hideDisplayModeButton ? 'none' : ''}}
                aria-label="sandbox-editor-dispay-mode"
                onClick={() => this.props.onDisplayModeButtonClick('horizontal-split')}
              >
                <SplitScreenDisplayIcon />
              </IconButton>
            )}
          </div>
          <div className={classes.center}>
              <IconButton
                disableRipple
                className={classNames(classes.center, classes.iconButtonRoot)}
                aria-label="sandbox-editor-play"
                onClick={this.props.onPlayButtonClick}
              >
                <PlayCircleOutline />
              </IconButton>
          </div>
        </Tabs>
        <div className={classes.tabsContent} id="tabs-content">

          <TemplateEditor
            style={{
              position: 'absolute',
              top: 0,
              zIndex: (selectedTabName === 'templateTab' ? 1 : 0),
              transition: 'height .5s',
              height: this.props.displayMode === 'horizontal-split' ? '50%' : '100%',
            }}
            onChange={(value) => this.props.onEditorChange('template', value)}
            value={this.props.editors.template.value}
            theme={this.props.theme}
          />
          <ScriptEditor
            style={{
              position: 'absolute',
              top: 0,
              zIndex: selectedTabName === 'scriptTab' ? 1 : 0,
              transition: 'height .5s',
              height: this.props.displayMode === 'horizontal-split' ? '50%' : '100%',
            }}
            onChange={(value) => this.props.onEditorChange('script', value)}
            value={this.props.editors.script.value}
            theme={this.props.theme}
          />
          <StylesheetEditor
            style={{
              position: 'absolute',
              top: 0,
              zIndex: selectedTabName === 'stylesheetTab' ? 1 : 0,
              transition: 'height .5s',
              height: this.props.displayMode === 'horizontal-split' ? '50%' : '100%',
            }}
            onChange={(value) => this.props.onEditorChange('stylesheet', value)}
            value={this.props.editors.stylesheet.value}
            theme={this.props.theme}
          />
          <SandboxInterpreter
            onRef={(ref) => {this.interpreterRef = ref}}
            style={{
              position: 'absolute',
              transition: 'all .5s',
              height: this.props.displayMode === 'horizontal-split' ? '50%' : '100%',
              top: this.props.displayMode === 'horizontal-split' ? '50%' : 0,
              zIndex: 0
            }}
            dependencies={this.props.dependencies}
            script={this.state.interpreter.script}
            scriptMode={this.props.editors.script.mode}
            template={this.state.interpreter.template}
            templateMode={this.props.editors.template.mode}
            stylesheet={this.state.interpreter.stylesheet}
            stylesheetMode={this.props.editors.stylesheet.mode}
          />
        </div>
      </div>
    );
  }
}

//HOC
StatelessSandbox = withStyles(styles)(StatelessSandbox)

StatelessSandbox.defaultProps = {
  selectedTab: 'templateTab',
  executeOnEditorChangeDebounce: 1000,
  executeOnEditorChange: true,
  displayMode: 'tab',
  onTabClick: () => {},
  onPlayButtonClick: () => {},
  onDisplayModeButtonClick: () => {},
  editors: {
    template: {
      value: '',
      mode: 'html'
    },
    script: {
      value: '',
      mode: 'js'
    },
    stylesheet: {
      value: '',
      mode: 'css'
    }
  },
  dependencies: []
};

export {StatelessSandbox}
