import React, { Component } from 'react'

import ErrorAlert from './ErrorAlert'

class S3 extends Component {

    render() {
        const { bucketData, message } = this.props
        let displayData = (message) ? ' ' : bucketData
        return (
            <div className='panel'>
                S3 Bucket Data
                <div className='well'>
                    <div className='s3Cell'>
                        {(displayData) ? displayData : (<div>Waiting for S3 data...</div>)}
                        {(message) ? <ErrorAlert message={message}/> : ('')}
                    </div>
                </div>
             </div>) 
    }
}

export default S3