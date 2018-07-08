import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ReactDOM from 'react-dom'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import withStyles from '@material-ui/core/styles/withStyles';
import brace from 'brace';
import AceEditor from 'react-ace';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {Sandbox, withDependencies} from 'react-sandbox-editor'
import reactElementToJSXString from 'react-element-to-jsx-string';
import {getReactSandboxUsage} from './utils'
import 'brace/mode/jsx';
import 'brace/theme/kuroir';

const ReactSandbox = withDependencies([
  'https://fb.me/react-15.1.0.js',
  'https://fb.me/react-dom-15.1.0.js'
])(Sandbox)

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
    backgroundColor: '#eee'
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
    height: 550,
    marginTop: 145,
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
    color: 'rgba(0,0,0,.6)'
  }
})

class Demo extends Component {

  state = {
    displayMode: 'tab',
    theme: 'solarized_dark',
    headerClass: 'none',
    showDisplayButton: true,
    permissions: possiblePermissions,
    executeOnEditorChange: true,
    executeOnEditorChangeDebounce: 1000,
  }

  constructor(props) {
    super(props)
  }

  onEditorChange = (editorName, value) => {

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

  render () {
    const {classes} = this.props
    let reactSandbox = (
      <ReactSandbox
        onEditorChange={this.onEditorChange}
        theme={this.state.theme}
        permissions={this.state.permissions}
        executeOnEditorChange={this.state.executeOnEditorChange}
        executeOnEditorChangeDebounce={this.state.executeOnEditorChangeDebounce}
        hideDisplayModeButton={!this.state.showDisplayButton}
        editors={{
          template: {
            defaultValue: `<div id="root"></div>`,
            mode: 'html'
          },
          script: {
            defaultValue: `ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);`,
            mode: 'jsx'
          },
          stylesheet: {
            defaultValue: '',
            mode: 'css'
          },
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
              {// hideDisplayModeButton
              // executeOnEditorChange
              // executeOnEditorChangeDebounce
              // classes
              // theme
              // permissions
              }
              <div id="row-2" className={classes.horizontalForm}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.executeOnEditorChange}
                          onChange={(e) => this.onSwitchChange('executeOnEditorChange', e.target.checked)}
                          value="executeOnEditorChange"
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
                    disabled={!this.state.executeOnEditorChange}
                    onChange={(e) => this.onSelectChange('executeOnEditorChangeDebounce', e.target.value)}
                    value={this.state.executeOnEditorChangeDebounce}
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
            </div>
            {
            // <div id="editor-settings" style={{ display: 'flex', justifyContent: 'start', margin: '20 0'}}>
            //   <FormControl className={classes.formControl} component="fieldset">
            //     <FormLabel component="legend">Template Editor</FormLabel>
            //     <FormGroup>
            //       <FormControlLabel
            //         control={
            //           <Switch
            //             checked={true}
            //             value="gilad"
            //           />
            //         }
            //         label="Gilad Gray"
            //       />
            //     </FormGroup>
            //   </FormControl>
            //     <FormControl className={classes.formControl} component="fieldset">
            //       <FormLabel component="legend">Script Editor</FormLabel>
            //       <FormGroup>
            //         <FormControlLabel
            //           control={
            //             <Switch
            //               checked={true}
            //               value="gilad"
            //             />
            //           }
            //           label="Gilad Gray"
            //         />
            //       </FormGroup>
            //     </FormControl>
            //     <FormControl className={classes.formControl} component="fieldset">
            //       <FormLabel component="legend">Stylesheet Editor</FormLabel>
            //       <FormGroup>
            //         <FormControlLabel
            //           control={
            //             <Switch
            //               checked={true}
            //               value="gilad"
            //             />
            //           }
            //           label="Gilad Gray"
            //         />
            //       </FormGroup>
            //     </FormControl>
            // </div>
            }
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
