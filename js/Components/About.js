import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


class About extends Component {


    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }


    render() {
        const { profile } = this.props.data
        return (
            <section id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <h2>About</h2>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum urna ac ante sollicitudin sollicitudin. Quisque eleifend maximus arcu eget aliquam. Praesent tincidunt quis urna vitae aliquet. Morbi at sem rutrum, interdum erat in, viverra nisl. Nullam id bibendum dui. Aenean imperdiet nisi a sapien pretium dapibus. Proin est risus, convallis placerat purus vel, feugiat vulputate metus. Proin velit justo, condimentum et aliquam sit amet, viverra venenatis urna. Phasellus mauris nisi, rutrum non bibendum vel, rutrum sed dolor. Nam ultrices ornare dui, posuere hendrerit ipsum mattis et. Aliquam ultrices sed massa eu pretium. Donec massa nisi, cursus sit amet lacus ac, ullamcorper pharetra mauris.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


About.propTypes = {
    data: PropTypes.object
}


function select(state) {
    return {
        data: state
    }
}


// Wrap the component to inject dispatch and state into it
export default connect(
    select, {  }
)(About)