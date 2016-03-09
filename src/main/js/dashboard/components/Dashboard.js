var React = require('react');

var NewWorkspaceForm = require('shared/components/NewWorkspaceForm.js');
var Footer = require('shared/components/Footer.js');
var Buttons = require('shared/components/Buttons.js');
var PrimaryButton = Buttons.PrimaryButton;

var Dashboard = React.createClass({
    propTypes: {
        login: React.PropTypes.func.isRequired,
        createWorkspace: React.PropTypes.func.isRequired
    },

    render: function() {
        return <div className="dashboard-container">
            <div className="dashboard-content-container">
                <div className="dashboard-content">
                    <div className="logo"></div>
                    <div className="description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
                    </div>
                    <div className="forms-container">
                        <div className="form">
                            <div className="form-label">Create Project</div>
                            <input type="text" placeholder="Project/URL name" onChange={this.handleNewWorkspaceName}/>
                            <input type="password" placeholder="Password" onChange={this.handleNewWorkspacePassword}/>
                            <PrimaryButton name="Create" clickFunction={this.createWorkspaceWithName}/>
                        </div>
                        <div className="form">
                            <div className="form-label">Sign In</div>
                            <input type="text" placeholder="Project/URL name" onChange={this.handleLoginName}/>
                            <input type="password" placeholder="Password" onChange={this.handleLoginPassword}/>
                            <PrimaryButton name="Sign In" clickFunction={this.handleLogin}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    },

    getInitialState: function() {
        return {
            loginWorkspaceName: '',
            loginWorkspacePassword: '',
            newWorkspaceName: '',
            newWorkspacePassword: ''
        };
    },

    handleLoginName: function(event) {
        this.setState({loginWorkspaceName: event.target.value});
    },

    handleLoginPassword: function(event) {
        this.setState({loginWorkspacePassword: event.target.value});
    },

    handleNewWorkspaceName: function(event) {
        this.setState({newWorkspaceName: event.target.value});
    },

    handleNewWorkspacePassword: function(event) {
        this.setState({newWorkspacePassword: event.target.value});
    },

    handleLogin: function() {
        this.props.login(this.state.loginWorkspaceName, this.state.loginWorkspacePassword)
    },

    createWorkspaceWithName: function() {
        this.props.createWorkspace(this.state.newWorkspaceName, this.state.newWorkspacePassword)
    }
});

module.exports = Dashboard;
