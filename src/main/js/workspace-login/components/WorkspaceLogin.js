var React = require('react');

var Footer = require('shared/components/Footer.js');

var WorkspaceLogin = React.createClass({
    propTypes: {
        workspaceName: React.PropTypes.string.isRequired,
        csrfParameterName: React.PropTypes.string.isRequired,
        csrfToken: React.PropTypes.string.isRequired
    },

    render: function() {
        return <div className="workspace-login-container">
            <div className="workspace-login">
                <div className="lock-icon"></div>
                <div className="workspace-name">{this.props.workspaceName}</div>
                <form action="/login/workspace" method="POST">
                    <input type="hidden" name="username" value={this.props.workspaceName}/>
                    <input type="password" name="password" placeholder="Password"/>
                    <input type="hidden" name={this.props.csrfParameterName} value={this.props.csrfToken}/>
                    <input type="submit" value="Login"/>
                </form>
            </div>
            <Footer/>
        </div>
    }
});

module.exports = WorkspaceLogin;
