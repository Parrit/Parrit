const React = require('react');

const Footer = require('shared/components/Footer.js');

class Error extends React.Component {
    render() {
        return <div className="error-container">
            <div className="error-image-wrapper">
                <div className="parrit-talk-bubble">
                    <h1 className="error-message">What the heck?!</h1>
                    <a className="text-link home-page-link" href="/">Get me out of here<span className="carrot"/></a>
                </div>
            </div>
            <Footer/>
        </div>
    }
}

module.exports = Error;
