var databaseHelpers = require('actions/helpers/databaseHelpers.js');

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
            stubbedPost = jasmine.Ajax.stubRequest('/workspace', undefined, 'POST');
            callbackSpy = jasmine.createSpy('callbackSpy');

            databaseHelpers.postStateAndDo(stateOfApp, callbackSpy);
        });

        it('makes an Ajax call to post the workspace', function (done) {
            setTimeout(function () {
                expect(jasmine.Ajax.requests.count()).toBe(1);
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('/workspace');
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

    describe('#getStateAndDo', function() {
        var stubbedGet;
        var callbackSpy;

        beforeEach(function () {
            stubbedGet = jasmine.Ajax.stubRequest('/workspace?id=1', undefined, 'GET');
            callbackSpy = jasmine.createSpy('callbackSpy');

            databaseHelpers.getStateAndDo(callbackSpy);
        });

        it('makes an Ajax call to get the workspace for id 1', function (done) {
            setTimeout(function () {
                expect(jasmine.Ajax.requests.count()).toBe(1);
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('/workspace?id=1');
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('GET');
                done();
            });
        });

        describe('when the Ajax call returns with a response', function () {
            var responseText = {iamaproperty: "blahblah"};
            beforeEach(function () {
                stubbedGet.andReturn({responseText: responseText});
            });

            it('calls the callback with the response', function (done) {
                setTimeout(function () {
                    expect(callbackSpy).toHaveBeenCalledWith(responseText);
                    done();
                });
            });
        });
    })
});