export function setLoginErrorCreator(errorStatus) {
    return {
        type: 'SET_LOGIN_ERROR',
        errorStatus: errorStatus
    };
}