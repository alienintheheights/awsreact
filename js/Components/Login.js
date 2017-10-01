
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import LoadingButton from './LoadingButton'
import { Redirect } from 'react-router-dom'
import LoginForm from './LoginForm'
import ControlPanel from './ControlPanel'
import ChangePassword from './ChangePassword'

class Login extends Component {
  

    render() {
        const {loggedIn, creds, authErrorMsg, isFetching, passwordRedirect} = this.props.data
        if (passwordRedirect) return (<ChangePassword creds={creds} message={authErrorMsg} isFetching={isFetching}/>)
        return (loggedIn && creds) ? (<ControlPanel/>) : (<LoginForm message={authErrorMsg} isFetching={isFetching}/>)
    }
}


Login.propTypes = {
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
    select, { }
)(Login)
