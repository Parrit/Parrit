var appActions = require('../../../main/js/actions/appActions.js');

describe('appActions', function() {
    beforeEach(function() {
        jasmine.Ajax.install();
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    describe('#loadState', function() {
        var action;
        beforeEach(function() {
            action = appActions.loadState();
        });

        it('returns a function', function() {
            expect(typeof action).toBe('function');
        });

        describe('when calling the returned function', function() {
            var dispatchSpy;
            var responseText = { iamaproperty:"blahblah" };
            beforeEach(function() {
                jasmine.Ajax.stubRequest('/state?id=0', undefined, 'GET').andReturn({ responseText: responseText });

                dispatchSpy = jasmine.createSpy();
                action(dispatchSpy);
            });

            it('makes an Ajax call to get the state for id 0', function(done) {
                setTimeout(function() {
                    expect(jasmine.Ajax.requests.count()).toBe(1);
                    expect(jasmine.Ajax.requests.mostRecent().url).toBe('/state?id=0');
                    done();
                });
            });

            describe('when the Ajax call returns with a response', function() {

                it('dispatches a LOAD_STATE action with the response', function(done) {
                    setTimeout(function() {
                        expect(dispatchSpy).toHaveBeenCalledWith({type: 'LOAD_STATE', state: responseText});
                        done();
                    });
                });
            });
        });
    });

    describe('#saveState', function() {

    });
});