import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'

import { doLogin } from '../actions'

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange(event) {
        if (event.target.id === "username") {
            this.setState({
                username :  event.target.value
            });
        } else if (event.target.id === "password") {
            this.setState({
                password :  event.target.value
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        const { username, password } = this.state
        this.setState({
            currentlySending: true
        })
        this.props.doLogin({ username, password })
    }

    render() {
        const {message, isFetching} = this.props

        return (
        <div className="container">
            <div className="row">
                <div className="col-sm-4 ">
                    <form className="form-signin" onSubmit={this.handleSubmit} style={{ opacity: isFetching ? 0.5 : 1 }}>
                        <h2 className="form-signin-heading">Login</h2>
                        <label className="sr-only">Email address</label>
                        <input
                            type='text'
                            id='username'
                            placeholder='Your user name (typically email)'
                            onChange={this.handleChange}
                            autoCorrect='off'
                            autoCapitalize='off'
                            className="form-control input-sm"
                            spellCheck='false'
                            required />
                        <label className="sr-only">Password</label>
                        <input
                            id='password'
                            type='password'
                            className="form-control input-sm"
                            placeholder='••••••••••'
                            onChange={this.handleChange}
                            required />
                        <button className="btn btn-default" type="submit">
                            Login to AWS
                        </button>
                    </form>
                    <div className="errorMsg">{(message) ? message : ""}</div>
                </div>
            </div>
        </div>)
    }

}

LoginForm.propTypes = {
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
    select, {doLogin}
)(LoginForm)
