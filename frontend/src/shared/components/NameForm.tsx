import React, { useState } from "react";
import classNames from "classnames";

interface Props {
  formTitle: string;
  confirmFunction: (name: string) => void;
  cancelFunction: VoidFunction;
  errorMessage?: string;
}

export const NameForm: React.FC<Props> = (props) => {
  const [name, setName] = useState("");

  const inputClasses = classNames({
      "form-control": true,
      "error": props.errorMessage != undefined
  })

  const onKeyDownHandler = (event: any) => {
      if (event.key === 'Enter') {
        props.confirmFunction(name);
      }
  }

  return (
    <form onSubmit={(e) => {e.preventDefault()}}>
      <div className="form-header">
        <h2 className="form-title">{props.formTitle}</h2>
        <div className="form-cancel" onClick={props.cancelFunction} />
      </div>

      <div className="error-message">{props.errorMessage}</div>

      <input
        className={inputClasses}
        autoFocus
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        onKeyDown={onKeyDownHandler}
      />

      <div className="buttons">
        <button type="button" className="button-blue" onClick={() => props.confirmFunction(name)}>
          OK
        </button>
        <button
          type="button"
          onClick={props.cancelFunction}
          className="button-red"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NameForm;
