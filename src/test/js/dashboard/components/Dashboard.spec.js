import React from 'react';
import { shallow } from 'enzyme';

import Dashboard from 'dashboard/components/Dashboard.js';

describe('<Dashboard/>', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            newProjectErrorType: 0,
            loginErrorType: 0,
            login: jasmine.createSpy('loginSpy'),
            createProject: jasmine.createSpy('createProjectSpy')
        };

        wrapper = shallow(<Dashboard {...props} />);
    });

    describe('#newProjectErrorType', () => {
        it('does not display a new project error message when newProjectErrorType is 0', () => {
            const newProjectErrorMessage = wrapper.find('.error-message').at(0);
            expect(newProjectErrorMessage.text()).toBe('');
        });

        it('displays a project name error when the newProjectErrorType is 406', () => {
            props.newProjectErrorType = 406;

            wrapper = shallow(<Dashboard {...props} />);

            const newProjectErrorMessage = wrapper.find('.error-message').at(0);
            expect(newProjectErrorMessage.text()).toBe('Uh oh. Your project name is too long, try less than 100 characters.');

            const newProjectNameInput = wrapper.find('input').at(0);
            expect(newProjectNameInput.prop('className')).toContain('error');
        });

        it('displays a project name error when the newProjectErrorType is 409', () => {
            props.newProjectErrorType = 409;

            wrapper = shallow(<Dashboard {...props} />);

            const newProjectErrorMessage = wrapper.find('.error-message').at(0);
            expect(newProjectErrorMessage.text()).toBe('Not again. That name already exists, try a different one.');

            const newProjectNameInput = wrapper.find('input').at(0);
            expect(newProjectNameInput.prop('className')).toContain('error');
        });

        it('displays a panic error when the newProjectErrorType is not recognized', () => {
            props.newProjectErrorType = 9999;

            wrapper = shallow(<Dashboard {...props} />);

            const newProjectErrorMessage = wrapper.find('.error-message').at(0);
            expect(newProjectErrorMessage.text()).toBe('Unknown error.');
        });
    });

    describe('#loginErrorType', () => {
        it('does not display a login error message when loginErrorType is 0', () => {
            const loginErrorMessage = wrapper.find('.error-message').at(1);
            expect(loginErrorMessage.text()).toBe('');
        });

        it('displays a username error when the loginErrorType is 400', () => {
            props.loginErrorType = 400;

            wrapper = shallow(<Dashboard {...props} />);

            const loginErrorMessage = wrapper.find('.error-message').at(1);
            expect(loginErrorMessage.text()).toBe('Keeaa!? That’s not your project name.');

            const loginUsernameInput = wrapper.find('input').at(2);
            expect(loginUsernameInput.prop('className')).toContain('error');
        });

        it('displays a username error when the loginErrorType is 400', () => {
            props.loginErrorType = 401;

            wrapper = shallow(<Dashboard {...props} />);

            const loginErrorMessage = wrapper.find('.error-message').at(1);
            expect(loginErrorMessage.text()).toBe('Polly want a cracker? Try another password.');

            const loginPasswordInput = wrapper.find('input').at(3);
            expect(loginPasswordInput.prop('className')).toContain('error');
        });

        it('displays a panic error when the loginErrorType is not recognized', () => {
            props.loginErrorType = 9999;

            wrapper = shallow(<Dashboard {...props} />);

            const loginErrorMessage = wrapper.find('.error-message').at(1);
            expect(loginErrorMessage.text()).toBe('Unknown error.');
        });
    });

    describe('#createProjectWithName', () => {
        const event = {preventDefault: jasmine.createSpy('preventDefaultSpy')};

        it('calls the login function with the username and password on the state', () => {
            wrapper.setState({newProjectName: 'Hello', newProjectPassword: 'Bye'});
            wrapper.find('form.new-form').simulate('submit', event);
            expect(props.createProject).toHaveBeenCalledWith('Hello', 'Bye');
        });

        it('calls preventDefault on the event', () => {
            wrapper.find('form.new-form').simulate('submit', event);
            expect(event.preventDefault).toHaveBeenCalled();
        });
    });

    describe('#handleLogin', () => {
        const event = {preventDefault: jasmine.createSpy('preventDefaultSpy')};

        it('calls the login function with the username and password on the state', () => {
            wrapper.setState({loginProjectName: 'Hello', loginProjectPassword: 'Bye'});
            wrapper.find('form.login-form').simulate('submit', event);
            expect(props.login).toHaveBeenCalledWith('Hello', 'Bye');
        });

        it('calls preventDefault on the event', () => {
            wrapper.find('form.login-form').simulate('submit', event);
            expect(event.preventDefault).toHaveBeenCalled();
        });
    });
});