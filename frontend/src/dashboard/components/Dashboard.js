import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../../shared/components/Footer.js';
import Button from '../../shared/components/Button.js';

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
        return (
            <div className="layout-wrapper dashboard-container">
                <main className="dashboard-content-container">
                    <div className="dashboard-content">

                        <div className="logo"/>
                        <div className="description">
                            A historical recommendation engine for daily pair rotation management, with an interactive
                            visual aide of each pairing team.
                        </div>

                        <div className="forms-container">

                            <form className="form new-form" onSubmit={this.createProjectWithName.bind(this)}>
                                <h2 className="form-label">Create Project</h2>
                                <input className={this.props.newProjectErrorName ? 'error' : ''} type="text"
                                    placeholder="Project name" onChange={this.handleNewProjectName.bind(this)}/>
                                <input className={this.props.newProjectErrorPassword ? 'error' : ''} type="password"
                                    placeholder="Password" onChange={this.handleNewProjectPassword.bind(this)}/>
                                <Button className="button-blue" name="Create" type="submit"/>
                                <div className="error-message">{this.props.newProjectErrorMessage}</div>
                            </form>

                            <div className="dotted-line"/>

                            <form className="form login-form" onSubmit={this.handleLogin.bind(this)}>
                                <h2 className="form-label">Login to Project</h2>
                                <input className={this.props.loginErrorName ? 'error' : ''} type="text"
                                    placeholder="Project name" onChange={this.handleLoginName.bind(this)}/>
                                <input className={this.props.loginErrorPassword ? 'error' : ''} type="password"
                                    placeholder="Password" onChange={this.handleLoginPassword.bind(this)}/>
                                <Button className="button-green" name="Login" type="submit"/>
                                <div className="error-message">{this.props.loginErrorMessage}</div>
                            </form>

                        </div>

                        <div className="feedback-container">
                            <div className="caption">What do you think of Parrit?</div>
                            <a className="text-link" href="https://goo.gl/forms/ZGqUyZDEDSWqZVBP2"
                                target="_blank" rel="noopener">Send feedback<span className="carrot"/></a>
                        </div>

                    </div>
                </main>

                <Footer/>
            </div>
        )
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
    newProjectErrorMessage: PropTypes.string,
    newProjectErrorName: PropTypes.bool.isRequired,
    newProjectErrorPassword: PropTypes.bool.isRequired,
    loginErrorMessage: PropTypes.string,
    loginErrorName: PropTypes.bool.isRequired,
    loginErrorPassword: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired
};

export default Dashboard;
