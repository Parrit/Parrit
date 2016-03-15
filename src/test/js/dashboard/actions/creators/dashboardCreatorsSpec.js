var dashboardCreators = require('dashboard/actions/creators/dashboardCreators.js');

describe('dashboardCreators', function () {
    var result;

    describe('#setLoginErrorCreator', function () {
        var expectedAction = {
            type: 'SET_LOGIN_ERROR',
            errorMessage: 'HALP'
        };

        beforeEach(function() {
            result = dashboardCreators.setLoginErrorCreator('HALP');
        });

        it('returns the expected action', function () {
            expect(result).toEqual(expectedAction);
        });
    });
});