import React, { Component } from 'react';

class Footer extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {
        return (
            <footer className="text-left">
                <div className="footer-above">
                
                </div>
            </footer>
        );
    }
}


export default Footer;