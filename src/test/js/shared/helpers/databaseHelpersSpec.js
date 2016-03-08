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

        var workspaceName = 'Meeple';
        var workspacePassword = 'SuperSecretPassword';

        beforeEach(function () {
            stubbedPost = jasmine.Ajax.stubRequest('/api/workspace/new', undefined, 'POST');
            callbackSpy = jasmine.createSpy('callbackSpy');

            databaseHelpers.postNewWorkspaceAndDo(workspaceName, workspacePassword, callbackSpy);
        });

        it('makes an Ajax call to post the new workspace name', function (done) {
            setTimeout(function () {
                expect(jasmine.Ajax.requests.count()).toBe(1);
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/workspace/new');
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
                expect(jasmine.Ajax.requests.mostRecent().data()).toEqual({name: workspaceName, password: workspacePassword});
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

        var workspaceId = 42;

        beforeEach(function () {
            stubbedPost = jasmine.Ajax.stubRequest('/api/workspace/42/pairing', undefined, 'POST');
            callbackSpy = jasmine.createSpy('callbackSpy');

            databaseHelpers.postWorkspacePairingAndDo(workspaceId, callbackSpy);
        });

        it('makes an Ajax call to post the workspace', function (done) {
            setTimeout(function () {
                expect(jasmine.Ajax.requests.count()).toBe(1);
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/workspace/42/pairing');
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
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

    describe('#getRecommendedPairingAndDo', function () {
        var stubbedGet;
        var callbackSpy;

        var workspaceId = 42;

        beforeEach(function () {
            stubbedGet = jasmine.Ajax.stubRequest('/api/workspace/42/pairing/recommend', undefined, 'GET');
            callbackSpy = jasmine.createSpy('callbackSpy');

            databaseHelpers.getRecommendedPairingAndDo(workspaceId, callbackSpy);
        });

        it('makes an Ajax call to GET recommended pairing with the workspaceId', function (done) {
            setTimeout(function () {
                expect(jasmine.Ajax.requests.count()).toBe(1);
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/workspace/42/pairing/recommend');
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
    });

    describe('#postLoginAndRedirect', function () {
        var stubbedPost;

        beforeEach(function () {
            stubbedPost = jasmine.Ajax.stubRequest('/login', undefined, 'POST');

            databaseHelpers.postLoginAndRedirect("Username", "Password");
        });

        it('makes an Ajax call to GET recommended pairing with the workspaceId', function (done) {
            setTimeout(function () {
                expect(jasmine.Ajax.requests.count()).toBe(1);
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('/login');
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
                expect(jasmine.Ajax.requests.mostRecent().data()).toEqual({name: "Username", password: "Password"});
                done();
            });
        });

        //TODO: Figure out how to test this
        //describe('when the Ajax call returns with a response', function () {
        //    var responseText = "/cow";
        //    beforeEach(function () {
        //        stubbedPost.andReturn({responseText: responseText});
        //    });
        //
        //    it('redirects the the returned route', function (done) {
        //        setTimeout(function () {
        //            expect(windowLocationHrefSpy).toHaveBeenCalledWith(responseText);
        //            done();
        //        });
        //    });
        //});
    });
});