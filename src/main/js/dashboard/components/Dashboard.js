const React = require('react');
const PropTypes = require('prop-types');

const Footer = require('shared/components/Footer.js');
const Button = require('shared/components/Button.js');

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newProjectName: '',
            newProjectPassword: '',
            loginProjectName: '',
            loginProjectPassword: ''
        };
    }

    render() {
        let newProjectErrorMessage = '';
        let newProjectNameErrorClass = '';

        let loginErrorMessage = '';
        let loginUsernameErrorClass = '';
        let loginPasswordErrorClass = '';

        switch (this.props.loginErrorType) {
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

        switch (this.props.newProjectErrorType) {
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
                    <div className="logo"/>
                    <div className="description">
                        A historical recommendation engine for daily pair rotation management, with an interactive
                        visual aide of each pairing team.
                    </div>
                    <div className="forms-container">
                        <form className="form new-form" onSubmit={this.createProjectWithName.bind(this)}>
                            <h2 className="form-label">Create Project</h2>
                            <input className={newProjectNameErrorClass} type="text" placeholder="Project name"
                                   onChange={this.handleNewProjectName.bind(this)}/>
                            <input type="password" placeholder="Password" onChange={this.handleNewProjectPassword.bind(this)}/>
                            <Button className="button-blue" name="Create" type="submit"/>
                            <div className="error-message">{newProjectErrorMessage}</div>
                        </form>
                        <div className="dotted-line"/>
                        <form className="form login-form" onSubmit={this.handleLogin.bind(this)}>
                            <h2 className="form-label">Login to Project</h2>
                            <input className={loginUsernameErrorClass} type="text" placeholder="Project name"
                                   onChange={this.handleLoginName.bind(this)}/>
                            <input className={loginPasswordErrorClass} type="password" placeholder="Password"
                                   onChange={this.handleLoginPassword.bind(this)}/>
                            <Button className="button-green" name="Login" type="submit"/>
                            <div className="error-message">{loginErrorMessage}</div>
                        </form>
                    </div>
                    <div className="feedback-container">
                        <div className="caption">What do you think of Parrit?</div>
                        <a href="https://docs.google.com/forms/d/1Xg5xKGv0uLcRLA3WR9CiwE3tfz6-5ocGcImq6_MgLB4/viewform"
                           target="_blank" className="text-link">Send feedback<span className="carrot"/></a>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    }

    handleLoginName(event) {
        this.setState({loginProjectName: event.target.value});
    }

    handleLoginPassword(event) {
        this.setState({loginProjectPassword: event.target.value});
    }

    handleLogin(event) {
        event.preventDefault();
        this.props.login(this.state.loginProjectName, this.state.loginProjectPassword)
    }

    handleNewProjectName(event) {
        this.setState({newProjectName: event.target.value});
    }

    handleNewProjectPassword(event) {
        this.setState({newProjectPassword: event.target.value});
    }

    createProjectWithName(event) {
        event.preventDefault();
        this.props.createProject(this.state.newProjectName, this.state.newProjectPassword)
    }
}

Dashboard.propTypes = {
    newProjectErrorType: PropTypes.number.isRequired,
    loginErrorType: PropTypes.number.isRequired,
    login: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired
};

module.exports = Dashboard;
