var React = require('react');

var Footer = require('shared/components/Footer.js');

var Error = React.createClass({
    render: function() {
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
});

module.exports = Error;
