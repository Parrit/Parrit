import deepFreeze from 'deep-freeze'
import dashboardReducer from './DashboardReducer.js'

describe('DashboardReducer', () => {
    it('should get the default state', () => {
        const stateBefore = undefined
        const action = {}
        const stateAfter = {
            newProjectErrorMessage: undefined,
            newProjectErrorName: false,
            newProjectErrorPassword: false,
            loginErrorMessage: undefined,
            loginErrorName: false,
            loginErrorPassword: false
        }

        expect(dashboardReducer(stateBefore, action)).toEqual(stateAfter)
    })

    describe('actions', () => {
        describe('SET_NEW_PROJECT_ERROR', () => {
            it('sets the project error message and name flag when the name field error is present', () => {
                const stateBefore = {
                    newProjectErrorMessage: undefined,
                    newProjectErrorName: false,
                    newProjectErrorPassword: false
                }

                const action = {
                    type: 'SET_NEW_PROJECT_ERROR',
                    errorResponse: {
                        message: null,
                        fieldErrors: {
                            name: 'some name error message',
                            password: undefined
                        }
                    }
                }

                const stateAfter = {
                    newProjectErrorMessage: 'some name error message',
                    newProjectErrorName: true,
                    newProjectErrorPassword: false
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(dashboardReducer(stateBefore, action)).toEqual(stateAfter)
            })

            it('sets the project error message and password flag when the password field error is present', () => {
                const stateBefore = {
                    newProjectErrorMessage: undefined,
                    newProjectErrorName: false,
                    newProjectErrorPassword: false
                }

                const action = {
                    type: 'SET_NEW_PROJECT_ERROR',
                    errorResponse: {
                        message: null,
                        fieldErrors: {
                            name: undefined,
                            password: 'some password error message'
                        }
                    }
                }

                const stateAfter = {
                    newProjectErrorMessage: 'some password error message',
                    newProjectErrorName: false,
                    newProjectErrorPassword: true
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(dashboardReducer(stateBefore, action)).toEqual(stateAfter)
            })

            it('sets the project error message and both flags when the both field errors are present', () => {
                const stateBefore = {
                    newProjectErrorMessage: undefined,
                    newProjectErrorName: false,
                    newProjectErrorPassword: false
                }

                const action = {
                    type: 'SET_NEW_PROJECT_ERROR',
                    errorResponse: {
                        message: null,
                        fieldErrors: {
                            name: 'some name error message',
                            password: 'some password error message'
                        }
                    }
                }

                const stateAfter = {
                    newProjectErrorMessage: 'some name error message some password error message',
                    newProjectErrorName: true,
                    newProjectErrorPassword: true
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(dashboardReducer(stateBefore, action)).toEqual(stateAfter)
            })

            it('only sets the project error message when the message is present and there are no field errors', () => {
                const stateBefore = {
                    newProjectErrorMessage: undefined,
                    newProjectErrorName: true,
                    newProjectErrorPassword: true
                }

                const action = {
                    type: 'SET_NEW_PROJECT_ERROR',
                    errorResponse: {
                        message: 'some error message',
                        fieldErrors: null
                    }
                }

                const stateAfter = {
                    newProjectErrorMessage: 'some error message',
                    newProjectErrorName: false,
                    newProjectErrorPassword: false
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(dashboardReducer(stateBefore, action)).toEqual(stateAfter)
            })
        })

        describe('SET_LOGIN_ERROR', () => {
            it('sets the login error message and name flag when the name field error is present', () => {
                const stateBefore = {
                    loginErrorMessage: undefined,
                    loginErrorName: false,
                    loginErrorPassword: false
                }

                const action = {
                    type: 'SET_LOGIN_ERROR',
                    errorResponse: {
                        message: null,
                        fieldErrors: {
                            name: 'some name error message',
                            password: undefined
                        }
                    }
                }

                const stateAfter = {
                    loginErrorMessage: 'some name error message',
                    loginErrorName: true,
                    loginErrorPassword: false
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(dashboardReducer(stateBefore, action)).toEqual(stateAfter)
            })

            it('sets the login error message and password flag when the password field error is present', () => {
                const stateBefore = {
                    loginErrorMessage: undefined,
                    loginErrorName: false,
                    loginErrorPassword: false
                }

                const action = {
                    type: 'SET_LOGIN_ERROR',
                    errorResponse: {
                        message: null,
                        fieldErrors: {
                            name: undefined,
                            password: 'some password error message'
                        }
                    }
                }

                const stateAfter = {
                    loginErrorMessage: 'some password error message',
                    loginErrorName: false,
                    loginErrorPassword: true
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(dashboardReducer(stateBefore, action)).toEqual(stateAfter)
            })

            it('sets the login error message and both flags when the both field errors are present', () => {
                const stateBefore = {
                    loginErrorMessage: undefined,
                    loginErrorName: false,
                    loginErrorPassword: false
                }

                const action = {
                    type: 'SET_LOGIN_ERROR',
                    errorResponse: {
                        message: null,
                        fieldErrors: {
                            name: 'some name error message',
                            password: 'some password error message'
                        }
                    }
                }

                const stateAfter = {
                    loginErrorMessage: 'some name error message some password error message',
                    loginErrorName: true,
                    loginErrorPassword: true
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(dashboardReducer(stateBefore, action)).toEqual(stateAfter)
            })

            it('only sets the login error message when the message is present and there are no field errors', () => {
                const stateBefore = {
                    loginErrorMessage: undefined,
                    loginErrorName: true,
                    loginErrorPassword: true
                }

                const action = {
                    type: 'SET_LOGIN_ERROR',
                    errorResponse: {
                        message: 'some error message',
                        fieldErrors: null
                    }
                }

                const stateAfter = {
                    loginErrorMessage: 'some error message',
                    loginErrorName: false,
                    loginErrorPassword: false
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(dashboardReducer(stateBefore, action)).toEqual(stateAfter)
            })
        })
    })
})
