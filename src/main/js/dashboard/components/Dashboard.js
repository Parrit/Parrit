var React = require('react');

var NewWorkspaceForm = require('shared/components/NewWorkspaceForm.js');
var Buttons = require('shared/components/Buttons.js');
var PrimaryButton = Buttons.PrimaryButton;

var Dashboard = React.createClass({
    propTypes: {
        login: React.PropTypes.func.isRequired,
        createWorkspace: React.PropTypes.func.isRequired
    },

    render: function() {
        return <div className="dashboard">
            <div className="form-group">
                <input type="text" className="form-control" placeholder="New Workspace Name" onChange={this.handleNewWorkspaceName}/>
                <input type="text" className="form-control" placeholder="Password" onChange={this.handleNewWorkspacePassword}/>
                <PrimaryButton name="Add Workspace" clickFunction={this.createWorkspaceWithName}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Workspace Name" onChange={this.handleLoginName}/>
                <input type="text" className="form-control" placeholder="Password" onChange={this.handleLoginPassword}/>
                <PrimaryButton name="Login" clickFunction={this.handleLogin}/>
            </div>
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
