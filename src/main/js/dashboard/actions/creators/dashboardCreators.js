export function setLoginErrorCreator(errorMessage) {
    return {
        type: 'SET_LOGIN_ERROR',
        errorMessage: errorMessage
    };
}