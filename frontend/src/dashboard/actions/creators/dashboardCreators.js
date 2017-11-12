export function setNewProjectErrorCreator(errorStatus) {
    return {
        type: 'SET_NEW_PROJECT_ERROR',
        errorStatus: errorStatus
    }
}

export function setLoginErrorCreator(errorStatus) {
    return {
        type: 'SET_LOGIN_ERROR',
        errorStatus: errorStatus
    };
}