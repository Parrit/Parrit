import * as databaseHelpers from 'shared/helpers/databaseHelpers.js';

import Axios from 'axios'

describe('databaseHelpers', () => {

    let axiosGetPromise, axiosPostPromise;

    beforeEach(() => {
        const axiosGetPromiseLocal = new Promise((resolve, reject) => {
            axiosGetPromise = {resolve, reject};
        });

        const axiosPostPromiseLocal = new Promise((resolve, reject) => {
            axiosPostPromise = {resolve, reject};
        });

        spyOn(Axios, 'get').and.returnValue(axiosGetPromiseLocal);
        spyOn(Axios, 'post').and.returnValue(axiosPostPromiseLocal);
    })

    describe('#postProjectAndDo', () => {
        let successCallbackSpy, errorCallbackSpy;

        const projectToSave = {MISSISSIPPI: "Anthony is more fun than that"};
        const data = {iamaproperty: "blahblah"};

        beforeEach(() => {
            successCallbackSpy = jasmine.createSpy('successCallbackSpy');
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy');

            databaseHelpers.postProjectAndDo(projectToSave, successCallbackSpy, errorCallbackSpy);
        });

        it('makes an Ajax call to post the project', () => {
            expect(Axios.post.calls.count()).toBe(1);
            expect(Axios.post).toHaveBeenCalledWith('/api/project', projectToSave);
        });

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosPostPromise.resolve({data: data});
            });

            it('calls the callback with the response', () => {
                expect(successCallbackSpy).toHaveBeenCalledWith(data);
            });
        });

        describe('when the Ajax call returns with an error', () => {
            beforeEach(() => {
                axiosPostPromise.reject({response: {data: data}});
            });

            it('calls the error callback with the response in the error', () => {
                expect(errorCallbackSpy).toHaveBeenCalledWith(data);
            });
        });
    });

    describe('#postNewProjectAndDo', () => {
        let successCallbackSpy, errorCallbackSpy;

        const projectName = 'Meeple';
        const projectPassword = 'SuperSecretPassword';
        const data = {iamaproperty: "blahblah"};

        beforeEach(() => {
            successCallbackSpy = jasmine.createSpy('successCallbackSpy');
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy');

            databaseHelpers.postNewProjectAndDo(projectName, projectPassword, successCallbackSpy, errorCallbackSpy);
        });

        it('makes an Ajax call to post the new project name', () => {
            expect(Axios.post.calls.count()).toBe(1);
            expect(Axios.post).toHaveBeenCalledWith('/api/project/new', {
                name: projectName,
                password: projectPassword
            });
        });

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosPostPromise.resolve({data: data});
            });

            it('calls the sucess callback with the response', () => {
                expect(successCallbackSpy).toHaveBeenCalledWith(data);
            });
        });

        describe('when the Ajax call returns with an error', () => {
            beforeEach(() => {
                axiosPostPromise.reject({response: {data: data}});
            });

            it('calls the error callback with the response in the error', () => {
                expect(errorCallbackSpy).toHaveBeenCalledWith(data);
            });
        });
    });

    describe('#postProjectPairingAndDo', () => {
        let callbackSpy;

        const projectId = 42;
        const data = {iamaproperty: "blahblah"};

        beforeEach(() => {
            callbackSpy = jasmine.createSpy('callbackSpy');

            databaseHelpers.postProjectPairingAndDo(projectId, callbackSpy);
        });

        it('makes an Ajax call to post the project', () => {
            expect(Axios.post.calls.count()).toBe(1);
            expect(Axios.post).toHaveBeenCalledWith('/api/project/42/pairing');
        });

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosPostPromise.resolve({data: data});
            });

            it('calls the callback with the response', () => {
                expect(callbackSpy).toHaveBeenCalledWith(data);
            });
        });
    });

    describe('#getRecommendedPairingAndDo', () => {
        let callbackSpy;

        const projectId = 42;
        const data = {iamaproperty: "blahblah"};

        beforeEach(() => {
            callbackSpy = jasmine.createSpy('callbackSpy');

            databaseHelpers.getRecommendedPairingAndDo(projectId, callbackSpy);
        });

        it('makes an Ajax call to get recommended pairing with the projectId', () => {
            expect(Axios.get.calls.count()).toBe(1);
            expect(Axios.get).toHaveBeenCalledWith('/api/project/42/pairing/recommend');
        });

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosGetPromise.resolve({data: data});
            });

            it('calls the callback with the response', () => {
                expect(callbackSpy).toHaveBeenCalledWith(data);
            });
        });
    });

    describe('#postLoginAndRedirect', () => {
        let errorCallbackSpy;

        const data = {iamaproperty: "blahblah"};

        beforeEach(() => {
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy');

            databaseHelpers.postLoginAndRedirect("Username", "Password", errorCallbackSpy);
        });

        it('makes an Ajax call to post the login credentials', () => {
            expect(Axios.post.calls.count()).toBe(1);
            expect(Axios.post).toHaveBeenCalledWith('/login', {name: "Username", password: "Password"});
        });

        // TODO: Figure out how to test window.location.href
        // describe('when the Ajax call returns with a response', () => {
        //     let windowLocationHrefSpy;
        //
        //     const data = "/cow";
        //
        //     beforeEach(() => {
        //         windowLocationHrefSpy = spyOn(window.location, 'href');
        //
        //         axiosPostPromise.resolve({data: data});
        //     });
        //
        //     it('redirects the the returned route', () => {
        //         expect(windowLocationHrefSpy).toHaveBeenCalledWith(data);
        //     });
        // });

        describe('when the Ajax call returns with a reject', () => {
            beforeEach(() => {
                axiosPostPromise.reject({response: {data: data}});
            });

            it('calls the errorCallback with the response in the error', () => {
                expect(errorCallbackSpy).toHaveBeenCalledWith(data);
            })
        });
    });

    describe('#postAddNewPersonAndDo', () => {
        let successCallbackSpy, errorCallbackSpy;

        const projectId = 87;
        const newPersonName = 'John';
        const data = {iamaproperty: "blahblah"};

        beforeEach(() => {
            successCallbackSpy = jasmine.createSpy('successCallbackSpy');
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy');

            databaseHelpers.postAddNewPersonAndDo(projectId, newPersonName, successCallbackSpy, errorCallbackSpy);
        });

        it('makes an Ajax call to post the new person', () => {
            expect(Axios.post.calls.count()).toBe(1);
            expect(Axios.post).toHaveBeenCalledWith('/api/project/87/addPerson', {name: newPersonName});
        });

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosPostPromise.resolve({data: data});
            });

            it('calls the callback with the response', () => {
                expect(successCallbackSpy).toHaveBeenCalledWith(data);
            });
        });

        describe('when the Ajax call returns with an error', () => {
            beforeEach(() => {
                axiosPostPromise.reject({response: {data: data}});
            });

            it('calls the error callback with the response in the error', () => {
                expect(errorCallbackSpy).toHaveBeenCalledWith(data);
            });
        });
    });

    describe('#getPairingHistoryAndDo', () => {
        let callbackSpy;

        const projectId = 42;
        const data = {iamaproperty: "blahblah"};

        beforeEach(() => {
            callbackSpy = jasmine.createSpy('callbackSpy');

            databaseHelpers.getPairingHistoryAndDo(projectId, callbackSpy);
        });

        it('makes an Ajax call to get the pairing history with the projectId', () => {
            expect(Axios.get.calls.count()).toBe(1);
            expect(Axios.get).toHaveBeenCalledWith('/api/project/42/pairing/history');
        });

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosGetPromise.resolve({data: data});
            });

            it('calls the callback with the response', () => {
                expect(callbackSpy).toHaveBeenCalledWith(data);
            });
        });
    });
});