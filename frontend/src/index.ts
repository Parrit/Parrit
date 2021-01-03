import "./polyfills.js";
import "./styles/main.scss";

import runProject from "./project/runProject";
import runDashboard from "./dashboard/runDashboard";
import runLogin from "./login/runLogin";
import runError from "./error/runError";

declare global {
  interface Window {
    runProject: (project: any) => void;
    runDashboard: VoidFunction;
    runLogin: (
      projectName: string,
      csrfParameterName: string,
      csrfToken: string
    ) => void;
    runError: VoidFunction;
  }
}

window.runProject = runProject;
window.runDashboard = runDashboard;
window.runLogin = runLogin;
window.runError = runError;
