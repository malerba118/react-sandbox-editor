/**
 * @class ExampleComponent
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class ExampleComponent extends Component {
  static propTypes = {
    text: PropTypes.string
  }

  render() {
    const {
      text
    } = this.props

    return (
      <div className={styles.test}>
        Example Component: blah
      </div>
    )
  }
}

class ExampleComponent2 extends Component {
  static propTypes = {
    text: PropTypes.string
  }

  render() {
    const {
      text
    } = this.props

    return (
      <div className={styles.test}>
        Example Component2: {text}
      </div>
    )
  }
}
class ExampleComponent3 extends Component {
  static propTypes = {
    text: PropTypes.string
  }

  render() {
    const {
      text
    } = this.props

    return (
      <div className={styles.test}>
        Example Component3: woottt
      </div>
    )
  }
}

export {
  ExampleComponent2,
  ExampleComponent3
}
