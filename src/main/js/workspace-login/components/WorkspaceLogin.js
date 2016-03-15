var React = require('react');
var ReactDOM = require('react-dom');

var Footer = require('shared/components/Footer.js');

var WorkspaceLogin = React.createClass({
    propTypes: {
        workspaceName: React.PropTypes.string.isRequired,
        csrfParameterName: React.PropTypes.string.isRequired,
        csrfToken: React.PropTypes.string.isRequired
    },

    componentDidMount: function() {
        setTimeout(function() {
            ReactDOM.findDOMNode(this.refs.passwordInput).focus();
        }.bind(this), 0);
    },

    render: function() {
        return <div className="workspace-login-container">
            <div className="workspace-login">
                <div className="lock-icon"></div>
                <h1 className="workspace-name">{this.props.workspaceName}</h1>
                <form action="/login/workspace" method="POST">
                    <input type="hidden" name="username" value={this.props.workspaceName}/>
                    <input type="password" ref="passwordInput" name="password" placeholder="Password"/>
                    <input type="hidden" name={this.props.csrfParameterName} value={this.props.csrfToken}/>
                    <input type="submit" value="Login"/>
                </form>
            </div>
            <Footer/>
        </div>
    }
});

module.exports = WorkspaceLogin;
