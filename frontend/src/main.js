import './polyfills.js'
import './styles/main.scss'

import runProject from './project/runProject.js'
import runDashboard from './dashboard/runDashboard.js'
import runLogin from './login/runLogin.js'
import runError from './error/runError.js'

window.runProject = runProject
window.runDashboard = runDashboard
window.runLogin = runLogin
window.runError = runError
