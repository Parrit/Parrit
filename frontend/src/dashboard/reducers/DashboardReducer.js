const initialState = {
    newProjectErrorMessage: undefined,
    newProjectErrorName: false,
    newProjectErrorPassword: false,
    loginErrorMessage: undefined,
    loginErrorName: false,
    loginErrorPassword: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_NEW_PROJECT_ERROR': {
            if(action.errorResponse.fieldErrors) {
                const newProjectErrorMessage = makeFieldErrorMessage(action.errorResponse.fieldErrors.name, action.errorResponse.fieldErrors.password)
                const newProjectErrorName = action.errorResponse.fieldErrors.name !== undefined
                const newProjectErrorPassword = action.errorResponse.fieldErrors.password !== undefined
                return Object.assign({}, state, {newProjectErrorMessage, newProjectErrorName, newProjectErrorPassword})
            } else {
                const newProjectErrorMessage = action.errorResponse.message
                return Object.assign({}, state, {newProjectErrorMessage, newProjectErrorName: false, newProjectErrorPassword: false})
            }
        }
        case 'SET_LOGIN_ERROR': {
            if(action.errorResponse.fieldErrors) {
                const loginErrorMessage = makeFieldErrorMessage(action.errorResponse.fieldErrors.name, action.errorResponse.fieldErrors.password)
                const loginErrorName = action.errorResponse.fieldErrors.name !== undefined
                const loginErrorPassword = action.errorResponse.fieldErrors.password !== undefined
                return Object.assign({}, state, {loginErrorMessage, loginErrorName, loginErrorPassword})
            } else {
                const loginErrorMessage = action.errorResponse.message
                return Object.assign({}, state, {loginErrorMessage, loginErrorName: false, loginErrorPassword: false})
            }
        }
        default:
            return state
    }
}

function makeFieldErrorMessage(nameFieldError, passwordFieldError) {
    return [nameFieldError, passwordFieldError].filter(val => val !== undefined).join(' ')
}