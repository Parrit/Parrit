import classNames from "classnames";
import React, { useContext } from "react";
import { AppContext } from "./App";

export const SystemAlert: React.FC = () => {
  const { systemAlert, setSystemAlert } = useContext(AppContext);

  const classes = classNames({
    "system-alert": true,
    "system-alert-closed": !systemAlert,
  });

  return (
    <div className={classes} data-testid="system-alert">
      <div className="message">{systemAlert}</div>
      <div role='button' className="close" onClick={() => setSystemAlert(undefined)}>
        <div className="icon" />
      </div>
    </div>
  );
};
