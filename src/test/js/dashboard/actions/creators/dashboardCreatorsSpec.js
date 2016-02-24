var dashboardCreators = require('dashboard/actions/creators/dashboardCreators.js');

describe('dashboardCreators', function () {
    describe('#setNewWorkspaceModalOpen', function () {
        it('returns the right action type', function () {
            var action = dashboardCreators.setNewWorkspaceModalOpen();
            expect(action.type).toBe('SET_NEW_WORKSPACE_MODAL_OPEN');
        });

        it('sets the new person modal open to be the passed in value', function () {
            var action = dashboardCreators.setNewWorkspaceModalOpen(true);
            expect(action.isOpen).toBe(true);
        });
    });

    describe('#updateWorkspaceNameList', function () {
        it('returns the right action type', function () {
            var action = dashboardCreators.updateWorkspaceNameList(["Bob"]);
            expect(action.type).toBe('UPDATE_WORKSPACE_NAME_LIST');
        });

        it('sets the workspaceNames to be the passed in value', function () {
            var action = dashboardCreators.updateWorkspaceNameList(["Bob"]);
            expect(action.workspaceNames).toEqual(["Bob"]);
        });
    });
});