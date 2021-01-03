import React from "react";

interface Props {
  systemAlertMessage?: string;
  close: VoidFunction;
}

export const SystemAlert: React.FC<Props> = (props) => {
  const message = props.systemAlertMessage;

  const className =
    message === undefined ? "system-alert-close" : "system-alert";

  return (
    <div className={className}>
      <div className="message">{message}</div>
      <div className="close" onClick={props.close}>
        <div className="icon" />
      </div>
    </div>
  );
};
