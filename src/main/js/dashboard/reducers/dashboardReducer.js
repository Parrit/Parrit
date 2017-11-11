import * as _ from 'lodash';

export default function (state, action) {
    if (typeof state === 'undefined') {
        return {
            newProjectErrorType: 0,
            loginErrorType: 0
        };
    }

    let stateClone;
    switch (action.type) {
        case "SET_NEW_PROJECT_ERROR":
            stateClone = _.cloneDeep(state);

            stateClone.newProjectErrorType = action.errorStatus;

            return stateClone;
        case "SET_LOGIN_ERROR":
            stateClone = _.cloneDeep(state);

            stateClone.loginErrorType = action.errorStatus;

            return stateClone;
        default:
            return state;
    }
};
