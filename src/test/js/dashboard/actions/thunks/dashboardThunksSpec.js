var databaseHelpers = require('shared/helpers/databaseHelpers.js');
var dashboardThunks = require('dashboard/actions/thunks/dashboardThunks.js');

describe('dashboardThunks', function() {
    describe('#createWorkspaceThunk', function () {
        var thunk;

        beforeEach(function() {
            thunk = dashboardThunks.createWorkspaceThunk("New Workspace");
        });

        it('returns a function', function() {
            expect(typeof thunk).toBe('function');
        });

        describe('when calling the returned function', function() {
            var dispatchSpy;
            var postNewWorkspaceAndDoSpy;
            beforeEach(function () {
                dispatchSpy = jasmine.createSpy('CreatePersonDispatch');
                postNewWorkspaceAndDoSpy = spyOn(databaseHelpers, 'postNewWorkspaceAndDo');

                thunk(dispatchSpy);
            });

            it('calls postStateAndDo helper with correct arguments', function() {
                expect(postNewWorkspaceAndDoSpy).toHaveBeenCalledWith("New Workspace", jasmine.anything());
            });

            it('passes in a callback that will dispatch a updateWorkspaceNameList action', function() {
                var callback = postNewWorkspaceAndDoSpy.calls.mostRecent().args[1];
                callback({data:"blarg"});
                expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_WORKSPACE_NAME_LIST', workspaceNames: {data: 'blarg'} });
            });
        });
    });
});