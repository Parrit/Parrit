var React = require('react');

var Footer = require('shared/components/Footer.js');
var Button = require('shared/components/Button.js');

var Dashboard = React.createClass({
    propTypes: {
        loginErrorMessage: React.PropTypes.string.isRequired,
        login: React.PropTypes.func.isRequired,
        createWorkspace: React.PropTypes.func.isRequired
    },

    render: function() {
        var loginNameErrorClassed = '';
        var loginPasswordErrorClassed = '';
        if(this.props.loginErrorMessage.length) {
            if(this.props.loginErrorMessage.indexOf('project name') !== -1) {
                loginNameErrorClassed = 'error';
            }
            else if(this.props.loginErrorMessage.indexOf('password') !== -1) {
                loginPasswordErrorClassed = 'error';
            }
        }

        return <div className="dashboard-container">
            <div className="dashboard-content-container">
                <div className="dashboard-content">
                    <div className="logo"></div>
                    <div className="description">
                        A recommendation engine for daily pair rotation management, with an interactive visual aide of each pairing team.
                    </div>
                    <div className="forms-container">
                        <form className="form new-form" onSubmit={this.createWorkspaceWithName}>
                            <h2 className="form-label">Create Project</h2>
                            <input type="text" placeholder="Project name" onChange={this.handleNewWorkspaceName}/>
                            <input type="password" placeholder="Password" onChange={this.handleNewWorkspacePassword}/>
                            <Button className="button-blue" name="Create" type="submit"/>
                            <div className="error-message"></div>
                        </form>
                        <div className="dotted-line"></div>
                        <form className="form login-form" onSubmit={this.handleLogin}>
                            <h2 className="form-label">Login to Project</h2>
                            <input className={loginNameErrorClassed} type="text" placeholder="Project name" onChange={this.handleLoginName}/>
                            <input className={loginPasswordErrorClassed} type="password" placeholder="Password" onChange={this.handleLoginPassword}/>
                            <Button className="button-green" name="Login" type="submit"/>
                            <div className="error-message">{this.props.loginErrorMessage}</div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    },

    getInitialState: function() {
        return {
            newWorkspaceName: '',
            newWorkspacePassword: '',
            loginWorkspaceName: '',
            loginWorkspacePassword: ''
        };
    },

    handleLoginName: function(event) {
        this.setState({loginWorkspaceName: event.target.value});
    },

    handleLoginPassword: function(event) {
        this.setState({loginWorkspacePassword: event.target.value});
    },

    handleLogin: function(event) {
        event.preventDefault();
        this.props.login(this.state.loginWorkspaceName, this.state.loginWorkspacePassword)
    },

    handleNewWorkspaceName: function(event) {
        this.setState({newWorkspaceName: event.target.value});
    },

    handleNewWorkspacePassword: function(event) {
        this.setState({newWorkspacePassword: event.target.value});
    },

    createWorkspaceWithName: function(event) {
        event.preventDefault();
        this.props.createWorkspace(this.state.newWorkspaceName, this.state.newWorkspacePassword)
    }
});

module.exports = Dashboard;
