var deepFreeze = require('deep-freeze');
var dashboardReducer = require('dashboard/reducers/dashboardReducer.js');

describe("dashboardReducer", function () {
    it("should get the default state", function () {
        var stateBefore = undefined;
        var action = {};
        var stateAfter = {
            loginErrorMessage: ''
        };

        expect(
            dashboardReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });

    describe("actions", function () {
        describe("SET_LOGIN_ERROR", function () {
            it("should set the state to the passed in 'settings'", function () {
                var stateBefore = {
                    loginErrorMessage: ''
                };

                var action = {
                    type: "SET_LOGIN_ERROR",
                    errorMessage: "IT'S ALL ON FIRE!"
                };

                var stateAfter = {
                    loginErrorMessage: "IT'S ALL ON FIRE!"
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
