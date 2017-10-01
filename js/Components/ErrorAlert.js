import React, { Component } from 'react'

class ErrorAlert extends Component {

    render() {
        const { message } = this.props
        return (message) ? (<div className='alert alert-danger'>{message} </div>) : (<div></div>)
    }
}

export default ErrorAlert