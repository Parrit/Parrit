import * as databaseHelpers from './DatabaseHelpers.js'

import Axios from 'axios'

describe('DatabaseHelpers', () => {

    let axiosGetPromise, axiosPostPromise, axiosPutPromise, axiosDeletePromise

    beforeEach(() => {
        const axiosGetPromiseLocal = new Promise((resolve, reject) => {
            axiosGetPromise = {resolve, reject}
        })

        const axiosPostPromiseLocal = new Promise((resolve, reject) => {
            axiosPostPromise = {resolve, reject}
        })

        const axiosPutPromiseLocal = new Promise((resolve, reject) => {
            axiosPutPromise = {resolve, reject}
        })

        const axiosDeletePromiseLocal = new Promise((resolve, reject) => {
            axiosDeletePromise = {resolve, reject}
        })

        spyOn(Axios, 'get').and.returnValue(axiosGetPromiseLocal)
        spyOn(Axios, 'post').and.returnValue(axiosPostPromiseLocal)
        spyOn(Axios, 'put').and.returnValue(axiosPutPromiseLocal)
        spyOn(Axios, 'delete').and.returnValue(axiosDeletePromiseLocal)
    })

    describe('#postLoginAndRedirect', () => {
        let errorCallbackSpy

        const data = {iamaproperty: 'blahblah'}

        beforeEach(() => {
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy')

            databaseHelpers.postLoginAndRedirect('Username', 'Password', errorCallbackSpy)
        })

        it('makes an Ajax call to post the login credentials', () => {
            expect(Axios.post.calls.count()).toBe(1)
            expect(Axios.post).toHaveBeenCalledWith('/api/login', {name: 'Username', password: 'Password'})
        })

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
                axiosPostPromise.reject({response: {data: data}})
            })

            it('calls the errorCallback with the response in the error', () => {
                expect(errorCallbackSpy).toHaveBeenCalledWith(data)
            })
        })
    })

    describe('#postProjectAndDo', () => {
        let successCallbackSpy, errorCallbackSpy

        const projectName = 'Meeple'
        const projectPassword = 'SuperSecretPassword'
        const data = {iamaproperty: 'blahblah'}

        beforeEach(() => {
            successCallbackSpy = jasmine.createSpy('successCallbackSpy')
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy')

            databaseHelpers.postProjectAndDo(projectName, projectPassword, successCallbackSpy, errorCallbackSpy)
        })

        it('makes an Ajax call to post the new project name', () => {
            expect(Axios.post.calls.count()).toBe(1)
            expect(Axios.post).toHaveBeenCalledWith('/api/project', {
                name: projectName,
                password: projectPassword
            })
        })

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosPostPromise.resolve({data: data})
            })

            it('calls the sucess callback with the response', () => {
                expect(successCallbackSpy).toHaveBeenCalledWith(data)
            })
        })

        describe('when the Ajax call returns with an error', () => {
            beforeEach(() => {
                axiosPostPromise.reject({response: {data: data}})
            })

            it('calls the error callback with the response in the error', () => {
                expect(errorCallbackSpy).toHaveBeenCalledWith(data)
            })
        })
    })

    describe('#resetProjectAndDo', () => {
        let successCallbackSpy, errorCallbackSpy

        const projectId = 87
        const data = {iamaproperty: 'blahblah'}

        beforeEach(() => {
            successCallbackSpy = jasmine.createSpy('successCallbackSpy')
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy')

            databaseHelpers.resetProjectAndDo(projectId, successCallbackSpy, errorCallbackSpy)
        })

        it('makes an Ajax call to put the project', () => {
            expect(Axios.put.calls.count()).toBe(1)
            expect(Axios.put).toHaveBeenCalledWith('/api/project/87/reset')
        })

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosPutPromise.resolve({data: data})
            })

            it('calls the callback with the response', () => {
                expect(successCallbackSpy).toHaveBeenCalledWith(data)
            })
        })

        describe('when the Ajax call returns with an error', () => {
            beforeEach(() => {
                axiosPutPromise.reject({response: {data: data}})
            })

            it('calls the error callback with the response in the error', () => {
                expect(errorCallbackSpy).toHaveBeenCalledWith(data)
            })
        })
    })

    describe('#postPersonAndDo', () => {
        let successCallbackSpy, errorCallbackSpy

        const projectId = 87
        const newPersonName = 'John'
        const data = {iamaproperty: 'blahblah'}

        beforeEach(() => {
            successCallbackSpy = jasmine.createSpy('successCallbackSpy')
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy')

            databaseHelpers.postPersonAndDo(projectId, newPersonName, successCallbackSpy, errorCallbackSpy)
        })

        it('makes an Ajax call to post the new person', () => {
            expect(Axios.post.calls.count()).toBe(1)
            expect(Axios.post).toHaveBeenCalledWith('/api/project/87/person', {name: newPersonName})
        })

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosPostPromise.resolve({data: data})
            })

            it('calls the callback with the response', () => {
                expect(successCallbackSpy).toHaveBeenCalledWith(data)
            })
        })

        describe('when the Ajax call returns with an error', () => {
            beforeEach(() => {
                axiosPostPromise.reject({response: {data: data}})
            })

            it('calls the error callback with the response in the error', () => {
                expect(errorCallbackSpy).toHaveBeenCalledWith(data)
            })
        })
    })

    describe('#putPersonPositionAndDo', () => {
        let successCallbackSpy, errorCallbackSpy

        const projectId = 87
        const personId = 55
        const newPosition = { floating: false, pairingBoardId: 99 }
        const data = {iamaproperty: 'blahblah'}

        beforeEach(() => {
            successCallbackSpy = jasmine.createSpy('successCallbackSpy')
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy')

            databaseHelpers.putPersonPositionAndDo(projectId, personId, newPosition, successCallbackSpy, errorCallbackSpy)
        })

        it('makes an Ajax call to put the new position of the person', () => {
            expect(Axios.put.calls.count()).toBe(1)
            expect(Axios.put).toHaveBeenCalledWith('/api/project/87/person/55/position', newPosition)
        })

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosPutPromise.resolve({data: data})
            })

            it('calls the callback with the response', () => {
                expect(successCallbackSpy).toHaveBeenCalledWith(data)
            })
        })

        describe('when the Ajax call returns with an error', () => {
            beforeEach(() => {
                axiosPutPromise.reject({response: {data: data}})
            })

            it('calls the error callback with the response in the error', () => {
                expect(errorCallbackSpy).toHaveBeenCalledWith(data)
            })
        })
    })

    describe('#deletePersonAndDo', () => {
        let successCallbackSpy, errorCallbackSpy

        const data = {iamaproperty: 'blahblah'}

        beforeEach(() => {
            successCallbackSpy = jasmine.createSpy('successCallbackSpy')
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy')

            databaseHelpers.deletePersonAndDo(1, 44, successCallbackSpy, errorCallbackSpy)
        })

        it('makes an Ajax call to delete the person', () => {
            expect(Axios.delete.calls.count()).toBe(1)
            expect(Axios.delete).toHaveBeenCalledWith('/api/project/1/person/44')
        })

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosDeletePromise.resolve({data: data})
            })

            it('calls the callback with the response', () => {
                expect(successCallbackSpy).toHaveBeenCalledWith(data)
            })
        })

        describe('when the Ajax call returns with an error', () => {
            beforeEach(() => {
                axiosDeletePromise.reject({response: {data: data}})
            })

            it('calls the error callback with the response in the error', () => {
                expect(errorCallbackSpy).toHaveBeenCalledWith(data)
            })
        })
    })

    describe('#postPairingAndDo', () => {
        let successCallbackSpy, errorCallbackSpy

        const projectId = 87
        const newPairingBoardName = 'Cool Kids'
        const data = {iamaproperty: 'blahblah'}

        beforeEach(() => {
            successCallbackSpy = jasmine.createSpy('successCallbackSpy')
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy')

            databaseHelpers.postPairingBoardAndDo(projectId, newPairingBoardName, successCallbackSpy, errorCallbackSpy)
        })

        it('makes an Ajax call to post the new pairing board', () => {
            expect(Axios.post.calls.count()).toBe(1)
            expect(Axios.post).toHaveBeenCalledWith('/api/project/87/pairingBoard', {name: newPairingBoardName})
        })

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosPostPromise.resolve({data: data})
            })

            it('calls the callback with the response', () => {
                expect(successCallbackSpy).toHaveBeenCalledWith(data)
            })
        })

        describe('when the Ajax call returns with an error', () => {
            beforeEach(() => {
                axiosPostPromise.reject({response: {data: data}})
            })

            it('calls the error callback with the response in the error', () => {
                expect(errorCallbackSpy).toHaveBeenCalledWith(data)
            })
        })
    })

    describe('#putPairingBoardAndDo', () => {
        let successCallbackSpy, errorCallbackSpy

        const newPairingBoardName = 'Cool Kids Club'
        const data = {iamaproperty: 'blahblah'}

        beforeEach(() => {
            successCallbackSpy = jasmine.createSpy('successCallbackSpy')
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy')

            databaseHelpers.putPairingBoardAndDo(1, 2, newPairingBoardName, successCallbackSpy, errorCallbackSpy)
        })

        it('makes an Ajax call to put the pairing board', () => {
            expect(Axios.put.calls.count()).toBe(1)
            expect(Axios.put).toHaveBeenCalledWith('/api/project/1/pairingBoard/2', {name: newPairingBoardName})
        })

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosPutPromise.resolve({data: data})
            })

            it('calls the callback with the response', () => {
                expect(successCallbackSpy).toHaveBeenCalledWith(data)
            })
        })

        describe('when the Ajax call returns with an error', () => {
            beforeEach(() => {
                axiosPutPromise.reject({response: {data: data}})
            })

            it('calls the error callback with the response in the error', () => {
                expect(errorCallbackSpy).toHaveBeenCalledWith(data)
            })
        })
    })

    describe('#deletePairingBoardAndDo', () => {
        let successCallbackSpy, errorCallbackSpy

        const data = {iamaproperty: 'blahblah'}

        beforeEach(() => {
            successCallbackSpy = jasmine.createSpy('successCallbackSpy')
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy')

            databaseHelpers.deletePairingBoardAndDo(1, 2, successCallbackSpy, errorCallbackSpy)
        })

        it('makes an Ajax call to delete the pairing board', () => {
            expect(Axios.delete.calls.count()).toBe(1)
            expect(Axios.delete).toHaveBeenCalledWith('/api/project/1/pairingBoard/2')
        })

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosDeletePromise.resolve({data: data})
            })

            it('calls the callback with the response', () => {
                expect(successCallbackSpy).toHaveBeenCalledWith(data)
            })
        })

        describe('when the Ajax call returns with an error', () => {
            beforeEach(() => {
                axiosDeletePromise.reject({response: {data: data}})
            })

            it('calls the error callback with the response in the error', () => {
                expect(errorCallbackSpy).toHaveBeenCalledWith(data)
            })
        })
    })

    describe('#postRoleAndDo', () => {
        let successCallbackSpy, errorCallbackSpy

        const projectId = 87
        const pairingBoardId = 870
        const newRoleName = 'John'
        const data = {iamaproperty: 'blahblah'}

        beforeEach(() => {
            successCallbackSpy = jasmine.createSpy('successCallbackSpy')
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy')

            databaseHelpers.postRoleAndDo(projectId, pairingBoardId, newRoleName, successCallbackSpy, errorCallbackSpy)
        })

        it('makes an Ajax call to post the new role', () => {
            expect(Axios.post.calls.count()).toBe(1)
            expect(Axios.post).toHaveBeenCalledWith('/api/project/87/pairingBoard/870/role', {name: newRoleName})
        })

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosPostPromise.resolve({data: data})
            })

            it('calls the callback with the response', () => {
                expect(successCallbackSpy).toHaveBeenCalledWith(data)
            })
        })

        describe('when the Ajax call returns with an error', () => {
            beforeEach(() => {
                axiosPostPromise.reject({response: {data: data}})
            })

            it('calls the error callback with the response in the error', () => {
                expect(errorCallbackSpy).toHaveBeenCalledWith(data)
            })
        })
    })

    describe('#putRolePositionAndDo', () => {
        let successCallbackSpy, errorCallbackSpy

        const projectId = 87
        const pairingBoardId = 55
        const roleId = 66
        const newPosition = { pairingBoardId: 99 }
        const data = {iamaproperty: 'blahblah'}

        beforeEach(() => {
            successCallbackSpy = jasmine.createSpy('successCallbackSpy')
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy')

            databaseHelpers.putRolePositionAndDo(projectId, pairingBoardId, roleId, newPosition, successCallbackSpy, errorCallbackSpy)
        })

        it('makes an Ajax call to put the new position of the role', () => {
            expect(Axios.put.calls.count()).toBe(1)
            expect(Axios.put).toHaveBeenCalledWith('/api/project/87/pairingBoard/55/role/66/position', newPosition)
        })

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosPutPromise.resolve({data: data})
            })

            it('calls the callback with the response', () => {
                expect(successCallbackSpy).toHaveBeenCalledWith(data)
            })
        })

        describe('when the Ajax call returns with an error', () => {
            beforeEach(() => {
                axiosPutPromise.reject({response: {data: data}})
            })

            it('calls the error callback with the response in the error', () => {
                expect(errorCallbackSpy).toHaveBeenCalledWith(data)
            })
        })
    })

    describe('#deleteRoleAndDo', () => {
        let successCallbackSpy, errorCallbackSpy

        const projectId = 87
        const pairingBoardId = 870
        const roleId = 8700
        const data = {iamaproperty: 'blahblah'}

        beforeEach(() => {
            successCallbackSpy = jasmine.createSpy('successCallbackSpy')
            errorCallbackSpy = jasmine.createSpy('errorCallbackSpy')

            databaseHelpers.deleteRoleAndDo(projectId, pairingBoardId, roleId, successCallbackSpy, errorCallbackSpy)
        })

        it('makes an Ajax call to delete the role', () => {
            expect(Axios.delete.calls.count()).toBe(1)
            expect(Axios.delete).toHaveBeenCalledWith('/api/project/87/pairingBoard/870/role/8700')
        })

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosDeletePromise.resolve({data: data})
            })

            it('calls the callback with the response', () => {
                expect(successCallbackSpy).toHaveBeenCalledWith(data)
            })
        })

        describe('when the Ajax call returns with an error', () => {
            beforeEach(() => {
                axiosDeletePromise.reject({response: {data: data}})
            })

            it('calls the error callback with the response in the error', () => {
                expect(errorCallbackSpy).toHaveBeenCalledWith(data)
            })
        })
    })

    describe('#postProjectPairingAndDo', () => {
        let callbackSpy

        const projectId = 42
        const data = {iamaproperty: 'blahblah'}

        beforeEach(() => {
            callbackSpy = jasmine.createSpy('callbackSpy')

            databaseHelpers.postProjectPairingAndDo(projectId, callbackSpy)
        })

        it('makes an Ajax call to post the project', () => {
            expect(Axios.post.calls.count()).toBe(1)
            expect(Axios.post).toHaveBeenCalledWith('/api/project/42/pairing')
        })

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosPostPromise.resolve({data: data})
            })

            it('calls the callback with the response', () => {
                expect(callbackSpy).toHaveBeenCalledWith(data)
            })
        })
    })

    describe('#getRecommendedPairingAndDo', () => {
        let callbackSpy

        const projectId = 42
        const data = {iamaproperty: 'blahblah'}

        beforeEach(() => {
            callbackSpy = jasmine.createSpy('callbackSpy')

            databaseHelpers.getRecommendedPairingAndDo(projectId, callbackSpy)
        })

        it('makes an Ajax call to get recommended pairing with the projectId', () => {
            expect(Axios.get.calls.count()).toBe(1)
            expect(Axios.get).toHaveBeenCalledWith('/api/project/42/pairing/recommend')
        })

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosGetPromise.resolve({data: data})
            })

            it('calls the callback with the response', () => {
                expect(callbackSpy).toHaveBeenCalledWith(data)
            })
        })
    })

    describe('#getPairingHistoryAndDo', () => {
        let callbackSpy

        const projectId = 42
        const data = {iamaproperty: 'blahblah'}

        beforeEach(() => {
            callbackSpy = jasmine.createSpy('callbackSpy')

            databaseHelpers.getPairingHistoryAndDo(projectId, callbackSpy)
        })

        it('makes an Ajax call to get the pairing history with the projectId', () => {
            expect(Axios.get.calls.count()).toBe(1)
            expect(Axios.get).toHaveBeenCalledWith('/api/project/42/pairing/history')
        })

        describe('when the Ajax call returns with a response', () => {
            beforeEach(() => {
                axiosGetPromise.resolve({data: data})
            })

            it('calls the callback with the response', () => {
                expect(callbackSpy).toHaveBeenCalledWith(data)
            })
        })
    })
})