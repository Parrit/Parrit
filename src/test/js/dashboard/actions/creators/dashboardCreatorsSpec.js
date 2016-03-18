var dashboardCreators = require('dashboard/actions/creators/dashboardCreators.js');

describe('dashboardCreators', function () {
    var result;

    describe('#setNewProjectErrorCreator', function () {
        var expectedAction = {
            type: 'SET_NEW_PROJECT_ERROR',
            errorStatus: 400
        };

        beforeEach(function() {
            result = dashboardCreators.setNewProjectErrorCreator(400);
        });

        it('returns the expected action', function () {
            expect(result).toEqual(expectedAction);
        });
    });

    describe('#setLoginErrorCreator', function () {
        var expectedAction = {
            type: 'SET_LOGIN_ERROR',
            errorStatus: 400
        };

        beforeEach(function() {
            result = dashboardCreators.setLoginErrorCreator(400);
        });

        it('returns the expected action', function () {
            expect(result).toEqual(expectedAction);
        });
    });
});