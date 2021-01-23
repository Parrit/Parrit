import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { ApiProvider } from "../shared/helpers/ApiContext";

import { Dashboard } from "./components/Dashboard";

export default function runDashboard() {
  ReactDOM.render(
    <ApiProvider>
      <Dashboard />
    </ApiProvider>,
    document.getElementById("reactRoot")
  );

  Modal.setAppElement("#reactRoot");
}
