var dataThunks = require('workspace/actions/thunks/dataThunks.js');

describe('dataThunks', function() {
    var thunk;
    var dispatchSpy;
    var getStateSpy;
    var postStateAndDoSpy;
    var loadWorkspaceCreatorSpy;
    beforeEach(function setup() {
        dispatchSpy = jasmine.createSpy('dispatchSpy');
        getStateSpy = jasmine.createSpy('getStateSpy');
        postStateAndDoSpy = jasmine.createSpy('postStateAndDoSpy');
        loadWorkspaceCreatorSpy = jasmine.createSpy('loadWorkspaceCreatorSpy');

        dataThunks.__set__('postWorkspaceAndDo', postStateAndDoSpy);
        dataThunks.__set__('loadWorkspaceCreator', loadWorkspaceCreatorSpy);
    });

    describe('#autoSaveThunk', function () {
        var action = { type: 'DELETE_INTERNET' };

        beforeEach(function() {
            thunk = dataThunks.autoSaveThunk(action);
        });

        it('returns a function', function() {
            expect(typeof thunk).toBe('function');
        });

        describe('when calling the returned function', function() {
            var workspaceToSave = {world: 'doomed'};
            var stateOfApp = { data: { workspace: workspaceToSave } };
            var newWorkspaceData = {data: 'blarg'};
            var newWorkspaceDataAction = { type: 'LOAD_WORKSPACE', workspace: newWorkspaceData };
            beforeEach(function () {
                getStateSpy.and.returnValue(stateOfApp);
                loadWorkspaceCreatorSpy.and.returnValue(newWorkspaceDataAction);

                thunk(dispatchSpy, getStateSpy);
            });

            it('calls the dispatch function with the passed in action', function() {
                expect(dispatchSpy).toHaveBeenCalledWith(action);
            });

            it('calls postStateAndDo helper with correct arguments', function() {
                expect(getStateSpy).toHaveBeenCalled();
                expect(postStateAndDoSpy).toHaveBeenCalledWith(workspaceToSave, jasmine.anything());
            });

            it('passes in a callback that will dispatch a loadWorkspace action', function() {
                var callback = postStateAndDoSpy.calls.mostRecent().args[1];
                callback(newWorkspaceData);
                expect(loadWorkspaceCreatorSpy).toHaveBeenCalledWith(newWorkspaceData);
                expect(dispatchSpy).toHaveBeenCalledWith(newWorkspaceDataAction);
            });
        });
    });
});