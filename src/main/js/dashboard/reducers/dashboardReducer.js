var _ = require('lodash');

var dashboardReducer = function(state, action) {
    if(typeof state === 'undefined') {
        return {
            newProjectErrorType: 0,
            loginErrorType: 0
        };
    }

    switch (action.type) {
        case "SET_NEW_PROJECT_ERROR":
            var stateClone = _.cloneDeep(state);

            stateClone.newProjectErrorType = action.errorStatus;

            return stateClone;
        case "SET_LOGIN_ERROR":
            var stateClone = _.cloneDeep(state);

            stateClone.loginErrorType = action.errorStatus;

            return stateClone;
        default:
            return state;
    }
};

module.exports = dashboardReducer;
