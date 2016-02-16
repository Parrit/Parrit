var dataActions = require('actions/dataActions.js');
var dataThunks = require('actions/thunks/dataThunks.js');

describe('dataActions', function () {
    describe('#loadWorkspace', function () {
        var result;
        var thunkResult = { thunkResult: 'Cowabunga' };
        var loadWorkspaceThunkSpy;
        beforeEach(function() {
            loadWorkspaceThunkSpy = spyOn(dataThunks, 'loadWorkspaceThunk').and.returnValue(thunkResult);
            result = dataActions.loadWorkspace(1, 2, 3);
        });

        it('calls the loadWorkspaceThunk', function() {
            expect(loadWorkspaceThunkSpy).toHaveBeenCalled();
        });

        it('returns the result of loadWorkspaceThunk', function() {
            expect(result).toBe(thunkResult);
        });
    });

    describe('#movePerson', function () {
        var expectedAction = {
            type: "MOVE_PERSON",
            fromSpaceIndex: 1,
            toSpaceIndex: 2,
            personIndex: 3
        };

        var result;
        var thunkResult = { thunkResult: 'Cowabunga' };
        var autoSaveThunkSpy;
        beforeEach(function() {
            autoSaveThunkSpy = spyOn(dataThunks, 'autoSaveThunk').and.returnValue(thunkResult);
            result = dataActions.movePerson(1, 2, 3);
        });

        it('calls autoSaveThunk with the correct action', function () {
            expect(autoSaveThunkSpy).toHaveBeenCalledWith(expectedAction);
        });

        it('returns the result from autoSaveThunk', function () {
            expect(result).toBe(thunkResult);
        });
    });

    describe('#createPerson', function () {
        var expectedAction = {
            type: "CREATE_PERSON",
            name: "Dirk Dirkenson"
        };

        var result;
        var thunkResult = { thunkResult: 'Cowabunga' };
        var autoSaveThunkSpy;
        beforeEach(function() {
            autoSaveThunkSpy = spyOn(dataThunks, 'autoSaveThunk').and.returnValue(thunkResult);
            result = dataActions.createPerson('Dirk Dirkenson');
        });

        it('calls autoSaveThunk with the correct action', function () {
            expect(autoSaveThunkSpy).toHaveBeenCalledWith(expectedAction);
        });

        it('returns the result from autoSaveThunk', function () {
            expect(result).toBe(thunkResult);
        });
    });

    describe('#createSpace', function() {
        var expectedAction = {
            type: 'CREATE_SPACE',
            name: 'A Bus Bench'
        };

        var result;
        var thunkResult = { thunkResult: 'Cowabunga' };
        var autoSaveThunkSpy;
        beforeEach(function() {
            autoSaveThunkSpy = spyOn(dataThunks, 'autoSaveThunk').and.returnValue(thunkResult);
            result = dataActions.createSpace('A Bus Bench');
        });

        it('calls autoSaveThunk with the correct action', function () {
            expect(autoSaveThunkSpy).toHaveBeenCalledWith(expectedAction);
        });

        it('returns the result from autoSaveThunk', function () {
            expect(result).toBe(thunkResult);
        });
    });

    describe('#deletePerson', function() {
        var expectedAction = {
            type: 'DELETE_PERSON',
            spaceIndex: 1,
            personIndex: 2
        };

        var result;
        var thunkResult = { thunkResult: 'Cowabunga' };
        var autoSaveThunkSpy;
        beforeEach(function() {
            autoSaveThunkSpy = spyOn(dataThunks, 'autoSaveThunk').and.returnValue(thunkResult);
            result = dataActions.deletePerson(1, 2);
        });

        it('calls autoSaveThunk with the correct action', function () {
            expect(autoSaveThunkSpy).toHaveBeenCalledWith(expectedAction);
        });

        it('returns the result from autoSaveThunk', function () {
            expect(result).toBe(thunkResult);
        });
    });

    describe('#deleteSpace', function() {
        var expectedAction = {
            type: 'DELETE_SPACE',
            spaceIndex: 1
        };

        var result;
        var thunkResult = { thunkResult: 'Cowabunga' };
        var autoSaveThunkSpy;
        beforeEach(function() {
            autoSaveThunkSpy = spyOn(dataThunks, 'autoSaveThunk').and.returnValue(thunkResult);
            result = dataActions.deleteSpace(1);
        });

        it('calls autoSaveThunk with the correct action', function () {
            expect(autoSaveThunkSpy).toHaveBeenCalledWith(expectedAction);
        });

        it('returns the result from autoSaveThunk', function () {
            expect(result).toBe(thunkResult);
        });
    });
});