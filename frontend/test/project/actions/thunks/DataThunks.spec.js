import * as dataThunks from 'project/actions/thunks/DataThunks.js';

import * as databaseHelpers from 'shared/helpers/DatabaseHelpers.js';
import * as dataCreators from 'project/actions/creators/DataCreators.js';
import * as settingsCreators from 'project/actions/creators/SettingsCreators.js';

describe('DataThunks', () => {
    let thunk;
    let dispatchSpy, getStateSpy;
    let putProjectAndDoSpy, postAddNewPersonAndDoSpy, postAddNewPairingBoardAndDoSpy, putPairingBoardAndDoSpy,
        postProjectPairingAndDoSpy, getRecommendedPairingAndDoSpy, getPairingHistoryAndDoSpy;

    beforeEach(() => {
        dispatchSpy = jasmine.createSpy('dispatchSpy');
        getStateSpy = jasmine.createSpy('getStateSpy');
        
        putProjectAndDoSpy = spyOn(databaseHelpers, 'putProjectAndDo');
        postAddNewPersonAndDoSpy = spyOn(databaseHelpers, 'postAddNewPersonAndDo');
        postAddNewPairingBoardAndDoSpy = spyOn(databaseHelpers, 'postAddNewPairingBoardAndDo');
        putPairingBoardAndDoSpy = spyOn(databaseHelpers, 'putPairingBoardAndDo');
        postProjectPairingAndDoSpy = spyOn(databaseHelpers, 'postProjectPairingAndDo');
        getRecommendedPairingAndDoSpy = spyOn(databaseHelpers, 'getRecommendedPairingAndDo');
        getPairingHistoryAndDoSpy = spyOn(databaseHelpers, 'getPairingHistoryAndDo');
    });

    describe('#autoSaveThunk', () => {
        const action = { type: 'DELETE_INTERNET' };

        beforeEach(() => {
            thunk = dataThunks.autoSaveThunk(action);
        });

        it('returns a function', () => {
            expect(typeof thunk).toBe('function');
        });

        describe('when calling the returned function', () => {
            const projectToSave = { world: 'doomed' };
            const stateOfApp = { data: { project: projectToSave } };
            const newProjectData = { data: 'blarg' };

            beforeEach(() => {
                getStateSpy.and.returnValue(stateOfApp);

                thunk(dispatchSpy, getStateSpy);
            });

            it('calls the dispatch function with the passed in action', () => {
                expect(dispatchSpy).toHaveBeenCalledWith(action);
            });

            it('calls postStateAndDo helper with correct arguments', () => {
                expect(getStateSpy).toHaveBeenCalled();
                expect(putProjectAndDoSpy).toHaveBeenCalledWith(projectToSave, jasmine.anything(), jasmine.anything());
            });

            it('dispatches a loadProject action when posting the project is successful', () => {
                const successCallback = putProjectAndDoSpy.calls.mostRecent().args[1];
                successCallback(newProjectData);

                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.loadProjectCreator(newProjectData));
            });
        });
    });

    describe('#addNewPersonThunk', () => {
        const callbackSpy = jasmine.createSpy('callbackSpy');

        beforeEach(() => {
            thunk = dataThunks.addNewPersonThunk(1, "Name", callbackSpy);
        });

        it('returns a function', () => {
            expect(typeof thunk).toBe('function');
        });

        describe('when calling the returned function', () => {
            const newProjectData = { data: 'blarg' };

            beforeEach(() => {
                thunk(dispatchSpy, getStateSpy);
            });

            it('calls postAddNewPersonAndDo helper with correct arguments', () => {
                expect(postAddNewPersonAndDoSpy).toHaveBeenCalledWith(1, "Name", jasmine.anything(), jasmine.anything());
            });

            it('calls the custom callback and dispatches a loadProject action when adding a person is successful', () => {
                const successCallback = postAddNewPersonAndDoSpy.calls.mostRecent().args[2];
                successCallback(newProjectData);

                expect(callbackSpy).toHaveBeenCalled();
                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.loadProjectCreator(newProjectData));
            });

            it('dispatches a setNewPersonModalErrorMessage action when adding a person fails', () => {
                const errorResponse = {message: "Need more coffee!", fieldErrors: {}};

                const errorCallback = postAddNewPersonAndDoSpy.calls.mostRecent().args[3];
                errorCallback(errorResponse);

                expect(dispatchSpy).toHaveBeenCalledWith(settingsCreators.setNewPersonModalErrorMessageCreator(errorResponse));
            });
        });
    })

    describe('#addNewPairingBoardThunk', () => {
        const callbackSpy = jasmine.createSpy('callbackSpy');

        beforeEach(() => {
            thunk = dataThunks.addNewPairingBoardThunk(1, "Name", callbackSpy);
        });

        it('returns a function', () => {
            expect(typeof thunk).toBe('function');
        });

        describe('when calling the returned function', () => {
            const newProjectData = { data: 'blarg' };

            beforeEach(() => {
                thunk(dispatchSpy, getStateSpy);
            });

            it('calls postAddNewPairingBoardAndDo helper with correct arguments', () => {
                expect(postAddNewPairingBoardAndDoSpy).toHaveBeenCalledWith(1, "Name", jasmine.anything(), jasmine.anything());
            });

            it('calls the custom callback and dispatches a loadProject action when adding a pairing board is successful', () => {
                const successCallback = postAddNewPairingBoardAndDoSpy.calls.mostRecent().args[2];
                successCallback(newProjectData);

                expect(callbackSpy).toHaveBeenCalled();
                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.loadProjectCreator(newProjectData));
            });

            it('dispatches a setNewPairingBoardModalErrorMessage action when adding a pairing board fails', () => {
                const errorResponse = {message: "Need more coffee!", fieldErrors: {}};

                const errorCallback = postAddNewPairingBoardAndDoSpy.calls.mostRecent().args[3];
                errorCallback(errorResponse);

                expect(dispatchSpy).toHaveBeenCalledWith(settingsCreators.setNewPairingBoardModalErrorMessageCreator(errorResponse));
            });
        });
    })

    describe('#renamePairingBoardThunk', () => {
        const callbackSpy = jasmine.createSpy('callbackSpy');

        beforeEach(() => {
            thunk = dataThunks.renamePairingBoardThunk(2, "Name", callbackSpy);
        });

        it('returns a function', () => {
            expect(typeof thunk).toBe('function');
        });

        describe('when calling the returned function', () => {
            const newProjectData = { data: 'blarg' };
            const project = { id: 7, data: 'le stuff' };
            const stateOfApp = { data: { project: project } };

            beforeEach(() => {
                getStateSpy.and.returnValue(stateOfApp);

                thunk(dispatchSpy, getStateSpy);
            });

            it('dispatches a clearEditPairingBoardErrorMessage action for the pairing board', () => {
                expect(dispatchSpy).toHaveBeenCalledWith(settingsCreators.clearEditPairingBoardErrorMessageCreator(2));
            })

            it('calls putPairingBoardAndDo helper with correct arguments', () => {
                expect(putPairingBoardAndDoSpy).toHaveBeenCalledWith(7, 2, "Name", jasmine.anything(), jasmine.anything());
            });

            it('calls the custom callback and dispatches a loadProject action when renaming the pairing board is successful', () => {
                const successCallback = putPairingBoardAndDoSpy.calls.mostRecent().args[3];
                successCallback(newProjectData);

                expect(callbackSpy).toHaveBeenCalled();
                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.loadProjectCreator(newProjectData));
            });

            it('dispatches a setEditPairingBoardErrorMessage action when renaming the pairing board fails', () => {
                const errorResponse = {message: "Need more coffee!", fieldErrors: {}};

                const errorCallback = putPairingBoardAndDoSpy.calls.mostRecent().args[4];
                errorCallback(errorResponse);

                expect(dispatchSpy).toHaveBeenCalledWith(settingsCreators.setEditPairingBoardErrorMessageCreator(2, errorResponse));
            });
        });
    })

    describe('#savePairingThunk', () => {
        beforeEach(() => {
            thunk = dataThunks.savePairingThunk();
        });

        it('returns a function', () => {
            expect(typeof thunk).toBe('function');
        });

        describe('when calling the returned function', () => {
            const project = { id: 7, data: 'le stuff' };
            const stateOfApp = { data: { project: project } };
            const newPairingHistories = [ { data: 1 }, { data: 2 } ];

            beforeEach(() => {
                getStateSpy.and.returnValue(stateOfApp);

                thunk(dispatchSpy, getStateSpy);
            });

            it('does not call the dispatch function', () => {
                expect(dispatchSpy).not.toHaveBeenCalled();
            });

            it('calls postProjectPairingAndDo helper with correct arguments', () => {
                expect(getStateSpy).toHaveBeenCalled();
                expect(postProjectPairingAndDoSpy).toHaveBeenCalledWith(7, jasmine.anything());
            });

            it('dispatches an updatePairingHistory action when saving the pairing is successful', () => {
                const successCallback = postProjectPairingAndDoSpy.calls.mostRecent().args[1];
                successCallback(newPairingHistories);

                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.updatePairingHistoriesCreator(newPairingHistories))
            });
        });
    });

    describe('#getRecommendedPairsThunk', () => {
        beforeEach(() => {
            thunk = dataThunks.getRecommendedPairsThunk();
        });

        it('returns a function', () => {
            expect(typeof thunk).toBe('function');
        });

        describe('when calling the returned function', () => {
            const project = { id: 88, stuff: "things" };
            const stateOfApp = { data: { project: project } };
            const newProjectData = { data: 'blarg' };

            beforeEach(() => {
                getStateSpy.and.returnValue(stateOfApp);

                thunk(dispatchSpy, getStateSpy);
            });

            it('does not call the dispatch function', () => {
                expect(dispatchSpy).not.toHaveBeenCalled();
            });

            it('calls postProjectPairingAndDo helper with correct arguments', () => {
                expect(getStateSpy).toHaveBeenCalled();
                expect(getRecommendedPairingAndDoSpy).toHaveBeenCalledWith(88, jasmine.anything());
            });

            it('dispatches a loadProject action when getting the recommended pairing is successful', () => {
                const successCallback = getRecommendedPairingAndDoSpy.calls.mostRecent().args[1];
                successCallback(newProjectData);

                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.loadProjectCreator(newProjectData));
            });
        });
    });

    describe('#getPairingHistoryThunk', () => {
        beforeEach(() => {
            thunk = dataThunks.getPairingHistoryThunk(77);
        });

        it('returns a function', () => {
            expect(typeof thunk).toBe('function');
        });

        describe('when calling the returned function', () => {
            const pairingHistoryData = [ { data:'Weeeee' } ];

            beforeEach(() => {
                thunk(dispatchSpy, getStateSpy);
            });

            it('calls getPairingHistoryAndDo helper with correct arguments', () => {
                expect(getPairingHistoryAndDoSpy).toHaveBeenCalledWith(77, jasmine.anything());
            });

            it('dispatches a loadPairingHistory action when getting the pairing history is successful', () => {
                const successCallback = getPairingHistoryAndDoSpy.calls.mostRecent().args[1];
                successCallback(pairingHistoryData);

                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.loadPairingHistoryCreator(pairingHistoryData));
            });
        });
    });
});