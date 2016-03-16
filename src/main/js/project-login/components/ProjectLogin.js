var React = require('react');
var ReactDOM = require('react-dom');

var Footer = require('shared/components/Footer.js');

var ProjectLogin = React.createClass({
    propTypes: {
        projectName: React.PropTypes.string.isRequired,
        csrfParameterName: React.PropTypes.string.isRequired,
        csrfToken: React.PropTypes.string.isRequired
    },

    componentDidMount: function() {
        setTimeout(function() {
            ReactDOM.findDOMNode(this.refs.passwordInput).focus();
        }.bind(this), 0);
    },

    render: function() {
        return <div className="project-login-container">
            <div className="project-login">
                <div className="lock-icon"></div>
                <h1 className="project-name">{this.props.projectName}</h1>
                <form action="/login/project" method="POST">
                    <input type="hidden" name="username" value={this.props.projectName}/>
                    <input type="password" ref="passwordInput" name="password" placeholder="Password"/>
                    <input type="hidden" name={this.props.csrfParameterName} value={this.props.csrfToken}/>
                    <input type="submit" value="Login"/>
                </form>
            </div>
            <Footer/>
        </div>
    }
});

module.exports = ProjectLogin;
