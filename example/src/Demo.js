import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Slider from 'rc-slider';
import withStyles from '@material-ui/core/styles/withStyles';
import brace from 'brace';
import AceEditor from 'react-ace';
import {Sandbox, withDependencies} from 'react-sandbox-editor'
import {getReactSandboxUsage} from './utils'
import 'brace/mode/jsx';
import 'brace/theme/kuroir';
import 'rc-slider/assets/index.css';

const ReactSandbox = withDependencies([
  "https://unpkg.com/react@16.6.0/umd/react.development.js",
  "https://unpkg.com/react-dom@16.6.0/umd/react-dom.development.js"
])(Sandbox);

const toolbarHeight = 64

const possiblePermissions = [
  'allow-forms',
  'allow-pointer-lock',
  'allow-popups',
  'allow-modals',
  'allow-same-origin',
  'allow-scripts',
  'allow-top-navigation'
]


const styles = (theme) => ({
  toolbar: {
    height: toolbarHeight,
    backgroundColor: '#fff',
  },
  globalSettings: {
    width: '100%',
    marginTop: 24
  },
  horizontalForm: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  formControl: {
    margin: theme.spacing.unit*3,
    maxWidth: 150,
    minWidth: 50,
    width: '20%'
  },
  leftContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    boxSizing: 'border-box',
    padding: '3% 4%',
    flex: 1,
    maxWidth: '100%',
  },
  rightContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    boxSizing: 'border-box',
    padding: '3% 4%',
    flex: 1,
    maxWidth: '100%',
  },
  divider: {
    height: '75vh',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 15,
    width: 2,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  sandboxUsage: {
    marginTop: 24,
    height: '100%',
    maxWidth: '90%',
    padding: 24
  },
  'cyan-header': {
    backgroundColor: 'cyan !important',
  },
  subtitle: {
    fontSize: 24,
    textAlign: 'center',
    color: 'rgba(0,0,0,.65)'
  }
})

class Demo extends Component {

  state = {
    displayMode: 'tab',
    theme: 'solarized_dark',
    headerClass: 'none',
    showDisplayButton: true,
    permissions: possiblePermissions,
    executeOnCodeChange: true,
    executeOnCodeChangeDebounce: 1000,
    horizontalSplitOffset: 50,
  }

  onCodeChange = (editorName, value) => {

  }

  onSelectChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  onSwitchChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  onHorizontalSplitOffsetChange = (val) => {
    this.setState({horizontalSplitOffset: val})
  }

