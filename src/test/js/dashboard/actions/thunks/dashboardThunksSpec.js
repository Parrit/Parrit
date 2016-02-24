var dashboardThunks = require('dashboard/actions/thunks/dashboardThunks.js');

var dispatchSpy;
var postNewWorkspaceAndDoSpy;
var updateWorkspaceNameListSpy;

describe('dashboardThunks', function() {

    beforeEach(function setup() {
        dispatchSpy = jasmine.createSpy('CreateWorkspaceDispatch');
        postNewWorkspaceAndDoSpy = jasmine.createSpy('postNewWorkspaceAndDo');
        updateWorkspaceNameListSpy = jasmine.createSpy('updateWorkspaceNameList');

        dashboardThunks.__set__('databaseHelpers', {postNewWorkspaceAndDo: postNewWorkspaceAndDoSpy});
        dashboardThunks.__set__('updateWorkspaceNameList', updateWorkspaceNameListSpy);
    });

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

            beforeEach(function () {
                updateWorkspaceNameListSpy.and.returnValue(updateWorkspaceNamesAction);

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
