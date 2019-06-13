import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutline from '../media/PlayButtonIcon';
import TabDisplayIcon from '../media/TabsViewIcon';
import SplitScreenDisplayIcon from '../media/SplitViewIcon';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import {ScriptEditor, TemplateEditor, StylesheetEditor} from './editors';
import {SandboxInterpreter} from './SandboxInterpreter';
import debounce from 'debounce';
import themeStyles from './StatelessSandboxThemes';

const styles = theme => ({
  ...themeStyles,
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    minWidth: 320,
    minHeight: 300,
  },
  _center: {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  _fill: {
    flex: 1
  },
  _tabsContent: {
    flex: 1,
    position: 'relative'
  },
  _interpreter: {
    position: 'absolute',
    transition: 'all .45s',
    zIndex: 0,
  },
  _editor: {
    position: 'absolute',
    top: 0,
    transition: 'height .45s',
  },
  _console: {
    position: 'absolute',
    top: 0,
  }
});

function getHorizontalSplit(horizontalSplitOffset) {
  let offset = horizontalSplitOffset
  if (offset > 80) {
    offset = 80
  }
  if (offset < 20) {
    offset = 20
  }
  return [ offset, 100 - offset ]
}

//Tabs was trying to pass props to divs and causing warnings
//this is to prevent those warnings by discarding those props
const DummyTab = (props) => (
  <div className={props.className} >
    {props.children}
  </div>
)

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
    this.props.onTabClick(event, this.tabNames[index])
  };

  componentDidMount() {
    this.props.onRef(this)
    // run the interpreter on the initial props
    this.updateInterpreter()
    // set the initial auto refresh debounce time
    this.requestInterpreterUpdate = debounce(
      this.updateInterpreter,
      this.props.executeOnCodeChangeDebounce
    )
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.displayMode !== this.props.displayMode &&
      this.props.displayMode === 'horizontal-split' &&
      prevProps.selectedTab === 'resultTab'
    ) {
      //when switching display modes to horizontal split mode while
      //the result tab is selected, we want to wait for the transition
      //before bringing the stylesheet editor to the front
      this.setState({displayModeTranistionPending: true})
      setTimeout(() => {
        this.setState({displayModeTranistionPending: false})
      }, 450)
    }
    if (this.props.executeOnCodeChangeDebounce !== prevProps.executeOnCodeChangeDebounce) {
      // if auto refresh time has changed, change the debounce time
      this.requestInterpreterUpdate = debounce(
        this.updateInterpreter,
        this.props.executeOnCodeChangeDebounce
      )
    }
    if (
      (this.props.executeOnCodeChange) &&
      (this.props.preScript !== prevProps.preScript ||
      this.props.postScript !== prevProps.postScript ||
      this.props.scriptEditor.value !== prevProps.scriptEditor.value ||
      this.props.templateEditor.value !== prevProps.templateEditor.value ||
      this.props.stylesheetEditor.value !== prevProps.stylesheetEditor.value)
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
    const {templateEditor, scriptEditor, stylesheetEditor} = this.props
    let interpreter = this.state.interpreter
    if (
      scriptEditor.value !== interpreter.script ||
      templateEditor.value !== interpreter.template ||
      stylesheetEditor.value !== interpreter.stylesheet
    ) {
      this.setState((prevState) => {
        return {
          interpreter: {
            script: scriptEditor.value,
            template: templateEditor.value,
            stylesheet: stylesheetEditor.value
          }
        }
      })
      return true
    }
    return false
  }

  render() {
    const { classes, theme } = this.props;
    const selectedTabName = this.props.selectedTab;
    const horizontalSplit = getHorizontalSplit(this.props.horizontalSplitOffset)
    const tabsClasses = {
      root: classNames(
        classes[`${theme}Header`],
        classes.header,
      ),
      indicator: classNames(
        classes[`${theme}SelectedTabIndicator`],
        classes.selectedTabIndicator
      )
    }
    const tabClasses = {
      root: classNames(
        classes[`${theme}Tab`],
        classes.tab
      ),
      selected: classNames(
        classes[`${theme}SelectedTab`],
        classes.selectedTab
      )
    }
    const iconButtonClasses = classNames(
      classes._center,
      classes[`${theme}IconButton`],
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
            label={this.props.templateEditor.mode}
          />
          <Tab
            disableRipple
            classes={tabClasses}
            label={this.props.scriptEditor.mode === 'javascript' ? 'js' : this.props.scriptEditor.mode}
          />
          <Tab
            disableRipple
            classes={tabClasses}
            label={this.props.stylesheetEditor.mode}
          />
          {this.props.displayMode === 'tab' && (
            <Tab
              disableRipple
              classes={tabClasses}
              label="Result"
            />
          )}
          <DummyTab className={classes._fill}></DummyTab>
          <DummyTab className={classes._center}>
            {this.props.displayMode === 'horizontal-split' && (
                <IconButton
                disableRipple
                className={iconButtonClasses}
                style={{display: this.props.hideDisplayModeButton ? 'none' : ''}}
                aria-label="sandbox-editor-dispay-mode"
                onClick={(event) => this.props.onDisplayModeButtonClick(event, 'tab')}
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
                onClick={(event) => this.props.onDisplayModeButtonClick(event, 'horizontal-split')}
              >
                <SplitScreenDisplayIcon />
              </IconButton>
            )}
          </DummyTab>
          <DummyTab className={classes._center}>
              <IconButton
                disableRipple
                className={iconButtonClasses}
                aria-label="sandbox-editor-play"
                onClick={this.props.onPlayButtonClick}
              >
                <PlayCircleOutline />
              </IconButton>
          </DummyTab>
        </Tabs>
        <div className={classes._tabsContent} id="tabs-content">

          <TemplateEditor
            className={classes._editor}
            style={{
              zIndex: (selectedTabName === 'templateTab' ? 1 : 0),
              height: this.props.displayMode === 'horizontal-split' ? `${horizontalSplit[0]}%` : '100%',
            }}
            onChange={(value) => this.props.onCodeChange('template', value)}
            value={this.props.templateEditor.value}
            readOnly={this.props.templateEditor.readOnly}
            wrapLines={this.props.templateEditor.wrapLines}
            theme={this.props.theme}
          />
          <ScriptEditor
            className={classes._editor}
            style={{
              zIndex: selectedTabName === 'scriptTab' ? 1 : 0,
              height: this.props.displayMode === 'horizontal-split' ? `${horizontalSplit[0]}%` : '100%',
            }}
            onChange={(value) => this.props.onCodeChange('script', value)}
            value={this.props.scriptEditor.value}
            readOnly={this.props.scriptEditor.readOnly}
            wrapLines={this.props.scriptEditor.wrapLines}
            mode={this.props.scriptEditor.mode}
            theme={this.props.theme}
          />
          <StylesheetEditor
            className={classes._editor}
            style={{
              zIndex: (selectedTabName === 'stylesheetTab') && !this.state.displayModeTranistionPending ? 1 : 0,
              height: this.props.displayMode === 'horizontal-split' ? `${horizontalSplit[0]}%` : '100%',
            }}
            onChange={(value) => this.props.onCodeChange('stylesheet', value)}
            value={this.props.stylesheetEditor.value}
            readOnly={this.props.stylesheetEditor.readOnly}
            wrapLines={this.props.stylesheetEditor.wrapLines}
            theme={this.props.theme}
          />
          <SandboxInterpreter
            onRef={(ref) => {this.interpreterRef = ref}}
            className={classes._interpreter}
            style={{
              height: this.props.displayMode === 'horizontal-split' ? `${horizontalSplit[1]}%` : '100%',
              top: this.props.displayMode === 'horizontal-split' ? `${horizontalSplit[0]}%` : 0,
            }}
            permissions={this.props.permissions}
            dependencies={this.props.dependencies}
            preScript={this.props.preScript}
            script={this.state.interpreter.script}
            postScript={this.props.postScript}
            scriptMode={this.props.scriptEditor.mode}
            template={this.state.interpreter.template}
            templateMode={this.props.templateEditor.mode}
            stylesheet={this.state.interpreter.stylesheet}
            stylesheetMode={this.props.stylesheetEditor.mode}
          />
          <div
            className={classes._console}
            style={{
              display: selectedTabName === 'scriptTab' ? 'block' : 'none',
              height: '100%',
              zIndex: 2
            }}
          >
            {/* TODO: console component here */}
          </div>
        </div>
      </div>
    );
  }
}

