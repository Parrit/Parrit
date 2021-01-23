import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import { Error } from "./components/Error";

export default function runError() {
  ReactDOM.render(<Error />, document.getElementById("reactRoot"));

  Modal.setAppElement("#reactRoot");
}
