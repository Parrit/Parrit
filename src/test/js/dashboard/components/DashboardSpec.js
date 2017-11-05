const React = require('react');
const ReactTestUtils = require('react-dom/test-utils');

const RenderComponent = require('support/RenderComponent.js');
const Mocker = require('support/ComponentMocker.js');

const Dashboard = require('dashboard/components/Dashboard.js');
const ButtonMock = Mocker('Button');
Dashboard.__set__('Button', ButtonMock);

describe('Dashboard', function() {
    let props;
    let dashboard;
    const event = {preventDefault: jasmine.createSpy('preventDefaultSpy')};

    beforeEach(function() {
        props = {
            newProjectErrorType: 0,
            loginErrorType: 0,
            login: jasmine.createSpy('loginSpy'),
            createProject: jasmine.createSpy('createProjectSpy')
        };

        dashboard = RenderComponent(Dashboard, <Dashboard {...props} />);
    });

    describe('#newProjectErrorType', function() {
        it('does not display a new project error message when newProjectErrorType is 0', function() {
            const errorMessage = ReactTestUtils.scryRenderedDOMComponentsWithClass(dashboard, 'error-message');
            const newProjectErrorMessage = errorMessage[0];
            expect(newProjectErrorMessage.innerHTML).toBe('');
        });

        it('displays a project name error when the newProjectErrorType is 406', function() {
            props.newProjectErrorType = 406;

            dashboard = RenderComponent(Dashboard, <Dashboard {...props} />);

            const errorMessage = ReactTestUtils.scryRenderedDOMComponentsWithClass(dashboard, 'error-message');
            const newProjectErrorMessage = errorMessage[0];
            expect(newProjectErrorMessage.innerHTML).toBe('Uh oh. Your project name is too long, try less than 100 characters.');

            const allInputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(dashboard, 'input');
            const newProjectNameInput = allInputs[0];
            expect(newProjectNameInput.classList).toContain('error');
        });

        it('displays a project name error when the newProjectErrorType is 409', function() {
            props.newProjectErrorType = 409;

            dashboard = RenderComponent(Dashboard, <Dashboard {...props} />);

            const errorMessage = ReactTestUtils.scryRenderedDOMComponentsWithClass(dashboard, 'error-message');
            const newProjectErrorMessage = errorMessage[0];
            expect(newProjectErrorMessage.innerHTML).toBe('Not again. That name already exists, try a different one.');

            const allInputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(dashboard, 'input');
            const newProjectNameInput = allInputs[0];
            expect(newProjectNameInput.classList).toContain('error');
        });

        it('displays a panic error when the newProjectErrorType is not recognized', function() {
            props.newProjectErrorType = 9999;

            dashboard = RenderComponent(Dashboard, <Dashboard {...props} />);

            const errorMessage = ReactTestUtils.scryRenderedDOMComponentsWithClass(dashboard, 'error-message');
            const newProjectErrorMessage = errorMessage[0];
            expect(newProjectErrorMessage.innerHTML).toBe('Unknown error.');
        });
    });

    describe('#loginErrorType', function() {
        it('does not display a login error message when loginErrorType is 0', function() {
            const errorMessage = ReactTestUtils.scryRenderedDOMComponentsWithClass(dashboard, 'error-message');
            const loginErrorMessage = errorMessage[1];
            expect(loginErrorMessage.innerHTML).toBe('');
        });

        it('displays a username error when the loginErrorType is 400', function() {
            props.loginErrorType = 400;

            dashboard = RenderComponent(Dashboard, <Dashboard {...props} />);

            const errorMessage = ReactTestUtils.scryRenderedDOMComponentsWithClass(dashboard, 'error-message');
            const loginErrorMessage = errorMessage[1];
            expect(loginErrorMessage.innerHTML).toBe('Keeaa!? That’s not your project name.');

            const allInputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(dashboard, 'input');
            const loginUsernameInput = allInputs[2];
            expect(loginUsernameInput.classList).toContain('error');
        });

        it('displays a username error when the loginErrorType is 400', function() {
            props.loginErrorType = 401;

            dashboard = RenderComponent(Dashboard, <Dashboard {...props} />);

            const errorMessage = ReactTestUtils.scryRenderedDOMComponentsWithClass(dashboard, 'error-message');
            const loginErrorMessage = errorMessage[1];
            expect(loginErrorMessage.innerHTML).toBe('Polly want a cracker? Try another password.');

            const allInputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(dashboard, 'input');
            const loginPasswordInput = allInputs[3];
            expect(loginPasswordInput.classList).toContain('error');
        });

        it('displays a panic error when the loginErrorType is not recognized', function() {
            props.loginErrorType = 9999;

            dashboard = RenderComponent(Dashboard, <Dashboard {...props} />);

            const errorMessage = ReactTestUtils.scryRenderedDOMComponentsWithClass(dashboard, 'error-message');
            const loginErrorMessage = errorMessage[1];
            expect(loginErrorMessage.innerHTML).toBe('Unknown error.');
        });
    });

    describe('#createProjectWithName', function() {
        it('calls the login function with the username and password on the state', function() {
            dashboard.setState({newProjectName: 'Hello', newProjectPassword: 'Bye'});
            dashboard.createProjectWithName(event);
            expect(props.createProject).toHaveBeenCalledWith('Hello', 'Bye');
        });

        it('calls preventDefault on the event', function() {
            dashboard.createProjectWithName(event);
            expect(event.preventDefault).toHaveBeenCalled();
        });
    });

    describe('#handleLogin', function() {
        it('calls the login function with the username and password on the state', function() {
            dashboard.setState({loginProjectName: 'Hello', loginProjectPassword: 'Bye'});
            dashboard.handleLogin(event);
            expect(props.login).toHaveBeenCalledWith('Hello', 'Bye');
        });

        it('calls preventDefault on the event', function() {
            dashboard.handleLogin(event);
            expect(event.preventDefault).toHaveBeenCalled();
        });
    });
});