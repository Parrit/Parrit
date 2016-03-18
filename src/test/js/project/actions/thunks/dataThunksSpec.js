var dataThunks = require('project/actions/thunks/dataThunks.js');

describe('dataThunks', function() {
    var thunk;
    var dispatchSpy;
    var getStateSpy;
    var postStateAndDoSpy;
    var postProjectPairingAndDoSpy;
    var getRecommendedPairingAndDoSpy;
    var postAddNewPersonAndDoSpy;
    var loadProjectCreatorSpy;
    var setErrorTypeCreatorSpy;
    var alertSpy;
    beforeEach(function setup() {
        dispatchSpy = jasmine.createSpy('dispatchSpy');
        getStateSpy = jasmine.createSpy('getStateSpy');
        postStateAndDoSpy = jasmine.createSpy('postStateAndDoSpy');
        postProjectPairingAndDoSpy = jasmine.createSpy('postProjectPairingAndDoSpy');
        postAddNewPersonAndDoSpy = jasmine.createSpy('postAddNewPersonAndDoSpy');
        loadProjectCreatorSpy = jasmine.createSpy('loadProjectCreatorSpy');
        setErrorTypeCreatorSpy = jasmine.createSpy('setErrorTypeCreatorSpy');
        getRecommendedPairingAndDoSpy = jasmine.createSpy('getRecommendedPairingAndDoSpy');
        alertSpy = jasmine.createSpy('alertSpy');

        dataThunks.__set__('postProjectAndDo', postStateAndDoSpy);
        dataThunks.__set__('postProjectPairingAndDo', postProjectPairingAndDoSpy);
        dataThunks.__set__('getRecommendedPairingAndDo', getRecommendedPairingAndDoSpy);
        dataThunks.__set__('postAddNewPersonAndDo', postAddNewPersonAndDoSpy);
        dataThunks.__set__('loadProjectCreator', loadProjectCreatorSpy);
        dataThunks.__set__('setErrorTypeCreator', setErrorTypeCreatorSpy);
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
            var stateOfApp = {data: { project: projectToSave }};
            var newProjectData = {data: 'blarg'};
            var newProjectDataAction = {type: 'LOAD_PROJECT', project: newProjectData};
            var errorTypeAction = {type: 'SET_ERROR_TYPE'};
            beforeEach(function () {
                getStateSpy.and.returnValue(stateOfApp);
                loadProjectCreatorSpy.and.returnValue(newProjectDataAction);
                setErrorTypeCreatorSpy.and.returnValue(errorTypeAction);

                thunk(dispatchSpy, getStateSpy);
            });

            it('calls the dispatch function with the passed in action', function() {
                expect(dispatchSpy).toHaveBeenCalledWith(action);
            });

            it('calls postStateAndDo helper with correct arguments', function() {
                expect(getStateSpy).toHaveBeenCalled();
                expect(postStateAndDoSpy).toHaveBeenCalledWith(projectToSave, jasmine.anything(), jasmine.anything());
            });

            it('passes in a success callback that will dispatch a loadProject action', function() {
                var successCallback = postStateAndDoSpy.calls.mostRecent().args[1];
                successCallback(newProjectData);

                expect(loadProjectCreatorSpy).toHaveBeenCalledWith(newProjectData);
                expect(dispatchSpy).toHaveBeenCalledWith(newProjectDataAction);
            });

            it('passes in an error callback that will dispatch a setErrorType action', function() {
                var errorCallback = postStateAndDoSpy.calls.mostRecent().args[2];
                errorCallback(401);

                expect(setErrorTypeCreatorSpy).toHaveBeenCalledWith(401);
                expect(dispatchSpy).toHaveBeenCalledWith(errorTypeAction);
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

            it('passes in a success callback that will alert to the browser', function() {
                var successCallback = postProjectPairingAndDoSpy.calls.mostRecent().args[1];
                successCallback();

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

            it('passes in a success callback that will alert to the browser', function() {
                var successCallback = getRecommendedPairingAndDoSpy.calls.mostRecent().args[1];
                successCallback(newProjectData);

                expect(loadProjectCreatorSpy).toHaveBeenCalledWith(newProjectData);
                expect(dispatchSpy).toHaveBeenCalledWith(newProjectDataAction);
            });
        });
    });

    describe('#addNewPersonThunk', function() {
        var callbackSpy = jasmine.createSpy('callbackSpy');

        beforeEach(function() {
            thunk = dataThunks.addNewPersonThunk(1, "Name", callbackSpy);
        });

        it('returns a function', function() {
            expect(typeof thunk).toBe('function');
        });

        describe('when calling the returned function', function() {
            var newProjectData = {data: 'blarg'};
            var newProjectDataAction = { type: 'LOAD_PROJECT', project: newProjectData };
            var errorTypeAction = {type: 'SET_ERROR_TYPE'};
            beforeEach(function () {
                loadProjectCreatorSpy.and.returnValue(newProjectDataAction);
                setErrorTypeCreatorSpy.and.returnValue(errorTypeAction);

                thunk(dispatchSpy, getStateSpy);
            });

            it('calls postAddNewPersonAndDo helper with correct arguments', function() {
                expect(postAddNewPersonAndDoSpy).toHaveBeenCalledWith(1, "Name", jasmine.anything(), jasmine.anything());
            });

            it('passes in a success callback that will dispatch a loadProject action and calls the passed in callback', function() {
                var successCallback = postAddNewPersonAndDoSpy.calls.mostRecent().args[2];
                successCallback(newProjectData);

                expect(loadProjectCreatorSpy).toHaveBeenCalledWith(newProjectData);
                expect(dispatchSpy).toHaveBeenCalledWith(newProjectDataAction);
                expect(callbackSpy).toHaveBeenCalled();
            });

            it('passes in an error callback that will dispatch a setErrorType action', function() {
                var errorCallback = postAddNewPersonAndDoSpy.calls.mostRecent().args[3];
                errorCallback(401);

                expect(setErrorTypeCreatorSpy).toHaveBeenCalledWith(401);
                expect(dispatchSpy).toHaveBeenCalledWith(errorTypeAction);
            });
        });
    })
});