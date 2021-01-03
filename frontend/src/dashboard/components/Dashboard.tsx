import React, { FormEvent, useState } from "react";
import { Footer } from "../../shared/components/Footer.js";
import { Button } from "../../shared/components/Button.js";
import {
  postLoginAndRedirect,
  postProject,
} from "../../shared/helpers/DatabaseHelpers.js";
import { ErrorResponse } from "../../error.js";

interface Target {
  value: string;
}

interface Event {
  target: Target;
  preventDefault: VoidFunction;
}

export const Dashboard: React.FC = () => {
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectPassword, setNewProjectPassword] = useState("");
  const [loginProjectName, setLoginProjectName] = useState("");
  const [loginProjectPassword, setLoginProjectPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState<{
    [key: string]: string;
  }>({});

  const handleLoginName = (event: Event) => {
    setLoginProjectName(event.target.value);
  };

  const handleLoginPassword = (event: Event) => {
    setLoginProjectPassword(event.target.value);
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postLoginAndRedirect(loginProjectName, loginProjectPassword);
  };

  const handleNewProjectName = (event: Event) => {
    setNewProjectName(event.target.value);
  };

  const handleNewProjectPassword = (event: Event) => {
    setNewProjectPassword(event.target.value);
  };

  const createProjectWithName = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postProject(newProjectName, newProjectPassword)
      .then(() => {
        postLoginAndRedirect(newProjectName, newProjectPassword);
      })
      .catch((errorResponse: ErrorResponse) => {
        console.log("fieldErrors", errorResponse);
        setErrorResponse(errorResponse);
      });
  };

  return (
    <div className="layout-wrapper dashboard-container">
      <main className="dashboard-content-container">
        <div className="dashboard-content">
          <div className="logo" />
          <div className="description">
            A historical recommendation engine for daily pair rotation
            management, with an interactive visual aide of each pairing team.
          </div>

          <div className="forms-container">
            <form className="form new-form" onSubmit={createProjectWithName}>
              <h2 className="form-label">Create Project</h2>
              <input
                className={errorResponse["name"] ? "error" : ""}
                type="text"
                placeholder="Project name"
                onChange={handleNewProjectName}
              />
              <input
                className={errorResponse["password"] ? "error" : ""}
                type="password"
                placeholder="Password"
                onChange={handleNewProjectPassword}
              />
              <Button className="button-blue" name="Create" type="submit" />
              <div className="error-message">
                {errorResponse["name"] ?? errorResponse["password"]}
              </div>
            </form>

            <div className="dotted-line" />

            <form className="form login-form" onSubmit={handleLogin}>
              <h2 className="form-label">Login to Project</h2>
              <input
                className={errorResponse["name"] ? "error" : ""}
                type="text"
                placeholder="Project name"
                onChange={handleLoginName}
              />
              <input
                className={errorResponse["password"] ? "error" : ""}
                type="password"
                placeholder="Password"
                onChange={handleLoginPassword}
              />
              <Button className="button-green" name="Login" type="submit" />
              <div className="error-message">
                {errorResponse["name"] ?? errorResponse["password"]}
              </div>
            </form>
          </div>

          <div className="feedback-container">
            <div className="caption">What do you think of Parrit?</div>
            <a
              className="text-link"
              href="https://goo.gl/forms/ZGqUyZDEDSWqZVBP2"
              target="_blank"
              rel="noopener"
            >
              Send feedback
              <span className="carrot" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
