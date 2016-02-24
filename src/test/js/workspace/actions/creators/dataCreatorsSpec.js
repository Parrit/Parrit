var dataCreators = require('workspace/actions/creators/dataCreators.js');

describe('dataCreators', function () {
    var result;

    describe('#movePersonCreator', function () {
        var expectedAction = {
            type: "MOVE_PERSON",
            fromSpaceIndex: 1,
            toSpaceIndex: 2,
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
            type: "CREATE_PERSON",
            name: "Dirk Dirkenson"
        };

        beforeEach(function() {
            result = dataCreators.createPersonCreator('Dirk Dirkenson');
        });

        it('returns the expected action', function () {
            expect(result).toEqual(expectedAction);
        });
    });

    describe('#createSpaceCreator', function() {
        var expectedAction = {
            type: 'CREATE_SPACE',
            name: 'A Bus Bench'
        };

        beforeEach(function() {
            result = dataCreators.createSpaceCreator('A Bus Bench');
        });

        it('returns the expected action', function () {
            expect(result).toEqual(expectedAction);
        });
    });

    describe('#deletePersonCreator', function() {
        var expectedAction = {
            type: 'DELETE_PERSON',
            spaceIndex: 1,
            personIndex: 2
        };

        beforeEach(function() {
            result = dataCreators.deletePersonCreator(1, 2);
        });

        it('returns the expected action', function () {
            expect(result).toEqual(expectedAction);
        });
    });

    describe('#deleteSpaceCreator', function() {
        var expectedAction = {
            type: 'DELETE_SPACE',
            spaceIndex: 1
        };

        beforeEach(function() {
            result = dataCreators.deleteSpaceCreator(1);
        });

        it('returns the expected action', function () {
            expect(result).toEqual(expectedAction);
        });
    });

    describe('#loadWorkspaceCreator', function() {
        var expectedAction = {
            type: 'LOAD_WORKSPACE',
            workspace: {data: "Weeeee"}
        };

        beforeEach(function() {
            result = dataCreators.loadWorkspaceCreator({data: "Weeeee"});
        });

        it('returns the expected action', function () {
            expect(result).toEqual(expectedAction);
        });
    });
});