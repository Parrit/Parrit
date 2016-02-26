var dataThunks = require('workspace/actions/thunks/dataThunks.js');

describe('dataThunks', function() {
    var thunk;
    var dispatchSpy;
    var getStateSpy;
    var postStateAndDoSpy;
    var postWorkspacePairingAndDoSpy;
    var getRecommendedPairingAndDoSpy;
    var loadWorkspaceCreatorSpy;
    var alertSpy;
    beforeEach(function setup() {
        dispatchSpy = jasmine.createSpy('dispatchSpy');
        getStateSpy = jasmine.createSpy('getStateSpy');
        postStateAndDoSpy = jasmine.createSpy('postStateAndDoSpy');
        postWorkspacePairingAndDoSpy = jasmine.createSpy('postWorkspacePairingAndDoSpy');
        loadWorkspaceCreatorSpy = jasmine.createSpy('loadWorkspaceCreatorSpy');
        getRecommendedPairingAndDoSpy = jasmine.createSpy('getRecommendedPairingAndDoSpy');
        alertSpy = jasmine.createSpy('alertSpy');

        dataThunks.__set__('postWorkspaceAndDo', postStateAndDoSpy);
        dataThunks.__set__('postWorkspacePairingAndDo', postWorkspacePairingAndDoSpy);
        dataThunks.__set__('getRecommendedPairingAndDo', getRecommendedPairingAndDoSpy);
        dataThunks.__set__('loadWorkspaceCreator', loadWorkspaceCreatorSpy);
        dataThunks.__set__('alert', alertSpy);
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

    describe('#savePairingThunk', function () {
        beforeEach(function() {
            thunk = dataThunks.savePairingThunk();
        });

        it('returns a function', function() {
            expect(typeof thunk).toBe('function');
        });

        describe('when calling the returned function', function() {
            var workspace = { data: "le stuff" };
            var stateOfApp = { data: { workspace: workspace } };
            beforeEach(function () {
                getStateSpy.and.returnValue(stateOfApp);

                thunk(dispatchSpy, getStateSpy);
            });

            it('does not call the dispatch function', function() {
                expect(dispatchSpy).not.toHaveBeenCalled();
            });

            it('calls postWorkspacePairingAndDo helper with correct arguments', function() {
                expect(getStateSpy).toHaveBeenCalled();
                expect(postWorkspacePairingAndDoSpy).toHaveBeenCalledWith(workspace, jasmine.anything());
            });

            it('passes in a callback that will alert to the browser', function() {
                var callback = postWorkspacePairingAndDoSpy.calls.mostRecent().args[1];
                callback();

                expect(alertSpy).toHaveBeenCalledWith("Successfully Saved Pairing!");
            });
        });
    });

    describe('#getRecommendedPairsThunk', function () {
        beforeEach(function() {
            thunk = dataThunks.getRecommendedPairsThunk();
        });

        it('returns a function', function() {
            expect(typeof thunk).toBe('function');
        });

        describe('when calling the returned function', function() {
            var workspace = { id: 88, stuff: "things" };
            var stateOfApp = { data: { workspace: workspace } };
            var newWorkspaceData = {data: 'blarg'};
            var newWorkspaceDataAction = { type: 'LOAD_WORKSPACE', workspace: newWorkspaceData };
            beforeEach(function () {
                getStateSpy.and.returnValue(stateOfApp);
                loadWorkspaceCreatorSpy.and.returnValue(newWorkspaceDataAction);

                thunk(dispatchSpy, getStateSpy);
            });

            it('does not call the dispatch function', function() {
                expect(dispatchSpy).not.toHaveBeenCalled();
            });

            it('calls postWorkspacePairingAndDo helper with correct arguments', function() {
                expect(getStateSpy).toHaveBeenCalled();
                expect(getRecommendedPairingAndDoSpy).toHaveBeenCalledWith(88, jasmine.anything());
            });

            it('passes in a callback that will alert to the browser', function() {
                var callback = getRecommendedPairingAndDoSpy.calls.mostRecent().args[1];
                callback(newWorkspaceData);

                expect(loadWorkspaceCreatorSpy).toHaveBeenCalledWith(newWorkspaceData);
                expect(dispatchSpy).toHaveBeenCalledWith(newWorkspaceDataAction);
            });
        });
    });
});