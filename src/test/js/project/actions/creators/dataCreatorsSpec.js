var dataCreators = require('project/actions/creators/dataCreators.js');

describe('dataCreators', function () {
    var result;

    describe('#movePersonCreator', function () {
        var expectedAction = {
            type: 'MOVE_PERSON',
            fromPairingBoardIndex: 1,
            toPairingBoardIndex: 2,
            personIndex: 3
        };

        beforeEach(function() {
            result = dataCreators.movePersonCreator(1, 2, 3);
        });

        it('returns the expected action', function () {
            expect(result).toEqual(expectedAction);
        });
    });

    describe('#createPersonCreator', function () {
        var expectedAction = {
            type: 'CREATE_PERSON',
            name: 'Dirk Dirkenson'
        };

        beforeEach(function() {
            result = dataCreators.createPersonCreator('Dirk Dirkenson');
        });

        it('returns the expected action', function () {
            expect(result).toEqual(expectedAction);
        });
    });

    describe('#createPairingBoardCreator', function() {
        var expectedAction = {
            type: 'CREATE_PAIRING_BOARD',
            name: 'A Bus Bench'
        };

        beforeEach(function() {
            result = dataCreators.createPairingBoardCreator('A Bus Bench');
        });

        it('returns the expected action', function () {
            expect(result).toEqual(expectedAction);
        });
    });

    describe('#deletePersonCreator', function() {
        var expectedAction = {
            type: 'DELETE_PERSON',
            pairingBoardIndex: 1,
            personIndex: 2
        };

        beforeEach(function() {
            result = dataCreators.deletePersonCreator(1, 2);
        });

        it('returns the expected action', function () {
            expect(result).toEqual(expectedAction);
        });
    });

    describe('#deletePairingBoardCreator', function() {
        var expectedAction = {
            type: 'DELETE_PAIRING_BOARD',
            pairingBoardIndex: 1
        };

        beforeEach(function() {
            result = dataCreators.deletePairingBoardCreator(1);
        });

        it('returns the expected action', function () {
            expect(result).toEqual(expectedAction);
        });
    });

    describe('#loadProjectCreator', function() {
        var expectedAction = {
            type: 'LOAD_PROJECT',
            project: {data: 'Weeeee'}
        };

        beforeEach(function() {
            result = dataCreators.loadProjectCreator({data: 'Weeeee'});
        });

        it('returns the expected action', function () {
            expect(result).toEqual(expectedAction);
        });
    });

    describe('#renamePairingBoardCreator', function() {
        var expectedAction = {
            type: 'RENAME_PAIRING_BOARD',
            pairingBoardIndex: 2,
            name: 'cheese'
        };

        beforeEach(function() {
            result = dataCreators.renamePairingBoardCreator(2, 'cheese');
        });

        it('returns the expected action', function () {
            expect(result).toEqual(expectedAction);
        });
    });
});