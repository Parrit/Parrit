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
            var stubbedGet;
            var dispatchSpy;
            beforeEach(function() {
                stubbedGet = jasmine.Ajax.stubRequest('/state?id=1', undefined, 'GET');

                dispatchSpy = jasmine.createSpy();
                action(dispatchSpy);
            });

            it('makes an Ajax call to get the state for id 1', function(done) {
                setTimeout(function() {
                    expect(jasmine.Ajax.requests.count()).toBe(1);
                    expect(jasmine.Ajax.requests.mostRecent().url).toBe('/state?id=1');
                    done();
                });
            });

            describe('when the Ajax call returns with a NONNULL response', function() {
                var responseText = { iamaproperty:"blahblah" };
                beforeEach(function() {
                    stubbedGet.andReturn({ responseText: responseText });
                });

                it('dispatches a LOAD_STATE action with the response', function(done) {
                    setTimeout(function() {
                        expect(dispatchSpy).toHaveBeenCalledWith({type: 'LOAD_STATE', state: responseText});
                        done();
                    });
                });
            });

            describe('when the Ajax call returns with a NULL response', function() {
                beforeEach(function() {
                    stubbedGet.andReturn({ responseText: null });
                });

                it('SHOULD NOT dispatch a LOAD_STATE action with the response', function(done) {
                    setTimeout(function() {
                        expect(dispatchSpy).not.toHaveBeenCalled();
                        done();
                    });
                });
            });
        });
    });

    describe('#saveState', function() {

    });
});