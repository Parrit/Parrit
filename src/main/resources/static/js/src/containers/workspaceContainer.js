var ReactRedux = require('react-redux');
var Workspace = require('../components/Workspace.js');

var WorkspaceContainer = ReactRedux.connect(getStateSettings, getDispatchFunctions)(Workspace);

function getStateSettings(state) {
	return state.workspace;
}

function getDispatchFunctions(dispatch) {
	return {};
}

module.exports = WorkspaceContainer;
