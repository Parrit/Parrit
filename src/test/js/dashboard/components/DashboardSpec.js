var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var Dashboard = require('dashboard/components/Dashboard.js');
var ButtonMock = Mocker('Button');
Dashboard.__set__('Button', ButtonMock);

describe('Dashboard', function() {
    var props;
    var dashboard;
    var event = {preventDefault: jasmine.createSpy('preventDefaultSpy')};
    beforeEach(function() {
        props = {
            loginErrorMessage: 'OMFG DONT LET IT KILL ME',
            login: jasmine.createSpy('loginSpy'),
            createWorkspace: jasmine.createSpy('createWorkspaceSpy')
        };

        dashboard = RenderComponent(Dashboard, <Dashboard {...props} />);
    });

    it('displays a login error message', function() {
        var errorMessage = ReactTestUtils.scryRenderedDOMComponentsWithClass(dashboard, 'error-message');
        var loginErrorMessage = errorMessage[1];
        expect(loginErrorMessage.innerHTML).toBe('OMFG DONT LET IT KILL ME');
    });

    describe('#createWorkspaceWithName', function() {
        it('calls the login function with the username and password on the state', function() {
            dashboard.setState({newWorkspaceName: 'Hello', newWorkspacePassword: 'Bye'});
            dashboard.createWorkspaceWithName(event);
            expect(props.createWorkspace).toHaveBeenCalledWith('Hello', 'Bye');
        });

        it('calls preventDefault on the event', function() {
            dashboard.createWorkspaceWithName(event);
            expect(event.preventDefault).toHaveBeenCalled();
        });
    });

    describe('#handleLogin', function() {
        it('calls the login function with the username and password on the state', function() {
            dashboard.setState({loginWorkspaceName: 'Hello', loginWorkspacePassword: 'Bye'});
            dashboard.handleLogin(event);
            expect(props.login).toHaveBeenCalledWith('Hello', 'Bye');
        });

        it('calls preventDefault on the event', function() {
            dashboard.handleLogin(event);
            expect(event.preventDefault).toHaveBeenCalled();
        });
    });
});