import React, { useState } from "react";

interface Props {
  formTitle: string;
  confirmFunction: (name: string) => void;
  cancelFunction: VoidFunction;
  errorMessage?: string;
}

export const NameForm: React.FC<Props> = (props) => {
  const [name, setName] = useState("");

  const handleChange = (event: any) => {
    setName(event.target.value);
  };

  const submit = (e: any) => {
    e.preventDefault();
    props.confirmFunction(name);
  };

  let inputClasses = "form-control";
  inputClasses += props.errorMessage ? " error" : "";

  return (
    <form onSubmit={submit.bind(this)}>
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
        onChange={handleChange.bind(this)}
      />

      <div className="buttons">
        <button type="submit" className="button-blue">
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
