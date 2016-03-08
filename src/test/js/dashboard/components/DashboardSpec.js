var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var Dashboard = require('dashboard/components/Dashboard.js');
var PrimaryButtonMock = Mocker("Button1");
Dashboard.__set__('PrimaryButton', PrimaryButtonMock);

describe('Dashboard', function() {
    var props;
    var dashboard;
    beforeEach(function() {
        props = {
            login: jasmine.createSpy('loginSpy'),
            createWorkspace: jasmine.createSpy('createWorkspaceSpy')
        };

        dashboard = RenderComponent(Dashboard, <Dashboard {...props} />);
    });

    describe('#createWorkspaceWithName', function() {
        it('calls the login function with the username and password on the state', function() {
            dashboard.setState({newWorkspaceName: "Hello", newWorkspacePassword: "Bye"});
            dashboard.createWorkspaceWithName();
            expect(props.createWorkspace).toHaveBeenCalledWith("Hello", "Bye");
        })
    });

    describe('#handleLogin', function() {
        it('calls the login function with the username and password on the state', function() {
            dashboard.setState({loginWorkspaceName: "Hello", loginWorkspacePassword: "Bye"});
            dashboard.handleLogin();
            expect(props.login).toHaveBeenCalledWith("Hello", "Bye");
        })
    });
});