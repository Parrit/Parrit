import * as dashboardThunks from './DashboardThunks.js'

import * as dashboardCreators from '../creators/DashboardCreators.js'
import * as databaseHelpers from '../../../shared/helpers/DatabaseHelpers.js'

describe('DashboardThunks', () => {
    let thunk, dispatchSpy, getStateSpy
    let postProjectAndDoSpy
    let postLoginAndRedirectSpy

    beforeEach(() => {
        dispatchSpy = jasmine.createSpy('dispatchSpy')
        getStateSpy = jasmine.createSpy('getStateSpy')

        postProjectAndDoSpy = spyOn(databaseHelpers, 'postProjectAndDo')
        postLoginAndRedirectSpy = spyOn(databaseHelpers, 'postLoginAndRedirect')
    })

    describe('#createProjectThunk', () => {
        beforeEach(() => {
            thunk = dashboardThunks.createProjectThunk('New Project', 'S3cr3tP@$$w0rd')
        })

        it('returns a function', () => {
            expect(typeof thunk).toBe('function')
        })

        describe('when calling the returned function', () => {
            beforeEach(() => {
                thunk(dispatchSpy, getStateSpy)
            })

            it('calls postProjectAndDo helper with correct arguments', () => {
                expect(postProjectAndDoSpy).toHaveBeenCalledWith('New Project', 'S3cr3tP@$$w0rd', jasmine.anything(), jasmine.anything())
            })

            it('calls postLoginAndRedirect with the name and password when creating a project is successful', () => {
                const callback = postProjectAndDoSpy.calls.mostRecent().args[2]
                callback()

                expect(postLoginAndRedirectSpy).toHaveBeenCalledWith('New Project', 'S3cr3tP@$$w0rd')
            })

            it('dispatches a setNewProjectError action when creating a project fails', () => {
                const errorResponse = {message: 'some error message', fieldErrors: {}}

                const callback = postProjectAndDoSpy.calls.mostRecent().args[3]
                callback(errorResponse)

                expect(dispatchSpy).toHaveBeenCalledWith(dashboardCreators.setNewProjectErrorCreator(errorResponse))
            })
        })
    })

    describe('#loginThunk', () => {
        beforeEach(() => {
            thunk = dashboardThunks.loginThunk('Existing Project', 'S3cr3tP@$$w0rd')
        })

        it('returns a function', () => {
            expect(typeof thunk).toBe('function')
        })

        describe('when calling the returned function', () => {
            beforeEach(() => {
                thunk(dispatchSpy, getStateSpy)
            })

            it('calls postLoginAndRedirect with the name, password and an error callback', () => {
                expect(postLoginAndRedirectSpy).toHaveBeenCalledWith('Existing Project', 'S3cr3tP@$$w0rd', jasmine.anything())
            })

            it('dispatches a setLoginError action when logging in fails', () => {
                const errorResponse = {message: 'some error message', fieldErrors: {}}

                const callback = postLoginAndRedirectSpy.calls.mostRecent().args[2]
                callback(errorResponse)

                expect(dispatchSpy).toHaveBeenCalledWith(dashboardCreators.setLoginErrorCreator(errorResponse))
            })
        })
    })
})