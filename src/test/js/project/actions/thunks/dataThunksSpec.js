var dataThunks = require('project/actions/thunks/dataThunks.js');

describe('dataThunks', function() {
    var thunk;
    var dispatchSpy;
    var getStateSpy;
    var postStateAndDoSpy;
    var postProjectPairingAndDoSpy;
    var getRecommendedPairingAndDoSpy;
    var loadProjectCreatorSpy;
    var alertSpy;
    beforeEach(function setup() {
        dispatchSpy = jasmine.createSpy('dispatchSpy');
        getStateSpy = jasmine.createSpy('getStateSpy');
        postStateAndDoSpy = jasmine.createSpy('postStateAndDoSpy');
        postProjectPairingAndDoSpy = jasmine.createSpy('postProjectPairingAndDoSpy');
        loadProjectCreatorSpy = jasmine.createSpy('loadProjectCreatorSpy');
        getRecommendedPairingAndDoSpy = jasmine.createSpy('getRecommendedPairingAndDoSpy');
        alertSpy = jasmine.createSpy('alertSpy');

        dataThunks.__set__('postProjectAndDo', postStateAndDoSpy);
        dataThunks.__set__('postProjectPairingAndDo', postProjectPairingAndDoSpy);
        dataThunks.__set__('getRecommendedPairingAndDo', getRecommendedPairingAndDoSpy);
        dataThunks.__set__('loadProjectCreator', loadProjectCreatorSpy);
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
            var projectToSave = {world: 'doomed'};
            var stateOfApp = { data: { project: projectToSave } };
            var newProjectData = {data: 'blarg'};
            var newProjectDataAction = { type: 'LOAD_PROJECT', project: newProjectData };
            beforeEach(function () {
                getStateSpy.and.returnValue(stateOfApp);
                loadProjectCreatorSpy.and.returnValue(newProjectDataAction);

                thunk(dispatchSpy, getStateSpy);
            });

            it('calls the dispatch function with the passed in action', function() {
                expect(dispatchSpy).toHaveBeenCalledWith(action);
            });

            it('calls postStateAndDo helper with correct arguments', function() {
                expect(getStateSpy).toHaveBeenCalled();
                expect(postStateAndDoSpy).toHaveBeenCalledWith(projectToSave, jasmine.anything());
            });

            it('passes in a callback that will dispatch a loadProject action', function() {
                var callback = postStateAndDoSpy.calls.mostRecent().args[1];
                callback(newProjectData);

                expect(loadProjectCreatorSpy).toHaveBeenCalledWith(newProjectData);
                expect(dispatchSpy).toHaveBeenCalledWith(newProjectDataAction);
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
            var project = { id: 7, data: "le stuff" };
            var stateOfApp = { data: { project: project } };
            beforeEach(function () {
                getStateSpy.and.returnValue(stateOfApp);

                thunk(dispatchSpy, getStateSpy);
            });

            it('does not call the dispatch function', function() {
                expect(dispatchSpy).not.toHaveBeenCalled();
            });

            it('calls postProjectPairingAndDo helper with correct arguments', function() {
                expect(getStateSpy).toHaveBeenCalled();
                expect(postProjectPairingAndDoSpy).toHaveBeenCalledWith(7, jasmine.anything());
            });

            it('passes in a callback that will alert to the browser', function() {
                var callback = postProjectPairingAndDoSpy.calls.mostRecent().args[1];
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
            var project = { id: 88, stuff: "things" };
            var stateOfApp = { data: { project: project } };
            var newProjectData = {data: 'blarg'};
            var newProjectDataAction = { type: 'LOAD_PROJECT', project: newProjectData };
            beforeEach(function () {
                getStateSpy.and.returnValue(stateOfApp);
                loadProjectCreatorSpy.and.returnValue(newProjectDataAction);

                thunk(dispatchSpy, getStateSpy);
            });

            it('does not call the dispatch function', function() {
                expect(dispatchSpy).not.toHaveBeenCalled();
            });

            it('calls postProjectPairingAndDo helper with correct arguments', function() {
                expect(getStateSpy).toHaveBeenCalled();
                expect(getRecommendedPairingAndDoSpy).toHaveBeenCalledWith(88, jasmine.anything());
            });

            it('passes in a callback that will alert to the browser', function() {
                var callback = getRecommendedPairingAndDoSpy.calls.mostRecent().args[1];
                callback(newProjectData);

                expect(loadProjectCreatorSpy).toHaveBeenCalledWith(newProjectData);
                expect(dispatchSpy).toHaveBeenCalledWith(newProjectDataAction);
            });
        });
    });
});