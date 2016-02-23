var dashboardReducer = function(state, action) {
    if (typeof state === 'undefined') {
        state = {
            isNewWorkspaceModalOpen: false,
            workspaceNames: []
        };
    }

    switch (action.type) {
        case "SET_NEW_WORKSPACE_MODAL_OPEN":
            return Object.assign({}, state, {isNewWorkspaceModalOpen: action.isOpen});
        case "UPDATE_WORKSPACE_NAME_LIST":
            return Object.assign({}, state, {workspaceNames: action.workspaceNames});
        default:
            return state;
    }
};

module.exports = dashboardReducer;