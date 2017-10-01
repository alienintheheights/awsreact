import React, { Component } from 'react'

class AppLinks extends Component {

    render() {
        return (
            <div className='list-group'>
                <a href='/link1' className='list-group-item'>Link 1</a>
                <a href='/link2' className='list-group-item'>Link 2</a>
            </div>)
    }
}

export default AppLinks