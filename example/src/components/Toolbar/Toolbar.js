import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter, Route, Switch, Link } from 'react-router-dom'
import classNames from 'classnames'

const toolbarHeight = 64

const styles = (theme) => ({
  toolbar: {
    height: toolbarHeight,
    backgroundColor: '#f2f2f2',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center'
  },
  toolbarLink: {
    textDecoration: 'none',
    color: 'rgba(0,0,0,.3)',
    marginLeft: 28,
  },
  active: {
    color: '#62bcfa'
  }
})

class Toolbar extends Component {

  render () {
    const {classes} = this.props
    let active = this.props.location.pathname.split('/')[1]
    return (
      <div id="toolbar" className={classes.toolbar}>
        <Link className={classNames(
          classes.toolbarLink,
          (active === 'demo' && classes.active)
        )} to="/demo">Demo</Link>
        <Link className={classNames(
          classes.toolbarLink,
          (active === 'docs' && classes.active)
        )} to="/docs/v1.0.0">Documentation</Link>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Toolbar))
