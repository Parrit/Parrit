var React = require('react');

var Footer = require('shared/components/Footer.js');
var Button = require('shared/components/Button.js');

var Dashboard = React.createClass({
    propTypes: {
        loginErrorType: React.PropTypes.number.isRequired,
        login: React.PropTypes.func.isRequired,
        createProject: React.PropTypes.func.isRequired
    },

    render: function() {
        var loginErrorMessage = '';
        var loginUsernameErrorClassed = '';
        var loginPasswordErrorClassed = '';
        switch(this.props.loginErrorType) {
            case 0:
                break;
            case 400:
                loginErrorMessage = 'Keeaa!? That’s not your project name.';
                loginUsernameErrorClassed = 'error';
                break;
            case 401:
                loginErrorMessage = 'Polly want a cracker? Try another password.';
                loginPasswordErrorClassed = 'error';
                break;
            default:
                loginErrorMessage = 'Unknown error.';
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
                            <input type="text" placeholder="Project name" onChange={this.handleNewProjectName}/>
                            <input type="password" placeholder="Password" onChange={this.handleNewProjectPassword}/>
                            <Button className="button-blue" name="Create" type="submit"/>
                            <div className="error-message"></div>
                        </form>
                        <div className="dotted-line"></div>
                        <form className="form login-form" onSubmit={this.handleLogin}>
                            <h2 className="form-label">Login to Project</h2>
                            <input className={loginUsernameErrorClassed} type="text" placeholder="Project name" onChange={this.handleLoginName}/>
                            <input className={loginPasswordErrorClassed} type="password" placeholder="Password" onChange={this.handleLoginPassword}/>
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
