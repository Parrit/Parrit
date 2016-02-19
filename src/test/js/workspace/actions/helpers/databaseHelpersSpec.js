var databaseHelpers = require('workspace/actions/helpers/databaseHelpers.js');

describe('databaseHelpers', function() {
    beforeEach(function () {
        jasmine.Ajax.install();
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    describe('#postStateAndDo', function () {
        var stubbedPost;
        var callbackSpy;

        var workspaceToSave = {MISSISSIPPI: "Anthony is more fun than that"};
        var stateOfApp = {data: {workspace: workspaceToSave}};

        beforeEach(function () {
            stubbedPost = jasmine.Ajax.stubRequest('/api/workspace', undefined, 'POST');
            callbackSpy = jasmine.createSpy('callbackSpy');

            databaseHelpers.postStateAndDo(stateOfApp, callbackSpy);
        });

        it('makes an Ajax call to post the workspace', function (done) {
            setTimeout(function () {
                expect(jasmine.Ajax.requests.count()).toBe(1);
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/workspace');
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
                expect(jasmine.Ajax.requests.mostRecent().data()).toEqual(workspaceToSave);
                done();
            });
        });

        describe('when the Ajax call returns with a response', function () {
            var responseText = {iamaproperty: "blahblah"};
            beforeEach(function () {
                stubbedPost.andReturn({responseText: responseText});
            });

            it('calls the callback with the response', function (done) {
                setTimeout(function () {
                    expect(callbackSpy).toHaveBeenCalledWith(responseText);
                    done();
                });
            });
        });
    });
});