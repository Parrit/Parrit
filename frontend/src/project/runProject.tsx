import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import { App } from "./components/App";

//TODO: Remove this when the first thing that page does (componentDidMount on App) is to fetch the project data
export default function runProject(projectJSON: IProject) {
  console.log("projectJSON", projectJSON);
  ReactDOM.render(
    <App project={projectJSON} />,
    document.getElementById("reactRoot")
  );

  Modal.setAppElement("#reactRoot");
}
