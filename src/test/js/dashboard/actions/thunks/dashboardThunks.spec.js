import * as dashboardThunks from 'dashboard/actions/thunks/dashboardThunks.js';

import * as dashboardCreators from 'dashboard/actions/creators/dashboardCreators.js';
import * as databaseHelpers from 'shared/helpers/databaseHelpers.js';

describe('dashboardThunks', function () {
    let thunk, dispatchSpy, getStateSpy;
    let setNewProjectErrorCreatorSpy;
    let setLoginErrorCreatorSpy;
    let postNewProjectAndDoSpy;
    let postLoginAndRedirectSpy;

    beforeEach(function setup() {
        dispatchSpy = jasmine.createSpy('dispatchSpy');
        getStateSpy = jasmine.createSpy('getStateSpy');

        setNewProjectErrorCreatorSpy = spyOn(dashboardCreators, 'setNewProjectErrorCreator');
        setLoginErrorCreatorSpy = spyOn(dashboardCreators, 'setLoginErrorCreator');
        postNewProjectAndDoSpy = spyOn(databaseHelpers, 'postNewProjectAndDo');
        postLoginAndRedirectSpy = spyOn(databaseHelpers, 'postLoginAndRedirect');
    });

    describe('#createProjectThunk', function () {
        beforeEach(function () {
            thunk = dashboardThunks.createProjectThunk("New Project", "S3cr3tP@$$w0rd");
        });

        it('returns a function', function() {
            expect(typeof thunk).toBe('function');
        });

        describe('when calling the returned function', function() {
            beforeEach(function () {
                setNewProjectErrorCreatorSpy.and.returnValue({type: 'SET_NEW_PROJECT_ERROR'});

                thunk(dispatchSpy, getStateSpy);
            });

            it('calls postNewProjectAndDo helper with correct arguments', function () {
                expect(postNewProjectAndDoSpy).toHaveBeenCalledWith("New Project", "S3cr3tP@$$w0rd", jasmine.anything(), jasmine.anything());
            });

            it('passes in a success callback that will call the postLoginAndRedirect with the name and password', function () {
                var callback = postNewProjectAndDoSpy.calls.mostRecent().args[2];
                callback();

                expect(postLoginAndRedirectSpy).toHaveBeenCalledWith("New Project", "S3cr3tP@$$w0rd");
            });

            it('passes in a failure callback that will dispatch a setNewProjectError action', function () {
                var callback = postNewProjectAndDoSpy.calls.mostRecent().args[3];
                callback(402);

                expect(setNewProjectErrorCreatorSpy).toHaveBeenCalledWith(402);
                expect(dispatchSpy).toHaveBeenCalledWith({type: 'SET_NEW_PROJECT_ERROR'});
            });
        });
    });

    describe('#loginThunk', function () {
        beforeEach(function () {
            thunk = dashboardThunks.loginThunk("Existing Project", "S3cr3tP@$$w0rd");
        });

        it('returns a function', function() {
            expect(typeof thunk).toBe('function');
        });

        describe('when calling the returned function', function() {
            beforeEach(function () {
                setLoginErrorCreatorSpy.and.returnValue({type: 'SET_LOGIN_ERROR'});

                thunk(dispatchSpy, getStateSpy);
            });

            it('calls postLoginAndRedirect with the name, password and an error callback', function () {
                expect(postLoginAndRedirectSpy).toHaveBeenCalledWith("Existing Project", "S3cr3tP@$$w0rd", jasmine.anything());
            });

            it('passes in a callback that will dispatch a setLoginError action', function() {
                var callback = postLoginAndRedirectSpy.calls.mostRecent().args[2];
                callback(401);

                expect(setLoginErrorCreatorSpy).toHaveBeenCalledWith(401);
                expect(dispatchSpy).toHaveBeenCalledWith({type: 'SET_LOGIN_ERROR'});
            });
        });
    })
});