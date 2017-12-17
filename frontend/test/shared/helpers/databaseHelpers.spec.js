import * as databaseHelpers from 'shared/helpers/databaseHelpers.js';

import Axios from 'axios'

describe('databaseHelpers', () => {

    let axiosGetPromise, axiosPostPromise, axiosPutPromise;

    beforeEach(() => {
        const axiosGetPromiseLocal = new Promise((resolve, reject) => {
            axiosGetPromise = {resolve, reject};
        });

        const axiosPostPromiseLocal = new Promise((resolve, reject) => {
            axiosPostPromise = {resolve, reject};
        });

        const axiosPutPromiseLocal = new Promise((resolve, reject) => {
            axiosPutPromise = {resolve, reject};
        });

        spyOn(Axios, 'get').and.returnValue(axiosGetPromiseLocal);
        spyOn(Axios, 'post').and.returnValue(axiosPostPromiseLocal);
        spyOn(Axios, 'put').and.returnValue(axiosPutPromiseLocal);
    })

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

        //TODO: Figure out how to test window.location.href
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
            expect(Axios.post).toHaveBeenCalledWith('/api/project', {
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

    describe('#putProjectAndDo', () => {
        let successCallbackSpy, errorCallbackSpy;

        const projectToSave = {id: 77, MISSISSIPPI: "Anthony is more fun than that"};
        const data = {iamaproperty: "blahblah"};

        beforeEach(() => {
            successCallbackSpy = jasmine.createSpy('successCallbackSpy');
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy');

            databaseHelpers.putProjectAndDo(projectToSave, successCallbackSpy, errorCallbackSpy);
        });

        it('makes an Ajax call to put the project', () => {
            expect(Axios.put.calls.count()).toBe(1);
            expect(Axios.put).toHaveBeenCalledWith('/api/project/77', projectToSave);
        });

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosPutPromise.resolve({data: data});
            });

            it('calls the callback with the response', () => {
                expect(successCallbackSpy).toHaveBeenCalledWith(data);
            });
        });

        describe('when the Ajax call returns with an error', () => {
            beforeEach(() => {
                axiosPutPromise.reject({response: {data: data}});
            });

            it('calls the error callback with the response in the error', () => {
                expect(errorCallbackSpy).toHaveBeenCalledWith(data);
            });
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
            expect(Axios.post).toHaveBeenCalledWith('/api/project/87/person', {name: newPersonName});
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

    describe('#postAddNewPairingAndDo', () => {
        let successCallbackSpy, errorCallbackSpy;

        const projectId = 87;
        const newPairingBoardName = 'Cool Kids';
        const data = {iamaproperty: "blahblah"};

        beforeEach(() => {
            successCallbackSpy = jasmine.createSpy('successCallbackSpy');
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy');

            databaseHelpers.postAddNewPairingBoardAndDo(projectId, newPairingBoardName, successCallbackSpy, errorCallbackSpy);
        });

        it('makes an Ajax call to post the new pairing board', () => {
            expect(Axios.post.calls.count()).toBe(1);
            expect(Axios.post).toHaveBeenCalledWith('/api/project/87/pairingBoard', {name: newPairingBoardName});
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

    describe('#putPairingBoardAndDo', () => {
        let successCallbackSpy, errorCallbackSpy;

        const newPairingBoardName = 'Cool Kids Club';
        const data = {iamaproperty: "blahblah"};

        beforeEach(() => {
            successCallbackSpy = jasmine.createSpy('successCallbackSpy');
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy');

            databaseHelpers.putPairingBoardAndDo(1, 2, newPairingBoardName, successCallbackSpy, errorCallbackSpy);
        });

        it('makes an Ajax call to put the pairing board', () => {
            expect(Axios.put.calls.count()).toBe(1);
            expect(Axios.put).toHaveBeenCalledWith('/api/project/1/pairingBoard/2', {name: newPairingBoardName});
        });

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosPutPromise.resolve({data: data});
            });

            it('calls the callback with the response', () => {
                expect(successCallbackSpy).toHaveBeenCalledWith(data);
            });
        });

        describe('when the Ajax call returns with an error', () => {
            beforeEach(() => {
                axiosPutPromise.reject({response: {data: data}});
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