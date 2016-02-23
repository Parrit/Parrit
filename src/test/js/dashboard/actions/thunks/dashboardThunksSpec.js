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
            var newWorkspaceNames = {data: 'blarg'};
            var updateWorkspaceNamesAction = {workspaceNames: newWorkspaceNames};

            var dispatchSpy;
            var postNewWorkspaceAndDoSpy;
            var updateWorkspaceNameListSpy;
            beforeEach(function () {
                dispatchSpy = jasmine.createSpy('CreateWorkspaceDispatch');
                postNewWorkspaceAndDoSpy = jasmine.createSpy('postNewWorkspaceAndDo');
                dashboardThunks.__set__('databaseHelpers', {
                    postNewWorkspaceAndDo: postNewWorkspaceAndDoSpy
                });
                updateWorkspaceNameListSpy = jasmine.createSpy('updateWorkspaceNameList').and.returnValue(updateWorkspaceNamesAction);
                dashboardThunks.__set__('updateWorkspaceNameList', updateWorkspaceNameListSpy);

                thunk(dispatchSpy);
            });

            it('calls postNewWorkspaceAndDo helper with correct arguments', function() {
                expect(postNewWorkspaceAndDoSpy).toHaveBeenCalledWith("New Workspace", jasmine.anything());
            });

            it('passes in a callback that will dispatch a updateWorkspaceNameList action', function() {
                var callback = postNewWorkspaceAndDoSpy.calls.mostRecent().args[1];
                callback(newWorkspaceNames);

                expect(updateWorkspaceNameListSpy).toHaveBeenCalledWith(newWorkspaceNames);
                expect(dispatchSpy).toHaveBeenCalledWith(updateWorkspaceNamesAction);
            });
        });
    });
});