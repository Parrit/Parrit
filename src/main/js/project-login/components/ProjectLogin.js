const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');

const Footer = require('shared/components/Footer.js');

class ProjectLogin extends React.Component {
    componentDidMount() {
        setTimeout(function() {
            ReactDOM.findDOMNode(this.refs.passwordInput).focus();
        }.bind(this), 0);
    }

    render() {
        return <div className="project-login-container">
            <div className="project-login">
                <div className="lock-icon"/>
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
}

ProjectLogin.propTypes = {
    projectName: PropTypes.string.isRequired,
    csrfParameterName: PropTypes.string.isRequired,
    csrfToken: PropTypes.string.isRequired
};

module.exports = ProjectLogin;
