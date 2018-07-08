import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import Docs from './components/Docs'
import Toolbar from './components/Toolbar'
import Demo from './Demo'

const toolbarHeight = 64

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Quicksand"',
      'sans-serif',
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

})

class App extends Component {

  render () {
    const {classes} = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter basename="/react-sandbox-editor">
          <div className="App">
            <Toolbar />
            <div id="content">
              <Switch>
                <Route path='/docs/:docId' component={Docs} />
                <Route path='/demo' component={Demo} />
                <Route path='/' render={() => <Redirect to="/demo"/>} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
