import deepFreeze from 'deep-freeze';
import dashboardReducer from 'dashboard/reducers/dashboardReducer.js';

describe('dashboardReducer', function () {
    it('should get the default state', function () {
        var stateBefore = undefined;
        var action = {};
        var stateAfter = {
            newProjectErrorType: 0,
            loginErrorType: 0
        };

        expect(
            dashboardReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });

    describe('actions', function () {
        describe('SET_NEW_PROJECT_ERROR', function () {
            it('should set the new project error type', function () {
                var stateBefore = {
                    newProjectErrorType: 0
                };

                var action = {
                    type: 'SET_NEW_PROJECT_ERROR',
                    errorStatus: 400
                };

                var stateAfter = {
                    newProjectErrorType: 400
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    dashboardReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe('SET_LOGIN_ERROR', function () {
            it('should set the login error type', function () {
                var stateBefore = {
                    loginErrorType: 0
                };

                var action = {
                    type: 'SET_LOGIN_ERROR',
                    errorStatus: 400
                };

                var stateAfter = {
                    loginErrorType: 400
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    dashboardReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });
    });
});
