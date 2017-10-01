import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import NavTitle from './NavTitle'

class Nav extends Component {

    preAuthNav() {
        return (
            <nav id="mainNav" className="navbar navbar-default navbar-fixed-top navbar-custom">
                <div className="container">
                    <div className="navbar-header page-scroll">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span> Menu <i className="fa fa-bars"></i>
                        </button>
                        <NavTitle/>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="hidden">
                                <a href="/#"></a>
                            </li>
                            <li className="page-scroll">
                                <a href="/#about">About</a>
                            </li>
                            <li className="page-scroll">
                                <a href="/#login">Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

    authNav() {
        return (
            <nav id="mainNav" className="navbar navbar-default navbar-fixed-top navbar-custom">
                <div className="container">
                    <div className="navbar-header page-scroll">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span> Menu <i className="fa fa-bars"></i>
                        </button>
                        <NavTitle/>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="hidden">
                                <a href="/#"></a>
                            </li>

                            <li className="page-scroll">
                                <a href="/#about">About</a>
                            </li>
                            <li className="page-scroll">
                                <a href="/#logout">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

    render() {
        const { loggedIn } = this.props.data
        return (loggedIn) ? this.authNav() : this.preAuthNav()
    }
}

Nav.propTypes = {
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
    select, {}
)(Nav)