import React, { Component } from 'react';

class Header extends Component {
    
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    
    render() {
        return (
            <header>
                <div className="container" id="maincontent" tabIndex="-1">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="intro-text">
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}


export default Header;