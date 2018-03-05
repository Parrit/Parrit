import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'

import Footer from '../../shared/components/Footer.js'

class ProjectLogin extends React.Component {
    render() {
        return (
            <div className="layout-wrapper project-login-container">
                <main className="project-login">
                    <div className="lock-icon"/>
                    <h1 className="project-name">{this.props.projectName}</h1>
                    <form action="/login/project" method="POST">
                        <input type="hidden" name="username" value={this.props.projectName}/>
                        <input type="password" autoFocus name="password" placeholder="Password"/>
                        <input type="hidden" name={this.props.csrfParameterName} value={this.props.csrfToken}/>
                        <input type="submit" value="Login"/>
                    </form>
                </main>
                <Footer/>
            </div>
        )
    }
}

ProjectLogin.propTypes = exact({
    projectName: PropTypes.string.isRequired,
    csrfParameterName: PropTypes.string.isRequired,
    csrfToken: PropTypes.string.isRequired
})

export default ProjectLogin
