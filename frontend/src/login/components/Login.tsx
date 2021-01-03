import React from "react";
import { Footer } from "../../shared/components/Footer";

interface Props {
  projectName: string;
  csrfParameterName: string;
  csrfToken: string;
}

export const Login: React.FC<Props> = (props) => {
  return (
    <div className="layout-wrapper login-container">
      <main className="login">
        <div className="lock-icon" />
        <h1 className="project-name">{props.projectName}</h1>
        <form action="/api/login/project" method="POST">
          <input type="hidden" name="username" value={props.projectName} />
          <input
            type="password"
            autoFocus
            name="password"
            placeholder="Password"
          />
          <input
            type="hidden"
            name={props.csrfParameterName}
            value={props.csrfToken}
          />
          <input type="submit" value="Login" />
        </form>
      </main>
      <Footer />
    </div>
  );
};
