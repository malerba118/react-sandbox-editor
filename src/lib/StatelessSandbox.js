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
import themeStyles from './StatelessSandboxThemes'

const styles = theme => ({
  ...themeStyles,
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 400,
    width: 600,
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
});


class StatelessSandbox extends React.Component {

  //oopsies, not quite stateless
  state = {
    interpreter: {
      script: '',
      template: '',
      stylesheet: ''
    },
    displayModeTranistionPending: false
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

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.displayMode !== this.props.displayMode &&
      nextProps.displayMode === 'horizontal-split' &&
      this.props.selectedTab === 'resultTab'
    ) {
      //when switching display modes to horizontal split mode while
      //the result tab is selected, we want to wait for the transition
      //before bringing the stylesheet editor to the front
      this.setState({displayModeTranistionPending: true})
      setTimeout(() => {
        this.setState({displayModeTranistionPending: false})
      }, 450)
    }
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
    //first just see if interpreter needs it's props udpated
    let updated = this.updateInterpreter()
    if (!updated) {
      //if not, call execute on it
      if (this.interpreterRef) {
        this.interpreterRef.execute()
      }
    }
  }

  //return whether updated or not
  updateInterpreter = () => {
    let editors = this.props.editors
    let interpreter = this.state.interpreter
    if (
      editors.script.value !== interpreter.script ||
      editors.template.value !== interpreter.template ||
      editors.stylesheet.value !== interpreter.stylesheet
    ) {
      this.setState((prevState) => {
        return {
          interpreter: {
            script: editors.script.value,
            template: editors.template.value,
            stylesheet: editors.stylesheet.value
          }
        }
      })
      return true
    }
    return false
  }

  render() {
    const { classes, theme } = this.props;
    const selectedTabName = this.props.selectedTab
    const tabsClasses = {
      root: classNames(
        classes[`${theme}Header`] || classes.defaultHeader,
        classes.header,
      ),
      indicator: classNames(
        classes[`${theme}SelectedTabIndicator`] || classes.defaultSelectedTabIndicator,
        classes.selectedTabIndicator
      )
    }
    const tabClasses = {
      root: classNames(
        classes[`${theme}Tab`] || classes.defaultTab,
        classes.tab
      ),
      selected: classNames(
        classes[`${theme}SelectedTab`] || classes.defaultSelectedTab,
        classes.selectedTab
      )
    }
    const iconButtonClasses = classNames(
      classes.center,
      classes[`${theme}IconButton`] || classes.defaultIconButton,
      classes.iconButton
    )

    return (
      <div className={classes.root} style={this.props.style}>
        <Tabs
          value={this.tabNames.indexOf(this.props.selectedTab)}
          onChange={this.onTabClick}
          classes={tabsClasses}
        >
          <Tab
            disableRipple
            classes={tabClasses}
            label={this.props.editors.template.mode}
          />
          <Tab
            disableRipple
            classes={tabClasses}
            label={this.props.editors.script.mode}
          />
          <Tab
            disableRipple
            classes={tabClasses}
            label={this.props.editors.stylesheet.mode}
          />
          {this.props.displayMode === 'tab' && (
            <Tab
              disableRipple
              classes={tabClasses}
              label="Result"
            />
          )}
          <div className={classes.fill}></div>
          <div className={classes.center}>
            {this.props.displayMode === 'horizontal-split' && (
                <IconButton
                disableRipple
                className={iconButtonClasses}
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
                className={iconButtonClasses}
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
                className={iconButtonClasses}
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
              transition: 'height .45s',
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
              transition: 'height .45s',
              height: this.props.displayMode === 'horizontal-split' ? '50%' : '100%',
            }}
            onChange={(value) => this.props.onEditorChange('script', value)}
            value={this.props.editors.script.value}
            mode={this.props.editors.script.mode}
            theme={this.props.theme}
          />
          <StylesheetEditor
            style={{
              position: 'absolute',
              top: 0,
              zIndex: (selectedTabName === 'stylesheetTab') && !this.state.displayModeTranistionPending ? 1 : 0,
              transition: 'height .45s',
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
              transition: 'all .45s',
              height: this.props.displayMode === 'horizontal-split' ? '50%' : '100%',
              top: this.props.displayMode === 'horizontal-split' ? '50%' : 0,
              zIndex: 0
            }}
            permissions={this.props.permissions}
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

StatelessSandbox.propTypes = {
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

export {StatelessSandbox}
