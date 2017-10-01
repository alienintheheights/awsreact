import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'

import { changePassword } from '../actions'

class ChangePassword extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            password: '',
            confirm_password: ''
        }
    }

    handleChange(event) {
        if (event.target.id === "password") {
            this.setState({
                password :  event.target.value
            });
        } else if (event.target.id === "confirm_password") {
            this.setState({
                confirm_password :  event.target.value
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        const { password, confirm_password } = this.state
        if (password != confirm_password) {
            this.setState({
                errorMessage: "Passwords Don't Match"
            })
            return
        }
        const {creds} = this.props
        this.setState({
            currentlySending: true
        })
        this.props.changePassword({ 
                creds, 
                oldPassword : creds.oldPassword, 
                password })
    }

    render() {
        const {message, isFetching, creds} = this.props

        return (
        <div className="container">
            <div className="row">
                <div className="col-sm-4 ">
                    <form className="form-signin" onSubmit={this.handleSubmit} style={{ opacity: isFetching ? 0.5 : 1 }}>
                        <h2 className="form-signin-heading">Change Password</h2>
                        <label className="sr-only">Password</label>
                        <input
                            type='type'
                            id='password'
                            placeholder='New Password'
                            onChange={this.handleChange}
                            autoCorrect='off'
                            autoCapitalize='off'
                            className="form-control input-sm"
                            spellCheck='false'
                            required />
                        <label className="sr-only">Confirm Password</label>
                        <input
                            id='confirm_password'
                            type='type'
                            className="form-control input-sm"
                            placeholder='Confirm Password'
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

ChangePassword.propTypes = {
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
    select, {changePassword}
)(ChangePassword)
