var React = require('react');

var Footer = require('shared/components/Footer.js');
var Button = require('shared/components/Button.js');

var Dashboard = React.createClass({
    propTypes: {
        newProjectErrorType: React.PropTypes.number.isRequired,
        loginErrorType: React.PropTypes.number.isRequired,
        login: React.PropTypes.func.isRequired,
        createProject: React.PropTypes.func.isRequired
    },

    render: function() {
        var newProjectErrorMessage = '';
        var newProjectNameErrorClass = '';

        var loginErrorMessage = '';
        var loginUsernameErrorClass = '';
        var loginPasswordErrorClass = '';

        switch(this.props.loginErrorType) {
            case 0:
                break;
            case 400:
                loginErrorMessage = 'Keeaa!? That’s not your project name.';
                loginUsernameErrorClass = 'error';
                break;
            case 401:
                loginErrorMessage = 'Polly want a cracker? Try another password.';
                loginPasswordErrorClass = 'error';
                break;
            default:
                loginErrorMessage = 'Unknown error.';
        }

        switch(this.props.newProjectErrorType) {
            case 0:
                break;
            case 406:
                newProjectErrorMessage = 'Uh oh. Your project name is too long, try less than 36 characters.';
                newProjectNameErrorClass = 'error';
                break;
            default:
                newProjectErrorMessage = 'Unknown error.';
        }

        return <div className="dashboard-container">
            <div className="dashboard-content-container">
                <div className="dashboard-content">
                    <div className="logo"></div>
                    <div className="description">
                        A recommendation engine for daily pair rotation management, with an interactive visual aide of each pairing team.
                    </div>
                    <div className="forms-container">
                        <form className="form new-form" onSubmit={this.createProjectWithName}>
                            <h2 className="form-label">Create Project</h2>
                            <input className={newProjectNameErrorClass} type="text" placeholder="Project name" onChange={this.handleNewProjectName}/>
                            <input type="password" placeholder="Password" onChange={this.handleNewProjectPassword}/>
                            <Button className="button-blue" name="Create" type="submit"/>
                            <div className="error-message">{newProjectErrorMessage}</div>
                        </form>
                        <div className="dotted-line"></div>
                        <form className="form login-form" onSubmit={this.handleLogin}>
                            <h2 className="form-label">Login to Project</h2>
                            <input className={loginUsernameErrorClass} type="text" placeholder="Project name" onChange={this.handleLoginName}/>
                            <input className={loginPasswordErrorClass} type="password" placeholder="Password" onChange={this.handleLoginPassword}/>
                            <Button className="button-green" name="Login" type="submit"/>
                            <div className="error-message">{loginErrorMessage}</div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    },

    getInitialState: function() {
        return {
            newProjectName: '',
            newProjectPassword: '',
            loginProjectName: '',
            loginProjectPassword: ''
        };
    },

    handleLoginName: function(event) {
        this.setState({loginProjectName: event.target.value});
    },

    handleLoginPassword: function(event) {
        this.setState({loginProjectPassword: event.target.value});
    },

    handleLogin: function(event) {
        event.preventDefault();
        this.props.login(this.state.loginProjectName, this.state.loginProjectPassword)
    },

    handleNewProjectName: function(event) {
        this.setState({newProjectName: event.target.value});
    },

    handleNewProjectPassword: function(event) {
        this.setState({newProjectPassword: event.target.value});
    },

    createProjectWithName: function(event) {
        event.preventDefault();
        this.props.createProject(this.state.newProjectName, this.state.newProjectPassword)
    }
});

module.exports = Dashboard;
