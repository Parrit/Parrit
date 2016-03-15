var _ = require('lodash');

var workspaceReducer = function(state, action) {
	if(typeof state === 'undefined') {
		return {
            id: 0,
            people: [],
            spaces: []
		};
	}

    switch (action.type) {
        case "LOAD_WORKSPACE":
            return action.workspace;
        case "MOVE_PERSON":
            var stateClone = _.cloneDeep(state);

            var fromSpace = action.fromSpaceIndex >=0 ? stateClone.spaces[action.fromSpaceIndex] : stateClone;
            var toSpace = action.toSpaceIndex >=0 ? stateClone.spaces[action.toSpaceIndex] : stateClone;

            toSpace.people.push(_.pullAt(fromSpace.people, action.personIndex)[0]);

            return stateClone;
        case "CREATE_PERSON":
            var stateClone = _.cloneDeep(state);

            stateClone.people.push({name: action.name});

            return stateClone;
        case "CREATE_SPACE":
            var stateClone = _.cloneDeep(state);

            stateClone.spaces.push({name: action.name, people: []});

            return stateClone;
        case "DELETE_PERSON":
            var stateClone = _.cloneDeep(state);

            var space = action.spaceIndex >=0 ? stateClone.spaces[action.spaceIndex] : stateClone;
            _.pullAt(space.people, action.personIndex);

            return stateClone;
        case "DELETE_SPACE":
            var stateClone = _.cloneDeep(state);

            stateClone.people = stateClone.people.concat(stateClone.spaces[action.spaceIndex].people);
            _.pullAt(stateClone.spaces, action.spaceIndex);

            return stateClone;
        case "RENAME_SPACE":
            var stateClone = _.cloneDeep(state);

            stateClone.spaces[action.spaceIndex].name = action.name;

            return stateClone;
        default:
            return state;
    }
};

module.exports = workspaceReducer;
