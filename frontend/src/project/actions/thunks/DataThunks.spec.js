import * as dataThunks from './DataThunks.js'

import * as databaseHelpers from '../../../shared/helpers/DatabaseHelpers.js'
import * as dataCreators from '../creators/DataCreators.js'
import * as settingsCreators from '../creators/SettingsCreators.js'
import * as systemAdapters from '../../../shared/misc/SystemAdapter.js'

describe('DataThunks', () => {
    let thunk
    let dispatchSpy, getStateSpy

    beforeEach(() => {
        dispatchSpy = jasmine.createSpy('dispatchSpy')
        getStateSpy = jasmine.createSpy('getStateSpy')
    })

    describe('#resetProjectThunk', () => {
        let resetProjectAndDoSpy

        beforeEach(() => {
            resetProjectAndDoSpy = spyOn(databaseHelpers, 'resetProjectAndDo')

            thunk = dataThunks.resetProjectThunk()
        })

        it('returns a function', () => {
            expect(typeof thunk).toBe('function')
        })

        describe('when calling the returned function', () => {
            const newProjectData = { data: 'blarg' }
            const project = { id: 7, data: 'le stuff' }
            const stateOfApp = { data: { project: project } }

            beforeEach(() => {
                getStateSpy.and.returnValue(stateOfApp)

                thunk(dispatchSpy, getStateSpy)
            })

            it('calls resetProjectAndDo helper with correct arguments', () => {
                expect(resetProjectAndDoSpy).toHaveBeenCalledWith(7, jasmine.anything(), jasmine.anything())
            })

            it('dispatches a loadProject action when resetting the project is successful', () => {
                const successCallback = resetProjectAndDoSpy.calls.mostRecent().args[1]
                successCallback(newProjectData)

                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.loadProjectCreator(newProjectData))
            })
        })
    })

    describe('#addNewPersonThunk', () => {
        let postPersonAndDoSpy
        const callbackSpy = jasmine.createSpy('callbackSpy')

        beforeEach(() => {
            postPersonAndDoSpy = spyOn(databaseHelpers, 'postPersonAndDo')

            thunk = dataThunks.addNewPersonThunk('Name', callbackSpy)
        })

        it('returns a function', () => {
            expect(typeof thunk).toBe('function')
        })

        describe('when calling the returned function', () => {
            const newProjectData = { data: 'blarg' }
            const project = { id: 7, data: 'le stuff' }
            const stateOfApp = { data: { project: project } }

            beforeEach(() => {
                getStateSpy.and.returnValue(stateOfApp)

                thunk(dispatchSpy, getStateSpy)
            })

            it('calls postPersonAndDo helper with correct arguments', () => {
                expect(postPersonAndDoSpy).toHaveBeenCalledWith(7, 'Name', jasmine.anything(), jasmine.anything())
            })

            it('calls the custom callback and dispatches a loadProject action when adding a person is successful', () => {
                const successCallback = postPersonAndDoSpy.calls.mostRecent().args[2]
                successCallback(newProjectData)

                expect(callbackSpy).toHaveBeenCalled()
                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.loadProjectCreator(newProjectData))
            })

            it('dispatches a setNewPersonModalErrorMessage action when adding a person fails', () => {
                const errorResponse = {message: 'Need more coffee!', fieldErrors: {}}

                const errorCallback = postPersonAndDoSpy.calls.mostRecent().args[3]
                errorCallback(errorResponse)

                expect(dispatchSpy).toHaveBeenCalledWith(settingsCreators.setNewPersonModalErrorMessageCreator(errorResponse))
            })
        })
    })

    describe('#movePersonThunk', () => {
        let putPersonPositionAndDoSpy
        const newPosition = { floating: false, pairingBoardId: 88 }

        beforeEach(() => {
            putPersonPositionAndDoSpy = spyOn(databaseHelpers, 'putPersonPositionAndDo')

            thunk = dataThunks.movePersonThunk(1, newPosition)
        })

        it('returns a function', () => {
            expect(typeof thunk).toBe('function')
        })

        describe('when calling the returned function', () => {
            const newProjectData = { data: 'blarg' }
            const project = { id: 7, data: 'le stuff' }
            const stateOfApp = { data: { project: project } }

            beforeEach(() => {
                getStateSpy.and.returnValue(stateOfApp)

                thunk(dispatchSpy, getStateSpy)
            })

            it('calls putPersonPositionAndDo helper with correct arguments', () => {
                expect(putPersonPositionAndDoSpy).toHaveBeenCalledWith(7, 1, newPosition, jasmine.anything(), jasmine.anything())
            })

            it('dispatches a loadProject action when moving a person is successful', () => {
                const successCallback = putPersonPositionAndDoSpy.calls.mostRecent().args[3]
                successCallback(newProjectData)

                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.loadProjectCreator(newProjectData))
            })
        })
    })

    describe('#deletePersonThunk', () => {
        let deletePersonAndDoSpy

        beforeEach(() => {
            deletePersonAndDoSpy = spyOn(databaseHelpers, 'deletePersonAndDo')

            thunk = dataThunks.deletePersonThunk(2)
        })

        it('returns a function', () => {
            expect(typeof thunk).toBe('function')
        })

        describe('when calling the returned function', () => {
            const newProjectData = { data: 'blarg' }
            const project = { id: 7, data: 'le stuff' }
            const stateOfApp = { data: { project: project } }

            beforeEach(() => {
                getStateSpy.and.returnValue(stateOfApp)

                thunk(dispatchSpy, getStateSpy)
            })

            it('calls deletepersonAndDo helper with correct arguments', () => {
                expect(deletePersonAndDoSpy).toHaveBeenCalledWith(7, 2, jasmine.anything(), jasmine.anything())
            })

            it('dispatches a loadProject action when deleting the person is successful', () => {
                const successCallback = deletePersonAndDoSpy.calls.mostRecent().args[2]
                successCallback(newProjectData)

                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.loadProjectCreator(newProjectData))
            })
        })
    })

    describe('#addNewPairingBoardThunk', () => {
        let postPairingBoardAndDoSpy
        const callbackSpy = jasmine.createSpy('callbackSpy')

        beforeEach(() => {
            postPairingBoardAndDoSpy = spyOn(databaseHelpers, 'postPairingBoardAndDo')

            thunk = dataThunks.addNewPairingBoardThunk('Name', callbackSpy)
        })

        it('returns a function', () => {
            expect(typeof thunk).toBe('function')
        })

        describe('when calling the returned function', () => {
            const newProjectData = { data: 'blarg' }
            const project = { id: 7, data: 'le stuff' }
            const stateOfApp = { data: { project: project } }

            beforeEach(() => {
                getStateSpy.and.returnValue(stateOfApp)

                thunk(dispatchSpy, getStateSpy)
            })

            it('calls postPairingBoardAndDo helper with correct arguments', () => {
                expect(postPairingBoardAndDoSpy).toHaveBeenCalledWith(7, 'Name', jasmine.anything(), jasmine.anything())
            })

            it('calls the custom callback and dispatches a loadProject action when adding a pairing board is successful', () => {
                const successCallback = postPairingBoardAndDoSpy.calls.mostRecent().args[2]
                successCallback(newProjectData)

                expect(callbackSpy).toHaveBeenCalled()
                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.loadProjectCreator(newProjectData))
            })

            it('dispatches a setNewPairingBoardModalErrorMessage action when adding a pairing board fails', () => {
                const errorResponse = {message: 'Need more coffee!', fieldErrors: {}}

                const errorCallback = postPairingBoardAndDoSpy.calls.mostRecent().args[3]
                errorCallback(errorResponse)

                expect(dispatchSpy).toHaveBeenCalledWith(settingsCreators.setNewPairingBoardModalErrorMessageCreator(errorResponse))
            })
        })
    })

    describe('#renamePairingBoardThunk', () => {
        let putPairingBoardAndDoSpy
        const callbackSpy = jasmine.createSpy('callbackSpy')

        beforeEach(() => {
            putPairingBoardAndDoSpy = spyOn(databaseHelpers, 'putPairingBoardAndDo')

            thunk = dataThunks.renamePairingBoardThunk(2, 'Name', callbackSpy)
        })

        it('returns a function', () => {
            expect(typeof thunk).toBe('function')
        })

        describe('when calling the returned function', () => {
            const newProjectData = { data: 'blarg' }
            const project = { id: 7, data: 'le stuff' }
            const stateOfApp = { data: { project: project } }

            beforeEach(() => {
                getStateSpy.and.returnValue(stateOfApp)

                thunk(dispatchSpy, getStateSpy)
            })

            it('dispatches a clearPairingBoardEditErrorMessage action for the pairing board', () => {
                expect(dispatchSpy).toHaveBeenCalledWith(settingsCreators.clearPairingBoardEditErrorMessageCreator(2))
            })

            it('calls putPairingBoardAndDo helper with correct arguments', () => {
                expect(putPairingBoardAndDoSpy).toHaveBeenCalledWith(7, 2, 'Name', jasmine.anything(), jasmine.anything())
            })

            it('calls the custom callback and dispatches a loadProject action when renaming the pairing board is successful', () => {
                const successCallback = putPairingBoardAndDoSpy.calls.mostRecent().args[3]
                successCallback(newProjectData)

                expect(callbackSpy).toHaveBeenCalled()
                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.loadProjectCreator(newProjectData))
            })

            it('dispatches a setPairingBoardEditErrorMessage action when renaming the pairing board fails', () => {
                const errorResponse = {message: 'Need more coffee!', fieldErrors: {}}

                const errorCallback = putPairingBoardAndDoSpy.calls.mostRecent().args[4]
                errorCallback(errorResponse)

                expect(dispatchSpy).toHaveBeenCalledWith(settingsCreators.setPairingBoardEditErrorMessageCreator(2, errorResponse))
            })
        })
    })

    describe('#deletePairingBoardThunk', () => {
        let deletePairingBoardAndDoSpy

        beforeEach(() => {
            deletePairingBoardAndDoSpy = spyOn(databaseHelpers, 'deletePairingBoardAndDo')

            thunk = dataThunks.deletePairingBoardThunk(2)
        })

        it('returns a function', () => {
            expect(typeof thunk).toBe('function')
        })

        describe('when calling the returned function', () => {
            const newProjectData = { data: 'blarg' }
            const project = { id: 7, data: 'le stuff' }
            const stateOfApp = { data: { project: project } }

            beforeEach(() => {
                getStateSpy.and.returnValue(stateOfApp)

                thunk(dispatchSpy, getStateSpy)
            })

            it('calls deletePairingBoardAndDo helper with correct arguments', () => {
                expect(deletePairingBoardAndDoSpy).toHaveBeenCalledWith(7, 2, jasmine.anything(), jasmine.anything())
            })

            it('dispatches a loadProject action when deleting the pairing board is successful', () => {
                const successCallback = deletePairingBoardAndDoSpy.calls.mostRecent().args[2]
                successCallback(newProjectData)

                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.loadProjectCreator(newProjectData))
            })
        })
    })

    describe('#addNewRoleThunk', () => {
        let postRoleAndDoSpy
        const callbackSpy = jasmine.createSpy('callbackSpy')

        beforeEach(() => {
            postRoleAndDoSpy = spyOn(databaseHelpers, 'postRoleAndDo')

            thunk = dataThunks.addNewRoleThunk(10, 'Name', callbackSpy)
        })

        it('returns a function', () => {
            expect(typeof thunk).toBe('function')
        })

        describe('when calling the returned function', () => {
            const newProjectData = { data: 'blarg' }
            const project = { id: 7, data: 'le stuff' }
            const stateOfApp = { data: { project: project } }

            beforeEach(() => {
                getStateSpy.and.returnValue(stateOfApp)

                thunk(dispatchSpy, getStateSpy)
            })

            it('calls postRoleAndDo helper with correct arguments', () => {
                expect(postRoleAndDoSpy).toHaveBeenCalledWith(7, 10, 'Name', jasmine.anything(), jasmine.anything())
            })

            it('calls the custom callback and dispatches a loadProject action when adding a role is successful', () => {
                const successCallback = postRoleAndDoSpy.calls.mostRecent().args[3]
                successCallback(newProjectData)

                expect(callbackSpy).toHaveBeenCalled()
                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.loadProjectCreator(newProjectData))
            })

            it('dispatches a setNewRoleModalErrorMessage action when adding a role fails', () => {
                const errorResponse = {message: 'Need more coffee!', fieldErrors: {}}

                const errorCallback = postRoleAndDoSpy.calls.mostRecent().args[4]
                errorCallback(errorResponse)

                expect(dispatchSpy).toHaveBeenCalledWith(settingsCreators.setNewRoleModalErrorMessageCreator(errorResponse))
            })
        })
    })

    describe('#moveRoleThunk', () => {
        let putRolePositionAndDoSpy
        const newPosition = { pairingBoardId: 88 }

        beforeEach(() => {
            putRolePositionAndDoSpy = spyOn(databaseHelpers, 'putRolePositionAndDo')

            thunk = dataThunks.moveRoleThunk(1, 2, newPosition)
        })

        it('returns a function', () => {
            expect(typeof thunk).toBe('function')
        })

        describe('when calling the returned function', () => {
            const newProjectData = { data: 'blarg' }
            const project = { id: 7, data: 'le stuff' }
            const stateOfApp = { data: { project: project } }

            beforeEach(() => {
                getStateSpy.and.returnValue(stateOfApp)

                thunk(dispatchSpy, getStateSpy)
            })

            it('calls putRolePositionAndDo helper with correct arguments', () => {
                expect(putRolePositionAndDoSpy).toHaveBeenCalledWith(7, 1, 2, newPosition, jasmine.anything(), jasmine.anything())
            })

            it('dispatches a loadProject action when moving a role is successful', () => {
                const successCallback = putRolePositionAndDoSpy.calls.mostRecent().args[4]
                successCallback(newProjectData)

                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.loadProjectCreator(newProjectData))
            })
        })
    })

    describe('#deleteRoleThunk', () => {
        let deleteRoleAndDoSpy

        beforeEach(() => {
            deleteRoleAndDoSpy = spyOn(databaseHelpers, 'deleteRoleAndDo')

            thunk = dataThunks.deleteRoleThunk(2, 3)
        })

        it('returns a function', () => {
            expect(typeof thunk).toBe('function')
        })

        describe('when calling the returned function', () => {
            const newProjectData = { data: 'blarg' }
            const project = { id: 7, data: 'le stuff' }
            const stateOfApp = { data: { project: project } }

            beforeEach(() => {
                getStateSpy.and.returnValue(stateOfApp)

                thunk(dispatchSpy, getStateSpy)
            })

            it('calls deleteRoleAndDo helper with correct arguments', () => {
                expect(deleteRoleAndDoSpy).toHaveBeenCalledWith(7, 2, 3, jasmine.anything(), jasmine.anything())
            })

            it('dispatches a loadProject action when deleting the role is successful', () => {
                const successCallback = deleteRoleAndDoSpy.calls.mostRecent().args[3]
                successCallback(newProjectData)

                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.loadProjectCreator(newProjectData))
            })
        })
    })

    describe('#savePairingThunk', () => {
        let postProjectPairingAndDoSpy, setTimeoutSpy

        beforeEach(() => {
            postProjectPairingAndDoSpy = spyOn(databaseHelpers, 'postProjectPairingAndDo')
            setTimeoutSpy = spyOn(systemAdapters, 'setTimeout')

            thunk = dataThunks.savePairingThunk()
        })

        it('returns a function', () => {
            expect(typeof thunk).toBe('function')
        })

        describe('when calling the returned function', () => {
            const project = { id: 7, data: 'le stuff' }
            const stateOfApp = { data: { project: project } }
            const newPairingHistories = [ { data: 1 }, { data: 2 } ]

            beforeEach(() => {
                getStateSpy.and.returnValue(stateOfApp)

                thunk(dispatchSpy, getStateSpy)
            })

            it('does not call the dispatch function', () => {
                expect(dispatchSpy).not.toHaveBeenCalled()
            })

            it('calls postProjectPairingAndDo helper with correct arguments', () => {
                expect(getStateSpy).toHaveBeenCalled()
                expect(postProjectPairingAndDoSpy).toHaveBeenCalledWith(7, jasmine.anything())
            })

            it('dispatches an updatePairingHistory action when saving the pairing is successful', () => {
                const successCallback = postProjectPairingAndDoSpy.calls.mostRecent().args[1]
                successCallback(newPairingHistories)

                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.updatePairingHistoriesCreator(newPairingHistories))
            })

            it('dispatches an setSystemAlertMessage action when saving the pairing is successful', () => {
                const successCallback = postProjectPairingAndDoSpy.calls.mostRecent().args[1]
                successCallback(newPairingHistories)

                expect(dispatchSpy).toHaveBeenCalledWith(settingsCreators.setSystemAlertMessage('Hello. We just recorded your pairs.'))
            })

            it('dispatches an clearSystemAlertMessage action after 10 seconds when saving the pairing is successful', () => {
                const successCallback = postProjectPairingAndDoSpy.calls.mostRecent().args[1]
                successCallback(newPairingHistories)

                expect(setTimeoutSpy).toHaveBeenCalledWith(jasmine.anything(), 10000)

                const setTimeoutCallback = setTimeoutSpy.calls.mostRecent().args[0]
                setTimeoutCallback()
                expect(dispatchSpy).toHaveBeenCalledWith(settingsCreators.clearSystemAlertMessage())
            })
        })
    })

    describe('#getRecommendedPairsThunk', () => {
        let getRecommendedPairingAndDoSpy

        beforeEach(() => {
            getRecommendedPairingAndDoSpy = spyOn(databaseHelpers, 'getRecommendedPairingAndDo')

            thunk = dataThunks.getRecommendedPairsThunk()
        })

        it('returns a function', () => {
            expect(typeof thunk).toBe('function')
        })

        describe('when calling the returned function', () => {
            const project = { id: 88, stuff: 'things' }
            const stateOfApp = { data: { project: project } }
            const newProjectData = { data: 'blarg' }

            beforeEach(() => {
                getStateSpy.and.returnValue(stateOfApp)

                thunk(dispatchSpy, getStateSpy)
            })

            it('does not call the dispatch function', () => {
                expect(dispatchSpy).not.toHaveBeenCalled()
            })

            it('calls postProjectPairingAndDo helper with correct arguments', () => {
                expect(getStateSpy).toHaveBeenCalled()
                expect(getRecommendedPairingAndDoSpy).toHaveBeenCalledWith(88, jasmine.anything())
            })

            it('dispatches a loadProject action when getting the recommended pairing is successful', () => {
                const successCallback = getRecommendedPairingAndDoSpy.calls.mostRecent().args[1]
                successCallback(newProjectData)

                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.loadProjectCreator(newProjectData))
            })
        })
    })

    describe('#getPairingHistoryThunk', () => {
        let getPairingHistoryAndDoSpy

        beforeEach(() => {
            getPairingHistoryAndDoSpy = spyOn(databaseHelpers, 'getPairingHistoryAndDo')

            thunk = dataThunks.getPairingHistoryThunk()
        })

        it('returns a function', () => {
            expect(typeof thunk).toBe('function')
        })

        describe('when calling the returned function', () => {
            const pairingHistoryData = [ { data:'Weeeee' } ]
            const project = { id: 7, data: 'le stuff' }
            const stateOfApp = { data: { project: project } }

            beforeEach(() => {
                getStateSpy.and.returnValue(stateOfApp)

                thunk(dispatchSpy, getStateSpy)
            })

            it('calls getPairingHistoryAndDo helper with correct arguments', () => {
                expect(getPairingHistoryAndDoSpy).toHaveBeenCalledWith(7, jasmine.anything())
            })

            it('dispatches a loadPairingHistory action when getting the pairing history is successful', () => {
                const successCallback = getPairingHistoryAndDoSpy.calls.mostRecent().args[1]
                successCallback(pairingHistoryData)

                expect(dispatchSpy).toHaveBeenCalledWith(dataCreators.loadPairingHistoryCreator(pairingHistoryData))
            })
        })
    })
})