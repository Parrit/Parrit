import React from "react";
import { mount, ReactWrapper } from "enzyme";

import { Dashboard } from "./Dashboard";
import { ApiContext, IApiContext } from "../../shared/helpers/ApiContext";
import { DefaultContexts } from "../../shared/helpers/DefaultContexts";

describe("<Dashboard/>", () => {
  let wrapper: ReactWrapper;
  let apiContext: IApiContext;

  beforeEach(() => {
    apiContext = DefaultContexts.apiContext();
    wrapper = mount(
      <ApiContext.Provider value={apiContext}>
        <Dashboard />
      </ApiContext.Provider>
    );
  });

  it("does not show an error by default", () => {
    expect(wrapper.find(".new-form .error-message").at(0).text()).toBe("");
  });

  describe("posting a new project", () => {
    describe("when it results in an error", () => {
      beforeEach(() => {
        apiContext.postProject = jest
          .fn()
          .mockRejectedValue(new Error("test error"));
      });
    });
    it("displays a project name error message when the newProjectErrorMessage is present", () => {
      wrapper = shallow(<InnerDashboard {...props} />);

      expect(wrapper.find(".new-form .error-message").text()).toBe(
        "some new project error message"
      );
    });

    it("highlights the name field when the newProjectErrorName is true", () => {
      props.newProjectErrorName = true;

      wrapper = shallow(<InnerDashboard {...props} />);

      expect(wrapper.find(".new-form input").at(0).prop("className")).toContain(
        "error"
      );
    });

    it("highlights the password field when the newProjectErrorPassword is true", () => {
      props.newProjectErrorPassword = true;

      wrapper = shallow(<InnerDashboard {...props} />);

      expect(wrapper.find(".new-form input").at(1).prop("className")).toContain(
        "error"
      );
    });
  });

  describe("#loginError", () => {
    it("does not display a login error message when loginErrorMessage is undefined", () => {
      expect(wrapper.find(".login-form .error-message").text()).toBe("");
    });

    it("displays a login error message when the loginErrorMessage is present", () => {
      props.loginErrorMessage = "some login error message";

      wrapper = shallow(<InnerDashboard {...props} />);

      expect(wrapper.find(".login-form .error-message").text()).toBe(
        "some login error message"
      );
    });

    it("highlights the name field when the loginErrorName is true", () => {
      props.loginErrorName = true;

      wrapper = shallow(<InnerDashboard {...props} />);

      expect(
        wrapper.find(".login-form input").at(0).prop("className")
      ).toContain("error");
    });

    it("highlights the name field when the loginErrorPassword is true", () => {
      props.loginErrorPassword = true;

      wrapper = shallow(<InnerDashboard {...props} />);

      expect(
        wrapper.find(".login-form input").at(1).prop("className")
      ).toContain("error");
    });
  });

  describe("#createProjectWithName", () => {
    const event = { preventDefault: jasmine.createSpy("preventDefaultSpy") };

    it("calls the login function with the username and password on the state", () => {
      wrapper.setState({ newProjectName: "Hello", newProjectPassword: "Bye" });
      wrapper.find(".new-form").simulate("submit", event);
      expect(props.createProject).toHaveBeenCalledWith("Hello", "Bye");
    });

    it("calls preventDefault on the event", () => {
      wrapper.find(".new-form").simulate("submit", event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe("#handleLogin", () => {
    const event = { preventDefault: jasmine.createSpy("preventDefaultSpy") };

    it("calls the login function with the username and password on the state", () => {
      wrapper.setState({
        loginProjectName: "Hello",
        loginProjectPassword: "Bye",
      });
      wrapper.find(".login-form").simulate("submit", event);
      expect(props.login).toHaveBeenCalledWith("Hello", "Bye");
    });

    it("calls preventDefault on the event", () => {
      wrapper.find(".login-form").simulate("submit", event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
});
