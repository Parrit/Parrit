var _ = require('lodash');

var workspaceReducer = function(state, action) {
	if(typeof state === 'undefined') {
		return {
            id: 0,
            people: [
                {
                    name: 'Tim'
                },
                {
                    name: 'Gaurav'
                },
                {
                    name: 'Marianna'
                },
                {
                    name: 'Tony'
                },
                {
                    name: 'Pete'
                },
                {
                    name: 'Jared'
                },
                {
                    name: 'Fonzie'
                },
                {
                    name: 'Brian'
                },
                {
                    name: 'Kea'
                },
                {
                    name: 'Lance'
                },
                {
                    name: 'Liz'
                },
                {
                    name: 'Sree'
                }
            ],
            spaces: [
                {
                    name: 'Design',
                    people: []
                },
                {
                    name: 'Product',
                    people: []
                },
                {
                    name: 'Wellesley',
                    people: []
                },
                {
                    name: 'Pico2',
                    people: []
                },
                {
                    name: 'Manchester',
                    people: []
                },
                {
                    name: 'Larchmont',
                    people: []
                },
                {
                    name: 'Culver',
                    people: []
                },
                {
                    name: 'Out of Office',
                    people: []
                }
            ]
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
        default:
            return state;
    }
};

module.exports = workspaceReducer;
