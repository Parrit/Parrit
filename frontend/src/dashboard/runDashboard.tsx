import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import { Dashboard } from "./components/Dashboard";

export default function runDashboard() {
  ReactDOM.render(<Dashboard />, document.getElementById("reactRoot"));

  Modal.setAppElement("#reactRoot");
}
