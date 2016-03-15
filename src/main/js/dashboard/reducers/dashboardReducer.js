var _ = require('lodash');

var dashboardReducer = function(state, action) {
    if(typeof state === 'undefined') {
        return {
            loginErrorMessage: ''
        };
    }

    switch (action.type) {
        case "SET_LOGIN_ERROR":
            var stateClone = _.cloneDeep(state);

            stateClone.loginErrorMessage = action.errorMessage;

            return stateClone;
        default:
            return state;
    }
};

module.exports = dashboardReducer;