//HOC
StatelessSandbox = withStyles(styles)(StatelessSandbox)

StatelessSandbox.defaultProps = {
  theme: 'solarized_dark',
  selectedTab: 'templateTab',
  executeOnCodeChangeDebounce: 1000,
  executeOnCodeChange: true,
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
  preScript: '',
  postScript: '',
  templateEditor: {
    value: '',
    mode: 'html',
    readOnly: false,
    wrapLines: false,
  },
  scriptEditor: {
    value: '',
    mode: 'javascript',
    readOnly: false,
    wrapLines: false,
  },
  stylesheetEditor: {
    value: '',
    mode: 'css',
    readOnly: false,
    wrapLines: false,
  },
  dependencies: [],
  horizontalSplitOffset: 50,
  onRef: () => {},
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
  ),
  preScript: PropTypes.string,
  postScript: PropTypes.string,
  templateEditor: PropTypes.shape({
    value: PropTypes.string,
    mode: PropTypes.oneOf(['html']),
    readOnly: PropTypes.bool,
    wrapLines: PropTypes.bool,
  }),
  scriptEditor: PropTypes.shape({
    value: PropTypes.string,
    mode: PropTypes.oneOf(['javascript', 'jsx']),
    readOnly: PropTypes.bool,
    wrapLines: PropTypes.bool,
  }),
  stylesheetEditor: PropTypes.shape({
    value: PropTypes.string,
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

export {StatelessSandbox}
