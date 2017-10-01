import React, { Component } from 'react'

class UserInfo extends Component {

    render() {
        const { token } = this.props
        return (
            <div className='panel'>
                User Info
                <div className='well'>
                    <div className='jwtCell'>
                        {(token) ? token : (<div>Waiting for data...</div>)}
                    </div>
                </div>
             </div>) 
    }
}

export default UserInfo