  render () {
    const {classes} = this.props
    let reactSandbox = (
      <ReactSandbox
        onCodeChange={this.onCodeChange}
        theme={this.state.theme}
        permissions={this.state.permissions}
        executeOnCodeChange={this.state.executeOnCodeChange}
        horizontalSplitOffset={this.state.horizontalSplitOffset}
        executeOnCodeChangeDebounce={this.state.executeOnCodeChangeDebounce}
        hideDisplayModeButton={!this.state.showDisplayButton}
        templateEditor={{
          defaultValue: `<div id="root"></div>`,
          mode: 'html',
          readOnly: false,
          wrapLines: false
        }}
        scriptEditor={{
          defaultValue: `ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);`,
        }}
        classes={{header: classes[this.state.headerClass]}}
      />
    )
    return (
        <div className="content-layout">
          <div id="left-content" className={classes.leftContent}>
            <p className={classes.subtitle}>Input</p>
            <div id="global-settings" className={classes.globalSettings}>
              <div id="row-1" className={classes.horizontalForm}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="theme-select">Theme</InputLabel>
                  <Select
                    onChange={(e) => this.onSelectChange('theme', e.target.value)}
                    value={this.state.theme}
                    inputProps={{
                      name: 'Theme',
                      id: 'theme-select',
                      fontSize: '15px !important',

                    }}
                  >
                    <MenuItem value="monokai">
                      <em>monokai</em>
                    </MenuItem>
                    <MenuItem value={'twilight'}>twilight</MenuItem>
                    <MenuItem value={'solarized_dark'}>solarized_dark</MenuItem>
                    <MenuItem value={'solarized_light'}>solarized_light</MenuItem>
                    <MenuItem value={'tomorrow'}>tomorrow</MenuItem>
                    <MenuItem value={'github'}>github</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="classes-select">Classes</InputLabel>
                  <Select
                    onChange={(e) => this.onSelectChange('headerClass', e.target.value)}
                    value={this.state.headerClass}
                    inputProps={{
                      name: 'Classes',
                      id: 'classes-select',
                    }}
                  >
                    <MenuItem value={'none'}>
                      None
                    </MenuItem>
                    <MenuItem value={'cyan-header'}>{`cyan-header`}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.showDisplayButton}
                          onChange={(e) => this.onSwitchChange('showDisplayButton', e.target.checked)}
                          value="showDisplayButton"
                        />
                      }
                      label="Display Controls"
                    />
                  </FormGroup>
                </FormControl>
              </div>
              <div id="row-2" className={classes.horizontalForm}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.executeOnCodeChange}
                          onChange={(e) => this.onSwitchChange('executeOnCodeChange', e.target.checked)}
                          value="executeOnCodeChange"
                        />
                      }
                      label="Auto Update"
                    />
                  </FormGroup>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="debounce-select">
                    Update Debounce
                  </InputLabel>
                  <Select
                    disabled={!this.state.executeOnCodeChange}
                    onChange={(e) => this.onSelectChange('executeOnCodeChangeDebounce', e.target.value)}
                    value={this.state.executeOnCodeChangeDebounce}
                    inputProps={{
                      name: 'Debounce',
                      id: 'debounce-select',
                    }}
                  >
                    <MenuItem value={1000}>{`1s`}</MenuItem>
                    <MenuItem value={2000}>{`2s`}</MenuItem>
                    <MenuItem value={3000}>{`3s`}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-permissions">Permissions</InputLabel>
                  <Select
                    multiple
                    value={this.state.permissions}
                    onChange={(e) => this.onSelectChange('permissions', e.target.value)}
                    input={<Input id="select-permissions" />}
                    renderValue={selected => selected.join(', ')}
                    // MenuProps={MenuProps}
                  >
                    {possiblePermissions.map(perm => (
                      <MenuItem key={perm} value={perm}>
                        <Checkbox checked={this.state.permissions.indexOf(perm) > -1} />
                        <ListItemText primary={perm} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div id="row-3" className={classes.horizontalForm}>
                  <FormControl className={classes.formControl} style={{maxWidth: '80%', width: '80%'}}>
                    <Typography variant="body1">Horizontal Split Offset (no-op when displayMode="tab")</Typography>
                    <Slider
                      min={20}
                      max={80}
                      onChange={this.onHorizontalSplitOffsetChange}
                      railStyle={{backgroundColor: '#f50057', opacity: .5}}
                      trackStyle={{backgroundColor: '#f50057', opacity: .5}}
                      handleStyle={{backgroundColor: '#f50057', border: '0'}}
                    />
                  </FormControl>
              </div>
            </div>
            <div id="sandbox-usage" className={classes.sandboxUsage}>
              <AceEditor
                height="350px"
                width="100%"
                theme="tomorrow"
                mode="jsx"
                value={getReactSandboxUsage(reactSandbox)}
                name="sandbox-usage-editor"
                readOnly={true}
                showGutter={false}
                fontSize={11}
                wrapEnabled={true}
                setOptions={{
                  showLineNumbers: false,
                  tabSize: 2,
                }}
                editorProps={{$blockScrolling: true}}
              />
            </div>
          </div>

          <div className={[classes.divider, 'small-screen-hide'].join(' ')}></div>
          <div id="right-content" className={classes.rightContent}>
            <p className={classes.subtitle}>Output</p>
            <div className={'sandbox-container'}>
              {reactSandbox}
            </div>
          </div>
      </div>
    )
  }
}

export default withStyles(styles)(Demo)
