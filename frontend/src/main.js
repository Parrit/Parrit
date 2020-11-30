import './polyfills.js'
import './styles/main.scss'

import runProject from './project/runProject.js'
import runDashboard from './dashboard/runDashboard.js'
import runLogin from './login/runLogin.js'
import runError from './error/runError.js'
import runUrlMoved from './url-moved/runUrlMoved.js'

window.runProject = runProject
window.runDashboard = runDashboard
window.runLogin = runLogin
window.runError = runError
window.runUrlMoved = runUrlMoved
