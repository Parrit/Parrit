export function setNewProjectErrorCreator(errorResponse) {
    return {
        type: 'SET_NEW_PROJECT_ERROR',
        errorResponse: errorResponse
    }
}

export function setLoginErrorCreator(errorResponse) {
    return {
        type: 'SET_LOGIN_ERROR',
        errorResponse: errorResponse
    };
}