import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Nav from './Nav'
import Main from './Main'
import Footer from './Footer'

const App = () => (
      <div className='App'>
        <Nav/>
          <Main/>
        <Footer />
      </div>
)

App.propTypes = {
  data: PropTypes.object,
  children: PropTypes.object,
  dispatch: PropTypes.func
}

function select(state) {
  return {
    data: state
  }
}

import { withRouter } from 'react-router-dom'
export default withRouter(connect(select)(App))

