import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Demo from './Demo'

const toolbarHeight = 64

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Quicksand"',
      'sans-serif',,
    ].join(','),
  },
  overrides: {
   MuiInput: {
     root: {
       fontSize: '14px',
     },
   },
 },
});

const styles = (theme) => ({
  toolbar: {
    height: toolbarHeight,
    backgroundColor: '#eee'
  },
})

class App extends Component {

  render () {
    const {classes} = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <div id="toolbar" className={classes.toolbar}>
          </div>
          <div id="content">
            <Demo />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
