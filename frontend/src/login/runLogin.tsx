import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { Login } from "./components/Login";

export default function runLogin(
  projectName: string,
  csrfParameterName: string,
  csrfToken: string
) {
  ReactDOM.render(
    <Login
      projectName={projectName}
      csrfParameterName={csrfParameterName}
      csrfToken={csrfToken}
    />,
    document.getElementById("reactRoot")
  );

  Modal.setAppElement("#reactRoot");
}
