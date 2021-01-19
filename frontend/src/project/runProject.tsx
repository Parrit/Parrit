import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import { App } from "./components/App";
import { IProject } from "./interfaces/IProject";

//TODO: Remove this when the first thing that page does (componentDidMount on App) is to fetch the project data
export default function runProject(projectJSON: IProject) {
  ReactDOM.render(
    <App project={projectJSON} />,
    document.getElementById("reactRoot")
  );

  Modal.setAppElement("#reactRoot");
}
