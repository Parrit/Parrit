import React from "react";
import classNames from "classnames";
import { postLogout } from "../../shared/helpers/DatabaseHelpers";

interface Props {
  isPairingHistoryPanelOpen: boolean;
  setPairingHistoryPanelOpen: (isOpen: boolean) => void;
}

export const Header: React.FC<Props> = (props) => {
  const pairingHistoryOpen = props.isPairingHistoryPanelOpen;
  const classes = classNames({
    history: true,
    open: pairingHistoryOpen,
  });

  const openPairingHistoryPanel = () => {
    props.setPairingHistoryPanelOpen(true);
  };

  const closePairingHistoryPanel = () => {
    props.setPairingHistoryPanelOpen(false);
  };

  const logout = () => {
    postLogout;
  };

  return (
    <header>
      <a href="/" className="header-logo" />
      <div className="links">
        <h3 className="logout" onClick={logout}>
          LOGOUT
        </h3>
        <h3 className="feedback">
          <a
            href="https://goo.gl/forms/ZGqUyZDEDSWqZVBP2"
            target="_blank"
            rel="noopener"
          >
            feedback
          </a>
        </h3>
        <h3
          className={classes}
          onClick={
            pairingHistoryOpen
              ? closePairingHistoryPanel
              : openPairingHistoryPanel
          }
        >
          HISTORY
          <div
            className={
              pairingHistoryOpen ? "history-caret-right" : "history-caret-left"
            }
          />
        </h3>
      </div>
    </header>
  );
};
