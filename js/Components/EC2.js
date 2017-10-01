import React, { Component } from 'react'

import ErrorAlert from './ErrorAlert'

class EC2 extends Component {

    render() {
        const { instanceInfo, message } = this.props
        let displayData = (message) ? ' ' : instanceInfo
        return (
            <div className='panel'>
                EC2 Instance Info
                <div className='well'>
                    <div className='s3Cell'>
                        {(instanceInfo) ? instanceInfo : (<div>Waiting for EC2 launch...</div>)}
                        {(message) ? <ErrorAlert message={message}/> : ('')}
                    </div>
                </div>
             </div>) 
    }
}

export default EC2