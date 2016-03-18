var databaseHelpers = require('shared/helpers/databaseHelpers.js');

describe('databaseHelpers', function () {
    beforeEach(function () {
        jasmine.Ajax.install();
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    describe('#postProjectAndDo', function () {
        var stubbedPost;
        var callbackSpy;

        var projectToSave = {MISSISSIPPI: "Anthony is more fun than that"};

        beforeEach(function () {
            stubbedPost = jasmine.Ajax.stubRequest('/api/project', undefined, 'POST');
            callbackSpy = jasmine.createSpy('callbackSpy');

            databaseHelpers.postProjectAndDo(projectToSave, callbackSpy);
        });

        it('makes an Ajax call to post the project', function (done) {
            setTimeout(function () {
                expect(jasmine.Ajax.requests.count()).toBe(1);
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/project');
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
                expect(jasmine.Ajax.requests.mostRecent().data()).toEqual(projectToSave);
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

    describe('#postNewProjectAndDo', function () {
        var stubbedPost;
        var successCallbackSpy;
        var errorCallbackSpy;

        var projectName = 'Meeple';
        var projectPassword = 'SuperSecretPassword';

        beforeEach(function () {
            stubbedPost = jasmine.Ajax.stubRequest('/api/project/new', undefined, 'POST');
            successCallbackSpy = jasmine.createSpy('successCallbackSpy');
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy');

            databaseHelpers.postNewProjectAndDo(projectName, projectPassword, successCallbackSpy, errorCallbackSpy);
        });

        it('makes an Ajax call to post the new project name', function (done) {
            setTimeout(function () {
                expect(jasmine.Ajax.requests.count()).toBe(1);
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/project/new');
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
                expect(jasmine.Ajax.requests.mostRecent().data()).toEqual({
                    name: projectName,
                    password: projectPassword
                });
                done();
            });
        });

        describe('when the Ajax call returns with a response', function () {
            var responseText = {iamaproperty: "blahblah"};
            beforeEach(function () {
                stubbedPost.andReturn({responseText: responseText});
            });

            it('calls the sucess callback with the response', function (done) {
                setTimeout(function () {
                    expect(successCallbackSpy).toHaveBeenCalledWith(responseText);
                    done();
                });
            });
        });

        describe('when the Ajax call returns with an error', function () {
            beforeEach(function () {
                stubbedPost.andReturn({status: 403});
            });

            it('calls the error callback with the status', function (done) {
                setTimeout(function () {
                    expect(errorCallbackSpy).toHaveBeenCalledWith(403);
                    done();
                });
            });
        });
    });

    describe('#postProjectPairingAndDo', function () {
        var stubbedPost;
        var callbackSpy;

        var projectId = 42;

        beforeEach(function () {
            stubbedPost = jasmine.Ajax.stubRequest('/api/project/42/pairing', undefined, 'POST');
            callbackSpy = jasmine.createSpy('callbackSpy');

            databaseHelpers.postProjectPairingAndDo(projectId, callbackSpy);
        });

        it('makes an Ajax call to post the project', function (done) {
            setTimeout(function () {
                expect(jasmine.Ajax.requests.count()).toBe(1);
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/project/42/pairing');
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

        var projectId = 42;

        beforeEach(function () {
            stubbedGet = jasmine.Ajax.stubRequest('/api/project/42/pairing/recommend', undefined, 'GET');
            callbackSpy = jasmine.createSpy('callbackSpy');

            databaseHelpers.getRecommendedPairingAndDo(projectId, callbackSpy);
        });

        it('makes an Ajax call to GET recommended pairing with the projectId', function (done) {
            setTimeout(function () {
                expect(jasmine.Ajax.requests.count()).toBe(1);
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/project/42/pairing/recommend');
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
        var errorCallbackSpy;
        var stubbedPost;

        beforeEach(function () {
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy');
            stubbedPost = jasmine.Ajax.stubRequest('/login', undefined, 'POST');

            databaseHelpers.postLoginAndRedirect("Username", "Password", errorCallbackSpy);
        });

        it('makes an Ajax call to GET recommended pairing with the projectId', function (done) {
            setTimeout(function () {
                expect(jasmine.Ajax.requests.count()).toBe(1);
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('/login');
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
                expect(jasmine.Ajax.requests.mostRecent().data()).toEqual({name: "Username", password: "Password"});
                done();
            });
        });

        //TODO: Figure out how to test window.location.href
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

        describe('when the Ajax call returns with a reject', function () {
            beforeEach(function () {
                stubbedPost.andReturn({status: 400});
            });

            it('calls the errorCallback with the response status', function (done) {
                setTimeout(function () {
                    expect(errorCallbackSpy).toHaveBeenCalledWith(400);
                    done();
                });
            })
        });
    });
});