var React = require('react');

var Footer = require('shared/components/Footer.js');

var Error = React.createClass({
    render: function() {
        return <div className="error-container">
            <div className="error-image-wrapper">
                <div className="parrit-talk-bubble">
                    <div className="error-message">What the heck?!</div>
                    <a className="home-page-link" href="/">GET ME OUT OF HERE<span className="carrot"/></a>
                </div>
            </div>
            <Footer/>
        </div>
    }
});

module.exports = Error;
