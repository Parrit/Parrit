import * as dataThunks from 'project/actions/thunks/dataThunks.js';

import * as databaseHelpers from 'shared/helpers/databaseHelpers.js';
import * as dataCreators from 'project/actions/creators/dataCreators.js';
import * as viewCreators from 'project/actions/creators/viewCreators.js';

describe('dataThunks', function() {
    var thunk;
    var dispatchSpy, getStateSpy;
    var postStateAndDoSpy, postProjectPairingAndDoSpy, getRecommendedPairingAndDoSpy, postAddNewPersonAndDoSpy, getPairingHistoryAndDoSpy;
    var loadProjectCreatorSpy, loadPairingHistoryCreatorSpy, updatePairingHistoriesCreatorSpy, setErrorTypeCreatorSpy;

    beforeEach(function setup() {
        dispatchSpy = jasmine.createSpy('dispatchSpy');
        getStateSpy = jasmine.createSpy('getStateSpy');
        
        postStateAndDoSpy = spyOn(databaseHelpers, 'postProjectAndDo');
        postProjectPairingAndDoSpy = spyOn(databaseHelpers, 'postProjectPairingAndDo');
        getRecommendedPairingAndDoSpy = spyOn(databaseHelpers, 'getRecommendedPairingAndDo');
        postAddNewPersonAndDoSpy = spyOn(databaseHelpers, 'postAddNewPersonAndDo');
        getPairingHistoryAndDoSpy = spyOn(databaseHelpers, 'getPairingHistoryAndDo');
        loadProjectCreatorSpy = spyOn(dataCreators, 'loadProjectCreator');
        loadPairingHistoryCreatorSpy = spyOn(dataCreators, 'loadPairingHistoryCreator');
        updatePairingHistoriesCreatorSpy = spyOn(dataCreators, 'updatePairingHistoriesCreator');
        setErrorTypeCreatorSpy = spyOn(viewCreators, 'setErrorTypeCreator');
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
            var newPairingHistories = [{data: 1}, {data: 2}];
            var updatePairingHistoriesAction = {type: 'UPDATE_PAIRING_HISTORIES', pairingHistories: newPairingHistories};

            beforeEach(function () {
                getStateSpy.and.returnValue(stateOfApp);
                postProjectPairingAndDoSpy.and.returnValue(newPairingHistories);
                updatePairingHistoriesCreatorSpy.and.returnValue(updatePairingHistoriesAction);

                thunk(dispatchSpy, getStateSpy);
            });

            it('does not call the dispatch function', function() {
                expect(dispatchSpy).not.toHaveBeenCalled();
            });

            it('calls postProjectPairingAndDo helper with correct arguments', function() {
                expect(getStateSpy).toHaveBeenCalled();
                expect(postProjectPairingAndDoSpy).toHaveBeenCalledWith(7, jasmine.anything());
            });

            it('passes in a success callback that will dispatch a updatePairingHistory action', function() {
                var successCallback = postProjectPairingAndDoSpy.calls.mostRecent().args[1];
                successCallback(newPairingHistories);

                expect(updatePairingHistoriesCreatorSpy).toHaveBeenCalledWith(newPairingHistories);
                expect(dispatchSpy).toHaveBeenCalledWith(updatePairingHistoriesAction)
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

    describe('#getPairingHistoryThunk', function () {
        beforeEach(function() {
            thunk = dataThunks.getPairingHistoryThunk(77);
        });

        it('returns a function', function() {
            expect(typeof thunk).toBe('function');
        });

        describe('when calling the returned function', function() {
            var pairingHistoryData = [{data:'Weeeee'}];
            var pairingHistoryDataAction = { type: 'LOAD_PAIRING_HISTORY', pairingHistoryList: pairingHistoryData };

            beforeEach(function () {
                loadPairingHistoryCreatorSpy.and.returnValue(pairingHistoryDataAction);

                thunk(dispatchSpy, getStateSpy);
            });

            it('calls getPairingHistoryAndDo helper with correct arguments', function() {
                expect(getPairingHistoryAndDoSpy).toHaveBeenCalledWith(77, jasmine.anything());
            });

            it('passes in a success callback that will dispatch a loadPairingHistory action', function() {
                var successCallback = getPairingHistoryAndDoSpy.calls.mostRecent().args[1];
                successCallback(pairingHistoryData);

                expect(loadPairingHistoryCreatorSpy).toHaveBeenCalledWith(pairingHistoryData);
                expect(dispatchSpy).toHaveBeenCalledWith(pairingHistoryDataAction);
            });
        });
    });
});