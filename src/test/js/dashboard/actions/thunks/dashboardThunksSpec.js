var dashboardThunks = require('dashboard/actions/thunks/dashboardThunks.js');

describe('dashboardThunks', function() {
    var thunk;
    var dispatchSpy;
    var postNewWorkspaceAndDoSpy;
    var updateWorkspaceNameListCreatorSpy;
    beforeEach(function setup() {
        dispatchSpy = jasmine.createSpy('dispatchSpy');
        postNewWorkspaceAndDoSpy = jasmine.createSpy('postNewWorkspaceAndDoSpy');
        updateWorkspaceNameListCreatorSpy = jasmine.createSpy('updateWorkspaceNameListCreatorSpy');

        dashboardThunks.__set__('postNewWorkspaceAndDo', postNewWorkspaceAndDoSpy);
        dashboardThunks.__set__('updateWorkspaceNameListCreator', updateWorkspaceNameListCreatorSpy);
    });

    describe('#createWorkspaceThunk', function () {
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
                updateWorkspaceNameListCreatorSpy.and.returnValue(updateWorkspaceNamesAction);

                thunk(dispatchSpy);
            });

            it('calls postNewWorkspaceAndDo helper with correct arguments', function() {
                expect(postNewWorkspaceAndDoSpy).toHaveBeenCalledWith("New Workspace", jasmine.anything());
            });

            it('passes in a callback that will dispatch a updateWorkspaceNameList action', function() {
                var callback = postNewWorkspaceAndDoSpy.calls.mostRecent().args[1];
                callback(newWorkspaceNames);

                expect(updateWorkspaceNameListCreatorSpy).toHaveBeenCalledWith(newWorkspaceNames);
                expect(dispatchSpy).toHaveBeenCalledWith(updateWorkspaceNamesAction);
            });
        });
    });
});
