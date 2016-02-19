var databaseHelpers = require('actions/helpers/databaseHelpers.js');
var dataThunks = require('actions/thunks/dataThunks.js');

describe('dataThunks', function() {
    describe('#autoSaveThunk', function () {
        var thunk;
        var action = { type: 'DELETE_INTERNET' };

        beforeEach(function() {
            thunk = dataThunks.autoSaveThunk(action);
        });

        it('returns a function', function() {
            expect(typeof thunk).toBe('function');
        });

        describe('when calling the returned function', function() {
            var dispatchSpy;
            var postStateAndDoSpy;
            var stateOfApp = {data: "glarb"};
            beforeEach(function () {
                dispatchSpy = jasmine.createSpy('CreatePersonDispatch');
                postStateAndDoSpy = spyOn(databaseHelpers, 'postStateAndDo');

                thunk(dispatchSpy, function () {return stateOfApp});
            });

            it('calls the dispatch function with the passed in action', function() {
                expect(dispatchSpy).toHaveBeenCalledWith(action);
            });

            it('calls postStateAndDo helper with correct arguments', function() {
                expect(postStateAndDoSpy).toHaveBeenCalledWith(stateOfApp, jasmine.anything());
            });

            it('passes in a callback that will dispatch a loadWorkspace action', function() {
                var callback = postStateAndDoSpy.calls.mostRecent().args[1];
                callback({data:"blarg"});
                expect(dispatchSpy).toHaveBeenCalledWith({ type: 'LOAD_WORKSPACE', workspace: {data: 'blarg'} });
            });
        });
    });
});