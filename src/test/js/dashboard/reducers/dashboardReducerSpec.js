var deepFreeze = require('deep-freeze');
var dashboardReducer = require('dashboard/reducers/dashboardReducer.js');

describe("dashboardReducer", function() {
    it("sets up the default state", function() {
        var stateBefore = undefined;
        var stateAfter = {
            isNewWorkspaceModalOpen: false,
            workspaceNames: []
        };

        expect(
            dashboardReducer(stateBefore, {})
        ).toEqual(stateAfter);
    });

    describe("actions", function() {
        describe("SET_NEW_WORKSPACE_MODAL_OPEN", function() {
            it("should set isNewWorkspaceModalOpen to the passed in value", function() {
                var stateBefore = {
                    isNewWorkspaceModalOpen: false
                };

                var action = {
                    type: "SET_NEW_WORKSPACE_MODAL_OPEN",
                    isOpen: true
                };

                var stateAfter = {
                    isNewWorkspaceModalOpen: true
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    dashboardReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe("UPDATE_WORKSPACE_NAME_LIST", function() {
            it("should set workspaceNames to the passed in value", function() {
                var stateBefore = {
                    workspaceNames: ["Bob", "Steve"]
                };

                var action = {
                    type: "UPDATE_WORKSPACE_NAME_LIST",
                    workspaceNames: ["John"]
                };

                var stateAfter = {
                    workspaceNames: ["John"]
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
