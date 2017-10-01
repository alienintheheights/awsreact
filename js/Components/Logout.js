import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { doLogout } from '../actions'

class Logout extends Component {

  componentWillMount() {
    this.props.doLogout()
  }

  render() {
    return <Redirect to="/"/>
  }
}

Logout.propTypes = {
    data: PropTypes.object,
    dispatcher: PropTypes.func
}


function select(state) {
    return {
        data: state
    }
}


// Wrap the component to inject dispatch and state into it
export default connect(
    select, { doLogout }
)(Logout)
