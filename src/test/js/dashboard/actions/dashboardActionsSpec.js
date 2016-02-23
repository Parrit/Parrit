var dashboardActions = require('dashboard/actions/dashboardActions.js');
var dashboardThunks = require('dashboard/actions/thunks/dashboardThunks.js');

describe('dashboardActions', function () {
    describe('#setNewWorkspaceModalOpen', function () {
        it('returns the right action type', function () {
            var action = dashboardActions.setNewWorkspaceModalOpen();
            expect(action.type).toBe('SET_NEW_WORKSPACE_MODAL_OPEN');
        });

        it('sets the new person modal open to be the passed in value', function () {
            var action = dashboardActions.setNewWorkspaceModalOpen(true);
            expect(action.isOpen).toBe(true);
        });
    });

    describe('#createWorkspace', function() {
        it('is createWorkspaceThunk', function() {
            expect(dashboardActions.createWorkspace).toBe(dashboardThunks.createWorkspaceThunk);
        });
    });
});