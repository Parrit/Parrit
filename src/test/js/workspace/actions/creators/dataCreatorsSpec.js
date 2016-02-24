var dataCreators = require('workspace/actions/creators/dataCreators.js');

describe('dataCreators', function () {
    var result;
    var autoSaveThunkSpy;
    var thunkResult = { thunkResult: 'Cowabunga' };
    beforeEach(function setup() {
        autoSaveThunkSpy = jasmine.createSpy('autoSaveThunk').and.returnValue(thunkResult);
        dataCreators.__set__('dataThunks', {autoSaveThunk: autoSaveThunkSpy});
    });

    describe('#movePerson', function () {
        var expectedAction = {
            type: "MOVE_PERSON",
            fromSpaceIndex: 1,
            toSpaceIndex: 2,
            personIndex: 3
        };

        beforeEach(function() {
            result = dataCreators.movePerson(1, 2, 3);
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

        beforeEach(function() {
            result = dataCreators.createPerson('Dirk Dirkenson');
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

        beforeEach(function() {
            result = dataCreators.createSpace('A Bus Bench');
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

        beforeEach(function() {
            result = dataCreators.deletePerson(1, 2);
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

        beforeEach(function() {
            result = dataCreators.deleteSpace(1);
        });

        it('calls autoSaveThunk with the correct action', function () {
            expect(autoSaveThunkSpy).toHaveBeenCalledWith(expectedAction);
        });

        it('returns the result from autoSaveThunk', function () {
            expect(result).toBe(thunkResult);
        });
    });
});