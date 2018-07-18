const initialState = {
    message: undefined
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_SYSTEM_ALERT_MESSAGE':
            return {message: action.message}
        case 'CLEAR_SYSTEM_ALERT_MESSAGE':
            return {message: undefined}
        default:
            return state
    }
}
