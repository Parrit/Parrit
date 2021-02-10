import React from "react";

import { Dashboard } from "./Dashboard";
import { ApiContext, IApiContext } from "../../shared/helpers/ApiContext";
import { DefaultContexts } from "../../shared/helpers/DefaultContexts";
import TestRenderer, { ReactTestInstance } from "react-test-renderer";

describe("<Dashboard/>", () => {
  let root: ReactTestInstance;
  let apiContext: IApiContext;
  let newProjectNameInput: ReactTestInstance;
  let newProjectPasswordInput: ReactTestInstance;
  let loginProjectName: ReactTestInstance;
  let loginProjectPassword: ReactTestInstance;

  beforeEach(() => {
    apiContext = DefaultContexts.apiContext();
    root = TestRenderer.create(
      <ApiContext.Provider value={apiContext}>
        <Dashboard />
      </ApiContext.Provider>
    ).root;
    newProjectNameInput = root.findAllByProps({
      placeholder: "Project name",
    })[0];
    newProjectPasswordInput = root.findAllByProps({
      placeholder: "Password",
    })[0];
    loginProjectName = root.findAllByProps({ placeholder: "Project name" })[1];
    loginProjectPassword = root.findAllByProps({ placeholder: "Password" })[1];
  });

  it("does not show an error by default", () => {
    expect(
      root
        .findByProps({ className: "form new-form" })
        .findByProps({ className: "error-message" }).children
    ).toBe([]);
  });

  describe("with a filled out new project form", () => {
    beforeEach(() => {
      newProjectNameInput.props.onChange("NEW PROJECT NAME");
      newProjectPasswordInput.props.onChange("NEW PROJECT PASSWORD");
    });

    describe("With an error", () => {});
  });
});
