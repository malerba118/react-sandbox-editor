import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Docs from './components/Docs'
import Toolbar from './components/Toolbar'
import Demo from './Demo'

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Quicksand"',
      'sans-serif'
    ].join(','),
  },
  overrides: {
   MuiInput: {
     root: {
       fontSize: '14px',
       color: 'rgba(0,0,0,.6)'
     },
   },
   MuiTypography: {
     body1: {
       fontSize: '14px',
       color: 'rgba(0,0,0,.6)'
     },
   },
 },
});

const styles = (theme) => ({

})

class App extends Component {

  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <HashRouter>
          <div className="App">
            <Toolbar />
            <div id="content">
              <Switch>
                <Route path='/docs/:version' component={Docs} />
                <Route path='/docs' render={() => <Redirect to="/docs/latest"/>} />
                <Route path='/demo' component={Demo} />
                <Route path='/' render={() => <Redirect to="/demo"/>} />
              </Switch>
            </div>
          </div>
        </HashRouter>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
