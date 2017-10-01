import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Header from './Header'
import Footer from './Footer'
import ControlPanel from './ControlPanel'
import Login from './Login'

import { withRouter } from 'react-router-dom'

class Home extends Component {

  render() {
    return (
      <div id="home">
        <Header />
        <Login dispatch={this.props.dispatch} data={this.props.data}/>
      </div>
    )
  }
}

Home.propTypes = {
  data: PropTypes.object,
  children: PropTypes.object,
  dispatch: PropTypes.func
}

function select(state) {
  return {
    data: state
  }
}

export default withRouter(connect(select)(Home))