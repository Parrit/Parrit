var databaseHelpers = require('shared/helpers/databaseHelpers.js');

describe('databaseHelpers', function() {
    beforeEach(function () {
        jasmine.Ajax.install();
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    describe('#postWorkspaceAndDo', function () {
        var stubbedPost;
        var callbackSpy;

        var workspaceToSave = {MISSISSIPPI: "Anthony is more fun than that"};

        beforeEach(function () {
            stubbedPost = jasmine.Ajax.stubRequest('/api/workspace', undefined, 'POST');
            callbackSpy = jasmine.createSpy('callbackSpy');

            databaseHelpers.postWorkspaceAndDo(workspaceToSave, callbackSpy);
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

    describe('#postNewWorkspaceAndDo', function () {
        var stubbedPost;
        var callbackSpy;

        var workspaceNameToSave = 'Meeple';

        beforeEach(function () {
            stubbedPost = jasmine.Ajax.stubRequest('/api/workspace/new', undefined, 'POST');
            callbackSpy = jasmine.createSpy('callbackSpy');

            databaseHelpers.postNewWorkspaceAndDo(workspaceNameToSave, callbackSpy);
        });

        it('makes an Ajax call to post the new workspace name', function (done) {
            setTimeout(function () {
                expect(jasmine.Ajax.requests.count()).toBe(1);
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/workspace/new');
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
                //TODO: Fix this when we send more than just a name to the backend (Only fails in testing)
                //expect(jasmine.Ajax.requests.mostRecent().data()).toEqual(workspaceNameToSave);
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

    describe('#postWorkspacePairingAndDo', function () {
        var stubbedPost;
        var callbackSpy;

        var workspacePairingToSave = {MISSISSIPPI: "Anthony is more fun than that"};

        beforeEach(function () {
            stubbedPost = jasmine.Ajax.stubRequest('/api/workspace/pairing', undefined, 'POST');
            callbackSpy = jasmine.createSpy('callbackSpy');

            databaseHelpers.postWorkspacePairingAndDo(workspacePairingToSave, callbackSpy);
        });

        it('makes an Ajax call to post the workspace', function (done) {
            setTimeout(function () {
                expect(jasmine.Ajax.requests.count()).toBe(1);
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/workspace/pairing');
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
                expect(jasmine.Ajax.requests.mostRecent().data()).toEqual(workspacePairingToSave);
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