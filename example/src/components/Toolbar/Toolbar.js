import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter, Link } from 'react-router-dom'
import classNames from 'classnames'

const toolbarHeight = 64

const styles = (theme) => ({
  toolbar: {
    height: toolbarHeight,
    backgroundColor: '#fff',
    fontWeight: 100,
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    borderBottom: '1px solid rgba(0,0,0,.08)',
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
        )} to="/docs/latest">Documentation</Link>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Toolbar))
