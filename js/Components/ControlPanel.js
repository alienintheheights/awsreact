
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'

import LoadingButton from './LoadingButton'
import UserInfo from './UserInfo'
import S3 from './S3'
import EC2 from './EC2'
import ErrorAlert from './ErrorAlert'
import AppLinks from './AppLinks'

import { getS3, launchEC2 } from '../actions'

class ControlPanel extends Component {

    constructor(props) {
        super(props)
        this.props.getS3({})
        this.props.launchEC2({})
    }

    render() {
        const { s3ErrorMsg, ec2ErrorMsg, s3, ec2, creds } = this.props.data
        return (
            <div className='row'>
                <div className='col-xs-6'>
                    <AppLinks />
                </div>
                <div className='col-xs-6'>
                    <UserInfo token = {creds.jwt}/>
                    <S3 bucketData = {s3} message={s3ErrorMsg}/>
                    <EC2 instanceInfo = {ec2} message={ec2ErrorMsg}/>
                </div>
            </div>
        )
    }
}

ControlPanel.propTypes = {
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
    select, { getS3, launchEC2 }
)(ControlPanel)
