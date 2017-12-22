import './polyfills.js'
import './styles/main.scss'

import runProject from './project/runProject.js';
import runDashboard from './dashboard/runDashboard.js';
import runProjectLogin from './project-login/runProjectLogin.js';
import runError from './error/runError.js';

window.runProject = runProject;
window.runDashboard = runDashboard;
window.runProjectLogin = runProjectLogin;
window.runError = runError;
